import React, { useEffect } from "react";
import {
  FaMoneyBillWave,
  FaRegCalendarAlt,
  FaSignInAlt,
  FaList,
  FaChartPie,
  FaQuoteLeft,
  FaArrowRight
} from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { FaFilter } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HeroSection = () => {
  const user = useSelector((state) => state?.auth?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="overflow-hidden bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-teal-900 via-teal-700 to-blue-900 text-white pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="relative max-w-7xl mx-auto flex flex-col items-center text-center z-10">
          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-lg">
            Master Your Finances <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-blue-300">
              Effortlessly
            </span>
          </h1>

          {/* Subheading */}
          <p className="mt-4 text-xl md:text-2xl text-teal-100 max-w-3xl mb-10 font-light drop-shadow-md">
            Take full control of your money with our beautiful, modern, and intuitive expense tracking platform.
          </p>

          {/* Call to Action Button */}
          <Link to="/register">
            <button className="group mt-8 px-8 py-4 bg-white text-teal-800 font-bold rounded-full shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] hover:scale-105 hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 text-lg">
              Start Your Journey <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>

          {/* Feature Icons - Glassmorphism */}
          <div className="flex flex-wrap justify-center gap-6 mt-20 sm:space-x-8">
            <div className="flex flex-col items-center bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2 cursor-pointer shadow-xl">
              <div className="bg-teal-400/20 p-4 rounded-xl text-teal-300 mb-4">
                <FaMoneyBillWave className="text-3xl" />
              </div>
              <p className="font-medium text-lg">Smart Tracking</p>
            </div>
            <div className="flex flex-col items-center bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2 cursor-pointer shadow-xl">
              <div className="bg-blue-400/20 p-4 rounded-xl text-blue-300 mb-4">
                <FaFilter className="text-3xl" />
              </div>
              <p className="font-medium text-lg">Advanced Filters</p>
            </div>
            <div className="flex flex-col items-center bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2 cursor-pointer shadow-xl">
              <div className="bg-purple-400/20 p-4 rounded-xl text-purple-300 mb-4">
                <IoIosStats className="text-3xl" />
              </div>
              <p className="font-medium text-lg">Visual Insights</p>
            </div>
          </div>
        </div>

        {/* Wavy bottom divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
          <svg className="relative block w-full h-12 md:h-24" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,123.15,187.5,107.51,232.09,95.27,276.53,74.55,321.39,56.44Z" fill="#f9fafb"></path>
          </svg>
        </div>
      </div>

      {/* How it works Section */}
      <div className="py-24 px-4 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 drop-shadow-sm">
            Simplify Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">Financial Life</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-16">
            Our platform is designed to be intuitive and powerful. Here's how you can get started in seconds.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-teal-200 via-blue-200 to-purple-200 z-0"></div>

            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center group">
              <div className="w-24 h-24 rounded-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-all duration-300 group-hover:shadow-[0_20px_40px_rgba(20,184,166,0.2)]">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white">
                  <FaSignInAlt className="text-2xl" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">1. Create Account</h3>
              <p className="text-gray-600 leading-relaxed max-w-xs text-center">
                Sign up securely in less than a minute. Your data is encrypted and private.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center group">
              <div className="w-24 h-24 rounded-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-all duration-300 group-hover:shadow-[0_20px_40px_rgba(59,130,246,0.2)]">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white">
                  <FaList className="text-2xl" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">2. Log Transactions</h3>
              <p className="text-gray-600 leading-relaxed max-w-xs text-center">
                Easily categorize your income and expenses as they happen.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center group">
              <div className="w-24 h-24 rounded-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-all duration-300 group-hover:shadow-[0_20px_40px_rgba(168,85,247,0.2)]">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white">
                  <FaChartPie className="text-2xl" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">3. Gain Insights</h3>
              <p className="text-gray-600 leading-relaxed max-w-xs text-center">
                Discover spending patterns with beautiful, interactive charts.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 px-4 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white z-0"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-teal-100/40 to-blue-100/40 rounded-full blur-3xl z-0"></div>

        <div className="relative max-w-5xl mx-auto bg-gradient-to-r from-teal-900 to-blue-900 rounded-3xl overflow-hidden shadow-2xl z-10 transform transition-all duration-500 hover:scale-[1.01]">
          {/* Inner decor */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>

          <div className="px-8 py-16 md:px-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
                Ready to transform your financial future?
              </h2>
              <p className="text-teal-100 text-lg mb-0 font-light leading-relaxed">
                Join thousands of users who have already taken control of their money. It's free, secure, and incredibly easy to use.
              </p>
            </div>

            <div className="flex-shrink-0">
              <Link to="/register">
                <button className="px-10 py-5 bg-white text-teal-800 text-lg font-bold rounded-full shadow-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:-translate-y-1 transition-all duration-300">
                  Create Free Account
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

