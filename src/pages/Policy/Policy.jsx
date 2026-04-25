import React from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiLock, FiEye, FiServer, FiUserCheck, FiZap, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Policy = () => {
  return (
    <div className="min-h-screen bg-[#FDFDFC] pt-32 pb-32 font-epilogue text-[#111]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* --- EDITORIAL HEADER --- */}
        <header className="mb-24">
          <div className="bg-accent/10 text-accent px-4 py-1.5 rounded-full border border-accent/10 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] mb-8">
            <FiShield size={12}/> Security Standard
          </div>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-10">
            Privacy <br /> Protocol.
          </h1>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-gray-100 pt-10">
            <p className="text-paragraph text-sm md:text-lg font-medium max-w-xl leading-relaxed opacity-60 uppercase tracking-widest">
              WE ARE COMMITTED TO PROTECTING YOUR PERSONAL ASSETS AND DIGITAL IDENTITY WITHIN THE STUDIO.
            </p>
            <div className="bg-[#111] text-white px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-[0.3em] inline-block">
              Last Revision: April 2026
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* --- LEFT: NAVIGATION & TRUST --- */}
          <aside className="lg:col-span-4 space-y-8 sticky top-32 h-fit">
            <div className="bg-white p-8 rounded-[32px] border border-gray-50 shadow-sm">
               <p className="text-[9px] font-black text-paragraph/30 uppercase tracking-[0.4em] mb-8">Summary Brief</p>
               <div className="space-y-6">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-accent/10 text-accent rounded-xl flex items-center justify-center shrink-0"><FiLock /></div>
                     <p className="text-[11px] font-black uppercase tracking-widest text-txt">End-to-End Encryption</p>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-accent/10 text-accent rounded-xl flex items-center justify-center shrink-0"><FiUserCheck /></div>
                     <p className="text-[11px] font-black uppercase tracking-widest text-txt">Identity Verification</p>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-accent/10 text-accent rounded-xl flex items-center justify-center shrink-0"><FiServer /></div>
                     <p className="text-[11px] font-black uppercase tracking-widest text-txt">Secure Data Storage</p>
                  </div>
               </div>
            </div>

            <div className="bg-[#111] p-10 rounded-[32px] text-white relative overflow-hidden shadow-2xl">
               <FiZap className="absolute -right-10 -top-10 text-white/5" size={200} />
               <h4 className="text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-6">Concierge Support</h4>
               <p className="text-xs font-bold text-white/40 mb-10 leading-relaxed uppercase tracking-widest">
                  HAVE QUESTIONS ABOUT YOUR DATA? CONTACT OUR PRIVACY OFFICER DIRECTLY.
               </p>
               <Link to="/contact" className="bg-white text-txt px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest inline-block hover:-translate-y-1 transition-all">
                  Contact Protocol
               </Link>
            </div>
          </aside>

          {/* --- RIGHT: THE LEGAL CONTENT --- */}
          <main className="lg:col-span-8 space-y-16">
            
            {/* Introduction */}
            <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <h2 className="text-[10px] font-black text-accent uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-accent" /> 01. Introduction
              </h2>
              <p className="text-lg md:text-xl font-medium leading-relaxed text-paragraph/80 italic">
                Welcome to RentFriend. We respect your privacy and are committed to protecting your personal data. This Privacy Policy informs you how we handle your data when you visit our studio and use our platform.
              </p>
            </motion.section>

            {/* Data Collection */}
            <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <h2 className="text-[10px] font-black text-accent uppercase tracking-[0.4em] mb-8 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-accent" /> 02. Data Acquisition
              </h2>
              <div className="bg-white rounded-[32px] border border-gray-100 p-8 md:p-12 space-y-10">
                <div className="grid md:grid-cols-2 gap-10">
                   <div>
                      <h4 className="text-xs font-black uppercase tracking-widest mb-3">Identity Data</h4>
                      <p className="text-sm font-medium text-paragraph/60 leading-relaxed">Name, username, and government-issued ID for professional verification.</p>
                   </div>
                   <div>
                      <h4 className="text-xs font-black uppercase tracking-widest mb-3">Financial Data</h4>
                      <p className="text-sm font-medium text-paragraph/60 leading-relaxed">Bank account and payment card details processed via AES-256 secure partners.</p>
                   </div>
                </div>
                <div className="pt-10 border-t border-gray-50">
                   <h4 className="text-xs font-black uppercase tracking-widest mb-3">Technical Infrastructure</h4>
                   <p className="text-sm font-medium text-paragraph/60 leading-relaxed">IP address, login metrics, browser version, and regional location data for session security.</p>
                </div>
              </div>
            </motion.section>

            {/* Usage */}
            <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <h2 className="text-[10px] font-black text-accent uppercase tracking-[0.4em] mb-8 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-accent" /> 03. Tactical Usage
              </h2>
              <ul className="space-y-6">
                {[
                  "Facilitating secure rental transactions between users.",
                  "Identity authentication and fraud prevention protocols.",
                  "Managing relationship status and session updates.",
                  "Improving platform infrastructure and user experience."
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-4 text-sm font-bold text-txt">
                    <FiChevronRight className="text-accent" /> {text}
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* Data Security Card */}
            <motion.div 
               initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
               className="bg-[#111] p-12 rounded-[48px] text-white relative overflow-hidden"
            >
               <h2 className="text-[10px] font-black text-accent uppercase tracking-[0.4em] mb-8">04. Security Protocol</h2>
               <p className="text-xl font-bold leading-relaxed mb-8">
                  We have implemented appropriate security measures to prevent your personal data from being lost, used, or accessed in an unauthorized way.
               </p>
               <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center gap-4">
                  <FiShield className="text-accent" size={24} />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Data access is strictly limited to authorized session personnel only.</p>
               </div>
            </motion.div>

            {/* Rights */}
            <section>
              <h2 className="text-[10px] font-black text-accent uppercase tracking-[0.4em] mb-8 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-accent" /> 05. Legal Rights
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {['Data Access', 'Rectification', 'Erasure', 'Object to Processing'].map((right) => (
                  <div key={right} className="bg-white border border-gray-100 p-6 rounded-2xl flex justify-between items-center group hover:border-accent/30 transition-all">
                    <span className="text-xs font-black uppercase tracking-widest">{right}</span>
                    <FiArrowRight className="text-accent opacity-0 group-hover:opacity-100 transition-all" />
                  </div>
                ))}
              </div>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
};

// Simple Arrow icon helper
const FiArrowRight = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
);

export default Policy;