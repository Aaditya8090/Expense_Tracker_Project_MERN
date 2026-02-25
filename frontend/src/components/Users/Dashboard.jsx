import React from "react";
import { useSelector } from "react-redux";
import TransactionChart from "../Transactions/TransactionChart";
import TransactionLineChart from "../Transactions/TransactionLineChart";
import TransactionList from "../Transactions/TransactionList";

const Dashboard = () => {
  const user = useSelector((state) => state?.auth?.user);
  return (
    <div className="relative min-h-screen bg-gray-50 overflow-hidden">
      {/* Decorative Background Mesh */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-teal-200/30 mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200/30 mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-indigo-200/30 mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="text-center sm:text-left flex flex-col sm:flex-row justify-between items-center bg-white/60 backdrop-blur-lg rounded-2xl p-6 shadow-sm border border-white/50">
          <div>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-800 to-blue-800 tracking-tight">
              Dashboard Overview
            </h1>
            <p className="mt-2 text-sm font-medium text-gray-500">
              Welcome back {user?.username}! Here's what's happening with your finances today.
            </p>
          </div>
        </div>

        {/* Line Chart Section */}
        <div className="border-t-4 border-indigo-500 rounded-3xl bg-white/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border-x border-b border-gray-100 mb-8">
          <TransactionLineChart />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Chart Section */}
          <div className="lg:col-span-1 border-t-4 border-teal-500 rounded-3xl bg-white/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border-x border-b border-gray-100">
            <TransactionChart />
          </div>

          {/* List Section */}
          <div className="lg:col-span-2 border-t-4 border-blue-500 rounded-3xl bg-white/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border-x border-b border-gray-100">
            <TransactionList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
