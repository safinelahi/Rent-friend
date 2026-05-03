import React, { useState, useEffect } from 'react';
import { FiDollarSign, FiArrowUpRight, FiClock, FiCheckCircle, FiZap, FiDownload } from 'react-icons/fi';
import { motion } from 'framer-motion';

const LenderEarnings = () => {
  // --- STATE MANAGEMENT ---
  // Placeholder data for financial analytics
  const [earningsData, setEarningsData] = useState({
    totalBalance: 0,
    withdrawable: 0,
    history: []
  });

  /* 
    BACKEND SYNC: 
    Fetch the lender's financial summary and transaction logs.
    API Endpoint Proposal: GET /api/lender/earnings
    The backend must calculate net income after platform fee deductions.
  */
  useEffect(() => {
    // API logic will be implemented here by the backend developer
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFC] pt-32 pb-20 px-6 md:px-12 lg:px-16 font-epilogue text-[#111]">
      <div className="max-w-[1440px] mx-auto">
        
        {/* --- DYNAMIC HEADER --- */}
        <header className="mb-16">
          <div className="flex items-center gap-3 text-accent mb-6">
            <FiZap size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.5em]">Financial Protocol</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none">
            Payout <br /> <span className="text-paragraph/20">Protocol.</span>
          </h2>
        </header>

        {/* --- BALANCE OVERVIEW --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2 bg-[#111] text-white p-10 rounded-[48px] flex flex-col justify-between relative overflow-hidden">
             <FiDollarSign className="absolute -right-10 -bottom-10 text-white/5" size={300} />
             <div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-4">Withdrawable Balance</p>
                <h3 className="text-5xl md:text-7xl font-black tracking-tighter italic">৳{earningsData.withdrawable}</h3>
             </div>
             <div className="mt-12 flex flex-wrap gap-4">
                <button className="px-10 py-5 bg-white text-[#111] rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-accent transition-all active:scale-95">
                  Request Payout
                </button>
                <button className="px-10 py-5 bg-white/10 text-white border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/20 transition-all">
                  Withdrawal Settings
                </button>
             </div>
          </div>

          <div className="bg-white border border-gray-100 p-10 rounded-[48px] shadow-sm flex flex-col justify-center">
             <p className="text-[10px] font-black text-paragraph/30 uppercase tracking-[0.4em] mb-4">Total Revenue</p>
             <h3 className="text-4xl font-black tracking-tighter mb-4 text-txt">৳{earningsData.totalBalance}</h3>
             <p className="text-paragraph/40 text-[9px] font-bold uppercase tracking-widest leading-loose">
               Total income generated after platform fee deduction.
             </p>
          </div>
        </div>

        {/* --- TRANSACTION PROTOCOL LOGS --- */}
        <section>
          <div className="flex items-center justify-between mb-8 border-b border-gray-50 pb-6">
            <h4 className="text-[12px] font-black uppercase tracking-[0.3em]">Protocol Logs</h4>
            <button className="text-accent text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
              Export History <FiDownload />
            </button>
          </div>

          <div className="space-y-4">
            {/* Example Log Entry: Completed Rental */}
            <div className="bg-white border border-gray-50 p-6 md:p-8 rounded-[32px] flex flex-col md:flex-row items-center justify-between group hover:border-accent transition-all">
               <div className="flex items-center gap-6 mb-4 md:mb-0">
                  <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-2xl flex items-center justify-center">
                     <FiCheckCircle size={20} />
                  </div>
                  <div>
                     <h5 className="text-[11px] font-black uppercase tracking-widest text-txt group-hover:italic transition-all">Rental Settlement: DSLR Kit</h5>
                     <p className="text-[9px] font-bold text-paragraph/40 uppercase tracking-widest mt-1">Ref ID: TX-778291</p>
                  </div>
               </div>
               <div className="text-right">
                  <p className="text-sm font-black text-txt">+৳1,080</p>
                  <p className="text-[8px] font-black text-paragraph/20 uppercase tracking-widest mt-1">10% Fee Deducted</p>
               </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default LenderEarnings;