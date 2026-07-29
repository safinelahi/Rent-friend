import { motion, AnimatePresence } from "framer-motion";
import { FiAlertCircle, FiX, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const LimitModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-txt/40 backdrop-blur-sm"
          />
          
          {/* Modal Card */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-primary w-full max-w-[440px] rounded-[40px] p-8 md:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.2)] border border-gray-100 text-center"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-paragraph hover:text-txt transition-colors">
              <FiX size={24} />
            </button>

            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-8 border border-gray-100">
              <FiAlertCircle className="text-accent" size={40} />
            </div>

            <h3 className="type-h3 text-txt mb-4 tracking-tight">Active Rental Detected</h3>
            <p className="type-p text-paragraph mb-10 leading-relaxed">
              To ensure safety and quality, our current policy allows <span className="text-txt font-bold">one active booking</span> per account at a time.
            </p>

            <div className="flex flex-col gap-3">
              <Link 
                to="/dashboard/rentals"
                className="w-full bg-accent text-txt type-p font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-accent/20 transition-all"
              >
                Go to My Dashboard <FiArrowRight />
              </Link>
              <button 
                onClick={onClose}
                className="w-full py-4 type-small font-bold text-paragraph uppercase tracking-widest hover:text-txt transition-colors"
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LimitModal;