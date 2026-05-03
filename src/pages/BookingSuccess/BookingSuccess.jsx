import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FiCheck, FiArrowRight, FiUser, FiMapPin, 
  FiRotateCcw, FiHelpCircle, FiHome 
} from 'react-icons/fi';
import { motion } from 'framer-motion';

const BookingSuccess = () => {
  const location = useLocation();
  
  // Logic: Catch the dynamic ID from the checkout state
  const bookingId = location.state?.identifier || "#RF-4LBZYU";

  return (
    <div className="min-h-screen bg-[#FDFDFC] flex items-center justify-center p-4 sm:p-6 font-epilogue text-[#111]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="bg-white w-full max-w-[700px] rounded-[32px] sm:rounded-[48px] p-8 sm:p-12 md:p-16 text-center shadow-[0_40px_100px_rgba(0,0,0,0.02)] border border-gray-100"
      >
        {/* 1. SUCCESS ICON */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-xl shadow-accent/20">
          <FiCheck size={32} className="text-txt sm:text-4xl" />
        </div>

        {/* 2. HEADER */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter mb-4 leading-[1.1]">Booking Request Sent!</h1>
        <p className="text-paragraph text-[13px] sm:text-sm font-medium leading-relaxed mb-8 max-w-sm sm:max-w-md mx-auto opacity-70">
          Great news! Your request is on its way. The lender usually responds within a few hours.
        </p>

        {/* 3. BOOKING ID BADGE */}
        <div className="inline-block bg-[#F8F8F7] px-6 py-3 rounded-2xl border border-gray-100 mb-10 sm:mb-16">
          <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-paragraph/50 mb-1">Booking ID</p>
          <p className="text-base sm:text-lg font-black text-accent tracking-widest">{bookingId}</p>
        </div>

        {/* 4. SUPPORT BOX (DARK BENTO) */}
        <div className="bg-[#111] p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] text-white text-left mb-8 sm:mb-12 relative overflow-hidden group">
           <div className="relative z-10">
              <p className="text-accent text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] mb-2">24/7 Concierge</p>
              <p className="text-[11px] sm:text-xs font-medium text-white/50 mb-6 leading-relaxed max-w-[240px] sm:max-w-none">Questions? Our team is here to make sure everything goes perfectly.</p>
              <Link to="/contact" className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-white border-b-2 border-accent/30 pb-1 hover:border-accent hover:text-accent transition-all inline-block">
                Contact Support
              </Link>
           </div>
           <FiHelpCircle className="absolute -right-4 -bottom-4 text-white/5 group-hover:text-white/10 transition-colors" size={120} />
        </div>

        {/* 5. BUTTON ACTIONS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <Link to="/dashboard/rentals" className="flex items-center justify-center gap-3 bg-[#111] text-white py-5 rounded-2xl sm:rounded-[20px] font-black uppercase tracking-[0.2em] text-[10px] shadow-xl hover:bg-black transition-all order-1 sm:order-1">
            Go to Dashboard <FiArrowRight />
          </Link>
          <Link to="/" className="flex items-center justify-center gap-3 bg-white border border-gray-100 text-txt py-5 rounded-2xl sm:rounded-[20px] font-black uppercase tracking-[0.2em] text-[10px] hover:bg-[#F8F8F7] transition-all order-2 sm:order-2">
            <FiHome /> Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default BookingSuccess;