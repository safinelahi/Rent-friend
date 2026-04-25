import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; 
import { 
  FiSearch, FiCalendar, FiShield, FiMapPin, FiStar, 
  FiPlusCircle, FiUserCheck, FiMessageSquare, FiPackage, FiZap, FiChevronRight
} from 'react-icons/fi';

const HowItWorks = () => {
  // Steps Data
  const renterSteps = [
    { icon: <FiSearch />, title: "Find Gear", desc: "Browse thousands of items filters for category, price, and location." },
    { icon: <FiCalendar />, title: "Book Dates", desc: "Select your rental period and send a request to the lender instantly." },
    { icon: <FiShield />, title: "Secure Pay", desc: "Pay safely through RentFriend. We hold the funds until the rental is done." },
    { icon: <FiMapPin />, title: "Pick Up", desc: "Coordinate with the lender to meet and collect your item easily." },
    { icon: <FiStar />, title: "Rate & Return", desc: "Return the item on time and leave a review to build trust." },
  ];

  const lenderSteps = [
    { icon: <FiPlusCircle />, title: "List Items", desc: "Upload photos, set your price, and describe your item's condition." },
    { icon: <FiUserCheck />, title: "Get Verified", desc: "Complete our check to earn a 'Verified' badge and attract users." },
    { icon: <FiMessageSquare />, title: "Accept Requests", desc: "Chat with renters and approve bookings that work for you." },
    { icon: <FiPackage />, title: "Handover", desc: "Meet the renter, give them a quick demo, and hand over the gear." },
    { icon: <FiZap />, title: "Earn Money", desc: "Receive your payout directly once the item is safely returned." },
  ];

  return (
    <div className="w-full bg-[#FDFDFC] font-epilogue text-[#111]">
      
      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-20 md:pt-44 md:pb-32 px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-accent/10 text-accent px-5 py-2 rounded-full border border-accent/10 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] mb-8"
        >
          <FiZap size={14}/> Operation Manual
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
          className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-10"
        >
          The Studio <br /> Blueprint.
        </motion.h1>
        <p className="text-paragraph text-sm md:text-lg font-medium max-w-2xl mx-auto leading-relaxed opacity-60 uppercase tracking-widest">
          WE'VE BUILT THE SAFEST COMMUNITY IN BANGLADESH.
        </p>
      </section>

      {/* --- JOURNEY CARDS --- */}
      <section className="pb-32 px-6">
        <div className="max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-10">
          
          {/* RENTER CARD (WHITE) */}
          <div className="bg-white p-10 md:p-16 rounded-[48px] border border-gray-100 shadow-[0_40px_100px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-4 mb-20">
              <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center font-black shadow-lg shadow-accent/20">R</div>
              <div>
                 <h2 className="text-3xl font-black tracking-tighter">For Renters.</h2>
                 <p className="text-[10px] font-bold text-paragraph uppercase tracking-widest">Access the premium gear</p>
              </div>
            </div>

            <div className="space-y-12">
              {renterSteps.map((step, idx) => (
                <motion.div 
                  key={idx} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                  className="flex gap-8 group"
                >
                  <div className="relative shrink-0">
                     <div className="w-14 h-14 bg-[#F8F8F7] rounded-[20px] flex items-center justify-center text-txt text-xl group-hover:bg-accent transition-all duration-500 border border-gray-50">{step.icon}</div>
                     <div className="absolute -top-2 -left-2 w-6 h-6 bg-[#111] text-white rounded-full flex items-center justify-center text-[9px] font-black">{idx + 1}</div>
                  </div>
                  <div>
                    <h4 className="text-lg font-black tracking-tight mb-2 uppercase">{step.title}</h4>
                    <p className="text-paragraph text-sm font-medium leading-relaxed opacity-60">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* LENDER CARD (BLACK) */}
          <div className="bg-[#111] p-10 md:p-16 rounded-[48px] text-white shadow-2xl relative overflow-hidden">
            <FiZap className="absolute -right-20 -top-20 text-white/5 pointer-events-none" size={400} />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-20">
                <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center font-black text-txt shadow-lg">L</div>
                <div>
                  <h2 className="text-3xl font-black tracking-tighter text-white">For Lenders.</h2>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Monetize your inventory</p>
                </div>
              </div>

              <div className="space-y-12">
                {lenderSteps.map((step, idx) => (
                  <motion.div 
                    key={idx} initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                    className="flex gap-8 group"
                  >
                    <div className="relative shrink-0">
                      <div className="w-14 h-14 bg-white/5 rounded-[20px] flex items-center justify-center text-accent text-xl group-hover:bg-white group-hover:text-txt transition-all duration-500 border border-white/5">{step.icon}</div>
                      <div className="absolute -top-2 -left-2 w-6 h-6 bg-accent text-txt rounded-full flex items-center justify-center text-[9px] font-black">{idx + 1}</div>
                    </div>
                    <div>
                      <h4 className="text-lg font-black tracking-tight mb-2 uppercase text-white">{step.title}</h4>
                      <p className="text-white/40 text-sm font-medium leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="pb-32 px-6">
        <div className="max-w-[1440px] mx-auto bg-white border border-gray-100 rounded-[60px] p-16 md:p-24 text-center shadow-sm relative overflow-hidden">
           <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-8">Ready to <br /> Join the Studio?</h2>
           <p className="text-paragraph text-[10px] font-black uppercase tracking-[0.3em] mb-12 opacity-40">Join thousands sharing and earning every day.</p>
           
           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/browse" className="bg-[#111] text-white px-10 py-6 rounded-[24px] font-black uppercase tracking-widest text-[11px] hover:bg-black transition-all flex items-center gap-3 w-full sm:w-auto justify-center">
                Start Renting <FiChevronRight />
              </Link>
              <Link to="/lender/upload" className="bg-accent text-txt px-10 py-6 rounded-[24px] font-black uppercase tracking-widest text-[11px] shadow-xl shadow-accent/20 transition-all hover:-translate-y-1 w-full sm:w-auto justify-center flex items-center gap-3">
                List My Gear <FiZap />
              </Link>
           </div>
        </div>
      </section>

    </div>
  );
};

export default HowItWorks;