
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Bug, Link, FileText, Trophy, Users, Clock, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [hoveredRoom, setHoveredRoom] = useState<number | null>(null);

  const rooms = [
    {
      id: 1,
      title: "Phishing Link Detector",
      description: "Learn to identify suspicious URLs and protect against phishing attacks",
      difficulty: "Beginner",
      icon: Link,
      color: "from-red-500 to-orange-500",
      concept: "URL Analysis & Phishing Prevention",
      estimatedTime: "10-15 min"
    },
    {
      id: 2,
      title: "Caesar Cipher Cracker",
      description: "Decode encrypted messages and learn cryptography fundamentals",
      difficulty: "Beginner",
      icon: Lock,
      color: "from-blue-500 to-cyan-500",
      concept: "Basic Cryptography",
      estimatedTime: "15-20 min"
    },
    {
      id: 3,
      title: "Password Fortress",
      description: "Test password strength and understand entropy concepts",
      difficulty: "Intermediate",
      icon: Shield,
      color: "from-green-500 to-emerald-500",
      concept: "Password Security",
      estimatedTime: "12-18 min"
    },
    {
      id: 4,
      title: "Malware Hunter",
      description: "Identify malicious code patterns and security vulnerabilities",
      difficulty: "Intermediate",
      icon: Bug,
      color: "from-purple-500 to-pink-500",
      concept: "Malware Detection",
      estimatedTime: "20-25 min"
    },
    {
      id: 5,
      title: "Security Mastermind",
      description: "Challenge your cybersecurity knowledge with complex scenarios",
      difficulty: "Advanced",
      icon: FileText,
      color: "from-yellow-500 to-orange-500",
      concept: "General Security Knowledge",
      estimatedTime: "25-30 min"
    }
  ];

  const stats = [
    { icon: Trophy, label: "Challenges", value: "5" },
    { icon: Users, label: "Active Learners", value: "1.2K+" },
    { icon: Clock, label: "Avg. Completion", value: "18 min" },
    { icon: Star, label: "Success Rate", value: "87%" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <div className="relative container mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
              <Shield className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">Interactive Cybersecurity Learning</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Cyber
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Escape
              </span>
            </h1>
            
            <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto">
              Master cybersecurity through immersive puzzle rooms. Learn real-world security concepts 
              by solving challenges inspired by actual cyber threats.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                onClick={() => navigate('/rooms')}
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg"
              >
                Start Learning
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-3 text-lg"
              >
                Learn More
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Rooms Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Choose Your Challenge
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Each room teaches essential cybersecurity concepts through hands-on puzzles and real-world scenarios
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {rooms.map((room) => (
            <Card 
              key={room.id}
              className={`bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                hoveredRoom === room.id ? 'shadow-2xl shadow-blue-500/25' : ''
              }`}
              onMouseEnter={() => setHoveredRoom(room.id)}
              onMouseLeave={() => setHoveredRoom(null)}
              onClick={() => navigate(`/room/${room.id}`)}
            >
              <CardHeader className="pb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${room.color} flex items-center justify-center mb-4`}>
                  <room.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-white text-lg">{room.title}</CardTitle>
                  <Badge 
                    variant="outline" 
                    className={`${
                      room.difficulty === 'Beginner' ? 'border-green-500 text-green-400' :
                      room.difficulty === 'Intermediate' ? 'border-yellow-500 text-yellow-400' :
                      'border-red-500 text-red-400'
                    }`}
                  >
                    {room.difficulty}
                  </Badge>
                </div>
                <CardDescription className="text-slate-400">
                  {room.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Shield className="w-4 h-4 text-blue-400" />
                    <span>{room.concept}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Clock className="w-4 h-4 text-green-400" />
                    <span>{room.estimatedTime}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/room/${room.id}`);
                  }}
                >
                  Enter Room
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-slate-800/30 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why CyberEscape?
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Learn cybersecurity the engaging way with our unique approach
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Gamified Learning</h3>
              <p className="text-slate-400">
                Progress through levels, earn achievements, and compete with others while mastering cybersecurity
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Real-World Scenarios</h3>
              <p className="text-slate-400">
                Practice with actual cybersecurity challenges based on current threats and industry standards
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Community Driven</h3>
              <p className="text-slate-400">
                Join a community of learners, share solutions, and collaborate on cybersecurity challenges
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
