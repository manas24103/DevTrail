import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, Lock, Mail, User as UserIcon, Eye, EyeOff, Users, Shield } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuthMode } from '../contexts/AuthModeContext';
import { useAuth } from '../contexts/AuthContext';

export default function AuthPage() {
  const { authMode, setAuthMode } = useAuthMode();
  const { currentUser, loading: authLoading, login, register, loginWithGoogle, loginWithGitHub } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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

  const processedCodeRef = useRef(null);

  // Centralized redirect based on currentUser and handles state
  useEffect(() => {
    if (!authLoading && currentUser) {
      const hasLeetcode = currentUser.handles?.leetcode && currentUser.handles.leetcode.trim() !== '';
      const hasCodeforces = currentUser.handles?.codeforces && currentUser.handles.codeforces.trim() !== '';
      if (!hasLeetcode && !hasCodeforces) {
        navigate('/platform-setup');
      } else {
        navigate('/dashboard');
      }
    }
  }, [currentUser, authLoading, navigate]);

  // Listen to Google and GitHub code parameters in URL callback
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    if (code && processedCodeRef.current !== code) {
      processedCodeRef.current = code;
      window.history.replaceState({}, document.title, window.location.pathname);
      const handleCallback = async () => {
        setLoading(true);
        setError('');
        try {
          let result;
          const [provider, mode] = state ? state.split('_') : [null, null];

          if (provider === 'google') {
            const redirectUri = window.location.origin + '/auth';
            result = await loginWithGoogle(code, redirectUri, mode);
          } else if (provider === 'github') {
            result = await loginWithGitHub(code, mode);
          } else {
            throw new Error('Unknown or invalid authentication provider state');
          }

          if (result.success) {
            const user = result.user;
            const hasLeetcode = user?.handles?.leetcode && user.handles.leetcode.trim() !== '';
            const hasCodeforces = user?.handles?.codeforces && user.handles.codeforces.trim() !== '';
            if (!hasLeetcode && !hasCodeforces) {
              navigate('/platform-setup');
            } else {
              navigate('/dashboard');
            }
          } else {
            setError(result.error || 'Authentication failed.');
          }
        } catch (err) {
          setError(err.message || 'Failed to authenticate.');
        } finally {
          setLoading(false);
        }
      };
      handleCallback();
    }
  }, [location.search, navigate, loginWithGoogle, loginWithGitHub]);

  const handleGoogleLogin = async () => {
    setError('');
    const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

    if (!googleClientId) {
      setError('Google Client ID is not loaded. Please restart your frontend development server.');
      return;
    }
    const redirectUri = window.location.origin + '/auth';
    const mode = isLogin ? 'signin' : 'signup';
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=openid%20email%20profile&state=google_${mode}`;
  };

  const handleGitHubLogin = async () => {
    setError('');
    const githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;

    if (!githubClientId) {
      setError('GitHub Client ID is not loaded. Please restart your frontend development server.');
      return;
    }
    const redirectUri = window.location.origin + '/auth';
    const mode = isLogin ? 'signin' : 'signup';
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=user:email&state=github_${mode}`;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const result = await login(loginData.email, loginData.password);
      if (result.success) {
        const user = result.user;
        const hasLeetcode = user?.handles?.leetcode && user.handles.leetcode.trim() !== '';
        const hasCodeforces = user?.handles?.codeforces && user.handles.codeforces.trim() !== '';
        if (!hasLeetcode && !hasCodeforces) {
          navigate('/platform-setup');
        } else {
          navigate('/dashboard');
        }
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
        const user = result.user;
        const hasLeetcode = user?.handles?.leetcode && user.handles.leetcode.trim() !== '';
        const hasCodeforces = user?.handles?.codeforces && user.handles.codeforces.trim() !== '';
        if (!hasLeetcode && !hasCodeforces) {
          navigate('/platform-setup');
        } else {
          navigate('/dashboard');
        }
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
    <div className="min-h-screen bg-white font-jakarta flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 bg-[#FAFAFA]">
        {isLogin ? (
          /* ==================== LOGIN ==================== */
          <div className="flex w-full max-w-[820px] rounded-none border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white overflow-hidden animate-scale-in">
            {/* Left pink panel */}
            <div className="hidden md:flex w-[290px] flex-shrink-0 bg-[#FF3366] border-r-[3px] border-black flex flex-col items-center justify-center p-8 text-center gap-5 relative">
              <div className="w-[72px] h-[72px] rounded-md border-2 border-black bg-white flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <Users size={34} color="black" strokeWidth={2.5} />
              </div>
              <h2 className="text-2xl font-black text-white font-outfit uppercase">New Here?</h2>
              <p className="text-xs font-semibold text-white leading-relaxed uppercase">
                Sign up and discover a world of possibilities with our advanced analytics platform.
              </p>
              <button
                onClick={() => { setAuthMode('signup'); setError(''); }}
                className="px-9 py-2.5 border-2 border-black bg-white text-black font-black text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all uppercase"
              >
                Sign up
              </button>
            </div>

            {/* Login Form */}
            <div className="flex-1 p-8 sm:p-9 flex flex-col justify-center bg-white">
              <h2 className="text-3xl font-black text-black mb-1.5 font-outfit uppercase">Welcome Back</h2>
              <p className="text-xs font-semibold text-gray-500 mb-6 uppercase">
                Please enter your details to sign in to your account.
              </p>

              {error && (
                <div className="mb-4 p-3 border-2 border-black bg-[#FFE0E6] text-black text-xs font-black uppercase" role="alert">{error}</div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="login-email" className="block text-xs font-black text-black uppercase mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={16} />
                    <input
                      id="login-email"
                      type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      placeholder="name@company.com"
                      required
                      className="w-full px-3 py-2.5 pl-9 brutal-input text-xs"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="login-password" className="text-xs font-black text-black uppercase">Password</label>
                    <a href="/" className="text-xs font-black text-[#FF3366] hover:underline uppercase">Forgot password?</a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={16} />
                    <input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      placeholder="••••••••"
                      required
                      className="w-full px-3 py-2.5 pl-9 pr-10 brutal-input text-xs tracking-[2px]"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-black" aria-label="Toggle password visibility">
                      {showPassword ? <EyeOff size={16} strokeWidth={2.5} /> : <Eye size={16} strokeWidth={2.5} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-black text-black uppercase">
                  <input type="checkbox" id="remember" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="w-4 h-4 border-2 border-black accent-[#FF3366] cursor-pointer rounded-none" />
                  <label htmlFor="remember" className="cursor-pointer">Remember me for 30 days</label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 border-2 border-black bg-[#FF3366] text-white font-black text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all uppercase"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-black rounded-full animate-spin mx-auto" />
                  ) : (
                    <span className="flex items-center justify-center gap-2">Sign In <ArrowRight size={15} strokeWidth={3} /></span>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-[2px] bg-black"></div>
                <span className="text-[10px] font-black text-black whitespace-nowrap">OR CONTINUE WITH</span>
                <div className="flex-1 h-[2px] bg-black"></div>
              </div>

              {/* Social */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="flex-1 py-2.5 border-2 border-black bg-white text-black font-black text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-2 uppercase"
                >
                  <GoogleIcon /> Google
                </button>
                <button
                  type="button"
                  onClick={handleGitHubLogin}
                  className="flex-1 py-2.5 border-2 border-black bg-white text-black font-black text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-2 uppercase"
                >
                  <GitHubIcon /> Github
                </button>
              </div>

              {/* Mobile signup link */}
              <p className="md:hidden text-center text-xs font-black text-black mt-6 uppercase">
                Don't have an account?{' '}
                <button onClick={() => { setAuthMode('signup'); setError(''); }} className="font-bold text-[#FF3366] hover:underline">Sign up</button>
              </p>
            </div>
          </div>
        ) : (
          /* ==================== REGISTER ==================== */
          <div className="flex w-full max-w-[820px] rounded-none border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white overflow-hidden animate-scale-in">
            {/* Register Form */}
            <div className="flex-1 p-8 sm:p-9 flex flex-col justify-center bg-white">
              <h2 className="text-3xl font-black text-black mb-1.5 font-outfit uppercase">Create an account</h2>
              <p className="text-xs font-semibold text-gray-500 mb-6 uppercase">
                Join over 10,000+ professionals managing their workflows with our enterprise platform.
              </p>

              {error && (
                <div className="mb-4 p-3 border-2 border-black bg-[#FFE0E6] text-black text-xs font-black uppercase" role="alert">{error}</div>
              )}

              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label htmlFor="register-name" className="block text-xs font-black text-black uppercase mb-1.5">Full Name</label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={16} />
                    <input
                      id="register-name"
                      type="text"
                      value={registerData.name}
                      onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                      placeholder="Jonathan Doe"
                      required
                      className="w-full px-3 py-2.5 pl-9 brutal-input text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="register-email" className="block text-xs font-black text-black uppercase mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={16} />
                    <input
                      id="register-email"
                      type="email"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      placeholder="name@company.com"
                      required
                      className="w-full px-3 py-2.5 pl-9 brutal-input text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="register-password" className="block text-xs font-black text-black uppercase mb-1.5">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={16} />
                    <input
                      id="register-password"
                      type="password"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      placeholder="••••••••"
                      required
                      className="w-full px-3 py-2.5 pl-9 brutal-input text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="register-confirm-password" className="block text-xs font-black text-black uppercase mb-1.5">Confirm Password</label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={16} />
                    <input
                      id="register-confirm-password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      placeholder="••••••••"
                      required
                      className="w-full px-3 py-2.5 pl-9 pr-10 brutal-input text-xs"
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-black" aria-label="Toggle password visibility">
                      {showConfirmPassword ? <EyeOff size={16} strokeWidth={2.5} /> : <Eye size={16} strokeWidth={2.5} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-xs font-black text-black uppercase leading-relaxed">
                  <input type="checkbox" id="agree" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} className="w-4 h-4 border-2 border-black accent-[#FF3366] cursor-pointer rounded-none mt-0.5" />
                  <label htmlFor="agree" className="cursor-pointer">
                    I agree to the <a href="/terms" className="underline text-[#FF3366] font-black">Terms of Service</a> and <a href="/privacy" className="underline text-[#FF3366] font-black">Privacy Policy</a>.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 border-2 border-black bg-[#FF3366] text-white font-black text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all uppercase"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-black rounded-full animate-spin mx-auto" />
                  ) : (
                    <span className="flex items-center justify-center gap-2">Create Account <ArrowRight size={15} strokeWidth={3} /></span>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-[2px] bg-black"></div>
                <span className="text-[10px] font-black text-black whitespace-nowrap">OR REGISTER WITH</span>
                <div className="flex-1 h-[2px] bg-black"></div>
              </div>

              {/* Social */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="flex-1 py-2.5 border-2 border-black bg-white text-black font-black text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-2 uppercase"
                >
                  <GoogleIcon /> Google
                </button>
                <button
                  type="button"
                  onClick={handleGitHubLogin}
                  className="flex-1 py-2.5 border-2 border-black bg-white text-black font-black text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-2 uppercase"
                >
                  <GitHubIcon /> GitHub
                </button>
              </div>

              {/* Mobile login link */}
              <p className="md:hidden text-center text-xs font-black text-black mt-6 uppercase">
                Already have an account?{' '}
                <button onClick={() => { setAuthMode('login'); setError(''); }} className="font-bold text-[#FF3366] hover:underline">Sign in</button>
              </p>
            </div>

            {/* Right pink panel */}
            <div className="hidden md:flex w-[310px] flex-shrink-0 bg-[#FF3366] border-l-[3px] border-black flex-col items-center justify-between p-8 text-center relative">
              <div className="flex flex-col items-center flex-1 justify-center gap-3">
                <div className="w-20 h-20 rounded-md border-2 border-black bg-white flex items-center justify-center mb-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  <div className="w-16 h-16 rounded-md bg-[#FFD700] border border-black flex items-center justify-center">
                    <UserIcon size={32} color="black" strokeWidth={2.5} />
                  </div>
                </div>
                <p className="text-[10px] font-black text-white tracking-widest uppercase">Member Area</p>
                <h2 className="text-xl font-extrabold text-white leading-tight font-outfit uppercase">Already a member?</h2>
                <p className="text-xs font-semibold text-white leading-relaxed uppercase">
                  Welcome back! Sign in to continue your journey and access your dashboard.
                </p>
                <button
                  onClick={() => { setAuthMode('login'); setError(''); }}
                  className="w-full mt-3 py-2.5 border-2 border-black bg-white text-black font-black text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all uppercase"
                >
                  Sign In Now
                </button>
              </div>
              <div className="flex items-center gap-2.5 mt-6">
                <div className="flex">
                  <div className="w-7 h-7 border-2 border-black bg-[#FFD700] flex items-center justify-center text-[9px] font-black text-black">G</div>
                  <div className="w-7 h-7 border-2 border-black bg-[#E0F2FE] flex items-center justify-center text-[9px] font-black text-black -ml-1">M</div>
                  <div className="w-7 h-7 border-2 border-black bg-white flex items-center justify-center text-[9px] font-black text-black -ml-1">N</div>
                </div>
                <span className="text-[9px] font-black text-white uppercase tracking-wider">Joined 12K+ Users</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
