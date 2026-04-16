import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiUploadCloud, FiCamera, FiShield, FiUserCheck, FiArrowRight, FiArrowLeft, FiFileText } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const LenderVerification = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 2; // Reduced to 2 steps

  // State for file uploads
  const [nidFront, setNidFront] = useState(null);
  const [nidBack, setNidBack] = useState(null);

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps + 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  // --- STEP 1: ID UPLOAD ---
  const Step1 = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: -20 }} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-black text-txt mb-2">Government ID Verification</h2>
        <p className="type-p text-paragraph">Upload a high-quality photo of your National ID or Passport.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Front Side Upload */}
        <label className={`
          border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center transition-all cursor-pointer
          ${nidFront ? 'border-green-500 bg-green-50/30' : 'border-gray-200 hover:border-accent bg-secondary/30'}
        `}>
          <input 
            type="file" 
            className="hidden" 
            onChange={(e) => setNidFront(e.target.files[0])} 
            accept="image/*" 
          />
          {nidFront ? (
            <>
              <FiCheckCircle size={40} className="text-green-500 mb-4" />
              <p className="text-xs font-bold text-txt truncate max-w-full px-4">{nidFront.name}</p>
            </>
          ) : (
            <>
              <FiUploadCloud size={40} className="text-gray-400 mb-4" />
              <p className="type-small font-bold text-txt">Front Side</p>
              <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-widest">Tap to upload</p>
            </>
          )}
        </label>

        {/* Back Side Upload */}
        <label className={`
          border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center transition-all cursor-pointer
          ${nidBack ? 'border-green-500 bg-green-50/30' : 'border-gray-200 hover:border-accent bg-secondary/30'}
        `}>
          <input 
            type="file" 
            className="hidden" 
            onChange={(e) => setNidBack(e.target.files[0])} 
            accept="image/*" 
          />
          {nidBack ? (
            <>
              <FiCheckCircle size={40} className="text-green-500 mb-4" />
              <p className="text-xs font-bold text-txt truncate max-w-full px-4">{nidBack.name}</p>
            </>
          ) : (
            <>
              <FiUploadCloud size={40} className="text-gray-400 mb-4" />
              <p className="type-small font-bold text-txt">Back Side</p>
              <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-widest">Tap to upload</p>
            </>
          )}
        </label>
      </div>

      <div className="bg-blue-50/50 p-5 rounded-2xl flex gap-4 items-center border border-blue-100">
        <FiShield className="text-blue-600 shrink-0" size={24} />
        <p className="text-xs text-blue-800 leading-relaxed font-medium">
          Your documents are encrypted. Only authorized staff can view them for identity validation.
        </p>
      </div>
    </motion.div>
  );

  // --- STEP 2: LIVENESS CHECK ---
  const Step2 = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-black text-txt mb-2">Liveness Check</h2>
        <p className="type-p text-paragraph">Hold your ID next to your face so we can verify the person is you.</p>
      </div>

      <div className="max-w-[260px] mx-auto aspect-square bg-secondary rounded-full border-8 border-white shadow-xl flex flex-col items-center justify-center overflow-hidden relative group outline outline-1 outline-gray-100">
        <FiCamera size={48} className="text-gray-300 group-hover:text-accent transition-colors" />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button className="bg-accent text-txt font-black px-6 py-2 rounded-lg text-xs shadow-lg">Start Scan</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex flex-col items-center text-center p-4 bg-white rounded-2xl border border-gray-50 shadow-sm">
           <FiCheckCircle className="text-green-500 mb-2" />
           <p className="text-[10px] font-bold text-txt">Well Lit Area</p>
        </div>
        <div className="flex flex-col items-center text-center p-4 bg-white rounded-2xl border border-gray-50 shadow-sm">
           <FiCheckCircle className="text-green-500 mb-2" />
           <p className="text-[10px] font-bold text-txt">Direct Glance</p>
        </div>
        <div className="flex flex-col items-center text-center p-4 bg-white rounded-2xl border border-gray-50 shadow-sm">
           <FiCheckCircle className="text-green-500 mb-2" />
           <p className="text-[10px] font-bold text-txt">ID in Frame</p>
        </div>
      </div>
    </motion.div>
  );

  // --- FINAL SUCCESS STATE ---
  const SuccessState = () => (
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-12">
      <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
        <FiUserCheck size={48} />
      </div>
      <h2 className="text-3xl font-black text-txt mb-4">Application Submitted</h2>
      <p className="type-p text-paragraph mb-10 max-w-sm mx-auto leading-relaxed font-medium">
        Our verification team is now reviewing your documents. You'll be notified via email within 24 hours.
      </p>
      <Link to="/" className="inline-flex items-center gap-2 bg-accent px-10 py-5 rounded-2xl font-black shadow-lg hover:shadow-accent/20 transition-all hover:-translate-y-1">
        Go to Dashboard <FiArrowRight />
      </Link>
    </motion.div>
  );

  return (
    <div className="w-full bg-[#FDFDFC] min-h-screen py-16 md:py-24">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        
        <div className="max-w-2xl mx-auto bg-white rounded-[48px] border border-gray-100 p-8 md:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.04)]">
          
          {step <= totalSteps && (
            <>
              {/* UPDATED 2-STEP PROGRESS BAR */}
              <div className="flex items-center justify-center gap-4 mb-16">
                {[1, 2].map((s) => (
                  <div key={s} className="flex items-center">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all duration-500 ${step >= s ? 'bg-accent text-txt shadow-lg shadow-accent/20' : 'bg-secondary text-gray-300'}`}>
                      {step > s ? <FiCheckCircle size={20} /> : `0${s}`}
                    </div>
                    {s < totalSteps && (
                      <div className={`w-12 h-1 mx-2 rounded-full transition-all duration-500 ${step > s ? 'bg-accent' : 'bg-secondary'}`} />
                    )}
                  </div>
                ))}
              </div>

              {/* STEP CONTENT */}
              <AnimatePresence mode="wait">
                {step === 1 && <Step1 key="s1" />}
                {step === 2 && <Step2 key="s2" />}
              </AnimatePresence>

              {/* NAVIGATION BUTTONS */}
              <div className="flex items-center justify-between mt-16 pt-8 border-t border-gray-100">
                <button 
                  onClick={prevStep} 
                  disabled={step === 1}
                  className={`flex items-center gap-2 font-black text-xs uppercase tracking-widest transition-all ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-paragraph hover:text-txt'}`}
                >
                  <FiArrowLeft /> Back
                </button>
                <button 
                  onClick={nextStep} 
                  disabled={step === 1 && (!nidFront || !nidBack)} // Safety: Prevent continue if no files
                  className={`flex items-center gap-2 bg-accent px-10 py-4 rounded-2xl font-black shadow-md transition-all hover:scale-105 active:scale-95 ${step === 1 && (!nidFront || !nidBack) ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {step === totalSteps ? 'Finalize Verification' : 'Continue'} <FiArrowRight />
                </button>
              </div>
            </>
          )}

          {step > totalSteps && <SuccessState />}

        </div>
      </div>
    </div>
  );
};

export default LenderVerification;