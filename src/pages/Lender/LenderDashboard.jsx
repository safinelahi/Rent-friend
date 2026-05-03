import React, { useState, useEffect } from 'react';
import { FiZap, FiBox, FiDollarSign, FiActivity, FiArrowUpRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const LenderDashboard = () => {
  // --- STATE MANAGEMENT ---
  // These stats will be populated by the backend API later.
  // Initialized with 0 to maintain UI stability before data fetch.
  const [stats, setStats] = useState({
    totalEarnings: 0,
    activeSessions: 0,
    totalAssets: 0,
    pendingRequests: 0
  });

  /* 
    BACKEND SYNC LOGIC: 
    Fetch lender-specific analytics on component mount.
    The backend should calculate these based on the lender's unique ID.
    API Endpoint Proposal: GET /api/lender/stats
  */
  useEffect(() => {
    // Backend developer will implement the fetch call here.
    // Recommended: Use axios or native fetch with auth headers.
  }, []);

  const statCards = [
    { label: "Total Revenue", value: `৳${stats.totalEarnings}`, icon: <FiDollarSign />, color: "text-green-500" },
    { label: "Active Sessions", value: stats.activeSessions, icon: <FiActivity />, color: "text-accent" },
    { label: "Managed Assets", value: stats.totalAssets, icon: <FiBox />, color: "text-blue-500" },
    { label: "Pending Requests", value: stats.pendingRequests, icon: <FiZap />, color: "text-orange-500" },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFC] p-6 md:p-12 lg:p-16 font-epilogue text-[#111]">
      <div className="max-w-[1440px] mx-auto">
        
        {/* --- EDITORIAL HEADER --- */}
        <header className="mb-16">
          <div className="flex items-center gap-3 text-accent mb-6">
            <FiZap size={14} className="animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em]">Lender Protocol</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none mb-6">
            Command <br /> <span className="text-paragraph/20">Center.</span>
          </h1>
          <p className="text-paragraph/40 text-[11px] font-black uppercase tracking-[0.2em]">
            System status: <span className="text-green-500 uppercase">Operational</span>
          </p>
        </header>

        {/* --- STATISTICS GRID --- 
            Links to Flowchart: Payment (Escrow) & Payout steps.
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statCards.map((card, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -5 }}
              className="bg-white border border-gray-50 p-8 rounded-[32px] shadow-[0_30px_80px_rgba(0,0,0,0.02)]"
            >
              <div className={`w-12 h-12 rounded-2xl bg-[#F8F8F7] flex items-center justify-center mb-6 text-xl ${card.color}`}>
                {card.icon}
              </div>
              <p className="text-[9px] font-black text-paragraph/30 uppercase tracking-[0.3em] mb-2">{card.label}</p>
              <h3 className="text-3xl font-black tracking-tighter">{card.value}</h3>
            </motion.div>
          ))}
        </div>

        {/* --- NAVIGATION HUB --- 
            Links to Flowchart: Create Listing & Handover Protocols.
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Link to Inventory Management (Lender Side) */}
          <Link to="/lender/my-listings" className="bg-[#111] text-white p-10 rounded-[40px] flex flex-col justify-between group relative overflow-hidden h-[300px]">
             <FiBox className="absolute -right-10 -bottom-10 text-white/5" size={250} />
             <div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-4">Inventory Hub</h3>
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest leading-loose max-w-[250px]">
                  Manage your listed assets, update pricing, and audit condition reports.
                </p>
             </div>
             <div className="flex items-center gap-3 text-accent text-[10px] font-black uppercase tracking-[0.3em]">
                Enter Hub <FiArrowUpRight />
             </div>
          </Link>

          {/* Link to Booking Management (Lender Side) */}
          <Link to="/lender/bookings" className="bg-white border border-gray-100 p-10 rounded-[40px] flex flex-col justify-between group h-[300px] shadow-sm hover:border-accent transition-all">
             <div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-4 text-txt">Booking Manager</h3>
                <p className="text-paragraph/40 text-[10px] font-bold uppercase tracking-widest leading-loose max-w-[250px]">
                  Respond to incoming rental requests and track handover protocols.
                </p>
             </div>
             <div className="flex items-center gap-3 text-accent text-[10px] font-black uppercase tracking-[0.3em]">
                View Requests <FiArrowUpRight />
             </div>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default LenderDashboard;