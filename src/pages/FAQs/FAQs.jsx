import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiHelpCircle, FiZap, FiShield, FiDollarSign, FiPlus, FiMinus } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const FAQs = () => {
  const [activeCategory, setActiveCategory] = useState('General');
  const [openIndex, setOpenIndex] = useState(null);

  const categories = [
    { name: 'General', icon: <FiHelpCircle /> },
    { name: 'Renting', icon: <FiZap /> },
    { name: 'Lending', icon: <FiDollarSign /> },
    { name: 'Security', icon: <FiShield /> }
  ];

  const faqData = {
    General: [
      { q: "What is the Studio Blueprint?", a: "It's our operational standard ensuring that every rental in Bangladesh is backed by verification and professional escrow." },
      { q: "How do I create an account?", a: "Simply join the Studio via the 'Join' button. You can start as a renter and upgrade to a lender profile anytime." }
    ],
    Renting: [
      { q: "How do security deposits work?", a: "Deposits are held safely in our insurance-backed vault and are automatically refunded within 6 hours of a successful return." },
      { q: "Can I cancel a booking?", a: "Yes. Cancellations made 24 hours before the pickup date are eligible for a full refund of the rental fee." }
    ],
    Lending: [
      { q: "How do I receive my payouts?", a: "Once the renter confirms the return and our audit is clear, funds are transferred to your linked account instantly." },
      { q: "What are the platform fees?", a: "We take a flat 10% service fee on successful rentals to maintain the insurance and verification systems." }
    ],
    Security: [
      { q: "What if my gear is damaged?", a: "Our 3-angle audit system documents condition before and after. If damage is confirmed, our protection protocol covers the repair costs." },
      { q: "Is user verification mandatory?", a: "Absolutely. Every user in the Studio must pass our identity verification to ensure community safety." }
    ]
  };

  return (
    <div className="min-h-screen bg-[#FDFDFC] pt-24 pb-20 sm:pt-32 sm:pb-32 font-epilogue text-[#111] overflow-x-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12">
        
        {/* --- EDITORIAL HEADER --- */}
        <header className="mb-12 sm:mb-24">
          <div className="bg-accent/10 text-accent px-4 py-1.5 rounded-full border border-accent/10 inline-flex items-center gap-2 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-6 sm:mb-8">
            <FiZap size={12}/> Resource Center
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black tracking-tighter leading-[0.9] sm:leading-[0.85]">
                Common <br className="hidden sm:block" /> Queries.
              </h1>
            </div>
            <div className="max-w-xs hidden lg:block text-right">
              <p className="text-[10px] font-black text-paragraph/40 uppercase tracking-widest leading-relaxed">
                CAN'T FIND WHAT YOU'RE LOOKING FOR? REACH OUT TO THE STUDIO SUPPORT TEAM 24/7.
              </p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-16">
          
          {/* --- 1. KNOWLEDGE TIERS (Now first on mobile) --- */}
          <aside className="lg:col-span-4 space-y-4 lg:sticky lg:top-32 h-fit order-1">
            <p className="text-[9px] font-black text-paragraph/30 uppercase tracking-[0.4em] mb-6 sm:mb-8 pl-4">Knowledge Tiers</p>
            
            {/* Grid layout for mobile thumb-friendly selection */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => { setActiveCategory(cat.name); setOpenIndex(null); }}
                  className={`flex items-center justify-between p-5 sm:p-6 rounded-[24px] sm:rounded-[32px] transition-all border ${
                    activeCategory === cat.name 
                    ? 'bg-[#111] border-[#111] text-white shadow-xl' 
                    : 'bg-white border-gray-50 text-paragraph hover:border-accent/30 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className={activeCategory === cat.name ? 'text-accent' : 'text-paragraph/40'}>{cat.icon}</span>
                    <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest">{cat.name}</span>
                  </div>
                  <FiChevronDown className={`hidden sm:block transition-transform ${activeCategory === cat.name ? '-rotate-90' : ''}`} />
                </button>
              ))}
            </div>

            {/* Support Bento - Responsive Padding */}
            <div className="mt-8 bg-accent p-6 sm:p-8 rounded-[32px] sm:rounded-[40px] shadow-xl shadow-accent/20 hidden sm:block lg:block">
               <h4 className="font-black text-lg tracking-tight mb-2">Still Lost?</h4>
               <p className="text-[10px] font-bold opacity-60 mb-6 uppercase tracking-widest">Our concierge is ready.</p>
               <Link to="/contact" className="w-full text-center bg-[#111] text-white px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest inline-block transition-all hover:bg-black">
                 Contact Support
               </Link>
            </div>
          </aside>

          {/* --- 2. FAQ ACCORDIONS (Second on mobile) --- */}
          <main className="lg:col-span-8 order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {faqData[activeCategory].map((item, idx) => (
                  <div 
                    key={idx}
                    className={`rounded-[28px] sm:rounded-[40px] border transition-all overflow-hidden ${
                      openIndex === idx ? 'bg-white border-gray-100 shadow-lg' : 'bg-transparent border-gray-50'
                    }`}
                  >
                    <button 
                      onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                      className="w-full flex items-center justify-between p-6 sm:p-10 text-left"
                    >
                      <h3 className="text-base sm:text-xl font-black tracking-tight max-w-[85%] uppercase leading-snug">
                        {item.q}
                      </h3>
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all shrink-0 ${openIndex === idx ? 'bg-[#111] text-accent rotate-180' : 'bg-gray-50 text-paragraph'}`}>
                         {openIndex === idx ? <FiMinus /> : <FiPlus />}
                      </div>
                    </button>
                    
                    <AnimatePresence>
                      {openIndex === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-6 sm:px-10 pb-8 sm:pb-10"
                        >
                          <div className="h-[2px] w-10 bg-accent mb-6 rounded-full" />
                          <p className="text-paragraph text-[13px] sm:text-base font-medium leading-relaxed opacity-70">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Mobile-only Support CTA (Since the sidebar bento might be far down) */}
            <div className="mt-12 sm:hidden bg-accent p-8 rounded-[32px] text-center">
               <h4 className="font-black text-xl tracking-tight mb-2">Can't find it?</h4>
               <Link to="/contact" className="mt-4 bg-[#111] text-white px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest inline-block">
                 Message Support
               </Link>
            </div>
          </main>

        </div>
      </div>
    </div>
  );
};

export default FAQs;