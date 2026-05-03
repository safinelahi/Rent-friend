import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiEyeOff, FiZap } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MyListings = () => {
  // --- STATE MANAGEMENT ---
  // Initialized with dummy data to visualize the "Studio" aesthetic.
  // Backend will replace this with real data from your API.
  const [listings, setListings] = useState([
    { id: 1, title: "Sony Alpha A7III", price: 1200, status: "Live", category: "Photography" },
    { id: 2, title: "Camping Tent (4-Person)", price: 500, status: "Hidden", category: "Outdoor" }
  ]);

  /* 
    BACKEND SYNC: 
    Fetch all assets owned by the logged-in lender.
    API Endpoint Proposal: GET /api/assets/my-listings
  */
  useEffect(() => {
    // Logic to fetch user's own listings goes here.
  }, []);

  const toggleStatus = (id) => {
    /* 
      BACKEND SYNC: 
      Toggle asset visibility on the platform.
      API Endpoint Proposal: PATCH /api/assets/:id/toggle-status
    */
    setListings(listings.map(item => 
      item.id === id ? { ...item, status: item.status === "Live" ? "Hidden" : "Live" } : item
    ));
  };

  return (
    <div className="min-h-screen bg-[#FDFDFC] pt-32 pb-20 px-6 md:px-12 lg:px-16 font-epilogue text-[#111]">
      <div className="max-w-[1440px] mx-auto">
        
        {/* --- DYNAMIC HEADER --- */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 text-accent mb-6">
              <FiZap size={14} />
              <span className="text-[10px] font-black uppercase tracking-[0.5em]">Inventory Protocol</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none">
              My <br /> <span className="text-paragraph/20">Assets.</span>
            </h2>
          </div>

          <Link 
            to="/lender/upload"
            className="group flex items-center gap-4 bg-[#111] text-white px-10 py-6 rounded-[24px] text-[10px] font-black uppercase tracking-[0.3em] hover:bg-accent hover:text-[#111] transition-all shadow-xl shadow-black/5 active:scale-95"
          >
            Deploy New Asset <FiPlus className="group-hover:rotate-90 transition-transform" />
          </Link>
        </header>

        {/* --- LISTINGS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {listings.map((item) => (
            <motion.div 
              key={item.id}
              layout
              className="bg-white border border-gray-100 p-8 rounded-[40px] shadow-sm hover:shadow-xl hover:shadow-black/[0.02] transition-all group"
            >
              {/* Image Container */}
              <div className="aspect-square bg-[#F8F8F7] rounded-[32px] mb-8 overflow-hidden relative">
                <div className="absolute top-4 right-4 z-10">
                   <span className={`px-4 py-2 rounded-full text-[8px] font-black uppercase tracking-widest ${item.status === 'Live' ? 'bg-green-500 text-white' : 'bg-paragraph/10 text-paragraph/40'}`}>
                     {item.status}
                   </span>
                </div>
                <img src="https://via.placeholder.com/400" alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
              </div>

              {/* Info & Actions */}
              <div className="space-y-6">
                <div>
                  <p className="text-[9px] font-black text-accent uppercase tracking-[0.3em] mb-2">{item.category}</p>
                  <h4 className="text-xl font-black tracking-tight italic uppercase">{item.title}</h4>
                  <p className="text-txt font-black text-sm mt-1">৳{item.price} <span className="text-paragraph/40 font-bold uppercase text-[9px] tracking-widest">/ Per Day</span></p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                   <button 
                    onClick={() => toggleStatus(item.id)}
                    className="flex-1 py-4 bg-secondary/50 rounded-2xl flex items-center justify-center gap-2 text-paragraph hover:bg-secondary transition-all"
                   >
                     {item.status === "Live" ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                     <span className="text-[9px] font-black uppercase tracking-widest">{item.status === "Live" ? "Hide" : "Show"}</span>
                   </button>
                   
                   <button className="p-4 border border-gray-100 rounded-2xl text-paragraph/40 hover:text-accent hover:border-accent transition-all">
                      <FiEdit2 size={16} />
                   </button>

                   <button className="p-4 border border-gray-100 rounded-2xl text-paragraph/40 hover:text-red-500 hover:border-red-500 transition-all">
                      <FiTrash2 size={16} />
                   </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default MyListings;