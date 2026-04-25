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
  const bookingId = location.state?.identifier || "#RF-RF-4LBZYU";

  return (
    <div className="min-h-screen bg-[#F8F8F7] flex items-center justify-center p-6 font-epilogue text-[#111]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="bg-white w-full max-w-[700px] rounded-[32px] p-10 md:p-14 text-center shadow-[0_40px_100px_rgba(0,0,0,0.02)] border border-gray-50"
      >
        {/* 1. SUCCESS ICON */}
        <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-accent/20">
          <FiCheck size={40} className="text-txt" />
        </div>

        {/* 2. HEADER */}
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">Booking Request Sent!</h1>
        <p className="text-paragraph text-sm font-medium leading-relaxed mb-8 max-w-md mx-auto">
          Great news! Your request is on its way. The lender usually responds within a few hours.
        </p>

        {/* 3. BOOKING ID BADGE */}
        <div className="inline-block bg-[#F5F5F3] px-6 py-3 rounded-2xl border border-gray-100 mb-16">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-paragraph/50 mb-1">Booking ID</p>
          <p className="text-lg font-black text-accent">{bookingId}</p>
        </div>

        {/* 4. SUPPORT BOX */}
        <div className="bg-[#111] p-8 rounded-[24px] text-white text-left mb-12 relative overflow-hidden">
           <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-2">24/7 Concierge</p>
              <p className="text-xs font-medium text-white/60 mb-6 leading-relaxed">Questions? Our team is here to make sure everything goes perfectly.</p>
              <Link to="/contact" className="text-xs font-black uppercase tracking-widest text-white border-b-2 border-accent pb-1 hover:text-accent transition-all inline-block">Contact Support</Link>
           </div>
           <FiHelpCircle className="absolute -right-4 -bottom-4 text-white/5" size={120} />
        </div>

        {/* 5. BUTTON ACTIONS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link to="/dashboard/rentals" className="flex items-center justify-center gap-3 bg-[#111] text-white py-5 rounded-[20px] font-black uppercase tracking-[0.2em] text-[10px] shadow-xl hover:bg-black transition-all">
            Go to Dashboard <FiArrowRight />
          </Link>
          <Link to="/" className="flex items-center justify-center gap-3 bg-white border border-gray-100 text-txt py-5 rounded-[20px] font-black uppercase tracking-[0.2em] text-[10px] hover:bg-[#F5F5F3] transition-all">
            <FiHome /> Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default BookingSuccess;