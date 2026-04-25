import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiCheckCircle, FiUploadCloud, FiCamera, FiShield, 
  FiUserCheck, FiArrowRight, FiArrowLeft, FiLock 
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const LenderVerification = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [nidFront, setNidFront] = useState(null);
  const [nidBack, setNidBack] = useState(null);

  const totalSteps = 2;

  return (
    <div className="min-h-screen bg-[#F8F8F7] pt-24 pb-20 font-epilogue text-[#1A1A1A]">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Back Button (Always visible until success) */}
        {step <= totalSteps && (
          <button 
            onClick={() => navigate('/signup')}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-paragraph hover:text-accent transition-all mb-12"
          >
            <FiArrowLeft size={26} /> Back
          </button>
        )}

        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
           <div className="max-w-2xl">
              <p className="text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-4">Identity Verification</p>
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85]">Verify Profile.</h1>
           </div>
           {step <= totalSteps && (
             <div className="text-right">
                <p className="text-[10px] font-black text-paragraph uppercase tracking-widest mb-1">Step {step} of {totalSteps}</p>
                <div className="w-32 h-1.5 bg-gray-200 rounded-full overflow-hidden mt-2">
                   <div className="h-full bg-accent transition-all duration-500" style={{ width: `${(step/totalSteps)*100}%` }}></div>
                </div>
             </div>
           )}
        </div>

        <div className="max-w-4xl">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div key="step1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="grid md:grid-cols-12 gap-8">
                <div className="md:col-span-8 space-y-8">
                  <div className="bg-white p-10 md:p-14 rounded-[50px] border border-gray-100 shadow-sm">
                    <h2 className="text-3xl font-black tracking-tighter mb-8">NID Upload</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <label className={`aspect-square rounded-[40px] border-2 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer ${nidFront ? 'border-accent bg-accent/5' : 'border-gray-100 hover:border-accent bg-secondary/30'}`}>
                        <input type="file" className="hidden" onChange={(e) => setNidFront(e.target.files[0])} accept="image/*" />
                        {nidFront ? <FiCheckCircle size={40} className="text-accent" /> : <><FiUploadCloud size={32} className="text-gray-300 mb-4" /><p className="text-[10px] font-black uppercase tracking-widest text-paragraph">Front Side</p></>}
                      </label>
                      <label className={`aspect-square rounded-[40px] border-2 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer ${nidBack ? 'border-accent bg-accent/5' : 'border-gray-100 hover:border-accent bg-secondary/30'}`}>
                        <input type="file" className="hidden" onChange={(e) => setNidBack(e.target.files[0])} accept="image/*" />
                        {nidBack ? <FiCheckCircle size={40} className="text-accent" /> : <><FiUploadCloud size={32} className="text-gray-300 mb-4" /><p className="text-[10px] font-black uppercase tracking-widest text-paragraph">Back Side</p></>}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-4 bg-[#111] text-white p-10 rounded-[50px] flex flex-col justify-between relative overflow-hidden">
                   <FiLock className="absolute -right-8 -top-8 text-white/5" size={180} />
                   <h3 className="text-accent text-[10px] font-black uppercase tracking-[0.4em]">Secure Vault</h3>
                   <p className="text-sm font-medium leading-relaxed opacity-60">We use high-level encryption to keep your ID safe and private.</p>
                </div>
              </motion.div>
            ) : step === 2 ? (
              <motion.div key="step2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="grid md:grid-cols-12 gap-8">
                <div className="md:col-span-7 bg-white p-10 md:p-14 rounded-[50px] border border-gray-100 shadow-sm text-center">
                   <div className="w-48 h-48 bg-secondary rounded-full mx-auto mb-10 border-8 border-[#F8F8F7] shadow-inner flex items-center justify-center relative overflow-hidden group">
                      <FiCamera size={48} className="text-gray-200" />
                      <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                         <button className="text-[9px] font-black uppercase tracking-widest bg-white px-4 py-2 rounded-full shadow-lg">Start Camera</button>
                      </div>
                   </div>
                   <h2 className="text-3xl font-black tracking-tighter mb-4">Face Scan</h2>
                   <p className="text-sm font-medium text-paragraph max-w-xs mx-auto leading-relaxed">Hold your ID next to your face and look at the camera.</p>
                </div>
                <div className="md:col-span-5 space-y-4">
                   {['Good Lighting', 'ID is clear', 'Face is visible'].map((rule, i) => (
                     <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center gap-4 shadow-sm">
                        <div className="w-8 h-8 rounded-xl bg-accent/10 text-accent flex items-center justify-center"><FiCheckCircle /></div>
                        <p className="text-[11px] font-black uppercase tracking-widest">{rule}</p>
                     </div>
                   ))}
                </div>
              </motion.div>
            ) : (
              <motion.div key="success" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#111] rounded-[60px] p-16 md:p-24 text-center text-white relative overflow-hidden">
                <FiUserCheck size={80} className="mx-auto mb-10 text-accent" />
                <h2 className="text-5xl font-black tracking-tighter mb-6">Submitted.</h2>
                <p className="text-lg opacity-60 font-medium max-w-md mx-auto mb-12">We are checking your documents now. This usually takes <span className="text-accent underline underline-offset-8">4 to 6 hours.</span></p>
                <button onClick={() => navigate('/lender/upload')} className="bg-accent text-txt px-12 py-6 rounded-3xl font-black uppercase tracking-[0.3em] text-xs shadow-2xl shadow-accent/20 hover:-translate-y-1 transition-all">
                   Start Listing Gear
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {step <= totalSteps && (
            <div className="mt-12 flex justify-between items-center px-4">
               <button onClick={() => setStep(s => s - 1)} disabled={step === 1} className={`text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 ${step === 1 ? 'opacity-0' : 'text-paragraph hover:text-txt'}`}>
                  <FiArrowLeft /> Previous Step
               </button>
               <button onClick={() => setStep(s => s + 1)} className="bg-[#111] text-white px-10 py-5 rounded-3xl font-black uppercase tracking-[0.3em] text-[10px] shadow-xl hover:bg-black flex items-center gap-3">
                  {step === totalSteps ? 'Finish Setup' : 'Next Step'} <FiArrowRight className="text-accent" />
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LenderVerification;