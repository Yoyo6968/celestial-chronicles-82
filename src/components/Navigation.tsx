import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Rocket, 
  Satellite, 
  Globe, 
  MessageCircle, 
  Users,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

const Navigation: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home', icon: Rocket },
    { path: '/asteroids', label: 'Asteroids', icon: Satellite },
    { path: '/events', label: 'Natural Events', icon: Globe },
    { path: '/chatbot', label: 'Space Chatbot', icon: MessageCircle },
    { path: '/about', label: 'About Us', icon: Users },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Rocket className="h-8 w-8 text-primary animate-float" />
              <div className="absolute inset-0 h-8 w-8 text-accent animate-pulse-cosmic opacity-50" />
            </div>
            <span className="font-orbitron font-bold text-xl text-cosmic">
              NASA Explorer
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive(item.path) ? "default" : "ghost"}
                    className={`relative group transition-all duration-300 ${
                      isActive(item.path) 
                        ? 'cosmic-glow text-primary-foreground' 
                        : 'hover:nebula-glow hover:text-accent'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                    {isActive(item.path) && (
                      <div className="absolute inset-0 bg-gradient-cosmic opacity-20 rounded-md animate-pulse-cosmic" />
                    )}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-card/95 backdrop-blur-lg border-b border-border/50 animate-slide-up">
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button
                      variant={isActive(item.path) ? "default" : "ghost"}
                      className={`w-full justify-start transition-all duration-300 ${
                        isActive(item.path) 
                          ? 'cosmic-glow text-primary-foreground' 
                          : 'hover:nebula-glow hover:text-accent'
                      }`}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;