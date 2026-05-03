import React, { useState, useEffect } from 'react';
import { FiClock, FiCheckCircle, FiRotateCcw, FiUser, FiNavigation, FiZap } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const LenderBookingManager = () => {
  // State for storing bookings fetched from backend
  const [bookings, setBookings] = useState([]);

  /* 
    BACKEND SYNC: 
    Fetch all bookings where the current user is the Lender.
    API Endpoint Proposal: GET /api/bookings/lender
    The backend should return an array of objects including renter details and asset info.
  */
  useEffect(() => {
    // API call logic will be implemented here
  }, []);

  // Function to handle status transitions as per the flowchart
  const handleStatusUpdate = async (bookingId, nextStatus) => {
    /* 
      BACKEND SYNC: 
      Update the rental status in the database.
      API Endpoint Proposal: PATCH /api/bookings/:id/status
      Body: { status: nextStatus }
    */
    console.log(`Transitioning booking ${bookingId} to status: ${nextStatus}`);
    // Refresh data after update
  };

  return (
    <div className="min-h-screen bg-[#FDFDFC] pt-32 pb-20 px-6 md:px-12 lg:px-16 font-epilogue text-[#111]">
      <div className="max-w-[1440px] mx-auto">
        
        {/* --- HEADER --- */}
        <header className="mb-16">
          <div className="flex items-center gap-3 text-accent mb-6">
            <FiZap size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.5em]">Session Protocol</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none">
            Booking <br /> <span className="text-paragraph/20">Manager.</span>
          </h2>
        </header>

        {/* --- BOOKING LOGS --- */}
        <div className="space-y-6">
          {/* Example Card: Handover Phase (Flowchart Step) */}
          <motion.div 
            className="bg-white border border-gray-100 p-8 rounded-[40px] flex flex-col lg:flex-row items-center justify-between shadow-sm hover:shadow-md transition-all"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-8 mb-8 lg:mb-0">
               <div className="w-24 h-24 bg-[#F8F8F7] rounded-[28px] flex items-center justify-center overflow-hidden border border-gray-50">
                  {/* Asset Image Placeholder */}
                  <img src="https://via.placeholder.com/150" alt="Asset" className="w-full h-full object-cover grayscale" />
               </div>
               <div>
                  <span className="bg-accent/10 text-accent text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 inline-block">
                    Status: Approved
                  </span>
                  <h4 className="text-xl font-black uppercase tracking-tight mb-2 italic">Professional DSLR Kit</h4>
                  <div className="flex flex-wrap items-center gap-6 text-paragraph/40 text-[9px] font-bold uppercase tracking-[0.2em]">
                     <span className="flex items-center gap-2"><FiUser className="text-accent" /> Renter: Safin Elahi</span>
                     <span className="flex items-center gap-2"><FiClock className="text-accent" /> Duration: 48 Hours</span>
                  </div>
               </div>
            </div>

            {/* ACTION PROTOCOLS (Flowchart Logic) */}
            <div className="flex flex-wrap gap-4 w-full lg:w-auto">
               {/* Protocol: Handover confirmation */}
               <button 
                 onClick={() => handleStatusUpdate('BK-99', 'HandedOver')}
                 className="flex-1 lg:flex-none px-10 py-5 bg-[#111] text-white rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-accent hover:text-[#111] transition-all flex items-center justify-center gap-3 shadow-xl shadow-black/5 active:scale-95"
               >
                 Handover Asset <FiNavigation />
               </button>

               {/* Protocol: Return & Verification */}
               <button 
                 onClick={() => handleStatusUpdate('BK-99', 'Returned')}
                 className="flex-1 lg:flex-none px-10 py-5 bg-white border border-gray-100 text-txt rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:border-accent transition-all flex items-center justify-center gap-3 active:scale-95"
               >
                 Confirm Return <FiRotateCcw />
               </button>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default LenderBookingManager;