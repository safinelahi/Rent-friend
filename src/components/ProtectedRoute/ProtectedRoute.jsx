import React, { useContext } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { FiZap, FiArrowRight, FiShield } from 'react-icons/fi';
import { motion } from 'framer-motion';

const ProtectedRoute = ({ children, requireLender = false, requireAdmin = false }) => {
  const { user, isLoading, isLender } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();

  if (isLoading) return (
    <div className="h-screen flex items-center justify-center bg-[#F8F8F7]">
      <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  );

  // Redirect to signup if not logged in
  if (!user) {
    return <Navigate to="/signup" state={{ from: location.pathname, role: 'lender' }} replace />;
  }

  // Redirect to home if admin is required but user is not admin
  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // If page requires lender but user is not lender
  if (requireLender && !isLender) {
    return (
      <div className="min-h-screen bg-[#F8F8F7] flex items-center justify-center p-6 font-epilogue">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-white w-full max-w-[550px] rounded-[32px] p-12 text-center shadow-xl border border-gray-50"
        >
          <div className="w-20 h-20 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-8 text-3xl">
            <FiZap />
          </div>
          <h2 className="text-4xl font-black tracking-tighter mb-4 text-txt">Become a Lender.</h2>
          <p className="text-paragraph text-sm font-medium leading-relaxed mb-10">
            To list your items in the Studio, you need to register as an official Lender. 
            This unlocks your owner dashboard and payment settings.
          </p>

          <div className="space-y-4 mb-10">
             <div className="flex items-center gap-4 bg-[#FDFDFC] p-4 rounded-2xl border border-gray-50 text-left">
                <FiShield className="text-accent shrink-0" size={20} />
                <p className="text-[10px] font-bold text-paragraph uppercase tracking-widest">
                  Secure escrow & item protection included.
                </p>
             </div>
          </div>

          {/* Redirect to signup to complete lender registration */}
          <button 
            onClick={() => {
              // We navigate to signup and tell it to come back to Lender Upload afterward
              navigate('/signup', { state: { role: 'lender', from: '/lender/upload' } });
            }}
            className="w-full bg-[#111] text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl hover:bg-black transition-all flex items-center justify-center gap-3"
          >
            Register as a Lender <FiArrowRight />
          </button>
          
          <button 
            onClick={() => navigate('/')}
            className="mt-6 text-[10px] font-black uppercase tracking-widest text-paragraph/40 hover:text-txt transition-all"
          >
            Not now, go to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;