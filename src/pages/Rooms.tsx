
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield, Lock, Bug, Link, FileText, Trophy, Clock, Star, ArrowLeft, Play } from "lucide-react";

const Rooms = () => {
  const navigate = useNavigate();
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const rooms = [
    {
      id: 1,
      title: "Phishing Link Detector",
      description: "Learn to identify suspicious URLs and protect against phishing attacks. Analyze real-world examples of malicious links.",
      difficulty: "Beginner",
      icon: Link,
      color: "from-red-500 to-orange-500",
      concept: "URL Analysis & Phishing Prevention",
      estimatedTime: "10-15 min",
      completed: false,
      progress: 0,
      participants: 847,
      rating: 4.8
    },
    {
      id: 2,
      title: "Caesar Cipher Cracker",
      description: "Decode encrypted messages and learn cryptography fundamentals. Master the art of classical ciphers.",
      difficulty: "Beginner",
      icon: Lock,
      color: "from-blue-500 to-cyan-500",
      concept: "Basic Cryptography",
      estimatedTime: "15-20 min",
      completed: false,
      progress: 0,
      participants: 923,
      rating: 4.9
    },
    {
      id: 3,
      title: "Password Fortress",
      description: "Test password strength and understand entropy concepts. Learn what makes passwords truly secure.",
      difficulty: "Intermediate",
      icon: Shield,
      color: "from-green-500 to-emerald-500",
      concept: "Password Security",
      estimatedTime: "12-18 min",
      completed: false,
      progress: 0,
      participants: 654,
      rating: 4.7
    },
    {
      id: 4,
      title: "Malware Hunter",
      description: "Identify malicious code patterns and security vulnerabilities. Develop an eye for detecting threats.",
      difficulty: "Intermediate",
      icon: Bug,
      color: "from-purple-500 to-pink-500",
      concept: "Malware Detection",
      estimatedTime: "20-25 min",
      completed: false,
      progress: 0,
      participants: 432,
      rating: 4.6
    },
    {
      id: 5,
      title: "Security Mastermind",
      description: "Challenge your cybersecurity knowledge with complex scenarios. The ultimate test of your skills.",
      difficulty: "Advanced",
      icon: FileText,
      color: "from-yellow-500 to-orange-500",
      concept: "General Security Knowledge",
      estimatedTime: "25-30 min",
      completed: false,
      progress: 0,
      participants: 289,
      rating: 4.9
    }
  ];

  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredRooms = selectedDifficulty === 'All' 
    ? rooms 
    : rooms.filter(room => room.difficulty === selectedDifficulty);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'border-green-500 text-green-400';
      case 'Intermediate': return 'border-yellow-500 text-yellow-400';
      case 'Advanced': return 'border-red-500 text-red-400';
      default: return 'border-slate-500 text-slate-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-slate-700">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="text-slate-400 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-white">Challenge Rooms</h1>
                <p className="text-slate-400">Choose your cybersecurity learning adventure</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-medium">0 / 5 Completed</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Filter Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {difficulties.map((difficulty) => (
              <Button
                key={difficulty}
                variant={selectedDifficulty === difficulty ? "default" : "outline"}
                onClick={() => setSelectedDifficulty(difficulty)}
                className={
                  selectedDifficulty === difficulty
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "border-slate-600 text-slate-300 hover:bg-slate-800"
                }
              >
                {difficulty}
              </Button>
            ))}
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <Card 
              key={room.id}
              className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${room.color} flex items-center justify-center`}>
                    <room.icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge 
                    variant="outline" 
                    className={getDifficultyColor(room.difficulty)}
                  >
                    {room.difficulty}
                  </Badge>
                </div>
                
                <CardTitle className="text-white text-xl mb-2">{room.title}</CardTitle>
                <CardDescription className="text-slate-300 text-sm leading-relaxed">
                  {room.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Progress</span>
                    <span className="text-slate-400">{room.progress}%</span>
                  </div>
                  <Progress value={room.progress} className="h-2" />
                </div>

                {/* Room Stats */}
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <Clock className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                    <div className="text-slate-300">{room.estimatedTime}</div>
                  </div>
                  <div className="text-center">
                    <Trophy className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
                    <div className="text-slate-300">{room.participants}</div>
                  </div>
                  <div className="text-center">
                    <Star className="w-4 h-4 text-orange-400 mx-auto mb-1" />
                    <div className="text-slate-300">{room.rating}</div>
                  </div>
                </div>

                {/* Concept Tag */}
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-slate-300">{room.concept}</span>
                </div>
                
                {/* Action Button */}
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  onClick={() => navigate(`/room/${room.id}`)}
                >
                  <Play className="w-4 h-4 mr-2" />
                  {room.progress > 0 ? 'Continue' : 'Start Challenge'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredRooms.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-12 h-12 text-slate-600" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No rooms found</h3>
            <p className="text-slate-400">Try adjusting your filter selection.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rooms;
