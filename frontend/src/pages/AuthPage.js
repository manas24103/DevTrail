import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Lock, Mail, User as UserIcon, Eye, EyeOff, Users, Shield } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuthMode } from '../contexts/AuthModeContext';
import { useAuth } from '../contexts/AuthContext';

export default function AuthPage() {
  const { authMode, setAuthMode } = useAuthMode();
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Login form state
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  // Register form state
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const isLogin = authMode === 'login';

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const result = await login(loginData.email, loginData.password);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!agreeTerms) {
      setError('Please agree to the Terms of Service.');
      return;
    }

    setLoading(true);
    try {
      const result = await register({
        name: registerData.name,
        email: registerData.email,
        password: registerData.password,
      });
      if (result.success) {
        navigate('/platform-setup');
      } else {
        setError(result.error || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const GoogleIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );

  const GitHubIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e6f8f3] via-[#f0fdfa] to-white font-jakarta flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        {isLogin ? (
          /* ==================== LOGIN ==================== */
          <div className="flex w-full max-w-[820px] rounded-[20px] overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.08)] bg-white">
            {/* Left teal panel */}
            <div className="hidden md:flex w-[290px] flex-shrink-0 bg-gradient-to-br from-teal-500 to-teal-600 flex-col items-center justify-center p-8 text-center gap-5">
              <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center bg-white/20">
                <Users size={34} color="#fff" strokeWidth={1.8} />
              </div>
              <h2 className="text-[22px] font-extrabold text-white leading-tight font-outfit">New Here?</h2>
              <p className="text-[13px] text-white/80 leading-relaxed">
                Sign up and discover a world of possibilities with our advanced analytics platform.
              </p>
              <button
                onClick={() => { setAuthMode('signup'); setError(''); }}
                className="px-9 py-2.5 border-2 border-white bg-transparent rounded-full text-sm font-bold text-white cursor-pointer transition-all hover:bg-white hover:text-teal-600 font-outfit"
              >
                Sign up
              </button>
            </div>

            {/* Login Form */}
            <div className="flex-1 p-8 sm:p-9 flex flex-col justify-center">
              <h2 className="text-[26px] font-extrabold text-gray-900 mb-1.5 font-outfit">Welcome Back</h2>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                Please enter your details to sign in to your account.
              </p>

              {error && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-semibold">{error}</div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      placeholder="name@company.com"
                      required
                      className="w-full px-3 py-2.5 pl-9 border-[1.5px] border-gray-200 rounded-[10px] text-[13.5px] text-gray-800 bg-white outline-none transition-all focus:border-teal-500 focus:shadow-[0_0_0_3px_rgba(13,148,136,0.12)]"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[13px] font-semibold text-gray-700">Password</label>
                    <a href="/" className="text-xs font-semibold text-teal-600 hover:underline">Forgot password?</a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      placeholder="••••••••"
                      required
                      className="w-full px-3 py-2.5 pl-9 pr-10 border-[1.5px] border-gray-200 rounded-[10px] text-[13.5px] text-gray-800 bg-white outline-none transition-all focus:border-teal-500 focus:shadow-[0_0_0_3px_rgba(13,148,136,0.12)] tracking-[2px]"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[13px] text-gray-500">
                  <input type="checkbox" id="remember" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="w-4 h-4 accent-teal-600 cursor-pointer rounded" />
                  <label htmlFor="remember" className="cursor-pointer">Remember me for 30 days</label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 bg-teal-600 text-white hover:bg-teal-700 transition-all disabled:opacity-50 glow-btn font-outfit"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Sign In <ArrowRight size={15} strokeWidth={2.5} /></>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-xs font-medium text-gray-400 whitespace-nowrap">OR CONTINUE WITH</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              {/* Social */}
              <div className="flex gap-2.5">
                <button className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:border-gray-300 transition-all bg-white text-gray-700">
                  <GoogleIcon /> Google
                </button>
                <button className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:border-gray-300 transition-all bg-white text-gray-700">
                  <GitHubIcon /> Github
                </button>
              </div>

              {/* Mobile signup link */}
              <p className="md:hidden text-center text-xs text-gray-400 mt-6">
                Don't have an account?{' '}
                <button onClick={() => { setAuthMode('signup'); setError(''); }} className="font-bold text-teal-600 hover:underline">Sign up</button>
              </p>
            </div>
          </div>
        ) : (
          /* ==================== REGISTER ==================== */
          <div className="flex w-full max-w-[820px] rounded-[20px] overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.08)] bg-white">
            {/* Register Form */}
            <div className="flex-1 p-8 sm:p-9 flex flex-col justify-center">
              <h2 className="text-[26px] font-extrabold text-gray-900 mb-1.5 font-outfit">Create an account</h2>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                Join over 10,000+ professionals managing their workflows with our enterprise platform.
              </p>

              {error && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-semibold">{error}</div>
              )}

              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">Full Name</label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      value={registerData.name}
                      onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                      placeholder="Jonathan Doe"
                      required
                      className="w-full px-3 py-2.5 pl-9 border-[1.5px] border-gray-200 rounded-[10px] text-[13.5px] text-gray-800 bg-white outline-none transition-all focus:border-teal-500 focus:shadow-[0_0_0_3px_rgba(13,148,136,0.12)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="email"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      placeholder="name@company.com"
                      required
                      className="w-full px-3 py-2.5 pl-9 border-[1.5px] border-gray-200 rounded-[10px] text-[13.5px] text-gray-800 bg-white outline-none transition-all focus:border-teal-500 focus:shadow-[0_0_0_3px_rgba(13,148,136,0.12)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="password"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      placeholder="••••••••"
                      required
                      className="w-full px-3 py-2.5 pl-9 border-[1.5px] border-gray-200 rounded-[10px] text-[13.5px] text-gray-800 bg-white outline-none transition-all focus:border-teal-500 focus:shadow-[0_0_0_3px_rgba(13,148,136,0.12)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">Confirm Password</label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      placeholder="••••••••"
                      required
                      className="w-full px-3 py-2.5 pl-9 pr-10 border-[1.5px] border-gray-200 rounded-[10px] text-[13.5px] text-gray-800 bg-white outline-none transition-all focus:border-teal-500 focus:shadow-[0_0_0_3px_rgba(13,148,136,0.12)]"
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-[13px] text-gray-500">
                  <input type="checkbox" id="agree" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} className="w-4 h-4 accent-teal-600 cursor-pointer rounded mt-0.5" />
                  <label htmlFor="agree" className="cursor-pointer leading-relaxed">
                    I agree to the <a href="/terms" className="font-semibold text-teal-600 hover:underline">Terms of Service</a> and <a href="/privacy" className="font-semibold text-teal-600 hover:underline">Privacy Policy</a>.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 bg-teal-600 text-white hover:bg-teal-700 transition-all disabled:opacity-50 glow-btn font-outfit"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Create Account <ArrowRight size={15} strokeWidth={2.5} /></>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-xs font-medium text-gray-400 whitespace-nowrap">OR REGISTER WITH</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              {/* Social */}
              <div className="flex gap-2.5">
                <button className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:border-gray-300 transition-all bg-white text-gray-700">
                  <GoogleIcon /> Google
                </button>
                <button className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:border-gray-300 transition-all bg-white text-gray-700">
                  <GitHubIcon /> GitHub
                </button>
              </div>

              {/* Mobile login link */}
              <p className="md:hidden text-center text-xs text-gray-400 mt-6">
                Already have an account?{' '}
                <button onClick={() => { setAuthMode('login'); setError(''); }} className="font-bold text-teal-600 hover:underline">Sign in</button>
              </p>
            </div>

            {/* Right teal panel */}
            <div className="hidden md:flex w-[310px] flex-shrink-0 bg-gradient-to-br from-teal-500 to-teal-600 flex-col items-center justify-between p-8 text-center">
              <div className="flex flex-col items-center flex-1 justify-center gap-3">
                <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center mb-2">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gray-300 to-gray-600 flex items-center justify-center">
                    <UserIcon size={32} color="#fff" strokeWidth={1.8} />
                  </div>
                </div>
                <p className="text-xs font-bold text-white/70 tracking-[1.5px] uppercase">Member Area</p>
                <h2 className="text-xl font-extrabold text-white leading-tight font-outfit">Already a member?</h2>
                <p className="text-[13px] text-white/80 leading-relaxed">
                  Welcome back! Sign in to continue your journey and access your personalized dashboard.
                </p>
                <button
                  onClick={() => { setAuthMode('login'); setError(''); }}
                  className="w-full mt-3 py-2.5 border-2 border-white bg-transparent rounded-lg text-sm font-bold text-white cursor-pointer transition-all hover:bg-white hover:text-teal-600 font-outfit"
                >
                  Sign In Now
                </button>
              </div>
              <div className="flex items-center gap-2.5 mt-6">
                <div className="flex">
                  <div className="w-7 h-7 rounded-full border-2 border-teal-500 bg-gradient-to-br from-orange-500 to-red-800 flex items-center justify-center text-[9px] font-bold text-white">G</div>
                  <div className="w-7 h-7 rounded-full border-2 border-teal-500 bg-gradient-to-br from-blue-500 to-blue-900 flex items-center justify-center text-[9px] font-bold text-white -ml-2">M</div>
                  <div className="w-7 h-7 rounded-full border-2 border-teal-500 bg-gradient-to-br from-green-600 to-green-900 flex items-center justify-center text-[9px] font-bold text-white -ml-2">N</div>
                </div>
                <span className="text-xs font-bold text-white/70 tracking-wider uppercase">Joined 12K+ Users</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
