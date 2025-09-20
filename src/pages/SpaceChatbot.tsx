import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import StarField from '@/components/StarField';
import { 
  MessageCircle,
  Send, 
  Bot, 
  User, 
  Rocket,
  Satellite,
  Cloud,
  Sun,
  Moon,
  Star,
  Zap,
  Globe
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'info';
}

const SpaceChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Welcome to the Space AI Assistant! I can help you with questions about space, weather, atmospheric phenomena, and cosmic events. What would you like to explore today?',
      sender: 'bot',
      timestamp: new Date(),
      type: 'info'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const predefinedResponses: { [key: string]: string } = {
    'asteroid': 'Asteroids are rocky objects that orbit the Sun. Most are found in the asteroid belt between Mars and Jupiter. Near-Earth asteroids are those that come within 1.3 AU of the Sun. NASA tracks potentially hazardous asteroids larger than 140 meters.',
    'space weather': 'Space weather refers to conditions in space caused by solar activity. This includes solar flares, coronal mass ejections, and solar wind that can affect satellites, GPS, and power grids on Earth.',
    'atmosphere': 'Earth\'s atmosphere is composed of 78% nitrogen, 21% oxygen, and trace amounts of other gases. It extends about 10,000 km above Earth\'s surface and protects us from harmful solar radiation.',
    'solar system': 'Our solar system consists of the Sun, 8 planets, their moons, asteroids, comets, and other celestial bodies. It formed about 4.6 billion years ago from a collapsing cloud of gas and dust.',
    'mars': 'Mars is the fourth planet from the Sun, known as the Red Planet due to iron oxide on its surface. It has two small moons, Phobos and Deimos, and evidence suggests it once had liquid water.',
    'moon': 'The Moon is Earth\'s only natural satellite, formed about 4.5 billion years ago. It influences Earth\'s tides and has been gradually moving away from Earth at about 3.8 cm per year.',
    'sun': 'The Sun is a G-type main-sequence star that provides energy for life on Earth. It\'s about 4.6 billion years old and will continue burning for another 5 billion years before becoming a red giant.',
    'galaxy': 'The Milky Way is our home galaxy, containing over 100 billion stars. It\'s a barred spiral galaxy about 100,000 light-years in diameter, and we\'re located in one of its spiral arms.',
    'exoplanet': 'Exoplanets are planets that orbit stars outside our solar system. Over 5,000 have been discovered, with some potentially habitable worlds in their star\'s habitable zone.',
    'black hole': 'Black holes are regions of spacetime where gravity is so strong that nothing, not even light, can escape. They form when massive stars collapse at the end of their lives.',
    'weather': 'Weather is driven by the Sun\'s energy heating Earth unevenly, creating pressure differences that cause wind and weather patterns. Climate change is affecting global weather patterns.',
    'climate': 'Climate is the long-term average of weather patterns. Earth\'s climate is changing due to increased greenhouse gases from human activities, leading to global warming and extreme weather events.'
  };

  const getRandomResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    // Check for keywords in predefined responses
    for (const [keyword, response] of Object.entries(predefinedResponses)) {
      if (lowerInput.includes(keyword)) {
        return response;
      }
    }

    // Default responses for common question types
    if (lowerInput.includes('?')) {
      const responses = [
        "That's a fascinating question about space! While I can provide basic information, for the most accurate and up-to-date data, I recommend checking NASA's official resources.",
        "Great question! Space science is constantly evolving. What you're asking about involves complex astrophysics that researchers are still studying.",
        "Interesting! This topic relates to ongoing space research. Scientists use various instruments and missions to gather data about this phenomenon.",
        "Excellent inquiry! This is an active area of space science research. Would you like me to explain the basic principles involved?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Default responses
    const defaultResponses = [
      "I'm here to help with space, weather, and atmospheric questions! Could you be more specific about what you'd like to know?",
      "That's an interesting topic! Space science covers many fascinating areas. What specific aspect would you like to explore?",
      "I love discussing space phenomena! Could you rephrase your question or ask about a specific space topic?",
      "As your Space AI Assistant, I'm ready to help! Try asking about planets, stars, weather patterns, or atmospheric science."
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getRandomResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    { text: "What are asteroids?", icon: Satellite },
    { text: "How does space weather work?", icon: Zap },
    { text: "Tell me about Mars", icon: Globe },
    { text: "What causes climate change?", icon: Cloud },
    { text: "How big is our solar system?", icon: Star },
    { text: "What are black holes?", icon: Moon }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarField />
      
      <div className="pt-20 px-4 pb-12">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-orbitron font-bold mb-4 text-cosmic">
              Space AI Assistant
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your intelligent companion for exploring the cosmos, weather, and atmospheric phenomena
            </p>
          </div>

          {/* Chat Interface */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 h-[600px] flex flex-col animate-slide-up">
            <CardHeader className="border-b border-border/50">
              <CardTitle className="flex items-center text-cosmic">
                <div className="relative mr-3">
                  <Bot className="h-6 w-6 text-accent animate-float" />
                  <div className="absolute inset-0 h-6 w-6 text-primary animate-pulse-cosmic opacity-50" />
                </div>
                Space AI Assistant
                <Badge variant="outline" className="ml-auto border-accent text-accent">
                  Online
                </Badge>
              </CardTitle>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === 'user' 
                        ? 'gradient-cosmic' 
                        : 'gradient-nebula'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="h-4 w-4 text-primary-foreground" />
                      ) : (
                        <Bot className="h-4 w-4 text-primary-foreground" />
                      )}
                    </div>
                    
                    <div className={`rounded-lg px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : message.type === 'info'
                        ? 'bg-accent/20 text-accent border border-accent/30'
                        : 'bg-secondary text-secondary-foreground'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <p className={`text-xs mt-1 opacity-70`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start animate-fade-in">
                  <div className="flex items-start space-x-2 max-w-[80%]">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full gradient-nebula flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div className="bg-secondary text-secondary-foreground rounded-lg px-4 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-accent rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </CardContent>

            {/* Input */}
            <div className="border-t border-border/50 p-4">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about space, weather, or atmospheric phenomena..."
                  className="flex-1 bg-background/50 border-border/50 focus:border-primary"
                  disabled={isTyping}
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="cosmic-glow hover:strong-glow"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Quick Questions */}
          <div className="mt-8 animate-scale-in">
            <h3 className="text-xl font-orbitron font-semibold mb-4 text-center text-cosmic">
              Quick Questions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="text-left justify-start h-auto p-3 hover:nebula-glow transition-all duration-300 group"
                  onClick={() => setInputMessage(question.text)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <question.icon className="h-4 w-4 mr-2 text-accent group-hover:animate-float" />
                  <span className="text-sm">{question.text}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Rocket, title: 'Space Exploration', description: 'Learn about planets, stars, galaxies, and space missions' },
              { icon: Cloud, title: 'Weather & Climate', description: 'Understand weather patterns and climate science' },
              { icon: Sun, title: 'Atmospheric Science', description: 'Explore Earth\'s atmosphere and space weather' }
            ].map((feature, index) => (
              <Card key={index} className="bg-card/30 backdrop-blur-sm border-border/50 hover:nebula-glow transition-all duration-500 animate-fade-in group" style={{ animationDelay: `${index * 0.2}s` }}>
                <CardContent className="p-6 text-center">
                  <feature.icon className="h-12 w-12 text-accent mx-auto mb-4 group-hover:animate-float" />
                  <h3 className="text-lg font-orbitron font-semibold mb-2 text-cosmic">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceChatbot;