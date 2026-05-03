import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiFileText, FiUser, FiZap, FiShield, 
  FiDollarSign, FiAlertTriangle, FiSlash, FiMail, FiChevronRight 
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Terms = () => {
  return (
    <div className="min-h-screen bg-[#FDFDFC] pt-24 pb-20 sm:pt-32 sm:pb-32 font-epilogue text-[#111] overflow-x-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12">
        
        {/* --- EDITORIAL HEADER --- */}
        <header className="mb-12 sm:mb-24">
          <div className="bg-accent/10 text-accent px-4 py-1.5 rounded-full border border-accent/10 inline-flex items-center gap-2 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-6 sm:mb-8">
            <FiFileText size={12}/> Legal Framework
          </div>
          <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black tracking-tighter leading-[0.9] sm:leading-[0.85] mb-8 sm:mb-10">
            Service <br className="hidden sm:block" /> Protocol.
          </h1>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-gray-100 pt-8 sm:pt-10">
            <p className="text-paragraph text-xs sm:text-sm md:text-lg font-medium max-w-xl leading-relaxed opacity-60 uppercase tracking-widest px-1">
              THIS DOCUMENT CONSTITUTES A LEGALLY BINDING AGREEMENT GOVERNING YOUR USE OF THE RENTFRIEND STUDIO ASSETS.
            </p>
            <div className="bg-[#111] text-white px-5 py-3 rounded-xl text-[8px] sm:text-[9px] font-black uppercase tracking-[0.3em] inline-block self-start md:self-center">
              Updated: April 2026
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16">
          
          {/* --- LEFT: PROTOCOL HIGHLIGHTS (Sidebar - First on Mobile) --- */}
          <aside className="lg:col-span-4 space-y-6 sm:space-y-8 lg:sticky lg:top-32 h-fit order-2 lg:order-1">
            <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-gray-50 shadow-sm">
               <p className="text-[9px] font-black text-paragraph/30 uppercase tracking-[0.4em] mb-6 sm:mb-8 pl-2">Protocol Highlights</p>
               <div className="space-y-5 sm:space-y-6">
                  <div className="flex items-center gap-4 group">
                     <div className="w-10 h-10 bg-accent/10 text-accent rounded-xl flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-txt transition-all"><FiUser /></div>
                     <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-txt">18+ Age Requirement</p>
                  </div>
                  <div className="flex items-center gap-4 group">
                     <div className="w-10 h-10 bg-accent/10 text-accent rounded-xl flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-txt transition-all"><FiShield /></div>
                     <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-txt">Escrow Security</p>
                  </div>
                  <div className="flex items-center gap-4 group">
                     <div className="w-10 h-10 bg-accent/10 text-accent rounded-xl flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-txt transition-all"><FiSlash /></div>
                     <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-txt">Anti-Fraud Protection</p>
                  </div>
               </div>
            </div>

            <div className="bg-[#111] p-8 sm:p-10 rounded-[32px] text-white relative overflow-hidden shadow-2xl">
               <FiZap className="absolute -right-10 -top-10 text-white/5 pointer-events-none" size={180} />
               <h4 className="text-accent text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] mb-6">Legal Support</h4>
               <p className="text-[10px] sm:text-xs font-bold text-white/40 mb-8 sm:mb-10 leading-relaxed uppercase tracking-widest">
                  NEED CLARIFICATION? OUR LEGAL CONCIERGE IS ON STANDBY.
               </p>
               <Link to="/contact" className="w-full text-center bg-white text-txt px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest inline-block transition-transform hover:-translate-y-1 active:scale-95">
                  Inquiry Channel
               </Link>
            </div>
          </aside>

          {/* --- RIGHT: THE PROTOCOL CONTENT --- */}
          <main className="lg:col-span-8 space-y-16 sm:space-y-20 order-1 lg:order-2">
            
            {/* 01. Agreement */}
            <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <h2 className="text-[9px] sm:text-[10px] font-black text-accent uppercase tracking-[0.4em] mb-6 flex items-center gap-3 px-1">
                <span className="w-6 sm:w-8 h-[1px] bg-accent" /> 01. General Agreement
              </h2>
              <p className="text-base sm:text-lg md:text-xl font-medium leading-relaxed text-paragraph/80 italic px-1">
                By accessing RentFriend, you agree to be bound by these Terms of Protocol. This is a binding agreement ensuring the safety of every asset and user within our studio network.
              </p>
            </motion.section>

            {/* 02. Eligibility */}
            <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <h2 className="text-[9px] sm:text-[10px] font-black text-accent uppercase tracking-[0.4em] mb-6 sm:mb-8 flex items-center gap-3 px-1">
                <span className="w-6 sm:w-8 h-[1px] bg-accent" /> 02. Membership Logic
              </h2>
              <div className="bg-white rounded-[28px] sm:rounded-[40px] border border-gray-100 p-6 sm:p-10 md:p-12 shadow-sm">
                 <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
                    {[
                      { t: "Age Limit", d: "You must be 18+ to initialize a session." },
                      { t: "Data Accuracy", d: "Identity information must be 100% authentic." },
                      { t: "Confidentiality", d: "You are responsible for your session keys." },
                      { t: "Breach Notification", d: "Notify us immediately of unauthorized access." }
                    ].map((item, i) => (
                      <li key={i} className="space-y-2">
                        <h4 className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-txt">{item.t}</h4>
                        <p className="text-[11px] sm:text-sm font-medium text-paragraph/60 leading-relaxed">{item.d}</p>
                      </li>
                    ))}
                 </ul>
              </div>
            </motion.section>

            {/* 03 & 04. Role Rules */}
            <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
               <div className="bg-[#111] p-8 sm:p-10 rounded-[32px] sm:rounded-[40px] text-white shadow-xl">
                  <h3 className="text-accent text-[9px] font-black uppercase tracking-[0.4em] mb-6">Lender Protocol</h3>
                  <ul className="space-y-4">
                     {["Provide honest visual documentation.", "Ensure asset safety and function.", "Honor confirmed booking dates."].map((text, i) => (
                       <li key={i} className="text-[11px] font-bold text-white/40 flex gap-3 leading-snug">
                         <FiChevronRight className="text-accent shrink-0 mt-0.5"/> {text}
                       </li>
                     ))}
                  </ul>
               </div>
               <div className="bg-secondary/30 p-8 sm:p-10 rounded-[32px] sm:rounded-[40px] border border-gray-100">
                  <h3 className="text-txt text-[9px] font-black uppercase tracking-[0.4em] mb-6">Renter Protocol</h3>
                  <ul className="space-y-4">
                     {["Treat assets with extreme care.", "Execute on-time safe returns.", "Settle all escrow and session fees."].map((text, i) => (
                       <li key={i} className="text-[11px] font-bold text-paragraph/60 flex gap-3 leading-snug">
                         <FiChevronRight className="text-accent shrink-0 mt-0.5"/> {text}
                       </li>
                     ))}
                  </ul>
               </div>
            </motion.section>

            {/* 05. Fees */}
            <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <h2 className="text-[9px] sm:text-[10px] font-black text-accent uppercase tracking-[0.4em] mb-6 sm:mb-8 flex items-center gap-3 px-1">
                <span className="w-6 sm:w-8 h-[1px] bg-accent" /> 05. Economic Model
              </h2>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 bg-white p-6 sm:p-8 rounded-[28px] sm:rounded-[32px] border border-gray-50 shadow-sm">
                <div className="w-12 h-12 bg-accent/10 text-accent rounded-2xl flex items-center justify-center shrink-0">
                  <FiDollarSign size={24} />
                </div>
                <p className="text-[12px] sm:text-sm font-medium leading-relaxed text-paragraph px-1">
                   RentFriend charges a professional service fee for each session. You authorize us to manage rental amounts, service fees, and security holds via our secure payment gateway.
                </p>
              </div>
            </motion.section>

            {/* 06. Damages */}
            <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <h2 className="text-[9px] sm:text-[10px] font-black text-accent uppercase tracking-[0.4em] mb-6 sm:mb-8 flex items-center gap-3 px-1">
                <span className="w-6 sm:w-8 h-[1px] bg-accent" /> 06. Dispute Resolution
              </h2>
              <div className="bg-red-50/50 border border-red-100 p-8 sm:p-10 rounded-[32px] sm:rounded-[40px] space-y-6">
                 <div className="flex items-center gap-3 text-red-500">
                    <FiAlertTriangle size={24} className="shrink-0" />
                    <h4 className="text-[10px] sm:text-xs font-black uppercase tracking-widest">Damage Protocol</h4>
                 </div>
                 <p className="text-[12px] sm:text-sm font-medium leading-relaxed text-red-900/60 px-1">
                   If an asset is returned damaged, the Renter is liable for repair costs. RentFriend acts as a neutral mediator using the 3-angle audit data to resolve session disputes.
                 </p>
              </div>
            </motion.section>

            {/* Final Contact */}
            <section className="pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-start gap-8 px-1">
               <div className="max-w-md">
                  <h4 className="text-[10px] sm:text-xs font-black uppercase tracking-widest mb-3 text-txt">Legal Department</h4>
                  <p className="text-[10px] sm:text-[11px] font-medium text-paragraph/40 uppercase tracking-widest leading-loose">
                    QUESTIONS SHOULD BE DIRECTED TO OUR PRIVACY & COMPLIANCE OFFICE.
                  </p>
               </div>
               <a href="mailto:legal@rentfriend.com" className="w-full sm:w-auto flex items-center justify-center gap-4 bg-[#F8F8F7] px-8 py-5 rounded-2xl group hover:bg-accent transition-all active:scale-95 shadow-sm">
                  <FiMail className="text-accent group-hover:text-txt transition-colors" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-txt">legal@rentfriend.com</span>
               </a>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
};

export default Terms;