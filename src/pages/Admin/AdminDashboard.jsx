import React, { useState, useEffect } from 'react';
import { FiUsers, FiShield, FiCreditCard, FiAlertCircle, FiTrendingUp } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  // --- STATE MANAGEMENT ---
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingVerifications: 0,
    activeRentals: 0,
    platformRevenue: 0
  });

  /* 
    BACKEND SYNC: 
    Fetch global platform statistics.
    API Endpoint: GET /api/admin/stats
  */
  useEffect(() => {
    // API logic to be implemented by backend developer
  }, []);

  const adminStats = [
    { label: "Total Community", value: stats.totalUsers, icon: <FiUsers />, color: "text-blue-500" },
    { label: "Pending Approvals", value: stats.pendingVerifications, icon: <FiShield />, color: "text-orange-500" },
    { label: "Ongoing Sessions", value: stats.activeRentals, icon: <FiTrendingUp />, color: "text-accent" },
    { label: "Platform Earnings", value: `৳${stats.platformRevenue}`, icon: <FiCreditCard />, color: "text-green-500" },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFC] p-6 md:p-12 lg:p-16 font-epilogue text-[#111]">
      <div className="max-w-[1440px] mx-auto">
        
        {/* --- ADMIN HEADER --- */}
        <header className="mb-16">
          <p className="text-accent text-[10px] font-black uppercase tracking-[0.5em] mb-4">System Authority</p>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none mb-6">
            Admin <br /> <span className="text-paragraph/20">Control.</span>
          </h1>
        </header>

        {/* --- GLOBAL STATS GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {adminStats.map((stat, idx) => (
            <motion.div 
              key={idx}
              className="bg-white border border-gray-50 p-8 rounded-[32px] shadow-sm hover:shadow-xl transition-all"
            >
              <div className={`w-12 h-12 rounded-2xl bg-[#F8F8F7] flex items-center justify-center mb-6 text-xl ${stat.color}`}>
                {stat.icon}
              </div>
              <p className="text-[9px] font-black text-paragraph/30 uppercase tracking-[0.3em] mb-2">{stat.label}</p>
              <h3 className="text-3xl font-black tracking-tighter italic">{stat.value}</h3>
            </motion.div>
          ))}
        </div>

        {/* --- ADMINISTRATIVE PROTOCOLS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link to="/admin/verifications" className="bg-[#111] text-white p-10 rounded-[40px] flex flex-col justify-between h-[250px] relative overflow-hidden group">
             <FiShield className="absolute -right-5 -bottom-5 text-white/5 group-hover:scale-110 transition-transform" size={150} />
             <h3 className="text-2xl font-black uppercase tracking-tight italic">Identity Verification</h3>
             <p className="text-accent text-[10px] font-black uppercase tracking-widest">Review NID Submissions</p>
          </Link>

          <Link to="/admin/returns" className="bg-white border border-gray-100 p-10 rounded-[40px] flex flex-col justify-between h-[250px] group shadow-sm">
             <h3 className="text-2xl font-black uppercase tracking-tight italic text-txt">Return Audit</h3>
             <p className="text-paragraph/40 text-[10px] font-black uppercase tracking-widest">Verify Item Condition</p>
          </Link>

          <Link to="/admin/payouts" className="bg-white border border-gray-100 p-10 rounded-[40px] flex flex-col justify-between h-[250px] group shadow-sm">
             <h3 className="text-2xl font-black uppercase tracking-tight italic text-txt">Payout Queue</h3>
             <p className="text-paragraph/40 text-[10px] font-black uppercase tracking-widest">Process Financial Payouts</p>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;