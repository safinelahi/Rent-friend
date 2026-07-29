import React from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiMail, FiZap, FiShield } from "react-icons/fi";
import logo from "../../assets/logo 2.svg";
import { motion } from "framer-motion";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen bg-[#FDFDFC] flex flex-col items-center justify-center px-4 sm:px-6 font-epilogue text-[#111] overflow-x-hidden">
      
      {/* --- BACKGROUND ACCENT (Subtle) --- */}
      <div className="fixed top-0 left-0 w-full h-1 bg-accent/20" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[540px]"
      >
        {/* --- LOGO --- */}
        <div className="flex justify-center mb-10 sm:mb-12">
          <Link to="/" className="group transition-transform hover:scale-105">
            <img
              src={logo}
              alt="RentFriend Studio"
              className="h-8 sm:h-10"
            />
          </Link>
        </div>

        {/* --- MAIN CARD --- */}
        <div className="bg-white p-8 sm:p-12 md:p-16 rounded-[32px] sm:rounded-[48px] shadow-[0_40px_100px_rgba(0,0,0,0.03)] border border-gray-100 relative overflow-hidden">
          
          {/* Subtle Shield Icon in BG */}
          <FiShield className="absolute -right-6 -top-6 text-gray-50/50 pointer-events-none" size={150} />

          <div className="relative z-10">
            {/* Page Badge */}
            <div className="bg-accent/10 text-accent px-4 py-1.5 rounded-full border border-accent/10 inline-flex items-center gap-2 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] mb-6 sm:mb-8">
               <FiZap size={12}/> Password Reset
            </div>

            {/* Headings */}
            <h1 className="text-4xl sm:text-5xl font-black tracking-tighter leading-[1.1] mb-4">
              Reset <br /> Password.
            </h1>
            <p className="text-paragraph text-[13px] sm:text-sm font-medium leading-relaxed mb-10 opacity-60 uppercase tracking-widest">
              Enter your registered email to receive a password reset link.
            </p>

            {/* Form */}
            <form className="flex flex-col gap-8">
              <div className="space-y-3">
                <label
                  htmlFor="email"
                  className="block text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-paragraph/50 ml-1"
                >
                  Email Address
                </label>
                <div className="relative group">
                  <FiMail className="absolute left-5 top-1/2 -translate-y-1/2 text-paragraph/30 group-focus-within:text-accent transition-colors" size={18} />
                  <input
                    type="email"
                    id="email"
                    placeholder="studio@member.com"
                    className="w-full h-14 sm:h-16 bg-[#F8F8F7] border border-transparent rounded-[20px] pl-14 pr-6 text-xs sm:text-sm font-bold outline-none focus:bg-white focus:border-accent shadow-sm transition-all"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#111] text-white py-5 sm:py-6 rounded-[24px] font-black uppercase tracking-[0.3em] text-[10px] sm:text-[11px] shadow-2xl shadow-black/20 hover:bg-black hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                Send Reset Link
              </button>
            </form>

            <div className="mt-12 pt-8 border-t border-gray-50 text-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-paragraph/40 hover:text-txt font-black uppercase tracking-[0.2em] text-[10px] transition-all group"
              >
                <FiArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back to Login</span>
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-[9px] font-black text-paragraph/30 uppercase tracking-[0.3em]">
           Rent Friend
        </p>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;