import React, { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Vote, Shield, Lock, FileCheck, Users, ChevronDown,
  Github, Linkedin, Mail, ExternalLink, Timer,
  Database, Key, CheckCircle, BarChart, Brain,
  Code, Globe, Fingerprint, ScrollText, Sun, Moon,
  LogIn, UserCheck, Download, PieChart, Phone
} from 'lucide-react';
import { PieChart as RechartsChart, Pie, Cell, ResponsiveContainer } from 'recharts';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [voteHash, setVoteHash] = useState('');

  const teamMembers = [
    {
      name: 'Jayant Verman',
      role: 'Tech Lead',
      tagline: 'Blockchain Architect',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200',
      links: { github: '#', linkedin: '#' }
    },
    {
      name: 'Sanskriti Srivastava',
      role: 'Backend Developer',
      tagline: 'Smart Contract Specialist',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200',
      links: { github: '#', linkedin: '#' }
    },
    {
      name: 'Rihan',
      role: 'Security Expert',
      tagline: 'Cryptography Specialist',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200',
      links: { github: '#', linkedin: '#' }
    },
    {
      name: 'Vani Shukla',
      role: 'UI/UX Designer',
      tagline: 'Creating Seamless Experiences',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200',
      links: { github: '#', linkedin: '#' }
    },
    {
      name: 'Atharva Gupta',
      role: 'Full Stack Developer',
      tagline: 'Integration Specialist',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200',
      links: { github: '#', linkedin: '#' }
    }
  ];

  const candidates = [
    {
      name: 'Rajesh Kumar',
      party: 'Democratic Alliance',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200',
      votes: 156
    },
    {
      name: 'Priya Singh',
      party: 'Progressive Party',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200',
      votes: 142
    },
    {
      name: 'Ahmed Khan',
      party: 'United Front',
      photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200',
      votes: 98
    }
  ];

  const votingStats = {
    totalVotes: 396,
    voterTurnout: '42.3%',
    blocksCreated: 396,
    lastBlockHash: '0x7f1e8a...'
  };

  const handleLogin = () => {
    setShowPhoneInput(true);
  };

  const handlePhoneSubmit = () => {
    if (phoneNumber.length === 10) {
      setShowPhoneInput(false);
      setShowOTP(true);
    }
  };

  const handleOTPSubmit = () => {
    setIsLoggedIn(true);
    setShowOTP(false);
  };

  const handleVote = (candidateName: string) => {
    setSelectedCandidate(candidateName);
    setShowConfirmation(true);
  };

  const confirmVote = () => {
    setShowConfirmation(false);
    setHasVoted(true);
    setVoteHash('0x' + Math.random().toString(16).substr(2, 40));
  };

  const downloadProof = () => {
    const proof = {
      voteHash,
      timestamp: new Date().toISOString(),
      blockNumber: Math.floor(Math.random() * 1000000)
    };
    
    const blob = new Blob([JSON.stringify(proof, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vote-proof.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const FadeInSection = ({ children }: { children: React.ReactNode }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
      threshold: 0.1,
      triggerOnce: true
    });

    useEffect(() => {
      if (inView) {
        controls.start('visible');
      }
    }, [controls, inView]);

    return (
      <motion.div
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 20 }
        }}
        transition={{ duration: 0.6 }}
      >
        {children}
      </motion.div>
    );
  };

  if (hasVoted) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-cyber-grid p-8 rounded-lg border border-neon-blue/20">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CheckCircle className="w-16 h-16 text-neon-green mx-auto mb-6" />
          </motion.div>
          <h2 className="text-2xl font-orbitron font-bold text-center mb-4 gradient-text">
            Your vote has strengthened democracy!
          </h2>
          <p className="text-gray-300 text-center mb-6">
            Transaction Hash: <span className="font-roboto-mono text-neon-blue">{voteHash}</span>
          </p>
          <button
            onClick={downloadProof}
            className="w-full bg-neon-blue text-dark-bg py-3 rounded-lg font-medium hover:bg-neon-green transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download Proof of Vote
          </button>
        </div>
      </div>
    );
  }

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-cyber-grid p-8 rounded-lg border border-neon-blue/20">
          <h2 className="text-2xl font-orbitron font-bold text-center mb-6 gradient-text">
            Confirm Your Vote
          </h2>
          <p className="text-gray-300 text-center mb-6">
            You are about to vote for: <br />
            <span className="font-bold text-neon-blue">{selectedCandidate}</span>
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => setShowConfirmation(false)}
              className="flex-1 bg-gray-700 text-white py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              onClick={confirmVote}
              className="flex-1 bg-neon-blue text-dark-bg py-3 rounded-lg font-medium hover:bg-neon-green transition-colors duration-300"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showPhoneInput) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-cyber-grid p-8 rounded-lg border border-neon-blue/20">
          <h2 className="text-2xl font-orbitron font-bold text-center mb-6 gradient-text">
            Enter Phone Number
          </h2>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-gray-300 font-roboto-mono">+91</span>
            <input
              type="tel"
              maxLength={10}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
              className="flex-1 px-4 py-2 bg-dark-bg border border-neon-blue/20 rounded-lg focus:outline-none focus:border-neon-blue text-white font-roboto-mono"
              placeholder="Enter your phone number"
            />
          </div>
          <button
            onClick={handlePhoneSubmit}
            disabled={phoneNumber.length !== 10}
            className="w-full bg-neon-blue text-dark-bg py-3 rounded-lg font-medium hover:bg-neon-green transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  if (showOTP) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-cyber-grid p-8 rounded-lg border border-neon-blue/20">
          <h2 className="text-2xl font-orbitron font-bold text-center mb-6 gradient-text">
            Enter OTP
          </h2>
          <p className="text-gray-300 text-center mb-6">
            A one-time password has been sent to: <br />
            <span className="font-roboto-mono text-neon-blue">+91 {phoneNumber}</span>
          </p>
          <input
            type="text"
            maxLength={6}
            className="w-full px-4 py-2 bg-dark-bg border border-neon-blue/20 rounded-lg focus:outline-none focus:border-neon-blue text-white text-center font-roboto-mono text-2xl mb-6"
            placeholder="• • • • • •"
          />
          <button
            onClick={handleOTPSubmit}
            className="w-full bg-neon-blue text-dark-bg py-3 rounded-lg font-medium hover:bg-neon-green transition-colors duration-300"
          >
            Verify & Continue
          </button>
        </div>
      </div>
    );
  }

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-dark-bg p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-orbitron font-bold text-center mb-8 gradient-text">
            Cast Your Vote
          </h1>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {candidates.map((candidate) => (
                <div
                  key={candidate.name}
                  className="bg-cyber-grid p-6 rounded-lg border border-neon-blue/20 hover:border-neon-blue/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={candidate.photo}
                      alt={candidate.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-neon-blue"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-orbitron font-semibold text-neon-blue">
                        {candidate.name}
                      </h3>
                      <p className="text-gray-400">{candidate.party}</p>
                    </div>
                    <button
                      onClick={() => handleVote(candidate.name)}
                      className="px-6 py-2 bg-neon-blue text-dark-bg rounded-lg font-medium hover:bg-neon-green transition-colors duration-300"
                    >
                      Vote
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-cyber-grid p-6 rounded-lg border border-neon-blue/20">
              <h2 className="text-xl font-orbitron font-bold mb-6 gradient-text">
                Live Statistics
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-dark-bg/50 p-4 rounded-lg">
                  <p className="text-gray-400">Total Votes</p>
                  <p className="text-2xl font-orbitron text-neon-blue">
                    {votingStats.totalVotes}
                  </p>
                </div>
                <div className="bg-dark-bg/50 p-4 rounded-lg">
                  <p className="text-gray-400">Voter Turnout</p>
                  <p className="text-2xl font-orbitron text-neon-blue">
                    {votingStats.voterTurnout}
                  </p>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsChart>
                    <Pie
                      data={candidates}
                      dataKey="votes"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {candidates.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={index === 0 ? '#00f7ff' : index === 1 ? '#39ff14' : '#f700ff'}
                        />
                      ))}
                    </Pie>
                  </RechartsChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 p-4 bg-dark-bg/50 rounded-lg font-roboto-mono">
                <p className="text-gray-400">Latest Block Hash</p>
                <p className="text-neon-blue truncate">{votingStats.lastBlockHash}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-dark-bg/90 backdrop-blur-md border-b border-neon-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Vote className="w-8 h-8 text-neon-blue" />
              <span className="ml-2 text-xl font-orbitron font-bold gradient-text">VOTEDGE</span>
            </div>
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="text-gray-300 hover:text-neon-blue transition-colors"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                className="text-gray-300 hover:text-neon-blue transition-colors font-roboto-mono"
              >
                {language === 'en' ? 'हिंदी' : 'ENG'}
              </button>
              <button
                onClick={handleLogin}
                className="flex items-center gap-2 px-4 py-2 bg-neon-blue text-dark-bg rounded-lg font-medium hover:bg-neon-green transition-colors duration-300"
              >
                <LogIn className="w-4 h-4" />
                Login to Vote
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen hero-pattern cyber-grid flex items-center justify-center pt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/50 to-dark-bg"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-5xl font-orbitron font-bold mb-6 text-neon-blue">
              Empowering India with Transparent Voting using Blockchain
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 font-roboto-mono">
              Secure • Transparent • Unstoppable
            </p>
            <div className="flex justify-center space-x-6">
              <button
                onClick={handleLogin}
                className="px-8 py-4 bg-transparent border-2 border-neon-blue rounded-lg font-medium text-neon-blue hover:bg-neon-blue hover:text-dark-bg transition-all duration-300 neon-border"
              >
                Login to Vote
              </button>
              <a
                href="#how-it-works"
                className="px-8 py-4 bg-neon-blue/10 rounded-lg font-medium text-neon-blue hover:bg-neon-blue/20 transition-all duration-300"
              >
                Learn More
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-center mb-12 gradient-text">
              How It Works
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="bg-cyber-grid p-6 rounded-lg border border-neon-blue/20">
                <UserCheck className="w-12 h-12 text-neon-blue mb-4" />
                <h3 className="text-xl font-orbitron font-semibold mb-2 text-neon-blue">
                  Voter Authentication
                </h3>
                <p className="text-gray-300">
                  Secure login using phone number and OTP verification
                </p>
              </div>
              <div className="bg-cyber-grid p-6 rounded-lg border border-neon-blue/20">
                <Vote className="w-12 h-12 text-neon-blue mb-4" />
                <h3 className="text-xl font-orbitron font-semibold mb-2 text-neon-blue">
                  Cast Your Vote
                </h3>
                <p className="text-gray-300">
                  Select your candidate and confirm your choice
                </p>
              </div>
              <div className="bg-cyber-grid p-6 rounded-lg border border-neon-blue/20">
                <Database className="w-12 h-12 text-neon-blue mb-4" />
                <h3 className="text-xl font-orbitron font-semibold mb-2 text-neon-blue">
                  Blockchain Storage
                </h3>
                <p className="text-gray-300">
                  Vote is encrypted and added to the blockchain
                </p>
              </div>
              <div className="bg-cyber-grid p-6 rounded-lg border border-neon-blue/20">
                <FileCheck className="w-12 h-12 text-neon-blue mb-4" />
                <h3 className="text-xl font-orbitron font-semibold mb-2 text-neon-blue">
                  Verification
                </h3>
                <p className="text-gray-300">
                  Receive proof of vote with unique transaction hash
                </p>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Why Blockchain */}
      <section className="py-20 bg-cyber-grid relative">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <FadeInSection>
            <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-center mb-12 gradient-text">
              Why Blockchain?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-dark-bg/50 p-6 rounded-lg border border-neon-blue/20">
                <Shield className="w-12 h-12 text-neon-blue mb-4" />
                <h3 className="text-xl font-orbitron font-semibold mb-2 text-neon-blue">
                  Tamper-proof
                </h3>
                <p className="text-gray-300">
                  Once recorded, votes cannot be altered or deleted
                </p>
              </div>
              <div className="bg-dark-bg/50 p-6 rounded-lg border border-neon-blue/20">
                <Globe className="w-12 h-12 text-neon-blue mb-4" />
                <h3 className="text-xl font-orbitron font-semibold mb-2 text-neon-blue">
                  Transparent
                </h3>
                <p className="text-gray-300">
                  All transactions are publicly verifiable
                </p>
              </div>
              <div className="bg-dark-bg/50 p-6 rounded-lg border border-neon-blue/20">
                <Database className="w-12 h-12 text-neon-blue mb-4" />
                <h3 className="text-xl font-orbitron font-semibold mb-2 text-neon-blue">
                  Decentralized
                </h3>
                <p className="text-gray-300">
                  No single point of control or failure
                </p>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-center mb-12 gradient-text">
              Meet the Innovators
            </h2>
            <div className="grid md:grid-cols-5 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-cyber-grid p-6 rounded-lg border border-neon-blue/20 text-center">
                  <div className="mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover border-2 border-neon-blue"
                    />
                  </div>
                  <h3 className="text-xl font-orbitron font-semibold mb-1 text-neon-blue">
                    {member.name}
                  </h3>
                  <p className="text-gray-400 mb-2 font-roboto-mono">{member.role}</p>
                  <p className="text-sm text-gray-500 mb-4 italic">{member.tagline}</p>
                  <div className="flex justify-center space-x-3">
                    <a
                      href={member.links.github}
                      className="text-gray-400 hover:text-neon-blue transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href={member.links.linkedin}
                      className="text-gray-400 hover:text-neon-blue transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-bg py-12 border-t border-neon-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Vote className="w-6 h-6 text-neon-blue" />
                <span className="ml-2 text-lg font-orbitron font-bold gradient-text">
                  VOTEDGE
                </span>
              </div>
              <p className="text-gray-400">
                Blockchain-based Voting Edge - Secure, Transparent, Unstoppable
              </p>
            </div>
            <div>
              <h4 className="text-lg font-orbitron font-semibold mb-4 text-neon-blue">
                Quick Links
              </h4>
              <div className="space-y-2 font-roboto-mono">
                <a href="#how-it-works" className="block text-gray-400 hover:text-neon-blue">How It Works</a>
                <a href="#team" className="block text-gray-400 hover:text-neon-blue">Team</a>
                <button onClick={handleLogin} className="block text-gray-400 hover:text-neon-blue">Vote Now</button>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-orbitron font-semibold mb-4 text-neon-blue">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-neon-blue transition-colors">
                  <Github className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-neon-blue transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-neon-blue transition-colors">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-neon-blue/20 text-center">
            <p className="text-gray-400 font-roboto-mono">
              "Blockchain won't just change finance — it will save democracy."
            </p>
            <p className="text-sm text-gray-500 mt-4">
              &copy; 2025 VOTEDGE. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;