import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiUploadCloud, FiCamera, FiShield, FiUserCheck, FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const LenderVerification = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps + 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  // --- SUB-COMPONENTS FOR STEPS ---
  
  const Step1 = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: -20 }} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="type-h3 text-txt mb-2">Government ID Verification</h2>
        <p className="type-p text-paragraph">Please upload a clear photo of your National ID, Passport, or Driving License.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center hover:border-accent transition-colors cursor-pointer bg-secondary/30">
          <FiUploadCloud size={40} className="text-gray-400 mb-4" />
          <p className="type-small font-bold text-txt">Front Side</p>
          <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB</p>
        </div>
        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center hover:border-accent transition-colors cursor-pointer bg-secondary/30">
          <FiUploadCloud size={40} className="text-gray-400 mb-4" />
          <p className="type-small font-bold text-txt">Back Side</p>
          <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB</p>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-xl flex gap-3 items-start">
        <FiShield className="text-blue-600 mt-1 shrink-0" size={20} />
        <p className="text-sm text-blue-800 leading-relaxed">
          Your ID information is encrypted and stored securely. We only use it to verify your identity for safety purposes.
        </p>
      </div>
    </motion.div>
  );

  const Step2 = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="type-h3 text-txt mb-2">Liveness Check</h2>
        <p className="type-p text-paragraph">We need to make sure you are really you. Please take a selfie holding your ID.</p>
      </div>

      <div className="max-w-xs mx-auto aspect-square bg-gray-100 rounded-full border-4 border-white shadow-lg flex flex-col items-center justify-center overflow-hidden relative group">
        <FiCamera size={48} className="text-gray-300 group-hover:text-accent transition-colors" />
        <button className="absolute bottom-0 w-full bg-accent/90 py-3 text-txt font-bold text-sm">Open Camera</button>
      </div>

      <ul className="space-y-3 type-small text-paragraph max-w-md mx-auto py-4">
        <li className="flex gap-2 items-center"><FiCheckCircle className="text-green-500" /> Face the camera directly</li>
        <li className="flex gap-2 items-center"><FiCheckCircle className="text-green-500" /> Ensure your ID is visible and not blurry</li>
        <li className="flex gap-2 items-center"><FiCheckCircle className="text-green-500" /> Use a well-lit environment</li>
      </ul>
    </motion.div>
  );

  const Step3 = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="type-h3 text-txt mb-2">Professional Profile</h2>
        <p className="type-p text-paragraph">Linking your professional social media increases trust by 80%.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="type-small font-medium text-txt">LinkedIn Profile URL (Optional)</label>
          <input type="text" placeholder="https://linkedin.com/in/username" className="w-full bg-secondary px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-accent outline-none" />
        </div>
        <div className="space-y-1.5">
          <label className="type-small font-medium text-txt">Personal Website / Portfolio (Optional)</label>
          <input type="text" placeholder="www.yourname.com" className="w-full bg-secondary px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-accent outline-none" />
        </div>
      </div>
    </motion.div>
  );

  const SuccessState = () => (
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-12">
      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <FiUserCheck size={40} />
      </div>
      <h2 className="type-h2 text-txt mb-4">Verification Submitted!</h2>
      <p className="type-p text-paragraph mb-8 max-w-md mx-auto">
        Our team will review your documents within 24-48 hours. You'll receive an email once you are authorized to list items.
      </p>
      <Link to="/" className="inline-flex items-center gap-2 bg-accent px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-all">
        Go to Homepage <FiArrowRight />
      </Link>
    </motion.div>
  );

  return (
    <div className="w-full bg-primary min-h-screen py-16 md:py-24">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        
        <div className="max-w-3xl mx-auto bg-white rounded-[32px] border border-gray-100 p-8 md:p-12 lg:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.03)]">
          
          {step <= totalSteps && (
            <>
              {/* PROGRESS BAR */}
              <div className="flex items-center justify-between mb-12 relative">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 z-0"></div>
                <div 
                  className="absolute top-1/2 left-0 h-1 bg-accent -translate-y-1/2 z-0 transition-all duration-500"
                  style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
                ></div>
                
                {[1, 2, 3].map((s) => (
                  <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center z-10 font-bold transition-all duration-300 ${step >= s ? 'bg-accent text-txt scale-110 shadow-md' : 'bg-white border-2 border-gray-100 text-gray-400'}`}>
                    {step > s ? <FiCheckCircle /> : s}
                  </div>
                ))}
              </div>

              {/* STEP CONTENT */}
              <AnimatePresence mode="wait">
                {step === 1 && <Step1 key="s1" />}
                {step === 2 && <Step2 key="s2" />}
                {step === 3 && <Step3 key="s3" />}
              </AnimatePresence>

              {/* NAVIGATION BUTTONS */}
              <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-100">
                <button 
                  onClick={prevStep} 
                  disabled={step === 1}
                  className={`flex items-center gap-2 font-bold px-6 py-3 rounded-xl transition-all ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-gray-400 hover:text-txt'}`}
                >
                  <FiArrowLeft /> Back
                </button>
                <button 
                  onClick={nextStep} 
                  className="flex items-center gap-2 bg-accent px-8 py-3 rounded-xl font-bold shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
                >
                  {step === totalSteps ? 'Submit Verification' : 'Continue'} <FiArrowRight />
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