import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; 
import { 
  FiSearch, FiCalendar, FiShield, FiMapPin, FiStar, 
  FiPlusCircle, FiUserCheck, FiMessageSquare, FiPackage, FiZap, FiChevronRight
} from 'react-icons/fi';

const HowItWorks = () => {
  const renterSteps = [
    { icon: <FiSearch />, title: "Find Local Gear", desc: "Browse listings near you and filter by category, price, or location in Dhaka." },
    { icon: <FiCalendar />, title: "Select Dates", desc: "Pick your rental dates. We block overlapping bookings to prevent double-booking." },
    { icon: <FiShield />, title: "Escrow Deposit", desc: "Pay securely. Your rental fee and deposit are locked in escrow for safety." },
    { icon: <FiMapPin />, title: "Meet & Verify", desc: "Meet the lender, verify NID, take quick pickup photos, and collect the gear." },
    { icon: <FiStar />, title: "Return & Refund", desc: "Enjoy your project, return the item on time, and get your deposit refunded." },
  ];

  const lenderSteps = [
    { icon: <FiPlusCircle />, title: "List Your Items", desc: "Upload 3 angle photos, set fair daily rates, and write custom rules." },
    { icon: <FiUserCheck />, title: "Get Verified", desc: "Complete a quick NID and selfie check to earn trust badges." },
    { icon: <FiMessageSquare />, title: "Approve Rentals", desc: "Chat with renters and accept bookings that match your availability." },
    { icon: <FiPackage />, title: "Handover Audit", desc: "Meet the renter, double-check NID documents, and hand over the item." },
    { icon: <FiZap />, title: "Get Paid", desc: "Lender payouts are processed securely once the gear is safely returned." },
  ];

  return (
    <div className="w-full bg-[#FDFDFC] font-epilogue text-[#111] overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="pt-24 pb-16 sm:pt-32 sm:pb-20 md:pt-44 md:pb-32 px-4 sm:px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-accent/10 text-accent px-4 py-1.5 sm:px-5 sm:py-2 rounded-full border border-accent/10 inline-flex items-center gap-2 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-6 sm:mb-8"
        >
          <FiZap size={14}/> Sharing Manual
        </motion.div>
        
        {/* Dynamic Typography Scaling */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-black tracking-tighter leading-[0.9] sm:leading-[0.85] mb-6 sm:mb-10"
        >
          How Rent Friend <br className="hidden sm:block" /> Works.
        </motion.h1>
        
        <p className="text-paragraph text-xs sm:text-sm md:text-lg font-medium max-w-2xl mx-auto leading-relaxed opacity-60 uppercase tracking-widest px-2">
          Dhaka's safest peer-to-peer gear sharing community.
        </p>
      </section>

      {/* --- JOURNEY CARDS --- */}
      <section className="pb-20 sm:pb-32 px-4 sm:px-6">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10">
          
          {/* RENTER CARD (WHITE) */}
          <div className="bg-white p-6 sm:p-10 md:p-16 rounded-[32px] sm:rounded-[48px] border border-gray-100 shadow-[0_40px_100px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-4 mb-10 sm:mb-20">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent rounded-xl sm:rounded-2xl flex items-center justify-center font-black shadow-lg shadow-accent/20 text-sm sm:text-base">R</div>
              <div>
                 <h2 className="text-2xl sm:text-3xl font-black tracking-tighter">For Renters.</h2>
                 <p className="text-[9px] sm:text-[10px] font-bold text-paragraph uppercase tracking-widest">Access the premium gear</p>
              </div>
            </div>

            <div className="space-y-8 sm:space-y-12">
              {renterSteps.map((step, idx) => (
                <motion.div 
                  key={idx} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                  className="flex gap-4 sm:gap-8 group"
                >
                  <div className="relative shrink-0">
                     <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#F8F8F7] rounded-[16px] sm:rounded-[20px] flex items-center justify-center text-txt text-lg sm:text-xl group-hover:bg-accent transition-all duration-500 border border-gray-50">{step.icon}</div>
                     <div className="absolute -top-1.5 -left-1.5 w-5 h-5 sm:w-6 sm:h-6 bg-[#111] text-white rounded-full flex items-center justify-center text-[8px] sm:text-[9px] font-black">{idx + 1}</div>
                  </div>
                  <div className="pt-1">
                    <h4 className="text-base sm:text-lg font-black tracking-tight mb-1 sm:mb-2 uppercase">{step.title}</h4>
                    <p className="text-paragraph text-[11px] sm:text-sm font-medium leading-relaxed opacity-60">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* LENDER CARD (BLACK) */}
          <div className="bg-[#111] p-6 sm:p-10 md:p-16 rounded-[32px] sm:rounded-[48px] text-white shadow-2xl relative overflow-hidden">
            <FiZap className="absolute -right-20 -top-20 text-white/5 pointer-events-none hidden sm:block" size={400} />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10 sm:mb-20">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent rounded-xl sm:rounded-2xl flex items-center justify-center font-black text-txt shadow-lg text-sm sm:text-base">L</div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tighter text-white">For Lenders.</h2>
                  <p className="text-[9px] sm:text-[10px] font-bold text-white/40 uppercase tracking-widest">Monetize your inventory</p>
                </div>
              </div>

              <div className="space-y-8 sm:space-y-12">
                {lenderSteps.map((step, idx) => (
                  <motion.div 
                    key={idx} initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                    className="flex gap-4 sm:gap-8 group"
                  >
                    <div className="relative shrink-0">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/5 rounded-[16px] sm:rounded-[20px] flex items-center justify-center text-accent text-lg sm:text-xl group-hover:bg-white group-hover:text-txt transition-all duration-500 border border-white/5">{step.icon}</div>
                      <div className="absolute -top-1.5 -left-1.5 w-5 h-5 sm:w-6 sm:h-6 bg-accent text-txt rounded-full flex items-center justify-center text-[8px] sm:text-[9px] font-black">{idx + 1}</div>
                    </div>
                    <div className="pt-1">
                      <h4 className="text-base sm:text-lg font-black tracking-tight mb-1 sm:mb-2 uppercase text-white">{step.title}</h4>
                      <p className="text-white/40 text-[11px] sm:text-sm font-medium leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="pb-20 sm:pb-32 px-4 sm:px-6">
        <div className="max-w-[1440px] mx-auto bg-white border border-gray-100 rounded-[32px] sm:rounded-[60px] p-8 sm:p-16 md:p-24 text-center shadow-sm relative overflow-hidden">
           <h2 className="text-3xl sm:text-5xl md:text-8xl font-black tracking-tighter leading-none mb-6 sm:mb-8">Ready to <br /> Start Sharing?</h2>
           <p className="text-paragraph text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-8 sm:mb-12 opacity-40">Renting saves cash, listing makes money. Join the Dhaka creator community today.</p>
           
           <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <Link to="/browse" className="bg-[#111] text-white px-8 py-5 sm:px-10 sm:py-6 rounded-2xl sm:rounded-[24px] font-black uppercase tracking-widest text-[10px] sm:text-[11px] hover:bg-black transition-all flex items-center gap-3 w-full sm:w-auto justify-center">
                Start Renting <FiChevronRight />
              </Link>
              <Link to="/lender/upload" className="bg-accent text-txt px-8 py-5 sm:px-10 sm:py-6 rounded-2xl sm:rounded-[24px] font-black uppercase tracking-widest text-[10px] sm:text-[11px] shadow-xl shadow-accent/20 transition-all hover:-translate-y-1 w-full sm:w-auto justify-center flex items-center gap-3">
                List My Gear <FiZap />
              </Link>
           </div>
        </div>
      </section>

    </div>
  );
};

export default HowItWorks;