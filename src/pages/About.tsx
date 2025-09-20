import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import StarField from '@/components/StarField';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Globe, 
  Rocket,
  Code,
  Palette,
  Database,
  Brain,
  Heart,
  Star
} from 'lucide-react';

const About: React.FC = () => {
  const founders = [
    {
      name: 'Dr. Alex Chen',
      role: 'CEO & Space Data Scientist',
      description: 'Former NASA researcher with 10+ years experience in astrophysics and planetary science. Passionate about making space data accessible to everyone.',
      image: '/api/placeholder/300/300',
      skills: ['Astrophysics', 'Data Science', 'Machine Learning', 'Python'],
      specialization: 'Asteroid tracking algorithms and space weather prediction models',
      social: {
        github: 'https://github.com/alexchen',
        linkedin: 'https://linkedin.com/in/alexchen',
        twitter: 'https://twitter.com/alexchen',
        email: 'alex@nasaexplorer.com'
      },
      gradient: 'gradient-cosmic',
      icon: Rocket
    },
    {
      name: 'Sarah Rodriguez',
      role: 'CTO & Full-Stack Developer',
      description: 'Software architect specializing in real-time data visualization and scalable web applications. Expert in creating beautiful, performant user experiences.',
      image: '/api/placeholder/300/300',
      skills: ['React', 'Node.js', 'TypeScript', 'Cloud Architecture'],
      specialization: 'Real-time data visualization and interactive space mapping systems',
      social: {
        github: 'https://github.com/sarahrodriguez',
        linkedin: 'https://linkedin.com/in/sarahrodriguez',
        twitter: 'https://twitter.com/sarahrodriguez',
        email: 'sarah@nasaexplorer.com'
      },
      gradient: 'gradient-nebula',
      icon: Code
    },
    {
      name: 'Dr. Marcus Thompson',
      role: 'Lead AI Researcher',
      description: 'AI specialist focused on natural language processing and conversational AI for space education. Former research scientist at SpaceX and Tesla.',
      image: '/api/placeholder/300/300',
      skills: ['AI/ML', 'NLP', 'TensorFlow', 'Space Systems'],
      specialization: 'Conversational AI for space education and automated event classification',
      social: {
        github: 'https://github.com/marcusthompson',
        linkedin: 'https://linkedin.com/in/marcusthompson',
        twitter: 'https://twitter.com/marcusthompson',
        email: 'marcus@nasaexplorer.com'
      },
      gradient: 'gradient-aurora',
      icon: Brain
    }
  ];

  const stats = [
    { label: 'Years Combined Experience', value: '25+', icon: Star },
    { label: 'NASA Projects Contributed', value: '15+', icon: Rocket },
    { label: 'Research Papers Published', value: '50+', icon: Database },
    { label: 'Space Enthusiasts Reached', value: '100K+', icon: Heart }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarField />
      
      <div className="pt-20 px-4 pb-12">
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-orbitron font-bold mb-6 text-cosmic">
              Meet Our Team
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're a passionate team of space scientists, engineers, and AI researchers dedicated to making NASA's incredible data accessible and engaging for everyone.
            </p>
          </div>

          {/* Mission Statement */}
          <Card className="mb-16 bg-gradient-cosmic p-8 border-none cosmic-glow animate-slide-up">
            <CardContent className="p-0 text-center">
              <Rocket className="h-16 w-16 text-primary-foreground mx-auto mb-6 animate-float" />
              <h2 className="text-3xl font-orbitron font-bold mb-4 text-primary-foreground">
                Our Mission
              </h2>
              <p className="text-xl text-primary-foreground/90 max-w-4xl mx-auto leading-relaxed">
                To democratize access to space science by creating beautiful, intuitive tools that transform complex NASA data into engaging experiences. We believe that understanding our universe should be accessible to everyone, from curious students to professional researchers.
              </p>
            </CardContent>
          </Card>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50 hover:nebula-glow transition-all duration-500 animate-scale-in group" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6 text-center">
                  <stat.icon className="h-8 w-8 text-accent mx-auto mb-3 group-hover:animate-float" />
                  <div className="text-3xl font-orbitron font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Founders */}
          <div className="space-y-12">
            {founders.map((founder, index) => (
              <Card 
                key={index} 
                className="group bg-card/50 backdrop-blur-sm border-border/50 hover:nebula-glow transition-all duration-700 animate-fade-in overflow-hidden"
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                <CardContent className="p-0">
                  <div className={`grid grid-cols-1 lg:grid-cols-2 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                    {/* Image Section */}
                    <div className={`relative ${founder.gradient} p-8 flex items-center justify-center ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                      <div className="relative">
                        <div className="w-48 h-48 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center group-hover:animate-pulse-cosmic">
                          <founder.icon className="h-24 w-24 text-primary-foreground animate-float" />
                        </div>
                        <div className="absolute inset-0 rounded-full border-4 border-primary-foreground/30 group-hover:border-primary-foreground/60 transition-all duration-500"></div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 space-y-6">
                      <div>
                        <h3 className="text-2xl font-orbitron font-bold text-cosmic mb-2 group-hover:text-accent transition-colors">
                          {founder.name}
                        </h3>
                        <Badge variant="outline" className="border-accent text-accent mb-4">
                          {founder.role}
                        </Badge>
                        <p className="text-muted-foreground leading-relaxed">
                          {founder.description}
                        </p>
                      </div>

                      {/* Specialization */}
                      <div className="bg-muted/30 rounded-lg p-4">
                        <h4 className="font-semibold text-accent mb-2 flex items-center">
                          <Palette className="h-4 w-4 mr-2" />
                          Specialization
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {founder.specialization}
                        </p>
                      </div>

                      {/* Skills */}
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Skills & Expertise</h4>
                        <div className="flex flex-wrap gap-2">
                          {founder.skills.map((skill, skillIndex) => (
                            <Badge 
                              key={skillIndex} 
                              variant="secondary" 
                              className="hover:bg-accent/20 hover:text-accent transition-colors cursor-default"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Social Links */}
                      <div className="flex space-x-3 pt-4 border-t border-border/50">
                        <Button
                          variant="outline"
                          size="icon"
                          className="hover:bg-accent/10 hover:text-accent hover:border-accent transition-all duration-300"
                          onClick={() => window.open(founder.social.github, '_blank')}
                        >
                          <Github className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="hover:bg-accent/10 hover:text-accent hover:border-accent transition-all duration-300"
                          onClick={() => window.open(founder.social.linkedin, '_blank')}
                        >
                          <Linkedin className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="hover:bg-accent/10 hover:text-accent hover:border-accent transition-all duration-300"
                          onClick={() => window.open(founder.social.twitter, '_blank')}
                        >
                          <Twitter className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="hover:bg-accent/10 hover:text-accent hover:border-accent transition-all duration-300"
                          onClick={() => window.open(`mailto:${founder.social.email}`, '_blank')}
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Section */}
          <Card className="mt-16 bg-card/50 backdrop-blur-sm border-border/50 animate-fade-in">
            <CardContent className="p-8 text-center">
              <Globe className="h-16 w-16 text-accent mx-auto mb-6 animate-float" />
              <h2 className="text-3xl font-orbitron font-bold mb-4 text-cosmic">
                Get In Touch
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Have questions, feedback, or ideas for collaboration? We'd love to hear from you! 
                Join our community of space enthusiasts and help us make the cosmos more accessible.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="cosmic-glow hover:strong-glow transition-all duration-500"
                  onClick={() => window.open('mailto:team@nasaexplorer.com')}
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Us
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="hover:nebula-glow hover:text-accent border-accent"
                  onClick={() => window.open('https://github.com/nasa-explorer', '_blank')}
                >
                  <Github className="mr-2 h-5 w-5" />
                  View on GitHub
                </Button>
              </div>

              <div className="mt-8 pt-8 border-t border-border/50">
                <p className="text-sm text-muted-foreground">
                  Built with ❤️ for space exploration • Data provided by NASA's Open Data Portal
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;