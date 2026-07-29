import React, { useState, useEffect } from 'react';
import { FiAlertTriangle, FiCheckCircle, FiImage, FiZap, FiCamera } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../api/axios';

const ReturnAudit = () => {
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);

  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `http://localhost:5000${url}`;
  };

  const fetchReturns = async () => {
    try {
      const res = await api.get('/admin/returns');
      if (res.data.success) {
        setReturns(res.data.returns);
      }
    } catch (err) {
      console.error("Error fetching returns queue:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReturns();
  }, []);

  const handleApproveReturn = async (bookingId) => {
    try {
      const res = await api.patch(`/admin/returns/${bookingId}/approve`);
      if (res.data.success) {
        setReturns(prev => prev.filter(r => r._id !== bookingId));
        alert("Return audit approved successfully. Payout queued.");
      }
    } catch (err) {
      console.error("Error approving return:", err);
      alert("Action failed: " + (err.response?.data?.error || "Server error"));
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#FDFDFC] flex flex-col items-center justify-center font-epilogue px-6 text-center text-[#111]">
      <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-[10px] font-black uppercase tracking-widest text-paragraph/40">Loading Return Audits...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFDFC] pt-32 pb-20 px-6 md:px-12 lg:px-16 font-epilogue">
      <div className="max-w-[1440px] mx-auto">
        
        <header className="mb-16">
          <div className="flex items-center gap-3 text-accent mb-6">
            <FiAlertTriangle size={14} className="animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em]">Returns Panel</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none italic">
            Return <br /> <span className="text-paragraph/20">Audit.</span>
          </h2>
        </header>

        <div className="grid grid-cols-1 gap-6">
          <AnimatePresence>
            {returns.length === 0 ? (
              <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-[32px] bg-white">
                <FiCheckCircle size={40} className="mx-auto text-gray-200 mb-4" />
                <h3 className="text-xl font-black uppercase tracking-tight mb-2">Queue Clear</h3>
                <p className="text-paragraph text-xs font-medium uppercase tracking-widest">No returned items waiting for audit approval.</p>
              </div>
            ) : (
              returns.map((issue) => (
                <motion.div 
                  key={issue._id}
                  className="bg-white border border-gray-100 p-8 rounded-[48px] flex flex-col xl:flex-row items-center justify-between shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                     <div className="w-24 h-24 bg-[#F8F8F7] rounded-[28px] flex flex-col items-center justify-center border border-gray-50 overflow-hidden shrink-0">
                        <img src={getImageUrl(issue.product?.image)} className="w-full h-full object-cover grayscale" alt="" />
                     </div>
                     <div>
                        <span className="text-[8px] font-black uppercase tracking-[0.4em] text-accent mb-2 block italic">Booking ID: {issue._id}</span>
                        <h4 className="text-2xl font-black uppercase tracking-tight italic">{issue.product?.title}</h4>
                        
                        <p className="text-[10px] font-bold text-paragraph/40 uppercase tracking-widest mt-2 italic">
                           Lender: {issue.product?.owner?.name} vs Renter: {issue.renter?.name}
                        </p>

                        {/* RENDER RETURN AUDIT IMAGES */}
                        {issue.returnAudits && issue.returnAudits.length > 0 && (
                          <div className="mt-4 space-y-1">
                            <span className="text-[7px] font-black text-paragraph/30 uppercase tracking-widest flex items-center gap-1"><FiCamera /> Return Audit Angles:</span>
                            <div className="flex gap-2">
                              {issue.returnAudits.map((img, idx) => (
                                 <a key={idx} href={getImageUrl(img)} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0 hover:border-accent transition-all block">
                                    <img src={getImageUrl(img)} className="w-full h-full object-cover" alt="" />
                                 </a>
                              ))}
                            </div>
                          </div>
                        )}
                     </div>
                  </div>

                  <div className="flex gap-4 mt-8 xl:mt-0 w-full xl:w-auto">
                     <button 
                       onClick={() => handleApproveReturn(issue._id)}
                       className="flex-1 xl:flex-none px-8 py-5 bg-[#111] text-white rounded-full text-[9px] font-black uppercase tracking-[0.3em] hover:bg-green-500 transition-all flex items-center justify-center gap-3 shadow-xl shadow-black/5 active:scale-95"
                     >
                       Accept Return <FiCheckCircle />
                     </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default ReturnAudit;