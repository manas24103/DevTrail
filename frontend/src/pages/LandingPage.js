import { useNavigate } from 'react-router-dom';
import { ArrowRight, Users, Star, TrendingUp, Calendar, Activity } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function LandingPage() {
const navigate = useNavigate();

return (
  <div className="min-h-screen bg-gray-50 font-sans">
    <Header />

    {/* HERO */}
    <section className="px-6 py-16 bg-[#E7FBF6]">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold mb-6 bg-[#f7fffd] text-[#71f5d4]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E7FBF6]"></span>
            Trusted by 50,000+ Software Engineers
          </div>

          <h1 className="text-5xl font-extrabold leading-tight mb-4 text-gray-900">
            Track, Analyze & <br />
            <span className="text-[#71f5d4]">Improve</span> <br />
            Your Coding Journey
          </h1>

          <p className="text-gray-600 mb-6 max-w-md">
            Devtrail is the all-in-one performance engine for developers. 
            Sync your platforms and visualize your growth.
          </p>

          <div className="flex gap-3 mb-6">
            <button className="bg-teal-600 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-teal-700">
              Explore Discussion Page
              <ArrowRight size={14} />
            </button>

            <button className="border px-5 py-2.5 rounded-lg bg-white">
              Track Profile
            </button>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="bg-white rounded-2xl shadow-lg border p-5">
          <div className="h-28 bg-gray-100 rounded-lg mb-4"></div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500">Problems</p>
              <p className="font-bold text-lg">847</p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500">Rank</p>
              <p className="font-bold text-lg">Top 5%</p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500">Streak</p>
              <p className="font-bold text-lg">34d</p>
            </div>
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-2">
        Powerful Insights for Engineers
      </h2>
      <p className="text-gray-500">
        Everything in one unified dashboard.
      </p>
      </div>
      
    </section>

    {/* INSIGHTS */}

    {/* FEATURES */}
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-3xl font-bold text-center mb-10">
          All your coding data. One unified dashboard.
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          {/* BIG CARD */}
          <div className="md:col-span-2 bg-white border rounded-2xl p-6 shadow-sm">
            <TrendingUp className="text-teal-600 mb-3" />
            <h3 className="font-semibold mb-2">Unified Rating System</h3>
            <p className="text-sm text-gray-500 mb-4">
              Aggregate ratings from all platforms.
            </p>

            <div className="space-y-2">
              <div className="h-2 bg-gray-200 rounded">
                <div className="h-full w-[90%] bg-teal-600 rounded"></div>
              </div>
              <div className="h-2 bg-gray-200 rounded">
                <div className="h-full w-[70%] bg-blue-500 rounded"></div>
              </div>
            </div>
          </div>

          {/* SMALL CARD */}
          <div className="bg-white border rounded-2xl p-6 shadow-sm">
            <Calendar className="text-green-600 mb-3" />
            <h3 className="font-semibold mb-2">Event Tracker</h3>
            <p className="text-sm text-gray-500">
              Track coding contests easily.
            </p>
          </div>

          {/* CARD */}
          <div className="bg-gray-100 rounded-2xl p-6">
            <Users className="mb-3" />
            <h3 className="font-semibold mb-2">Collaborative Growth</h3>
            <button className="mt-3 bg-teal-600 text-white px-4 py-2 rounded-lg text-sm">
              Explore
            </button>
          </div>

          {/* BIG CARD */}
          <div className="md:col-span-2 bg-white border rounded-2xl p-6 shadow-sm">
            <Activity className="text-orange-500 mb-3" />
            <h3 className="font-semibold mb-2">Activity Rewinds</h3>
            <p className="text-sm text-gray-500">
              Monthly performance insights.
            </p>
          </div>

        </div>
      </div>
    </section>

    {/* HOW IT WORKS */}
    <section className="py-16 bg-[#E7FBF6] text-center">
      <h2 className="text-3xl font-bold mb-10">How It Works</h2>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {["Connect Profiles", "Analyze Data", "Track & Improve"].map((t, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow">
            <p className="font-semibold">{t}</p>
          </div>
        ))}
      </div>
    </section>

    {/* FAQ */}
    <section className="py-16 bg-white">
      <h2 className="text-3xl font-bold text-center mb-10">
        Frequently Asked Questions
      </h2>

      <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
        {["How to connect?", "Is data private?", "Score?", "Use for jobs?"].map((q, i) => (
          <div key={i} className="border rounded-xl p-5">
            <p className="font-semibold mb-2">{q}</p>
            <p className="text-sm text-gray-500">Answer goes here...</p>
          </div>
        ))}
      </div>
    </section>

    <Footer />
  </div>
);
}
