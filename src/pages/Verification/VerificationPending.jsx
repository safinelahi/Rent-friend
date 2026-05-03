import React from 'react';
import { Link } from 'react-router-dom';
import { FiClock, FiShield, FiCheck, FiZap, FiLock } from 'react-icons/fi';
import logo from '../../assets/logo 2.svg';
import { motion } from 'framer-motion';

const VerificationPending = () => {
  return (
    <div className="min-h-screen bg-[#FDFDFC] flex flex-col items-center justify-center px-4 sm:px-6 font-epilogue text-[#111] overflow-x-hidden">
      
      {/* --- TOP BRANDING --- */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 sm:mb-12"
      >
        <Link to="/">
          <img src={logo} alt="RentFriend Studio" className="h-8 sm:h-10 mx-auto" />
        </Link>
      </motion.div>

      {/* --- MAIN STATUS CARD --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white w-full max-w-[580px] rounded-[32px] sm:rounded-[48px] shadow-[0_40px_100px_rgba(0,0,0,0.03)] p-8 sm:p-14 md:p-16 border border-gray-100 text-center relative overflow-hidden"
      >
        {/* Decorative BG Icon */}
        <FiLock className="absolute -right-8 -top-8 text-gray-50/50 pointer-events-none" size={180} />

        <div className="relative z-10">
          {/* Animated Status Icon */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-8">
            <div className="absolute inset-0 bg-accent/20 rounded-full animate-ping"></div>
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-accent rounded-[32px] flex items-center justify-center text-txt shadow-xl shadow-accent/20">
              <FiClock size={36} className="sm:size-[40px]" />
            </div>
          </div>

          {/* Editorial Header */}
          <div className="bg-accent/10 text-accent px-4 py-1.5 rounded-full border border-accent/10 inline-flex items-center gap-2 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] mb-6">
             <FiZap size={12}/> Analysis Protocol
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter leading-[1.1] mb-6">
            Audit <br /> Session.
          </h1>
          
          <p className="text-[13px] sm:text-sm font-medium text-paragraph/60 leading-relaxed uppercase tracking-widest mb-10 px-2 sm:px-4">
            WE HAVE RECEIVED YOUR IDENTITY ASSETS. OUR COMPLIANCE TEAM IS CONDUCTING A MANDATORY AUDIT FOR COMMUNITY SAFETY.
          </p>

          {/* Time Badge */}
          <div className="inline-block bg-[#F8F8F7] py-3 px-6 rounded-full border border-gray-50 mb-12">
            <p className="text-[9px] sm:text-[10px] font-black text-txt uppercase tracking-[0.2em]">
               Estimated Audit: <span className="text-accent">24 Hours</span>
            </p>
          </div>

          {/* Protocol Tracker */}
          <div className="space-y-4 mb-12 text-left bg-[#F8F8F7] p-6 sm:p-8 rounded-[28px] border border-gray-50">
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center text-white shadow-lg shadow-green-500/20">
                <FiCheck size={14} />
              </div>
              <p className="text-[10px] font-black text-txt uppercase tracking-widest">Profile Initialized</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 bg-accent rounded-lg flex items-center justify-center text-txt animate-pulse shadow-lg shadow-accent/20">
                <FiShield size={14} />
              </div>
              <p className="text-[10px] font-black text-txt uppercase tracking-widest">Compliance Review in Progress</p>
            </div>
          </div>

          {/* Action Button */}
          <Link 
            to="/" 
            className="block w-full bg-[#111] text-white py-5 sm:py-6 rounded-[24px] font-black uppercase tracking-[0.3em] text-[10px] sm:text-[11px] shadow-2xl hover:bg-black transition-all active:scale-95 mb-8"
          >
            Back to Studio
          </Link>

          <p className="text-[9px] sm:text-[10px] font-black text-paragraph/40 uppercase tracking-[0.3em]">
            Need assistance? <span className="text-accent cursor-pointer hover:underline">Contact Support</span>
          </p>
        </div>
      </motion.div>

      {/* --- BOTTOM FOOTER INFO --- */}
      <p className="mt-10 text-[9px] font-black text-paragraph/30 uppercase tracking-[0.4em]">
         RentFriend AES-256 Protected Session
      </p>
    </div>
  );
};

export default VerificationPending;