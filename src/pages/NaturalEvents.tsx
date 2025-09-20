import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import StarField from '@/components/StarField';
import { 
  Globe, 
  AlertTriangle, 
  Flame, 
  Waves, 
  Cloud, 
  Mountain,
  Calendar,
  MapPin,
  Activity,
  ExternalLink,
  Filter
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Event {
  id: string;
  title: string;
  description: string;
  link: string;
  categories: Array<{
    id: string;
    title: string;
  }>;
  sources: Array<{
    id: string;
    url: string;
  }>;
  geometries: Array<{
    date: string;
    type: string;
    coordinates: number[];
  }>;
}

const NaturalEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const { toast } = useToast();

  const API_KEY = 'afJaCU1rlk2sBXlQbfDA9cZceJpl0jliJDTc3Z2W';

  const eventCategories = [
    { id: 'all', label: 'All Events', icon: Globe },
    { id: 'wildfires', label: 'Wildfires', icon: Flame },
    { id: 'volcanoes', label: 'Volcanoes', icon: Mountain },
    { id: 'storms', label: 'Storms', icon: Cloud },
    { id: 'floods', label: 'Floods', icon: Waves },
  ];

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter(event =>
        event.categories.some(cat => 
          cat.title.toLowerCase().includes(selectedCategory.toLowerCase())
        )
      );
      setFilteredEvents(filtered);
    }
  }, [selectedCategory, events]);

  const fetchEvents = async () => {
    try {
      const response = await fetch(
        `https://eonet.gsfc.nasa.gov/api/v2.1/events?status=open&limit=50`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch events data');
      }
      
      const data = await response.json();
      
      // Filter events from the last 10 days (5 past + 5 future)
      const now = new Date();
      const tenDaysAgo = new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000);
      const fiveDaysLater = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000);
      
      const recentEvents = data.events.filter((event: Event) => {
        if (event.geometries && event.geometries.length > 0) {
          const eventDate = new Date(event.geometries[0].date);
          return eventDate >= tenDaysAgo && eventDate <= fiveDaysLater;
        }
        return true; // Include events without specific dates
      });
      
      setEvents(recentEvents);
      setLoading(false);
      
      toast({
        title: "Natural Events Loaded",
        description: `Found ${recentEvents.length} active natural events`,
      });
    } catch (error) {
      console.error('Error fetching events:', error);
      setLoading(false);
      toast({
        title: "Error",
        description: "Failed to load natural events data. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getEventIcon = (categories: Array<{ title: string }>) => {
    const category = categories[0]?.title.toLowerCase() || '';
    if (category.includes('wildfire')) return Flame;
    if (category.includes('volcano')) return Mountain;
    if (category.includes('storm') || category.includes('cyclone')) return Cloud;
    if (category.includes('flood')) return Waves;
    return AlertTriangle;
  };

  const getEventColor = (categories: Array<{ title: string }>) => {
    const category = categories[0]?.title.toLowerCase() || '';
    if (category.includes('wildfire')) return 'bg-red-500 text-red-900';
    if (category.includes('volcano')) return 'bg-orange-500 text-orange-900';
    if (category.includes('storm') || category.includes('cyclone')) return 'bg-blue-500 text-blue-900';
    if (category.includes('flood')) return 'bg-cyan-500 text-cyan-900';
    return 'bg-yellow-500 text-yellow-900';
  };

  const getSeverityLevel = (event: Event) => {
    // Basic severity assessment based on keywords in title/description
    const text = (event.title + ' ' + event.description).toLowerCase();
    if (text.includes('major') || text.includes('severe') || text.includes('extreme')) return 'High';
    if (text.includes('moderate') || text.includes('significant')) return 'Medium';
    return 'Low';
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
                <p className="text-xl font-orbitron text-cosmic">Monitoring global natural events...</p>
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
              Natural Events Monitor
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real-time tracking of global natural events and disasters using NASA's Earth Observing System
            </p>
          </div>

          {/* Category Filters */}
          <Card className="mb-8 bg-card/50 backdrop-blur-sm border-border/50 animate-slide-up">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Filter className="h-5 w-5 text-muted-foreground mr-2" />
                <span className="font-medium">Filter by Event Type</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {eventCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className={`transition-all duration-300 ${
                      selectedCategory === category.id 
                        ? 'cosmic-glow' 
                        : 'hover:nebula-glow hover:text-accent'
                    }`}
                  >
                    <category.icon className="h-4 w-4 mr-2" />
                    {category.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Active Events', value: filteredEvents.length, icon: Activity },
              { label: 'High Severity', value: filteredEvents.filter(e => getSeverityLevel(e) === 'High').length, icon: AlertTriangle },
              { label: 'Wildfires', value: events.filter(e => e.categories.some(c => c.title.toLowerCase().includes('wildfire'))).length, icon: Flame },
              { label: 'Storm Systems', value: events.filter(e => e.categories.some(c => c.title.toLowerCase().includes('storm'))).length, icon: Cloud },
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

          {/* Events Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => {
              const EventIcon = getEventIcon(event.categories);
              const severityLevel = getSeverityLevel(event);
              
              return (
                <Card 
                  key={event.id} 
                  className="group bg-card/50 backdrop-blur-sm border-border/50 hover:nebula-glow transition-all duration-500 animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`p-2 rounded-full ${getEventColor(event.categories)}`}>
                          <EventIcon className="h-4 w-4" />
                        </div>
                        <div>
                          <CardTitle className="text-lg font-orbitron text-foreground group-hover:text-accent transition-colors line-clamp-2">
                            {event.title}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {event.categories[0]?.title || 'Natural Event'}
                          </p>
                        </div>
                      </div>
                      <Badge variant={severityLevel === 'High' ? 'destructive' : severityLevel === 'Medium' ? 'default' : 'secondary'}>
                        {severityLevel}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Description */}
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {event.description || 'Natural event monitoring in progress...'}
                    </p>

                    {/* Location & Date */}
                    {event.geometries && event.geometries[0] && (
                      <div className="space-y-2 pt-3 border-t border-border/50">
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="font-medium">
                            {new Date(event.geometries[0].date).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <div className="flex items-center text-sm">
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="font-medium">
                            {event.geometries[0].coordinates[1].toFixed(2)}°, {event.geometries[0].coordinates[0].toFixed(2)}°
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Impact Assessment */}
                    <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border/50">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground mb-1">Risk Level</div>
                        <div className={`text-lg font-bold ${
                          severityLevel === 'High' ? 'text-destructive' : 
                          severityLevel === 'Medium' ? 'text-yellow-500' : 'text-green-500'
                        }`}>
                          {severityLevel}
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground mb-1">Status</div>
                        <div className="text-lg font-bold text-accent">Active</div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      {event.link && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 hover:bg-accent/10 hover:text-accent"
                          onClick={() => window.open(event.link, '_blank')}
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          NASA Details
                        </Button>
                      )}
                      
                      {event.sources && event.sources[0] && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-accent/10 hover:text-accent"
                          onClick={() => window.open(event.sources[0].url, '_blank')}
                        >
                          <Globe className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredEvents.length === 0 && !loading && (
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 animate-fade-in">
              <CardContent className="p-12 text-center">
                <Globe className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-orbitron font-semibold mb-2">No Events Found</h3>
                <p className="text-muted-foreground">
                  {selectedCategory === 'all' 
                    ? 'No natural events detected in the monitoring period' 
                    : `No ${selectedCategory} events found`}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Map Placeholder */}
          <Card className="mt-8 bg-card/50 backdrop-blur-sm border-border/50 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center text-cosmic">
                <Globe className="h-5 w-5 mr-2" />
                Global Events Map
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-gradient-space rounded-lg flex items-center justify-center border border-border/50">
                <div className="text-center">
                  <Globe className="h-16 w-16 text-accent mx-auto mb-4 animate-float" />
                  <h3 className="text-xl font-orbitron font-semibold mb-2 text-cosmic">Interactive Map Coming Soon</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    We're developing an interactive world map that will show real-time locations of natural events with custom symbols for each event type.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NaturalEvents;