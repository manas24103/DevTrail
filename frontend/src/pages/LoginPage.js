import React from 'react';
import { Link } from 'react-router-dom';
import { SignIn } from '@clerk/clerk-react';
import { Zap, ArrowRight, Shield, Lock } from 'lucide-react';

const LoginPage = () => {
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

      <div className="relative z-10 min-h-screen flex flex-col md:flex-row">
        {/* Left Side - Brand Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <div className="max-w-md text-center space-y-8">
            <div className="animate-slide-down">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent mb-4">
                Welcome Back
              </h1>
              <p className="text-xl text-slate-400 mb-8">
                Sign in to access your dashboard and continue your coding journey
              </p>
            </div>

            <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="glass-card p-6 text-left group hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center text-white shadow-lg">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Secure Login</h3>
                    <p className="text-slate-400 text-sm">Protected by enterprise-grade security</p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 text-left group hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-lg">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Your Data Safe</h3>
                    <p className="text-slate-400 text-sm">Encrypted and never shared with third parties</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Link 
                to="/register" 
                className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200"
              >
                <span>Don't have an account?</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="glass-card p-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Sign In</h2>
                <p className="text-slate-400">Welcome back to DevTrail</p>
              </div>
              
              <div className="mb-6">
                <div className="glass-badge mx-auto">
                  <Shield className="w-4 h-4 mr-2" />
                  <span>Secure Authentication</span>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-1 border border-slate-700/50">
                <SignIn 
                  path="/login"
                  routing="path"
                  signUpUrl="/register"
                  afterSignInUrl="/platform-setup"
                  redirectUrl="/platform-setup"
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      card: "bg-transparent shadow-none border-0 p-0",
                      headerTitle: "hidden",
                      headerSubtitle: "hidden",
                      socialButtonsBlockButton: "glass-button-sm w-full mb-3",
                      formButtonPrimary: "glass-button-primary w-full",
                      formFieldLabel: "text-slate-300 text-sm font-medium",
                      formFieldInput: "bg-slate-800/50 border-slate-700 text-white placeholder-slate-500 rounded-lg",
                      footerActionLink: "text-indigo-400 hover:text-indigo-300",
                      dividerText: "text-slate-500",
                      formFieldAction: "text-indigo-400 hover:text-indigo-300",
                      formResendCodeLink: "text-indigo-400 hover:text-indigo-300"
                    }
                  }}
                />
              </div>

              <div className="mt-6 text-center">
                <p className="text-slate-400 text-sm">
                  <Link to="/forgot-password" className="text-indigo-400 hover:text-indigo-300 underline">
                    Forgot your password?
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
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

        .glass-badge {
          display: inline-flex;
          align-items: center;
          padding: 8px 16px;
          background: rgba(99, 102, 241, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          color: #c7d2fe;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .glass-button-sm {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px 16px;
          background: rgba(99, 102, 241, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(99, 102, 241, 0.3);
          border-radius: 8px;
          color: #e0e7ff;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .glass-button-sm:hover {
          background: rgba(99, 102, 241, 0.2);
          border-color: rgba(99, 102, 241, 0.5);
          transform: translateY(-1px);
        }

        .glass-button-primary {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px 16px;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.8), rgba(168, 85, 247, 0.8));
          backdrop-filter: blur(10px);
          border: 1px solid rgba(99, 102, 241, 0.5);
          border-radius: 8px;
          color: white;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }

        .glass-button-primary:hover {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9));
          border-color: rgba(99, 102, 241, 0.7);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
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

export default LoginPage;
