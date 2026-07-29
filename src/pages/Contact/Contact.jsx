import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend, FiZap, FiMessageSquare, FiGlobe } from 'react-icons/fi';

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#FDFDFC] pt-32 pb-32 font-epilogue text-[#111]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* --- EDITORIAL HEADER --- */}
        <header className="mb-24">
          <div className="bg-accent/10 text-accent px-4 py-1.5 rounded-full border border-accent/10 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] mb-8">
            <FiZap size={12}/> Global Support
          </div>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-10">
            Direct <br /> Channel.
          </h1>
          <p className="text-paragraph text-sm md:text-lg font-medium max-w-2xl leading-relaxed opacity-60 uppercase tracking-widest">
            HAVE QUESTIONS ABOUT ASSET DEPLOYMENT OR RENTAL LOGISTICS? <br className="hidden md:block"/> OUR CONCIERGE IS READY TO ASSIST.
          </p>
        </header>

        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* --- LEFT: CONTACT HUB (DARK BENTO) --- */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-5 bg-[#111] rounded-[48px] p-10 md:p-14 text-white relative overflow-hidden shadow-2xl"
          >
            <FiMessageSquare className="absolute -right-10 -top-10 text-white/5 pointer-events-none" size={300} />
            
            <div className="relative z-10 space-y-16">
              <div>
                <p className="text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-10">Information Hub</p>
                
                <div className="space-y-10">
                  <div className="flex gap-6 items-start group">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-accent shrink-0 border border-white/5 group-hover:bg-accent group-hover:text-txt transition-all">
                      <FiMail size={20} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-1">Electronic Mail</p>
                      <h4 className="text-lg font-black tracking-tight">hello@rentfriend.com</h4>
                    </div>
                  </div>

                  <div className="flex gap-6 items-start group">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-accent shrink-0 border border-white/5 group-hover:bg-accent group-hover:text-txt transition-all">
                      <FiPhone size={20} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-1">Direct Line</p>
                      <h4 className="text-lg font-black tracking-tight">+880 1234 567 890</h4>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-10 border-t border-white/10">
                 <div className="grid grid-cols-2 gap-8">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-3 flex items-center gap-2"><FiMapPin className="text-accent"/> Base Office</p>
                      <p className="text-sm font-bold leading-relaxed">Rajshahi Division,<br /> Bangladesh</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-3 flex items-center gap-2"><FiClock className="text-accent"/> Availability</p>
                      <p className="text-sm font-bold leading-relaxed">Mon — Fri<br /> 09:00 — 18:00</p>
                    </div>
                 </div>
              </div>
            </div>
          </motion.div>

          {/* --- RIGHT: MESSAGE STUDIO (LIGHT BENTO) --- */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="lg:col-span-7 bg-white rounded-[48px] border border-gray-100 p-10 md:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.02)]"
          >
            <div className="mb-12">
               <h3 className="text-3xl font-black tracking-tighter mb-2">Message Studio.</h3>
               <p className="text-[10px] font-bold text-paragraph/40 uppercase tracking-widest">Expected response time: &lt; 2 Hours</p>
            </div>

            <form className="space-y-10">
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-paragraph/40 tracking-widest ml-1">Full Name</label>
                  <input type="text" placeholder="Safin Elahi" className="w-full bg-transparent border-b border-gray-100 focus:border-accent outline-none pb-4 font-bold text-sm transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-paragraph/40 tracking-widest ml-1">Email Address</label>
                  <input type="email" placeholder="safin@studio.com" className="w-full bg-transparent border-b border-gray-100 focus:border-accent outline-none pb-4 font-bold text-sm transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-paragraph/40 tracking-widest ml-1">Subject</label>
                <input type="text" placeholder="Asset Verification Inquiry" className="w-full bg-transparent border-b border-gray-100 focus:border-accent outline-none pb-4 font-bold text-sm transition-all" />
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-paragraph/40 tracking-widest ml-1">Detailed Message</label>
                <textarea rows="4" placeholder="How can our concierge team help you today?" className="w-full bg-[#F8F8F7] rounded-3xl p-8 text-sm font-medium outline-none border border-transparent focus:border-accent/20 transition-all resize-none"></textarea>
              </div>

              <button className="w-full bg-[#111] text-white py-6 rounded-[24px] font-black uppercase tracking-[0.3em] text-[11px] shadow-2xl shadow-black/20 hover:bg-black hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
                Dispatch Message <FiSend />
              </button>
            </form>
          </motion.div>

        </div>

        {/* --- FOOTER TRUST ELEMENT --- */}
        <div className="mt-20 text-center">
           <div className="inline-flex items-center gap-4 bg-white px-8 py-4 rounded-full border border-gray-100 shadow-sm">
              <FiGlobe className="text-accent animate-spin-slow" />
              <p className="text-[10px] font-black uppercase tracking-widest text-paragraph/60">
                 Secure local support for the entire <span className="text-txt">Bangladesh Creative Community</span>
              </p>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;