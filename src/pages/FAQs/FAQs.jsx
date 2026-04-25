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
    <div className="min-h-screen bg-[#FDFDFC] pt-32 pb-32 font-epilogue text-[#111]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* --- EDITORIAL HEADER --- */}
        <header className="mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div className="max-w-3xl">
            <div className="bg-accent/10 text-accent px-4 py-1.5 rounded-full border border-accent/10 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] mb-8">
              <FiZap size={12}/> Resource Center
            </div>
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85]">
              Common <br /> Queries.
            </h1>
          </div>
          <div className="lg:max-w-xs text-right hidden lg:block">
            <p className="text-[10px] font-black text-paragraph/40 uppercase tracking-widest leading-relaxed">
              CAN'T FIND WHAT YOU'RE LOOKING FOR? REACH OUT TO THE STUDIO SUPPORT TEAM 24/7.
            </p>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* --- SIDEBAR CATEGORIES --- */}
          <aside className="lg:col-span-4 space-y-4 sticky top-32 h-fit">
            <p className="text-[9px] font-black text-paragraph/30 uppercase tracking-[0.4em] mb-8 pl-4">Knowledge Tiers</p>
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => { setActiveCategory(cat.name); setOpenIndex(null); }}
                className={`w-full flex items-center justify-between p-6 rounded-[24px] transition-all border ${
                  activeCategory === cat.name 
                  ? 'bg-[#111] border-[#111] text-white shadow-2xl shadow-black/10' 
                  : 'bg-white border-gray-50 text-paragraph hover:border-accent/30'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className={activeCategory === cat.name ? 'text-accent' : 'text-paragraph/40'}>{cat.icon}</span>
                  <span className="text-xs font-black uppercase tracking-widest">{cat.name} Hub</span>
                </div>
                <FiChevronDown className={`transition-transform ${activeCategory === cat.name ? '-rotate-90' : ''}`} />
              </button>
            ))}

            {/* Support Bento Box */}
            <div className="mt-12 bg-accent p-8 rounded-[32px] shadow-xl shadow-accent/20">
               <h4 className="font-black text-lg tracking-tight mb-2">Still Lost?</h4>
               <p className="text-xs font-bold opacity-60 mb-6 uppercase tracking-widest leading-relaxed">Our concierge is ready.</p>
               <Link to="/contact" className="bg-[#111] text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest inline-block transition-transform hover:-translate-y-1">
                 Contact Support
               </Link>
            </div>
          </aside>

          {/* --- FAQ ACCORDION CONTENT --- */}
          <main className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                {faqData[activeCategory].map((item, idx) => (
                  <div 
                    key={idx}
                    className={`rounded-[32px] border transition-all overflow-hidden ${
                      openIndex === idx ? 'bg-white border-gray-100 shadow-xl shadow-black/5' : 'bg-transparent border-gray-50'
                    }`}
                  >
                    <button 
                      onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                      className="w-full flex items-center justify-between p-8 md:p-10 text-left"
                    >
                      <h3 className="text-lg md:text-xl font-black tracking-tight max-w-[85%] uppercase">
                        {item.q}
                      </h3>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${openIndex === idx ? 'bg-[#111] text-accent rotate-180' : 'bg-gray-50 text-paragraph'}`}>
                         {openIndex === idx ? <FiMinus /> : <FiPlus />}
                      </div>
                    </button>
                    
                    <AnimatePresence>
                      {openIndex === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-8 md:px-10 pb-10"
                        >
                          <div className="h-[1px] w-12 bg-accent mb-6" />
                          <p className="text-paragraph text-sm md:text-base font-medium leading-relaxed opacity-70">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
};

export default FAQs;