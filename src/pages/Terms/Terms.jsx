import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiFileText, FiUser, FiZap, FiShield, 
  FiDollarSign, FiAlertTriangle, FiSlash, FiMail, FiChevronRight 
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Terms = () => {
  return (
    <div className="min-h-screen bg-[#FDFDFC] pt-32 pb-32 font-epilogue text-[#111]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* --- EDITORIAL HEADER --- */}
        <header className="mb-24">
          <div className="bg-accent/10 text-accent px-4 py-1.5 rounded-full border border-accent/10 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] mb-8">
            <FiFileText size={12}/> Legal Framework
          </div>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-10">
            Service <br /> Protocol.
          </h1>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-gray-100 pt-10">
            <p className="text-paragraph text-sm md:text-lg font-medium max-w-xl leading-relaxed opacity-60 uppercase tracking-widest">
              THIS DOCUMENT CONSTITUTES A LEGALLY BINDING AGREEMENT BETWEEN YOU AND THE RENTFRIEND STUDIO GOVERNING YOUR USE OF OUR ASSETS.
            </p>
            <div className="bg-[#111] text-white px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-[0.3em] inline-block">
              Updated: April 2026
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* --- LEFT: CORE CLAUSES (SIDEBAR) --- */}
          <aside className="lg:col-span-4 space-y-8 sticky top-32 h-fit">
            <div className="bg-white p-8 rounded-[32px] border border-gray-50 shadow-sm">
               <p className="text-[9px] font-black text-paragraph/30 uppercase tracking-[0.4em] mb-8">Protocol Highlights</p>
               <div className="space-y-6">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-accent/10 text-accent rounded-xl flex items-center justify-center shrink-0"><FiUser /></div>
                     <p className="text-[11px] font-black uppercase tracking-widest text-txt">18+ Age Requirement</p>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-accent/10 text-accent rounded-xl flex items-center justify-center shrink-0"><FiShield /></div>
                     <p className="text-[11px] font-black uppercase tracking-widest text-txt">Escrow Security</p>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-accent/10 text-accent rounded-xl flex items-center justify-center shrink-0"><FiSlash /></div>
                     <p className="text-[11px] font-black uppercase tracking-widest text-txt">Anti-Fraud Protection</p>
                  </div>
               </div>
            </div>

            <div className="bg-[#111] p-10 rounded-[32px] text-white relative overflow-hidden shadow-2xl">
               <FiZap className="absolute -right-10 -top-10 text-white/5" size={200} />
               <h4 className="text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-6">Legal Support</h4>
               <p className="text-xs font-bold text-white/40 mb-10 leading-relaxed uppercase tracking-widest">
                  NEED CLARIFICATION ON A SPECIFIC CLAUSE? OUR LEGAL TEAM IS ON STANDBY.
               </p>
               <Link to="/contact" className="bg-white text-txt px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest inline-block hover:-translate-y-1 transition-all">
                  Inquiry Channel
               </Link>
            </div>
          </aside>

          {/* --- RIGHT: THE PROTOCOL CONTENT --- */}
          <main className="lg:col-span-8 space-y-20">
            
            {/* 01. Agreement */}
            <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <h2 className="text-[10px] font-black text-accent uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-accent" /> 01. General Agreement
              </h2>
              <p className="text-lg md:text-xl font-medium leading-relaxed text-paragraph/80 italic">
                By accessing RentFriend, you agree to be bound by these Terms of Protocol. This is a binding agreement ensuring the safety of every asset and user within our studio network.
              </p>
            </motion.section>

            {/* 02. Eligibility */}
            <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <h2 className="text-[10px] font-black text-accent uppercase tracking-[0.4em] mb-8 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-accent" /> 02. Membership Logic
              </h2>
              <div className="bg-white rounded-[32px] border border-gray-100 p-8 md:p-12">
                 <ul className="grid md:grid-cols-2 gap-8">
                    {[
                      { t: "Age Limit", d: "You must be 18+ to initialize a session." },
                      { t: "Data Accuracy", d: "Identity information must be 100% authentic." },
                      { t: "Confidentiality", d: "You are responsible for your session keys (login)." },
                      { t: "Breach Notification", d: "Notify us immediately of unauthorized access." }
                    ].map((item, i) => (
                      <li key={i} className="space-y-1">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-txt">{item.t}</h4>
                        <p className="text-sm font-medium text-paragraph/60">{item.d}</p>
                      </li>
                    ))}
                 </ul>
              </div>
            </motion.section>

            {/* 03 & 04. Role Rules */}
            <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="grid md:grid-cols-2 gap-8">
               <div className="bg-[#111] p-10 rounded-[40px] text-white">
                  <h3 className="text-accent text-[9px] font-black uppercase tracking-[0.4em] mb-6">Lender Protocol</h3>
                  <ul className="space-y-4">
                     {["Provide honest visual documentation.", "Ensure asset safety and function.", "Honor confirmed booking dates."].map((text, i) => (
                       <li key={i} className="text-[11px] font-bold text-white/50 flex gap-3"><FiChevronRight className="text-accent shrink-0"/> {text}</li>
                     ))}
                  </ul>
               </div>
               <div className="bg-secondary/30 p-10 rounded-[40px] border border-gray-100">
                  <h3 className="text-txt text-[9px] font-black uppercase tracking-[0.4em] mb-6">Renter Protocol</h3>
                  <ul className="space-y-4">
                     {["Treat assets with extreme care.", "Execute on-time safe returns.", "Settle all escrow and session fees."].map((text, i) => (
                       <li key={i} className="text-[11px] font-bold text-paragraph/60 flex gap-3"><FiChevronRight className="text-accent shrink-0"/> {text}</li>
                     ))}
                  </ul>
               </div>
            </motion.section>

            {/* 05. Fees */}
            <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <h2 className="text-[10px] font-black text-accent uppercase tracking-[0.4em] mb-8 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-accent" /> 05. Economic Model
              </h2>
              <div className="flex items-center gap-6 bg-white p-8 rounded-3xl border border-gray-50 shadow-sm">
                <FiDollarSign className="text-accent" size={32} />
                <p className="text-sm font-medium leading-relaxed text-paragraph">
                   RentFriend charges a professional service fee for each session. You authorize us to manage rental amounts, service fees, and security holds via our secure payment gateway.
                </p>
              </div>
            </motion.section>

            {/* 06. Damages */}
            <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <h2 className="text-[10px] font-black text-accent uppercase tracking-[0.4em] mb-8 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-accent" /> 06. Dispute Resolution
              </h2>
              <div className="bg-red-50/50 border border-red-100 p-10 rounded-[32px] space-y-6">
                 <div className="flex items-center gap-3 text-red-500">
                    <FiAlertTriangle size={24} />
                    <h4 className="text-xs font-black uppercase tracking-widest">Damage Protocol</h4>
                 </div>
                 <p className="text-sm font-medium leading-relaxed text-red-900/60">
                   If an asset is returned damaged, the Renter is liable for repair costs. RentFriend acts as a neutral mediator using the 3-angle audit data to resolve session disputes.
                 </p>
              </div>
            </motion.section>

            {/* Final Contact */}
            <section className="pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-start gap-8">
               <div>
                  <h4 className="text-xs font-black uppercase tracking-widest mb-2 text-txt">Legal Department</h4>
                  <p className="text-[11px] font-medium text-paragraph/60 uppercase tracking-widest leading-loose">
                    QUESTIONS SHOULD BE DIRECTED TO OUR PRIVACY & COMPLIANCE OFFICE.
                  </p>
               </div>
               <a href="mailto:legal@rentfriend.com" className="flex items-center gap-4 bg-[#F8F8F7] px-8 py-5 rounded-2xl group hover:bg-accent transition-all">
                  <FiMail className="text-accent group-hover:text-txt" />
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