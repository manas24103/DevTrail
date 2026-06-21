import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, ArrowRight, Shield, Lock, Users, Mail, User as UserIcon, Eye, EyeOff } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuthMode } from '../contexts/AuthModeContext';

export default function AuthPage({ initialMode = 'login' }) {
  const { authMode, setAuthMode } = useAuthMode();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  
  // Use authMode from context instead of local state
  const isLogin = authMode === 'login';

  return (
    <div className="min-h-screen bg-auth-bg font-sans flex flex-col">
      <Header />

      {/* MAIN */}
      <div className="flex-1 flex items-center justify-center p-10">
        
        {/* LOGIN CARD */}
        {isLogin ? (
          <div className="auth-card flex w-[820px] max-w-full rounded-[20px] overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,.10)] bg-auth-white">
            {/* Left teal panel */}
            <div className="w-[290px] flex-shrink-0 bg-auth-teal flex flex-col items-center justify-center p-[28px_40px] text-center gap-5">
              <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center bg-white/20">
                <Users size={34} color="#fff" strokeWidth={1.8} />
              </div>
              <h2 className="text-[22px] font-extrabold text-white leading-tight">New Here?</h2>
              <p className="text-[13px] text-white/82 leading-[1.65]">
                Sign up and discover a world of possibilities with our advanced analytics platform.
              </p>
              <button 
                onClick={() => setAuthMode('signup')}
                className="px-9 py-2.5 border-2 border-white bg-transparent rounded-full text-sm font-bold cursor-pointer transition-all hover:bg-white hover:text-auth-teal font-outfit"
              >
                Sign up
              </button>
            </div>
            
            {/* Form */}
            <div className="flex-1 p-9 flex flex-col justify-center">
              <h2 className="text-[26px] font-extrabold text-auth-dark mb-1.5">Welcome Back</h2>
              <p className="text-sm text-auth-muted mb-6 leading-[1.5]">
                Please enter your details to sign in to your account.
              </p>

              <div className="mb-4">
                <label className="block text-[13px] font-semibold text-auth-text mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2" size={16} color="var(--auth-muted)" />
                  <input
                    type="email"
                    placeholder="name@company.com"
                    className="w-full px-3 py-2.5 pl-9 border-[1.5px] border-auth-border rounded-[10px] text-[13.5px] font-outfit text-auth-text bg-auth-white outline-none transition-all focus:border-auth-teal focus:shadow-[0_0_0_3px_rgba(27,184,154,.12)]"
                  />
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="m-0 text-[13px] font-semibold text-auth-text">Password</label>
                  <a href="#" className="text-xs font-semibold text-auth-teal no-underline">Forgot password?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2" size={16} color="var(--auth-muted)" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value="••••••••"
                    className="w-full px-3 py-2.5 pl-9 border-[1.5px] border-auth-border rounded-[10px] text-[13.5px] font-outfit text-auth-text bg-auth-white outline-none transition-all focus:border-auth-teal focus:shadow-[0_0_0_3px_rgba(27,184,154,.12)] tracking-[2px]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-0 cursor-pointer flex items-center text-auth-muted"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-5 text-[13px] text-auth-muted">
                <input type="checkbox" id="remember" className="w-[15px] h-[15px] accent-auth-teal cursor-pointer" />
                <label htmlFor="remember">Remember me for 30 days</label>
              </div>

              <button className="w-full py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all hover:bg-auth-teal-dark bg-auth-teal text-white border-0 mb-5 font-outfit">
                Sign In
                <ArrowRight size={15} strokeWidth={2.5} />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-auth-border"></div>
                <span className="text-xs font-medium text-auth-muted whitespace-nowrap">OR CONTINUE WITH</span>
                <div className="flex-1 h-px bg-auth-border"></div>
              </div>

              <div className="flex gap-2.5">
                <button className="flex-1 py-2.5 border border-auth-border rounded-lg text-sm font-semibold cursor-pointer flex items-center justify-center gap-2 transition-all hover:border-gray-400 bg-auth-white text-auth-text font-outfit">
                  <svg width="16" height="16" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Google
                </button>
                <button className="flex-1 py-2.5 border border-auth-border rounded-lg text-sm font-semibold cursor-pointer flex items-center justify-center gap-2 transition-all hover:border-gray-400 bg-auth-white text-auth-text font-outfit">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  Github
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="auth-card flex w-[820px] max-w-full rounded-[20px] overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,.10)] bg-auth-white">
            
            {/* Form */}
            <div className="flex-1 p-9 flex flex-col justify-center">
              <h2 className="text-[26px] font-extrabold text-auth-dark mb-1.5">Create an account</h2>
              <p className="text-sm text-auth-muted mb-6 leading-[1.5]">
                Join over 10,000+ professionals managing their workflows with our enterprise platform.
              </p>

              <div className="mb-4">
                <label className="block text-[13px] font-semibold text-auth-text mb-1.5">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2" size={16} color="var(--auth-muted)" />
                  <input
                    type="text"
                    placeholder="Jonathan Doe"
                    className="w-full px-3 py-2.5 pl-9 border-[1.5px] border-auth-border rounded-[10px] text-[13.5px] font-outfit text-auth-text bg-auth-white outline-none transition-all focus:border-auth-teal focus:shadow-[0_0_0_3px_rgba(27,184,154,.12)]"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-[13px] font-semibold text-auth-text mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2" size={16} color="var(--auth-muted)" />
                  <input
                    type="email"
                    placeholder="name@company.com"
                    className="w-full px-3 py-2.5 pl-9 border-[1.5px] border-auth-border rounded-[10px] text-[13.5px] font-outfit text-auth-text bg-auth-white outline-none transition-all focus:border-auth-teal focus:shadow-[0_0_0_3px_rgba(27,184,154,.12)]"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-[13px] font-semibold text-auth-text mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2" size={16} color="var(--auth-muted)" />
                  <input
                    type="password"
                    placeholder="Create a password"
                    className="w-full px-3 py-2.5 pl-9 border-[1.5px] border-auth-border rounded-[10px] text-[13.5px] font-outfit text-auth-text bg-auth-white outline-none transition-all focus:border-auth-teal focus:shadow-[0_0_0_3px_rgba(27,184,154,.12)]"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-[13px] font-semibold text-auth-text mb-1.5">Confirm Password</label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 -translate-y-1/2" size={16} color="var(--auth-muted)" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="w-full px-3 py-2.5 pl-9 border-[1.5px] border-auth-border rounded-[10px] text-[13.5px] font-outfit text-auth-text bg-auth-white outline-none transition-all focus:border-auth-teal focus:shadow-[0_0_0_3px_rgba(27,184,154,.12)]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-0 cursor-pointer flex items-center text-auth-muted"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-[18px] text-[13px] text-auth-muted">
                <input type="checkbox" id="agree" className="w-[15px] h-[15px] accent-auth-teal cursor-pointer" />
                <label htmlFor="agree">
                  I agree to the <a href="#" className="font-semibold text-auth-teal no-underline">Terms of Service</a> and <a href="#" className="font-semibold text-auth-teal no-underline">Privacy Policy</a>.
                </label>
              </div>

              <button className="w-full py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all hover:bg-auth-teal-dark bg-auth-teal text-white border-0 mb-5 font-outfit">
                Create Account
                <ArrowRight size={15} strokeWidth={2.5} />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-auth-border"></div>
                <span className="text-xs font-medium text-auth-muted whitespace-nowrap">OR REGISTER WITH</span>
                <div className="flex-1 h-px bg-auth-border"></div>
              </div>

              <div className="flex gap-2.5">
                <button className="flex-1 py-2.5 border border-auth-border rounded-lg text-sm font-semibold cursor-pointer flex items-center justify-center gap-2 transition-all hover:border-gray-400 bg-auth-white text-auth-text font-outfit">
                  <svg width="16" height="16" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Google
                </button>
                <button className="flex-1 py-2.5 border border-auth-border rounded-lg text-sm font-semibold cursor-pointer flex items-center justify-center gap-2 transition-all hover:border-gray-400 bg-auth-white text-auth-text font-outfit">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  GitHub
                </button>
              </div>
            </div>

            {/* Right teal panel */}
            <div className="w-[310px] flex-shrink-0 bg-auth-teal flex flex-col items-center justify-between p-[28px_40px] text-center">
              <div className="flex flex-col items-center flex-1 justify-center gap-2.5">
                <div className="relative mb-1.5 w-20 h-20 rounded-[16px] bg-white flex items-center justify-center">
                  <div className="w-16 h-16 rounded-[12px] bg-gradient-to-br from-gray-300 to-gray-600 flex items-center justify-center">
                    <UserIcon size={32} color="#fff" strokeWidth={1.8} />
                  </div>
                  <div className="absolute bottom-1.5 right-1.5 w-3 h-3 rounded-full bg-green-500 border-2 border-auth-teal"></div>
                </div>
                <p className="text-xs font-bold text-white/70 tracking-[1.5px] uppercase mb-2">Member Area</p>
                <h2 className="text-[21px] font-extrabold text-white mb-2.5 leading-[1.25]">Already a member?</h2>
                <p className="text-[13px] text-white/78 leading-[1.65] mb-5">
                  Welcome back! Sign in to continue your journey and access your personalized dashboard.
                </p>
                <button 
                  onClick={() => setAuthMode('login')}
                  className="px-0 py-2.5 border-2 border-white bg-transparent rounded-lg text-sm font-bold cursor-pointer transition-all hover:bg-white hover:text-auth-teal w-full font-outfit"
                >
                  Sign In Now
                </button>
              </div>
              <div className="flex items-center gap-2.5 mt-auto pt-5">
                <div className="flex">
                  <div className="w-[26px] h-[26px] rounded-full border-2 flex items-center justify-center text-xs font-bold text-white border-auth-teal bg-gradient-to-br from-orange-500 to-red-800">G</div>
                  <div className="w-[26px] h-[26px] rounded-full border-2 flex items-center justify-center text-xs font-bold text-white border-auth-teal -ml-2 bg-gradient-to-br from-blue-500 to-blue-900">M</div>
                  <div className="w-[26px] h-[26px] rounded-full border-2 flex items-center justify-center text-xs font-bold text-white border-auth-teal -ml-2 bg-gradient-to-br from-green-600 to-green-900">N</div>
                </div>
                <span className="text-xs font-bold text-white/72 tracking-[.8px] uppercase">Joined 12K+ Users</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
