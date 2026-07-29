import React from 'react';
import { motion } from 'framer-motion';
import { FiClock } from "react-icons/fi"; 

const ComingSoon = ({ title, subtitle }) => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#FDFDFC] px-4 overflow-hidden relative">
      
      {/* Animated Background */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-10"
      />
      <motion.div 
        animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-20 right-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl -z-10"
      />

      {/* Main Content Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-lg z-10"
      >
        {/* Floating Icon */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto bg-white p-6 rounded-full shadow-sm mb-8 w-24 h-24 flex items-center justify-center"
        >
          <FiClock size={40} className="text-accent" />
        </motion.div>

        {/* Text Animation */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4"
        >
          {title || "Coming Soon"}
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-gray-500 text-lg mb-8"
        >
          {subtitle || "We are working hard to bring this feature to life. Stay tuned for updates!"}
        </motion.p>

        {/* Pulse Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-accent text-[#1A1A1A] font-semibold rounded-full shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-shadow"
        >
          Notify Me
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ComingSoon;