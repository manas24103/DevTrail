import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                  DT
                </div>
                <span className="ml-3 text-xl font-semibold text-gray-900">DevTrail</span>
              </div>
              <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a href="#features" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Features
                </a>
                <a href="#how-it-works" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  How it works
                </a>
                <a href="#why" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Why DevTrail
                </a>
              </nav>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
              <Link to="/login" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200">
                Sign in
              </Link>
              <Link to="/register" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                Get started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Track Your</span>
              <span className="block text-blue-600">Coding Journey</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Connect with platforms like <span className="font-semibold text-blue-600">LeetCode</span> and{' '}
              <span className="font-semibold text-blue-600">Codeforces</span> to track your progress, 
              analyze your performance, and improve your coding skills.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link
                  to="/register"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                >
                  Get Started for Free
                </Link>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Link
                  to="/login"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">What DevTrail does for you</h2>
              <p className="mt-4 text-lg text-gray-500">
                Think of DevTrail as your personal analytics dashboard for coding practice.
              </p>
            </div>

            <div className="mt-10">
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {/* Feature 1 */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Unified Stats</h3>
                  <p className="text-gray-500">
                    Pulls your data from LeetCode and Codeforces into one clean dashboard – problems solved,
                    difficulty breakdown, tags, and more.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Real-time Insights</h3>
                  <p className="text-gray-500">
                    See how your contest rating, streaks, and daily practice are improving with
                    real-time graphs and timelines.
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Weak Area Detection</h3>
                  <p className="text-gray-500">
                    Automatically identifies weak topics (like DP, graphs, greedy) so you know exactly
                    what to focus on next.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section id="how-it-works" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">How it works</h2>
              <p className="mt-4 text-lg text-gray-500">
                Get started in under a minute.
              </p>
            </div>

            <div className="mt-10">
              <div className="relative">
                <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-3 lg:gap-8 lg:items-center">
                  <div className="lg:col-start-1 space-y-8">
                    {/* Step 1 */}
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                      <div className="flex items-center">
                        <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-500 text-white font-bold text-lg">1</div>
                        <h3 className="ml-4 text-lg font-medium text-gray-900">Create / Login to DevTrail</h3>
                      </div>
                      <p className="mt-2 text-gray-500">
                        Click on the login button and sign in using your email to create your DevTrail account.
                      </p>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                      <div className="flex items-center">
                        <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-500 text-white font-bold text-lg">2</div>
                        <h3 className="ml-4 text-lg font-medium text-gray-900">Connect Coding Profiles</h3>
                      </div>
                      <p className="mt-2 text-gray-500">
                        Add your LeetCode and Codeforces handles. DevTrail securely fetches your public stats.
                      </p>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                      <div className="flex items-center">
                        <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-500 text-white font-bold text-lg">3</div>
                        <h3 className="ml-4 text-lg font-medium text-gray-900">View Live Dashboard</h3>
                      </div>
                      <p className="mt-2 text-gray-500">
                        Get a personalised dashboard with charts, streaks, topic analysis, and progress over time.
                      </p>
                    </div>
                  </div>

                  <div className="mt-10 lg:mt-0 lg:col-start-2 lg:col-span-2">
                    <div className="bg-gray-50 p-6 rounded-lg shadow-inner border border-gray-200">
                      <div className="aspect-w-16 aspect-h-9 rounded-md overflow-hidden">
                        <div className="w-full h-64 bg-gradient-to-br from-blue-50 to-blue-100 rounded-md flex items-center justify-center">
                          <div className="text-center p-6">
                            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
                              <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Dashboard Preview</h3>
                            <p className="text-gray-500 text-sm">
                              Your personalized coding analytics will appear here once you connect your accounts.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why DevTrail Section */}
        <section id="why" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Why DevTrail?</h2>
              <p className="mt-4 text-lg text-gray-500">
                Designed for students preparing for internships, placements, and competitive programming.
              </p>
            </div>

            <div className="mt-10">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-100 rounded-md p-2">
                      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="ml-3 text-lg font-medium text-gray-900">Save time, stay consistent</h3>
                  </div>
                  <p className="mt-2 text-gray-500">
                    No need to manually track problems in Excel or Notion. DevTrail keeps your history,
                    streaks, and growth updated automatically.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-100 rounded-md p-2">
                      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M12 18h.01" />
                      </svg>
                    </div>
                    <h3 className="ml-3 text-lg font-medium text-gray-900">Interview-ready preparation</h3>
                  </div>
                  <p className="mt-2 text-gray-500">
                    Focus on the right topics, see where you're weak, and show your consistent progress
                    when talking to recruiters or mentors.
                  </p>
                </div>
              </div>

              <div className="mt-10 text-center">
                <h3 className="text-lg font-medium text-gray-900">Ready to improve your coding skills?</h3>
                <p className="mt-2 text-gray-500 max-w-2xl mx-auto">
                  Join thousands of developers who use DevTrail to track their coding journey and land their dream jobs.
                </p>
                <div className="mt-6">
                  <Link
                    to="/register"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Get Started for Free
                  </Link>
                  <p className="mt-3 text-sm text-gray-500">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8 xl:col-span-1">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                  DT
                </div>
                <span className="ml-3 text-xl font-semibold text-gray-900">DevTrail</span>
              </div>
              <p className="text-gray-500 text-base">
                Your personal analytics dashboard for coding practice and interview preparation.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Product</h3>
                  <ul className="mt-4 space-y-4">
                    <li><a href="#features" className="text-base text-gray-500 hover:text-gray-900">Features</a></li>
                    <li><a href="#how-it-works" className="text-base text-gray-500 hover:text-gray-900">How It Works</a></li>
                    <li><a href="#why" className="text-base text-gray-500 hover:text-gray-900">Why DevTrail</a></li>
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Support</h3>
                  <ul className="mt-4 space-y-4">
                    <li><Link to="/contact" className="text-base text-gray-500 hover:text-gray-900">Contact Us</Link></li>
                    <li><Link to="/privacy" className="text-base text-gray-500 hover:text-gray-900">Privacy Policy</Link></li>
                    <li><Link to="/terms" className="text-base text-gray-500 hover:text-gray-900">Terms of Service</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-200 pt-8">
            <p className="text-base text-gray-400 text-center">
              &copy; {new Date().getFullYear()} DevTrail. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;