import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import StarField from '@/components/StarField';
import { 
  Search, 
  AlertTriangle, 
  Info, 
  Zap, 
  Calendar,
  Ruler,
  Target,
  ExternalLink
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Asteroid {
  id: string;
  name: string;
  neo_reference_id: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: Array<{
    close_approach_date: string;
    relative_velocity: {
      kilometers_per_hour: string;
    };
    miss_distance: {
      kilometers: string;
      astronomical: string;
    };
  }>;
}

const Asteroids: React.FC = () => {
  const [asteroids, setAsteroids] = useState<Asteroid[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAsteroids, setFilteredAsteroids] = useState<Asteroid[]>([]);
  const { toast } = useToast();

  const API_KEY = 'afJaCU1rlk2sBXlQbfDA9cZceJpl0jliJDTc3Z2W';

  useEffect(() => {
    fetchAsteroids();
  }, []);

  useEffect(() => {
    const filtered = asteroids.filter(asteroid =>
      asteroid.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAsteroids(filtered);
  }, [searchTerm, asteroids]);

  const fetchAsteroids = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const endDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      
      const response = await fetch(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${endDate}&api_key=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch asteroid data');
      }
      
      const data = await response.json();
      const allAsteroids: Asteroid[] = [];
      
      Object.values(data.near_earth_objects).forEach((dayAsteroids: any) => {
        allAsteroids.push(...dayAsteroids);
      });
      
      setAsteroids(allAsteroids);
      setLoading(false);
      
      toast({
        title: "Asteroid Data Loaded",
        description: `Found ${allAsteroids.length} asteroids in the next 7 days`,
      });
    } catch (error) {
      console.error('Error fetching asteroids:', error);
      setLoading(false);
      toast({
        title: "Error",
        description: "Failed to load asteroid data. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getDangerLevel = (asteroid: Asteroid) => {
    const missDistance = parseFloat(asteroid.close_approach_data[0]?.miss_distance.kilometers || '0');
    const speed = parseFloat(asteroid.close_approach_data[0]?.relative_velocity.kilometers_per_hour || '0');
    
    if (asteroid.is_potentially_hazardous_asteroid) return 'high';
    if (missDistance < 1000000) return 'medium';
    return 'low';
  };

  const getDangerColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-yellow-500 text-yellow-900';
      case 'low': return 'bg-green-500 text-green-900';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <StarField />
        <div className="pt-20 px-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="animate-spin cosmic-glow rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
                <p className="text-xl font-orbitron text-cosmic">Scanning the cosmos for asteroids...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarField />
      
      <div className="pt-20 px-4 pb-12">
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-orbitron font-bold mb-4 text-cosmic">
              Asteroid Tracker
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real-time monitoring of near-Earth asteroids using NASA's comprehensive database
            </p>
          </div>

          {/* Search */}
          <Card className="mb-8 bg-card/50 backdrop-blur-sm border-border/50 animate-slide-up">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search asteroids by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background/50 border-border/50 focus:border-primary"
                />
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Asteroids', value: asteroids.length, icon: Target },
              { label: 'Potentially Hazardous', value: asteroids.filter(a => a.is_potentially_hazardous_asteroid).length, icon: AlertTriangle },
              { label: 'Within 1M km', value: asteroids.filter(a => parseFloat(a.close_approach_data[0]?.miss_distance.kilometers || '0') < 1000000).length, icon: Zap },
              { label: 'This Week', value: asteroids.length, icon: Calendar },
            ].map((stat, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50 hover:nebula-glow transition-all duration-500 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-4 text-center">
                  <stat.icon className="h-6 w-6 text-accent mx-auto mb-2" />
                  <div className="text-2xl font-orbitron font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Asteroids Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredAsteroids.map((asteroid, index) => (
              <Card 
                key={asteroid.id} 
                className="group bg-card/50 backdrop-blur-sm border-border/50 hover:nebula-glow transition-all duration-500 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-orbitron text-foreground group-hover:text-accent transition-colors line-clamp-2">
                      {asteroid.name}
                    </CardTitle>
                    <Badge className={getDangerColor(getDangerLevel(asteroid))}>
                      {getDangerLevel(asteroid).toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Basic Info */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex items-center text-muted-foreground">
                        <Ruler className="h-4 w-4 mr-2" />
                        <span>Diameter</span>
                      </div>
                      <p className="font-medium">
                        {asteroid.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)} - {' '}
                        {asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-muted-foreground">
                        <Zap className="h-4 w-4 mr-2" />
                        <span>Magnitude</span>
                      </div>
                      <p className="font-medium">
                        {asteroid.absolute_magnitude_h.toFixed(1)} H
                      </p>
                    </div>
                  </div>

                  {/* Approach Data */}
                  {asteroid.close_approach_data[0] && (
                    <div className="space-y-3 pt-3 border-t border-border/50">
                      <div className="space-y-2">
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>Close Approach</span>
                        </div>
                        <p className="font-medium">
                          {new Date(asteroid.close_approach_data[0].close_approach_date).toLocaleDateString()}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <p className="text-muted-foreground mb-1">Miss Distance</p>
                          <p className="font-medium">
                            {parseFloat(asteroid.close_approach_data[0].miss_distance.kilometers).toLocaleString()} km
                          </p>
                          <p className="text-muted-foreground">
                            {parseFloat(asteroid.close_approach_data[0].miss_distance.astronomical).toFixed(3)} AU
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-muted-foreground mb-1">Velocity</p>
                          <p className="font-medium">
                            {parseFloat(asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour).toLocaleString()} km/h
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 hover:bg-accent/10 hover:text-accent"
                      onClick={() => window.open(asteroid.nasa_jpl_url, '_blank')}
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      NASA JPL
                    </Button>
                    
                    {asteroid.is_potentially_hazardous_asteroid && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-destructive text-destructive hover:bg-destructive/10"
                      >
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Hazardous
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredAsteroids.length === 0 && !loading && (
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 animate-fade-in">
              <CardContent className="p-12 text-center">
                <Target className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-orbitron font-semibold mb-2">No Asteroids Found</h3>
                <p className="text-muted-foreground">
                  {searchTerm ? `No asteroids match "${searchTerm}"` : 'No asteroid data available'}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Asteroids;