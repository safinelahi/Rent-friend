import React, { useState, useEffect } from 'react';
import { FiCheck, FiX, FiInfo, FiZap, FiUser, FiMaximize2, FiUserCheck } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../api/axios';

const VerificationCenter = () => {
  // Get all users who uploaded NID files and are waiting for approval
  const [pendingUsers, setPendingUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPendingUsers = async () => {
      setLoading(true);
      try {
        const res = await api.get('/admin/pending-verifications');
        if (res.data.success) {
          setPendingUsers(res.data.users);
        }
      } catch (err) {
        console.error("Error fetching pending users:", err);
        setError("Failed to load verification candidates.");
      } finally {
        setLoading(false);
      }
    };

    fetchPendingUsers();
  }, []);

  const processVerification = async (userId, status) => {
    let reason = '';
    if (status === 'Rejected') {
      reason = prompt("Please enter the reason for rejecting this verification:");
      if (reason === null) return; // Admin cancelled the prompt
      if (!reason.trim()) {
        alert("A rejection reason is required to reject verification.");
        return;
      }
    }

    try {
      const res = await api.patch(`/admin/verify/${userId}`, { status, reason });
      if (res.data.success) {
        setPendingUsers(prev => prev.filter(u => u._id !== userId));
      }
    } catch (err) {
      console.error("Error processing verification:", err);
      alert("Action failed: " + (err.response?.data?.error || "Server error"));
    }
  };

  const getImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `http://localhost:5000${path}`;
  };

  return (
    <div className="min-h-screen bg-[#FDFDFC] pt-32 pb-20 px-6 md:px-12 lg:px-16 font-epilogue">
      <div className="max-w-[1440px] mx-auto">
        
        <header className="mb-16">
          <div className="flex items-center gap-3 text-accent mb-6">
            <FiZap size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.5em]">Admin Portal</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none italic">
            Verification <br /> <span className="text-paragraph/20">Requests.</span>
          </h2>
        </header>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-500 rounded-3xl p-6 text-xs font-bold uppercase tracking-widest text-center mb-8">
            {error}
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!loading && pendingUsers.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-[32px] bg-white">
            <FiUserCheck size={40} className="mx-auto text-gray-200 mb-4" />
            <h3 className="text-xl font-black uppercase tracking-tight mb-2">All Clear</h3>
            <p className="text-paragraph text-xs font-medium uppercase tracking-widest">No users are waiting for verification.</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-8">
          <AnimatePresence>
            {pendingUsers.map((user) => (
              <motion.div 
                key={user._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-gray-100 p-8 md:p-12 rounded-[48px] shadow-sm flex flex-col xl:flex-row gap-12 items-center"
              >
                {/* Profile Brief */}
                <div className="flex items-center gap-6 min-w-[250px]">
                  <div className="w-20 h-20 bg-secondary rounded-[24px] flex items-center justify-center overflow-hidden border border-gray-100">
                    {user.selfie ? (
                      <img src={getImageUrl(user.selfie)} alt="Selfie" className="w-full h-full object-cover grayscale" />
                    ) : (
                      <FiUser size={30} className="text-gray-300" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-xl font-black uppercase italic tracking-tight">{user.name}</h4>
                    <p className="text-[10px] font-bold text-accent uppercase tracking-[0.2em]">Role: {user.role}</p>
                  </div>
                </div>

                {/* Identity Documents Viewport */}
                <div className={`flex-1 grid grid-cols-1 ${user.role?.toLowerCase() === 'lender' ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-6 w-full`}>
                  <div className="group relative aspect-video bg-[#F8F8F7] rounded-[32px] overflow-hidden border border-gray-50 flex items-center justify-center cursor-zoom-in">
                    {user.nidFront ? (
                      <img src={getImageUrl(user.nidFront)} alt="NID Front" className="w-full h-full object-cover" />
                    ) : (
                      <p className="text-[9px] font-black text-paragraph/20 uppercase tracking-widest">NID Front</p>
                    )}
                    <FiMaximize2 className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity text-white mix-blend-difference" />
                  </div>
                  <div className="group relative aspect-video bg-[#F8F8F7] rounded-[32px] overflow-hidden border border-gray-50 flex items-center justify-center cursor-zoom-in">
                    {user.nidBack ? (
                      <img src={getImageUrl(user.nidBack)} alt="NID Back" className="w-full h-full object-cover" />
                    ) : (
                      <p className="text-[9px] font-black text-paragraph/20 uppercase tracking-widest">NID Back</p>
                    )}
                    <FiMaximize2 className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity text-white mix-blend-difference" />
                  </div>
                  {user.role?.toLowerCase() === 'lender' && (
                    <div className="group relative aspect-video bg-[#F8F8F7] rounded-[32px] overflow-hidden border border-gray-50 flex items-center justify-center cursor-zoom-in">
                      {user.selfie ? (
                        <img src={getImageUrl(user.selfie)} alt="Selfie" className="w-full h-full object-cover" />
                      ) : (
                        <p className="text-[9px] font-black text-paragraph/20 uppercase tracking-widest">Selfie</p>
                      )}
                      <FiMaximize2 className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity text-white mix-blend-difference" />
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-row xl:flex-col gap-4 w-full xl:w-auto">
                  <button 
                    onClick={() => processVerification(user._id, 'Verified')}
                    className="flex-1 px-10 py-5 bg-[#111] text-white rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-green-500 transition-all flex items-center justify-center gap-3"
                  >
                    Approve <FiCheck />
                  </button>
                  <button 
                    onClick={() => processVerification(user._id, 'Rejected')}
                    className="flex-1 px-10 py-5 bg-white border border-gray-100 text-txt rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:border-red-500 hover:text-red-500 transition-all flex items-center justify-center gap-3"
                  >
                    Reject <FiX />
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