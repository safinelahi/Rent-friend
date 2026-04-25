import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUploadCloud, FiCheckCircle, FiShield, FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const RenterVerification = () => {
  const navigate = useNavigate();
  const [nidFront, setNidFront] = useState(null);
  const [nidBack, setNidBack] = useState(null);

  return (
    <div className="min-h-screen bg-[#F8F8F7] pt-24 pb-20 font-epilogue text-[#111]">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate('/signup')}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-paragraph hover:text-accent transition-all mb-12"
        >
          <FiArrowLeft size={16} /> Back to Sign Up
        </button>

        <div className="max-w-3xl">
          <p className="text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-4">Secure Verification</p>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-16">ID Setup.</h1>

          <div className="grid md:grid-cols-2 gap-8">
            <label className={`aspect-square rounded-[50px] border-2 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer ${nidFront ? 'border-accent bg-accent/5' : 'border-gray-100 hover:border-accent bg-white shadow-sm'}`}>
              <input type="file" className="hidden" onChange={(e) => setNidFront(e.target.files[0])} accept="image/*" />
              {nidFront ? <FiCheckCircle size={50} className="text-accent" /> : <><FiUploadCloud size={40} className="text-gray-200 mb-4" /><span className="text-[10px] font-black uppercase tracking-[0.2em]">NID Front Side</span></>}
            </label>

            <label className={`aspect-square rounded-[50px] border-2 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer ${nidBack ? 'border-accent bg-accent/5' : 'border-gray-100 hover:border-accent bg-white shadow-sm'}`}>
              <input type="file" className="hidden" onChange={(e) => setNidBack(e.target.files[0])} accept="image/*" />
              {nidBack ? <FiCheckCircle size={50} className="text-accent" /> : <><FiUploadCloud size={40} className="text-gray-200 mb-4" /><span className="text-[10px] font-black uppercase tracking-[0.2em]">NID Back Side</span></>}
            </label>
          </div>

          <div className="mt-12 p-10 bg-[#111] text-white rounded-[50px] flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
               <FiShield size={40} className="text-accent" />
               <p className="text-xs font-bold opacity-60 uppercase tracking-widest max-w-[200px]">Your data is encrypted and kept private.</p>
            </div>
            <button 
              onClick={() => navigate('/verification-pending')}
              disabled={!nidFront || !nidBack}
              className={`px-12 py-6 rounded-[24px] font-black uppercase tracking-[0.3em] text-[10px] transition-all ${nidFront && nidBack ? 'bg-accent text-txt shadow-2xl hover:-translate-y-1' : 'bg-white/10 text-white/20 cursor-not-allowed'}`}
            >
              Finish Setup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenterVerification;