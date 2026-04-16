import React from 'react';
import Sidebar from '../../components/Dashboard/Sidebar';
import { FiClock, FiMapPin, FiExternalLink, FiMessageCircle } from 'react-icons/fi';
import { products } from '../../data/products';
import { motion } from 'framer-motion';

const RenterDashboard = () => {
  // Just grabbing the first product to show as an "Active Rental"
  const activeItem = products[0];

  return (
    <div className="flex min-h-screen bg-[#FDFDFC]">
      <Sidebar />
      
      <main className="flex-1 p-6 md:p-12 lg:p-16">
        <div className="max-w-5xl mx-auto">
          
          <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-black text-txt tracking-tight">My Rentals</h1>
              <p className="text-paragraph mt-1 font-medium">Tracking your active gear and schedules.</p>
            </div>
            {/* Quick Stats Bar */}
            <div className="flex gap-4">
               <div className="bg-white border border-gray-100 px-6 py-3 rounded-2xl shadow-sm">
                  <p className="text-[10px] font-bold text-paragraph uppercase">Total Spent</p>
                  <p className="text-lg font-black text-txt">৳4,250</p>
               </div>
            </div>
          </header>

          {/* ACTIVE RENTAL CARD - The "Star" of the dashboard */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
               <h3 className="text-xs font-bold uppercase tracking-widest text-paragraph">Ongoing Trip</h3>
               <span className="flex items-center gap-1.5 text-xs font-bold text-green-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> Live Tracking
               </span>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-gray-100 rounded-[40px] p-6 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.03)] flex flex-col xl:flex-row gap-10"
            >
              {/* Product Preview */}
              <div className="w-full xl:w-64 h-64 rounded-[32px] overflow-hidden bg-secondary shrink-0">
                <img src={activeItem.image} className="w-full h-full object-cover" alt="active-rental" />
              </div>

              {/* Data & Actions */}
              <div className="flex-1 space-y-6">
                <div className="flex flex-wrap gap-2">
                  <span className="bg-accent text-txt px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide shadow-sm">
                    {activeItem.category}
                  </span>
                  <span className="bg-secondary text-txt px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide">
                    Order #RF-9201
                  </span>
                </div>
                
                <h2 className="text-2xl font-black text-txt leading-tight">{activeItem.title}</h2>
                
                <div className="grid grid-cols-2 gap-6 pb-4 border-b border-gray-50">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-paragraph uppercase">Time Remaining</p>
                    <div className="flex items-center gap-2 text-sm font-bold text-txt">
                       <FiClock className="text-accent" /> 2 Days, 4 Hours
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-paragraph uppercase">Pickup Point</p>
                    <div className="flex items-center gap-2 text-sm font-bold text-txt">
                       <FiMapPin className="text-accent" /> {activeItem.location}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <button className="bg-txt text-white px-8 py-4 rounded-2xl font-bold text-xs hover:bg-opacity-90 transition-all flex items-center gap-2">
                    <FiMessageCircle size={16}/> Chat with Live Support
                  </button>
                  <button className="border border-gray-100 text-txt px-8 py-4 rounded-2xl font-bold text-xs hover:bg-secondary transition-all flex items-center gap-2">
                    View Receipt <FiExternalLink size={14}/>
                  </button>
                </div>
              </div>

              {/* The "Safety Box" - Highlights the Refundable Deposit */}
              <div className="w-full xl:w-72 bg-secondary/40 p-8 rounded-[32px] border border-dashed border-gray-200 flex flex-col justify-center items-center text-center">
                <p className="text-[10px] font-bold text-paragraph uppercase mb-2 tracking-widest">Refundable Deposit</p>
                <p className="text-3xl font-black text-txt">৳1,500</p>
                <div className="mt-4 px-4 py-2 bg-white rounded-xl text-[9px] font-bold text-green-600 uppercase">
                  Held Securely in Escrow
                </div>
                <p className="text-[10px] text-paragraph mt-4 leading-relaxed font-medium">
                  This amount will be returned to your wallet 6 hours after the item return is verified.
                </p>
              </div>
            </motion.div>
          </section>

          {/* PREVIOUS TRIPS PREVIEW */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-widest text-paragraph mb-6">Recent History</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
               {/* Just a placeholder to show the user how history looks */}
               <div className="p-6 bg-white border border-gray-50 rounded-3xl flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary rounded-xl"></div>
                  <div>
                    <p className="font-bold text-sm text-txt">Professional Power Tools</p>
                    <p className="text-[10px] text-paragraph">Completed on Oct 05, 2026</p>
                  </div>
               </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default RenterDashboard;