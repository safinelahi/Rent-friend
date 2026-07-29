import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext'; 
import { FiMessageSquare, FiExternalLink, FiPackage, FiZap, FiShield, FiClock } from 'react-icons/fi';
import { motion } from 'framer-motion';

const MyRentals = () => {
  const { myRentals } = useContext(AppContext);

  return (
    <div className="font-epilogue text-[#111] overflow-x-hidden">
      
      {/* --- EDITORIAL HEADER --- */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 sm:mb-12 gap-6 px-1">
        <div>
          <div className="bg-accent/10 text-accent px-4 py-1.5 rounded-full border border-accent/10 inline-flex items-center gap-2 text-[9px] sm:text-[10px] font-black uppercase tracking-widest mb-4">
            <FiZap size={12}/> Active Rentals
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tighter leading-none">My Rentals.</h2>
          <p className="text-[10px] sm:text-[11px] font-bold text-paragraph/40 mt-3 uppercase tracking-widest leading-relaxed">
            TRACKING YOUR ACTIVE RENTALS AND SCHEDULES.
          </p>
        </div>
        
        {/* Total Spent Summary Card */}
        <div className="w-full sm:w-auto bg-white border border-gray-100 p-6 rounded-[28px] shadow-sm text-left sm:text-right relative overflow-hidden group">
          <FiZap className="absolute -right-4 -top-4 text-accent/5 group-hover:text-accent/10 transition-all" size={80} />
          <p className="text-[9px] font-black text-paragraph/30 uppercase tracking-widest mb-1 relative z-10">Total Invested</p>
          <p className="text-2xl sm:text-3xl font-black tracking-tighter relative z-10 text-txt">
            ৳{myRentals.reduce((acc, item) => acc + (item.price * 3), 0).toLocaleString()}
          </p>
        </div>
      </header>

      <div className="space-y-6 sm:space-y-8">
        {myRentals && myRentals.length > 0 ? (
          myRentals.map((item, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col lg:flex-row bg-white rounded-[32px] sm:rounded-[48px] border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all group"
            >
              
              {/* ASSET IMAGE */}
              <div className="w-full lg:w-80 h-56 sm:h-64 lg:h-auto overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>

              {/* CONTENT AREA */}
              <div className="p-6 sm:p-10 flex-1 flex flex-col justify-between">
                <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                  <div className="space-y-4 flex-1">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <span className="bg-[#F8F8F7] text-txt text-[9px] font-black uppercase px-3 py-1.5 rounded-full tracking-widest border border-gray-100 italic">
                        {item.category || 'Gear'}
                      </span>
                      <span className="text-[10px] font-black text-paragraph/20 uppercase tracking-widest">#{item.bookingId}</span>
                    </div>
                    
                    <h3 className="text-2xl sm:text-3xl font-black tracking-tighter text-txt leading-tight uppercase">
                      {item.title}
                    </h3>
                    
                    {/* Status Grid */}
                    <div className="grid grid-cols-2 gap-6 sm:gap-10 pt-4">
                      <div>
                        <p className="text-[9px] font-black text-paragraph/30 uppercase tracking-widest mb-1 flex items-center gap-2"><FiClock className="text-accent" /> Timeline</p>
                        <p className="text-xs sm:text-sm font-black text-txt uppercase">3 Days Remaining</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-paragraph/30 uppercase tracking-widest mb-1 flex items-center gap-2"><FiShield className="text-accent" /> Logistics</p>
                        <p className="text-xs sm:text-sm font-black text-txt uppercase">Rajshahi Hub</p>
                      </div>
                    </div>
                  </div>

                  {/* Pricing / Security Sidebar (Mobile Friendly) */}
                  <div className="w-full md:w-auto bg-[#F8F8F7] p-6 rounded-[24px] border border-gray-50 text-left md:text-right">
                    <p className="text-[9px] font-black text-paragraph/30 uppercase tracking-widest mb-1">Security Deposit</p>
                    <p className="text-xl sm:text-2xl font-black text-txt tracking-tighter">৳{(item.price * 2).toLocaleString()}</p>
                    <p className="text-[9px] font-bold text-green-600 uppercase mt-1 tracking-widest">Active Hold</p>
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-10">
                  <button className="flex-1 sm:flex-none flex items-center justify-center gap-3 bg-[#111] text-white text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] px-8 py-4 sm:py-5 rounded-[18px] sm:rounded-[24px] hover:bg-black transition-all active:scale-95 shadow-xl shadow-black/10">
                    <FiMessageSquare className="text-accent" /> Contact Lender
                  </button>
                  <button className="flex-1 sm:flex-none flex items-center justify-center gap-3 border border-gray-100 bg-white text-paragraph text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] px-8 py-4 sm:py-5 rounded-[18px] sm:rounded-[24px] hover:bg-[#F8F8F7] transition-all active:scale-95 shadow-sm">
                    View Receipt <FiExternalLink />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          /* --- EMPTY STATE --- */
          <div className="py-20 sm:py-32 bg-[#F8F8F7]/50 rounded-[32px] sm:rounded-[60px] border-2 border-dashed border-gray-100 flex flex-col items-center text-center px-6">
            <div className="w-20 h-20 bg-white rounded-[24px] flex items-center justify-center shadow-sm mb-8 border border-gray-50">
              <FiPackage className="text-accent/20" size={32} />
            </div>
            <h4 className="text-2xl sm:text-3xl font-black tracking-tighter mb-3 uppercase">No Rentals.</h4>
            <p className="text-xs sm:text-sm font-medium text-paragraph/40 max-w-xs mb-10 uppercase tracking-widest leading-relaxed">
              Your booked items will appear here.
            </p>
            <button 
              onClick={() => window.location.href='/browse'} 
              className="bg-accent text-txt text-[10px] font-black uppercase tracking-[0.3em] px-10 py-5 rounded-[20px] shadow-2xl shadow-accent/20 hover:-translate-y-1 transition-all active:scale-95"
            >
              Browse Items
            </button>
          </div>
        )}
      </div>

      {/* Security Footer Hint */}
      <div className="mt-16 text-center">
        <p className="text-[9px] font-black text-paragraph/20 uppercase tracking-[0.4em]">
           Rent Friend Dashboard
        </p>
      </div>
    </div>
  );
};

export default MyRentals;