import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUploadCloud, FiCheckCircle, FiShield, FiArrowLeft, FiZap, FiLock } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const RenterVerification = () => {
  const navigate = useNavigate();
  const [nidFront, setNidFront] = useState(null);
  const [nidBack, setNidBack] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!nidFront || !nidBack) return;
    setError(null);
    setLoading(true);

    const formData = new FormData();
    formData.append('nidFront', nidFront);
    formData.append('nidBack', nidBack);

    try {
      const res = await api.post('/users/upload-verification', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data.success) {
        navigate('/verification-pending');
      } else {
        setError(res.data.error || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Error uploading verification documents. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFC] pt-24 pb-20 sm:pt-32 sm:pb-32 font-epilogue text-[#111] overflow-x-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12">
        
        {/* --- BACK BUTTON --- */}
        <button 
          onClick={() => navigate('/signup')}
          className="flex items-center gap-2 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-paragraph/40 hover:text-accent transition-all mb-8 sm:mb-12"
        >
          <FiArrowLeft size={18} /> Back to Sign Up
        </button>

        <div className="max-w-4xl mx-auto lg:mx-0">
          {/* Header */}
          <header className="mb-12 sm:mb-20">
            <div className="bg-accent/10 text-accent px-4 py-1.5 rounded-full border border-accent/10 inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-widest mb-6">
              <FiZap size={12}/> Verify Identity
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black tracking-tighter leading-[0.9] sm:leading-[0.85] mb-4">
              ID Setup.
            </h1>
            <p className="text-paragraph text-xs sm:text-sm font-medium opacity-60 uppercase tracking-widest max-w-xl">
              To start using Rent Friend as a renter, please upload your NID.
            </p>
          </header>

          {/* --- UPLOAD GRID (Responsive) --- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-12">
            <label className={`aspect-[4/3] sm:aspect-square rounded-[32px] sm:rounded-[48px] border-2 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer active:scale-95 ${nidFront ? 'border-accent bg-accent/5 shadow-inner' : 'border-gray-100 hover:border-accent bg-white shadow-sm'}`}>
              <input type="file" className="hidden" onChange={(e) => setNidFront(e.target.files[0])} accept="image/*" />
              {nidFront ? (
                <div className="flex flex-col items-center gap-4">
                  <FiCheckCircle size={50} className="text-accent" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-accent">Front Side Uploaded</span>
                </div>
              ) : (
                <>
                  <FiUploadCloud size={40} className="text-gray-200 mb-4" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-paragraph/40">NID Front Side</span>
                </>
              )}
            </label>

            <label className={`aspect-[4/3] sm:aspect-square rounded-[32px] sm:rounded-[48px] border-2 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer active:scale-95 ${nidBack ? 'border-accent bg-accent/5 shadow-inner' : 'border-gray-100 hover:border-accent bg-white shadow-sm'}`}>
              <input type="file" className="hidden" onChange={(e) => setNidBack(e.target.files[0])} accept="image/*" />
              {nidBack ? (
                <div className="flex flex-col items-center gap-4">
                  <FiCheckCircle size={50} className="text-accent" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-accent">Back Side Uploaded</span>
                </div>
              ) : (
                <>
                  <FiUploadCloud size={40} className="text-gray-200 mb-4" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-paragraph/40">NID Back Side</span>
                </>
              )}
            </label>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-500 rounded-3xl p-6 text-xs font-bold uppercase tracking-widest text-center mb-8">
              {error}
            </div>
          )}

          {/* --- SECURITY FOOTER BOX --- */}
          <div className="p-8 sm:p-12 bg-[#111] text-white rounded-[40px] sm:rounded-[56px] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
            {/* Subtle BG Icon */}
            <FiLock className="absolute -right-8 -bottom-8 text-white/5 pointer-events-none" size={180} />
            
            <div className="flex items-center gap-6 relative z-10">
               <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 shrink-0">
                <FiShield size={32} className="text-accent" />
               </div>
                <div>
                   <h4 className="text-[11px] font-black uppercase tracking-widest mb-1 text-accent">Secure Verification</h4>
                   <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest max-w-[220px] leading-relaxed">
                     Your documents are stored securely and kept private.
                   </p>
                </div>
             </div>

             <button 
               onClick={handleSubmit}
               disabled={!nidFront || !nidBack || loading}
               className={`w-full md:w-auto px-12 py-6 rounded-[24px] sm:rounded-[32px] font-black uppercase tracking-[0.3em] text-[11px] transition-all relative z-10 active:scale-95 ${nidFront && nidBack && !loading ? 'bg-accent text-txt shadow-2xl shadow-accent/20 hover:-translate-y-1' : 'bg-white/5 text-white/10 cursor-not-allowed border border-white/5'}`}
             >
               {loading ? "Uploading..." : "Submit"}
             </button>
          </div>

          {/* Additional Help Text */}
          <p className="mt-10 text-center lg:text-left text-[9px] font-black text-paragraph/30 uppercase tracking-[0.3em]">
             Review process usually takes less than 6 hours.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RenterVerification;