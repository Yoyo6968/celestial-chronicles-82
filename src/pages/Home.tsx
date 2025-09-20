import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import StarField from '@/components/StarField';
import { 
  Rocket, 
  Satellite, 
  Globe, 
  MessageCircle, 
  ArrowRight,
  Sparkles,
  Zap,
  Target,
  Users
} from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: Satellite,
      title: 'Asteroid Tracker',
      description: 'Monitor near-Earth asteroids and their trajectories with real-time NASA data.',
      link: '/asteroids',
      gradient: 'gradient-cosmic',
    },
    {
      icon: Globe,
      title: 'Natural Events Monitor',
      description: 'Track global natural events with interactive maps and detailed analytics.',
      link: '/events',
      gradient: 'gradient-nebula',
    },
    {
      icon: MessageCircle,
      title: 'Space AI Assistant',
      description: 'Chat with our advanced AI about space, weather, and atmospheric phenomena.',
      link: '/chatbot',
      gradient: 'gradient-aurora',
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarField />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            {/* Animated Title */}
            <h1 className="text-6xl md:text-8xl font-orbitron font-bold mb-6 animate-fade-in">
              <span className="text-nebula">NASA</span>{' '}
              <span className="text-cosmic">Cosmic</span>{' '}
              <span className="text-foreground">Explorer</span>
            </h1>
            
            {/* Subtitle with Glow Effect */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-slide-up max-w-3xl mx-auto leading-relaxed">
              Explore the cosmos with real-time NASA data, track asteroids, monitor natural events, 
              and chat with our AI about the mysteries of space and atmosphere.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-scale-in">
              <Link to="/asteroids">
                <Button size="lg" className="cosmic-glow hover:strong-glow transition-all duration-500 group">
                  <Rocket className="mr-2 h-5 w-5 group-hover:animate-float" />
                  Start Exploring
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="border-accent text-accent hover:bg-accent/10 group">
                  <Users className="mr-2 h-5 w-5" />
                  Meet Our Team
                </Button>
              </Link>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
              {[
                { icon: Target, label: 'Asteroids Tracked', value: '28,000+' },
                { icon: Zap, label: 'Events Monitored', value: '500+' },
                { icon: Sparkles, label: 'AI Interactions', value: '1M+' },
              ].map((stat, index) => (
                <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50 hover:nebula-glow transition-all duration-500 animate-fade-in group" style={{ animationDelay: `${index * 0.2}s` }}>
                  <CardContent className="p-6 text-center">
                    <stat.icon className="h-8 w-8 text-accent mx-auto mb-2 group-hover:animate-float" />
                    <div className="text-2xl font-orbitron font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-4 text-cosmic">
              Explore the Universe
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Dive deep into space data with our advanced tools and AI-powered insights
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group bg-card/50 backdrop-blur-sm border-border/50 hover:nebula-glow transition-all duration-500 animate-fade-in cursor-pointer"
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                <CardContent className="p-8 text-center h-full flex flex-col">
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-full ${feature.gradient} flex items-center justify-center group-hover:animate-float`}>
                    <feature.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  
                  <h3 className="text-xl font-orbitron font-semibold mb-4 text-foreground group-hover:text-accent transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 flex-grow">
                    {feature.description}
                  </p>
                  
                  <Link to={feature.link} className="mt-auto">
                    <Button variant="ghost" className="group-hover:text-accent group-hover:bg-accent/10 transition-all duration-300">
                      Explore
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <Card className="bg-gradient-cosmic p-12 border-none cosmic-glow animate-pulse-cosmic">
            <CardContent className="p-0">
              <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-4 text-primary-foreground">
                Ready for Your Space Adventure?
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                Join thousands of space enthusiasts exploring the cosmos with NASA data
              </p>
              <Link to="/chatbot">
                <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Chat with Space AI
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;