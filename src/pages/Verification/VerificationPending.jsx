import React from 'react';
import { Link } from 'react-router-dom';
import { FiClock, FiShield, FiCheck } from 'react-icons/fi';
import logo from '../../assets/logo 2.svg';

const VerificationPending = () => {
  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-4 font-epilogue">
      <div className="bg-primary w-full max-w-[550px] rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-10 md:p-16 border border-gray-100 text-center">
        
        {/* Brand Logo */}
        <div className="mb-12">
          <img src={logo} alt="RentFriend" className="h-10 mx-auto" />
        </div>

        {/* Animated Icon Logic */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 bg-accent/20 rounded-full animate-ping"></div>
          <div className="relative w-24 h-24 bg-accent rounded-full flex items-center justify-center text-txt shadow-lg">
            <FiClock size={40} />
          </div>
        </div>

        {/* Headline & Body - Using your Typography System */}
        <h1 className="type-h2 text-txt mb-4 tracking-tight">Verification Pending</h1>
        <p className="type-p text-paragraph mb-10 leading-relaxed">
          We’ve received your NID documents. Our team is currently reviewing your identity to ensure a safe community. 
          <span className="block mt-4 font-black text-txt uppercase text-[10px] tracking-widest bg-secondary py-2 px-4 rounded-full inline-block">
            Estimated time: 24 Hours
          </span>
        </p>

        {/* Step Breakdown matching your Workflow */}
        <div className="space-y-4 mb-12 text-left bg-secondary/50 p-6 rounded-3xl border border-gray-50">
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white">
              <FiCheck size={14} />
            </div>
            <p className="type-small font-bold text-txt uppercase tracking-wider">Account Created</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-txt animate-pulse">
              <FiShield size={14} />
            </div>
            <p className="type-small font-bold text-txt uppercase tracking-wider">Identity Review in Progress</p>
          </div>
        </div>

        {/* Action Button */}
        <Link 
          to="/" 
          className="block w-full bg-txt text-primary type-p font-bold py-5 rounded-[20px] hover:bg-black transition-all uppercase tracking-widest"
        >
          Back to Website
        </Link>

        <p className="mt-8 type-small text-paragraph font-bold uppercase tracking-widest opacity-60">
          Need help? <span className="text-accent cursor-pointer hover:underline">Contact Support</span>
        </p>
      </div>
    </div>
  );
};

export default VerificationPending;