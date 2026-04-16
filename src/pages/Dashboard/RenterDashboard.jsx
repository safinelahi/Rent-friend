import React, { useState } from 'react';
import Sidebar from '../../components/Dashboard/Sidebar';
import { FiClock, FiMapPin, FiExternalLink, FiMessageCircle, FiMenu } from 'react-icons/fi';
import { products } from '../../data/products';
import { motion } from 'framer-motion';

const RenterDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const activeItem = products[0];

  return (
    <div className="flex min-h-screen bg-[#FDFDFC]">
      {/* Sidebar gets the control state */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <main className="flex-1 min-w-0">
        {/* MOBILE TOP NAV (Only visible on small screens) */}
        <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center font-black text-sm">R</div>
            <span className="font-black text-txt tracking-tighter">RentFriend</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 bg-secondary rounded-xl text-txt"
          >
            <FiMenu size={20} />
          </button>
        </div>

        <div className="p-6 md:p-12 lg:p-16 max-w-5xl mx-auto">
          {/* Header Section */}
          <header className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-txt tracking-tight">My Rentals</h1>
              <p className="text-paragraph text-sm mt-1 font-medium">Tracking your active gear and schedules.</p>
            </div>
            <div className="bg-white border border-gray-100 px-6 py-3 rounded-2xl shadow-sm self-start">
               <p className="text-[10px] font-bold text-paragraph uppercase">Total Spent</p>
               <p className="text-lg font-black text-txt">৳4,250</p>
            </div>
          </header>

          {/* ONGOING TRIP CARD */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
               <h3 className="text-[10px] font-bold uppercase tracking-widest text-paragraph">Ongoing Trip</h3>
               <span className="flex items-center gap-1.5 text-[10px] font-bold text-green-500 uppercase">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div> Live Tracking
               </span>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.03)]"
            >
              <div className="flex flex-col xl:flex-row">
                {/* Image Section */}
                <div className="w-full xl:w-72 h-64 xl:h-auto bg-secondary overflow-hidden">
                  <img src={activeItem.image} className="w-full h-full object-cover" alt="rental" />
                </div>

                {/* Content Section */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <span className="bg-accent text-txt px-3 py-1 rounded-full text-[10px] font-bold uppercase">Photography</span>
                      <span className="bg-secondary text-txt px-3 py-1 rounded-full text-[10px] font-bold uppercase">#RF-9201</span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-black text-txt leading-tight">{activeItem.title}</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-y border-gray-50">
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-paragraph uppercase">Time Remaining</p>
                        <p className="text-xs font-bold text-txt flex items-center gap-1.5"><FiClock className="text-accent" /> 2 Days Left</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-paragraph uppercase">Pickup Point</p>
                        <p className="text-xs font-bold text-txt flex items-center gap-1.5"><FiMapPin className="text-accent" /> {activeItem.location}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-6">
                    <button className="flex-1 bg-txt text-white py-4 rounded-xl font-bold text-[11px] flex items-center justify-center gap-2">
                      <FiMessageCircle size={16}/> Chat Owner
                    </button>
                    <button className="flex-1 border border-gray-100 text-txt py-4 rounded-xl font-bold text-[11px] flex items-center justify-center gap-2 hover:bg-secondary">
                      View Receipt <FiExternalLink size={14}/>
                    </button>
                  </div>
                </div>

                {/* Safety Deposit Box */}
                <div className="p-8 bg-secondary/30 border-t xl:border-t-0 xl:border-l border-gray-100 flex flex-col justify-center items-center text-center">
                  <p className="text-[10px] font-bold text-paragraph uppercase mb-1">Security Hold</p>
                  <p className="text-2xl font-black text-txt">৳1,500</p>
                  <div className="mt-4 px-3 py-1.5 bg-white rounded-lg text-[9px] font-bold text-green-600 uppercase">Held in Escrow</div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* HISTORY PLACEHOLDER */}
          <section>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-paragraph mb-6">Recent History</h3>
            <div className="p-10 border-2 border-dashed border-gray-100 rounded-[32px] text-center">
               <p className="text-xs font-medium text-paragraph">No completed trips yet.</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default RenterDashboard;