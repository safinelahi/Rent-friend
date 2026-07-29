import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiCheckCircle, FiUploadCloud, FiCamera, FiShield, 
  FiUserCheck, FiArrowRight, FiArrowLeft, FiLock, FiZap 
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const LenderVerification = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [nidFront, setNidFront] = useState(null);
  const [nidBack, setNidBack] = useState(null);
  const [selfie, setSelfie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const totalSteps = 2;

  const handleSubmit = async () => {
    if (!nidFront || !nidBack || !selfie) return;
    setError(null);
    setLoading(true);

    const formData = new FormData();
    formData.append('nidFront', nidFront);
    formData.append('nidBack', nidBack);
    formData.append('selfie', selfie);

    try {
      const res = await api.post('/users/upload-verification', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data.success) {
        setStep(3); // Success step
      } else {
        setError(res.data.error || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Error uploading verification files. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFC] pt-24 pb-20 sm:pt-32 sm:pb-32 font-epilogue text-[#111] overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
        
        {/* --- BACK BUTTON --- */}
        {step <= totalSteps && (
          <button 
            onClick={() => navigate('/signup')}
            className="flex items-center gap-2 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-paragraph/60 hover:text-accent transition-all mb-8 sm:mb-12"
          >
            <FiArrowLeft size={18} /> Back to Sign Up
          </button>
        )}

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-8">
           <div className="max-w-2xl">
              <div className="bg-accent/10 text-accent px-4 py-1.5 rounded-full border border-accent/10 inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-widest mb-4 sm:mb-6">
                 <FiZap size={12}/> Verify Identity
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] sm:leading-[0.85]">Verify Profile.</h1>
           </div>
           
           {step <= totalSteps && (
             <div className="flex flex-col md:items-end gap-2 px-1">
                <p className="text-[9px] sm:text-[10px] font-black text-paragraph/40 uppercase tracking-widest">Step {step} of {totalSteps}</p>
                <div className="w-full md:w-40 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                   <div className="h-full bg-accent transition-all duration-700 ease-out" style={{ width: `${(step/totalSteps)*100}%` }}></div>
                </div>
             </div>
           )}
        </div>

        <div className="max-w-5xl mx-auto lg:mx-0">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div 
                key="step1" 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -20 }} 
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8"
              >
                <div className="lg:col-span-8 space-y-6 sm:space-y-8">
                  <div className="bg-white p-6 sm:p-10 md:p-14 rounded-[32px] sm:rounded-[48px] border border-gray-100 shadow-sm">
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tighter mb-8 uppercase">NID Upload</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <label className={`aspect-[4/3] sm:aspect-square rounded-[24px] sm:rounded-[40px] border-2 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer active:scale-95 ${nidFront ? 'border-accent bg-accent/5' : 'border-gray-100 hover:border-accent bg-[#F8F8F7]'}`}>
                        <input type="file" className="hidden" onChange={(e) => setNidFront(e.target.files[0])} accept="image/*" />
                        {nidFront ? <FiCheckCircle size={40} className="text-accent" /> : <><FiUploadCloud size={32} className="text-gray-300 mb-4" /><p className="text-[9px] font-black uppercase tracking-widest text-paragraph/40">Front Side</p></>}
                      </label>
                      <label className={`aspect-[4/3] sm:aspect-square rounded-[24px] sm:rounded-[40px] border-2 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer active:scale-95 ${nidBack ? 'border-accent bg-accent/5' : 'border-gray-100 hover:border-accent bg-[#F8F8F7]'}`}>
                        <input type="file" className="hidden" onChange={(e) => setNidBack(e.target.files[0])} accept="image/*" />
                        {nidBack ? <FiCheckCircle size={40} className="text-accent" /> : <><FiUploadCloud size={32} className="text-gray-300 mb-4" /><p className="text-[9px] font-black uppercase tracking-widest text-paragraph/40">Back Side</p></>}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-4 bg-[#111] text-white p-8 sm:p-12 rounded-[32px] sm:rounded-[48px] flex flex-col justify-between relative overflow-hidden shadow-xl">
                   <FiLock className="absolute -right-8 -top-8 text-white/5 pointer-events-none" size={180} />
                   <div className="relative z-10">
                    <h3 className="text-accent text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] mb-6">Security</h3>
                    <p className="text-[11px] sm:text-xs font-medium leading-relaxed opacity-40 uppercase tracking-widest">Your identity data is safe with us and will never be shared with others.</p>
                   </div>
                </div>
              </motion.div>
            ) : step === 2 ? (
              <motion.div 
                key="step2" 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -20 }} 
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8"
              >
                <div className="lg:col-span-7 bg-white p-8 sm:p-14 rounded-[32px] sm:rounded-[48px] border border-gray-100 shadow-sm text-center">
                   <label className="w-40 h-40 sm:w-48 sm:h-48 bg-[#F8F8F7] rounded-full mx-auto mb-8 sm:mb-10 border-4 sm:border-8 border-white shadow-inner flex items-center justify-center relative overflow-hidden group transition-all cursor-pointer">
                      <input type="file" className="hidden" onChange={(e) => setSelfie(e.target.files[0])} accept="image/*" />
                      {selfie ? (
                        <img src={URL.createObjectURL(selfie)} className="w-full h-full object-cover" alt="Selfie preview" />
                      ) : (
                        <>
                          <FiCamera size={40} className="text-gray-200 group-hover:text-accent transition-colors" />
                          <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                             <span className="text-[8px] font-black uppercase tracking-widest bg-white px-4 py-2 rounded-full shadow-lg">Upload Selfie</span>
                          </div>
                        </>
                      )}
                   </label>
                   <h2 className="text-2xl sm:text-3xl font-black tracking-tighter mb-4 uppercase">Selfie Photo</h2>
                   <p className="text-[11px] sm:text-sm font-medium text-paragraph/60 max-w-xs mx-auto leading-relaxed uppercase tracking-widest">Upload a clear photo of your face to verify your account.</p>
                </div>
                <div className="lg:col-span-5 space-y-3 sm:space-y-4">
                   {['Optimal Lighting', 'Clear Identification', 'Facial Alignment'].map((rule, i) => (
                     <div key={i} className="bg-white p-5 sm:p-6 rounded-[24px] border border-gray-100 flex items-center gap-4 shadow-sm group hover:border-accent/30 transition-all">
                        <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-txt transition-all"><FiCheckCircle /></div>
                        <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-paragraph">{rule}</p>
                     </div>
                   ))}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="success" 
                initial={{ scale: 0.95, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                className="bg-[#111] rounded-[32px] sm:rounded-[60px] p-10 sm:p-24 text-center text-white relative overflow-hidden shadow-2xl"
              >
                <FiZap className="absolute -left-10 -bottom-10 text-white/5 pointer-events-none" size={240} />
                <FiUserCheck size={60} className="mx-auto mb-8 sm:mb-10 text-accent" />
                <h2 className="text-4xl sm:text-6xl font-black tracking-tighter mb-6">Submitted.</h2>
                <p className="text-sm sm:text-lg opacity-40 font-medium max-w-md mx-auto mb-10 sm:mb-12 uppercase tracking-widest leading-relaxed px-2">
                   Verification in progress. We typically approve accounts within <span className="text-accent underline underline-offset-8">4 to 6 Hours.</span>
                </p>
                <button onClick={() => navigate('/lender-dashboard')} className="w-full sm:w-auto bg-accent text-txt px-12 py-5 sm:py-6 rounded-[20px] sm:rounded-[32px] font-black uppercase tracking-[0.3em] text-[10px] sm:text-xs shadow-2xl shadow-accent/20 hover:-translate-y-1 active:scale-95 transition-all">
                   Go to Dashboard
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-500 rounded-3xl p-6 text-xs font-bold uppercase tracking-widest text-center mt-8">
              {error}
            </div>
          )}

          {step <= totalSteps && (
            <div className="mt-10 sm:mt-12 flex justify-between items-center px-2">
               <button 
                  onClick={() => setStep(s => s - 1)} 
                  disabled={step === 1 || loading} 
                  className={`text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 transition-all ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-paragraph/40 hover:text-txt'}`}
                >
                  <FiArrowLeft /> Back
               </button>
               <button 
                  onClick={() => {
                    if (step === 1) {
                      setStep(2);
                    } else {
                      handleSubmit();
                    }
                  }}
                  disabled={loading || (step === 1 && (!nidFront || !nidBack)) || (step === 2 && !selfie)}
                  className="bg-[#111] text-white px-8 sm:px-10 py-4 sm:py-5 rounded-[16px] sm:rounded-[24px] font-black uppercase tracking-[0.3em] text-[9px] sm:text-[10px] shadow-xl hover:bg-black flex items-center gap-3 transition-all active:scale-95 disabled:opacity-50"
                >
                  {loading ? 'Processing...' : step === totalSteps ? 'Submit' : 'Next'} <FiArrowRight className="text-accent" />
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LenderVerification;