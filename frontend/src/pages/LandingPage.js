import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { Zap, TrendingUp, Target, Award, BarChart3, Shield, Users, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] animate-pulse-slow" />
      </div>

      {/* Grid Pattern */}
      <div 
        className="fixed inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.5) 1px, transparent 1px), 
                           linear-gradient(90deg, rgba(139, 92, 246, 0.5) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <Header />

      {/* Hero Section */}
      <main className="relative z-10 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center glass-badge mb-6 animate-slide-down">
              <Zap className="w-4 h-4 mr-2" />
              <span>Track Your Coding Journey</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-down" style={{ animationDelay: '0.1s' }}>
              <span className="block bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                Master Your
              </span>
              <span className="block bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Coding Skills
              </span>
            </h1>
            
            <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8 animate-slide-down" style={{ animationDelay: '0.2s' }}>
              Connect with <span className="text-indigo-400 font-semibold">LeetCode</span> and{' '}
              <span className="text-purple-400 font-semibold">Codeforces</span> to track your progress, 
              analyze performance, and level up your coding game.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-down" style={{ animationDelay: '0.3s' }}>
              <Link
                to="/register"
                className="glass-button-primary group"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="glass-button-sm"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent mb-4">
                Powerful Features
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Everything you need to track and improve your coding performance
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <BarChart3 className="w-6 h-6" />,
                  title: "Unified Analytics",
                  description: "All your coding stats from multiple platforms in one beautiful dashboard",
                  gradient: "from-blue-500 to-cyan-500"
                },
                {
                  icon: <TrendingUp className="w-6 h-6" />,
                  title: "Progress Tracking",
                  description: "Visualize your improvement over time with detailed charts and insights",
                  gradient: "from-emerald-500 to-green-500"
                },
                {
                  icon: <Target className="w-6 h-6" />,
                  title: "Weak Area Detection",
                  description: "AI-powered analysis identifies topics where you need more practice",
                  gradient: "from-amber-500 to-orange-500"
                },
                {
                  icon: <Award className="w-6 h-6" />,
                  title: "Achievement System",
                  description: "Unlock badges and milestones as you solve more problems",
                  gradient: "from-purple-500 to-pink-500"
                },
                {
                  icon: <Shield className="w-6 h-6" />,
                  title: "Secure & Private",
                  description: "Your data is encrypted and secure. We never share your information",
                  gradient: "from-rose-500 to-red-500"
                },
                {
                  icon: <Users className="w-6 h-6" />,
                  title: "Community Insights",
                  description: "Compare your progress with peers and learn from the community",
                  gradient: "from-indigo-500 to-blue-500"
                }
              ].map((feature, index) => (
                <div
                  key={feature.title}
                  className="glass-card group hover:scale-105 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300 mb-6`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent mb-4">
                How It Works
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Get started in three simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Create Account",
                  description: "Sign up securely with Clerk authentication",
                  icon: <Users className="w-8 h-8" />
                },
                {
                  step: "02", 
                  title: "Connect Platforms",
                  description: "Link your LeetCode and Codeforces accounts",
                  icon: <Shield className="w-8 h-8" />
                },
                {
                  step: "03",
                  title: "Track Progress",
                  description: "View your analytics and improve your skills",
                  icon: <BarChart3 className="w-8 h-8" />
                }
              ].map((step, index) => (
                <div
                  key={step.step}
                  className="relative animate-fade-in-up"
                  style={{ animationDelay: `${1.0 + index * 0.1}s` }}
                >
                  <div className="glass-card h-full p-8">
                    <div className="text-4xl font-bold text-indigo-400 mb-4">{step.step}</div>
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg mb-6">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                    <p className="text-slate-400">{step.description}</p>
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="w-8 h-8 text-indigo-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="glass-card p-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent mb-4">
                Ready to Level Up?
              </h2>
              <p className="text-xl text-slate-400 mb-8">
                Join thousands of developers tracking their coding journey
              </p>
              <Link
                to="/register"
                className="glass-button-primary group text-lg px-8 py-4"
              >
                <span>Start Free Today</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        .glass-badge {
          display: inline-flex;
          align-items: center;
          padding: 8px 16px;
          background: rgba(99, 102, 241, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          color: #c7d2fe;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .glass-card {
          background: rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(148, 163, 184, 0.1);
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
        }

        .glass-card:hover {
          border-color: rgba(99, 102, 241, 0.3);
          box-shadow: 0 12px 48px rgba(99, 102, 241, 0.2);
        }

        .glass-button-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.8), rgba(168, 85, 247, 0.8));
          backdrop-filter: blur(10px);
          border: 1px solid rgba(99, 102, 241, 0.5);
          border-radius: 12px;
          color: white;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
          text-decoration: none;
        }

        .glass-button-primary:hover {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9));
          border-color: rgba(99, 102, 241, 0.7);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
          text-decoration: none;
          color: white;
        }

        .glass-button-sm {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: rgba(99, 102, 241, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(99, 102, 241, 0.3);
          border-radius: 12px;
          color: #e0e7ff;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .glass-button-sm:hover {
          background: rgba(99, 102, 241, 0.2);
          border-color: rgba(99, 102, 241, 0.5);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
          text-decoration: none;
          color: #e0e7ff;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(50px, -50px); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-50px, 50px); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-float {
          animation: float 20s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 25s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-slide-down {
          animation: slide-down 0.6s ease forwards;
          opacity: 0;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
