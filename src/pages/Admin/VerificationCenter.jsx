import React, { useState, useEffect } from 'react';
import { FiCheck, FiX, FiInfo, FiZap, FiUser, FiMaximize2 } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const VerificationCenter = () => {
  /* 
    BACKEND SYNC: 
    Fetch all users whose 'isVerified' status is 'Pending'.
    Integration Note: Since you're a Python professional, your FastAPI/Django 
    backend should filter users with status: "Pending Verification".
  */
  const [pendingUsers, setPendingUsers] = useState([
    { id: 'usr-101', name: 'Alfaz Sozib', role: 'Lender', nidFront: 'url', nidBack: 'url', selfie: 'url' }
  ]);

  const processVerification = (userId, status) => {
    /* 
      BACKEND SYNC: 
      Update the verification status in the database.
      API: PATCH /api/admin/verify/:userId
      Body: { status: 'Verified' | 'Rejected' }
    */
    console.log(`Action: ${status} for User: ${userId}`);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFC] pt-32 pb-20 px-6 md:px-12 lg:px-16 font-epilogue">
      <div className="max-w-[1440px] mx-auto">
        
        <header className="mb-16">
          <div className="flex items-center gap-3 text-accent mb-6">
            <FiZap size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.5em]">Gatekeeper Protocol</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none italic">
            Verification <br /> <span className="text-paragraph/20">Center.</span>
          </h2>
        </header>

        <div className="grid grid-cols-1 gap-8">
          <AnimatePresence>
            {pendingUsers.map((user) => (
              <motion.div 
                key={user.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-gray-100 p-8 md:p-12 rounded-[48px] shadow-sm flex flex-col xl:flex-row gap-12 items-center"
              >
                {/* Profile Brief */}
                <div className="flex items-center gap-6 min-w-[250px]">
                  <div className="w-20 h-20 bg-secondary rounded-[24px] flex items-center justify-center overflow-hidden">
                    <img src={user.selfie} alt="Selfie" className="w-full h-full object-cover grayscale" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black uppercase italic tracking-tight">{user.name}</h4>
                    <p className="text-[10px] font-bold text-accent uppercase tracking-[0.2em]">{user.role} Candidate</p>
                  </div>
                </div>

                {/* Identity Documents Viewport */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  <div className="group relative aspect-video bg-[#F8F8F7] rounded-[32px] overflow-hidden border border-gray-50 flex items-center justify-center cursor-zoom-in">
                    <p className="text-[9px] font-black text-paragraph/20 uppercase tracking-widest">NID Front View</p>
                    <FiMaximize2 className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="group relative aspect-video bg-[#F8F8F7] rounded-[32px] overflow-hidden border border-gray-50 flex items-center justify-center cursor-zoom-in">
                    <p className="text-[9px] font-black text-paragraph/20 uppercase tracking-widest">NID Back View</p>
                    <FiMaximize2 className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>

                {/* Execution Logic */}
                <div className="flex flex-row xl:flex-col gap-4 w-full xl:w-auto">
                  <button 
                    onClick={() => processVerification(user.id, 'Verified')}
                    className="flex-1 px-10 py-5 bg-[#111] text-white rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-green-500 transition-all flex items-center justify-center gap-3"
                  >
                    Approve Identity <FiCheck />
                  </button>
                  <button 
                    onClick={() => processVerification(user.id, 'Rejected')}
                    className="flex-1 px-10 py-5 bg-white border border-gray-100 text-txt rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:border-red-500 hover:text-red-500 transition-all flex items-center justify-center gap-3"
                  >
                    Decline <FiX />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default VerificationCenter;