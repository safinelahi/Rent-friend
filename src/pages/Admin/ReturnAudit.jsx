import React, { useState } from 'react';
import { FiAlertTriangle, FiCheckCircle, FiImage, FiZap } from 'react-icons/fi';
import { motion } from 'framer-motion';

const ReturnAudit = () => {
  // Mock data for disputed returns
  const [disputes, setDisputes] = useState([
    { id: 'DS-402', item: 'Camping Tent', lender: 'Alfaz Sozib', renter: 'Safin Elahi', issue: 'Tear in fabric', status: 'Under Review' }
  ]);

  return (
    <div className="min-h-screen bg-[#FDFDFC] pt-32 pb-20 px-6 md:px-12 lg:px-16 font-epilogue">
      <div className="max-w-[1440px] mx-auto">
        
        <header className="mb-16">
          <div className="flex items-center gap-3 text-accent mb-6">
            <FiAlertTriangle size={14} className="animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em]">Conflict Resolution</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none italic">
            Return <br /> <span className="text-paragraph/20">Audit.</span>
          </h2>
        </header>

        <div className="grid grid-cols-1 gap-6">
          {disputes.map((issue) => (
            <motion.div 
              key={issue.id}
              className="bg-white border border-gray-100 p-8 rounded-[48px] flex flex-col xl:flex-row items-center justify-between shadow-sm"
            >
              <div className="flex flex-col md:flex-row gap-8 items-center">
                 <div className="w-24 h-24 bg-red-50 text-red-500 rounded-[28px] flex items-center justify-center border border-red-100">
                    <FiImage size={32} />
                 </div>
                 <div>
                    <span className="text-[8px] font-black uppercase tracking-[0.4em] text-red-500 mb-2 block italic">Issue: {issue.issue}</span>
                    <h4 className="text-2xl font-black uppercase tracking-tight italic">{issue.item}</h4>
                    <p className="text-[10px] font-bold text-paragraph/40 uppercase tracking-widest mt-2 italic">
                       Lender: {issue.lender} vs Renter: {issue.renter}
                    </p>
                 </div>
              </div>

              <div className="flex gap-4 mt-8 xl:mt-0">
                 <button className="px-8 py-5 bg-[#111] text-white rounded-full text-[9px] font-black uppercase tracking-[0.3em] hover:bg-green-500 transition-all flex items-center gap-3 shadow-xl shadow-black/5">
                   Approve Return <FiCheckCircle />
                 </button>
                 <button className="px-8 py-5 bg-white border border-gray-100 text-txt rounded-full text-[9px] font-black uppercase tracking-[0.3em] hover:border-accent transition-all flex items-center gap-3">
                   Investigate Further <FiZap />
                 </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ReturnAudit;