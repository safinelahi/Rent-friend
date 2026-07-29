import React from "react";
import { motion } from "framer-motion";
import {
  FiShield,
  FiLock,
  FiEye,
  FiServer,
  FiUserCheck,
  FiZap,
  FiChevronRight,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const Policy = () => {
  return (
    <div className="min-h-screen bg-[#FDFDFC] pt-24 pb-20 sm:pt-32 sm:pb-32 font-epilogue text-[#111] overflow-x-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12">
        {/* --- EDITORIAL HEADER --- */}
        <header className="mb-12 sm:mb-24">
          <div className="bg-accent/10 text-accent px-4 py-1.5 rounded-full border border-accent/10 inline-flex items-center gap-2 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-6 sm:mb-8">
            <FiShield size={12} /> Security Standard
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-black tracking-tighter leading-[0.9] sm:leading-[0.85] mb-6 sm:mb-10">
            Privacy <br className="hidden sm:block" /> Policy.
          </h1>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-gray-100 pt-8 sm:pt-10">
            <p className="text-paragraph text-xs sm:text-sm md:text-lg font-medium max-w-xl leading-relaxed opacity-60 uppercase tracking-widest px-1">
              We are committed to protecting your personal information and digital identity.
            </p>
            <div className="bg-[#111] text-white px-5 py-3 rounded-xl text-[8px] sm:text-[9px] font-black uppercase tracking-[0.3em] inline-block self-start md:self-center">
              Last Revision: April 2026
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16">
          {/* --- LEFT: NAVIGATION & TRUST (Sidebar) --- */}
          <aside className="lg:col-span-4 space-y-6 sm:space-y-8 lg:sticky lg:top-32 h-fit order-2 lg:order-1">
            <div className="bg-white p-6 sm:p-8 rounded-[28px] sm:rounded-[32px] border border-gray-50 shadow-sm">
              <p className="text-[9px] font-black text-paragraph/30 uppercase tracking-[0.4em] mb-6 sm:mb-8">
                Summary Brief
              </p>
              <div className="space-y-5 sm:space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-accent/10 text-accent rounded-xl flex items-center justify-center shrink-0">
                    <FiLock />
                  </div>
                  <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-txt">
                    End-to-End Encryption
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-accent/10 text-accent rounded-xl flex items-center justify-center shrink-0">
                    <FiUserCheck />
                  </div>
                  <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-txt">
                    Identity Verification
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-accent/10 text-accent rounded-xl flex items-center justify-center shrink-0">
                    <FiServer />
                  </div>
                  <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-txt">
                    Secure Data Storage
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#111] p-8 sm:p-10 rounded-[28px] sm:rounded-[32px] text-white relative overflow-hidden shadow-2xl">
              <FiZap
                className="absolute -right-10 -top-10 text-white/5 pointer-events-none"
                size={180}
              />
              <h4 className="text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-6">
                Concierge Support
              </h4>
              <p className="text-[10px] sm:text-xs font-bold text-white/40 mb-8 sm:mb-10 leading-relaxed uppercase tracking-widest">
                HAVE QUESTIONS ABOUT YOUR DATA? CONTACT OUR PRIVACY OFFICER
                DIRECTLY.
              </p>
              <Link
                to="/contact"
                className="w-full text-center bg-white text-txt px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest inline-block transition-transform hover:-translate-y-1"
              >
                Contact Us
              </Link>
            </div>
          </aside>

          {/* --- RIGHT: THE LEGAL CONTENT --- */}
          <main className="lg:col-span-8 space-y-12 sm:space-y-16 order-1 lg:order-2">
            {/* Introduction */}
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[9px] sm:text-[10px] font-black text-accent uppercase tracking-[0.4em] mb-4 sm:mb-6 flex items-center gap-3">
                <span className="w-6 sm:w-8 h-[1px] bg-accent" /> 01.
                Introduction
              </h2>
              <p className="text-base sm:text-lg md:text-xl font-medium leading-relaxed text-paragraph/80 italic">
                Welcome to RentFriend. We respect your privacy and are committed
                to protecting your personal data. This Privacy Policy informs
                you how we handle your data when you visit our studio and use
                our platform.
              </p>
            </motion.section>

            {/* Data Collection */}
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[9px] sm:text-[10px] font-black text-accent uppercase tracking-[0.4em] mb-6 sm:mb-8 flex items-center gap-3">
                <span className="w-6 sm:w-8 h-[1px] bg-accent" /> 02. Data
                Collection
              </h2>
              <div className="bg-white rounded-[28px] sm:rounded-[32px] border border-gray-100 p-6 sm:p-10 md:p-12 space-y-8 sm:space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
                  <div>
                    <h4 className="text-[10px] sm:text-xs font-black uppercase tracking-widest mb-3">
                      Identity Data
                    </h4>
                    <p className="text-[11px] sm:text-sm font-medium text-paragraph/60 leading-relaxed">
                      Name, username, and government-issued ID for professional
                      verification.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[10px] sm:text-xs font-black uppercase tracking-widest mb-3">
                      Financial Data
                    </h4>
                    <p className="text-[11px] sm:text-sm font-medium text-paragraph/60 leading-relaxed">
                      Bank account and payment card details processed via
                      secure partners.
                    </p>
                  </div>
                </div>
                <div className="pt-8 sm:pt-10 border-t border-gray-50">
                  <h4 className="text-[10px] sm:text-xs font-black uppercase tracking-widest mb-3">
                    Technical Data
                  </h4>
                  <p className="text-[11px] sm:text-sm font-medium text-paragraph/60 leading-relaxed">
                    IP address, login metrics, browser version, and regional
                    location data for account security.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Usage */}
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[9px] sm:text-[10px] font-black text-accent uppercase tracking-[0.4em] mb-6 sm:mb-8 flex items-center gap-3">
                <span className="w-6 sm:w-8 h-[1px] bg-accent" /> 03. Data
                Usage
              </h2>
              <ul className="space-y-4 sm:space-y-6">
                {[
                  "Facilitating secure rental transactions between users.",
                  "Identity authentication and fraud prevention.",
                  "Managing relationship status and account updates.",
                  "Improving platform infrastructure and user experience.",
                ].map((text, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-4 text-xs sm:text-sm font-bold text-txt"
                  >
                    <FiChevronRight className="text-accent shrink-0 mt-0.5" />{" "}
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* Data Security Card */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="bg-[#111] p-8 sm:p-12 rounded-[32px] sm:rounded-[48px] text-white relative overflow-hidden shadow-xl"
            >
              <h2 className="text-[9px] sm:text-[10px] font-black text-accent uppercase tracking-[0.4em] mb-6 sm:mb-8">
                04. Security Policy
              </h2>
              <p className="text-lg sm:text-xl font-bold leading-relaxed mb-6 sm:mb-8 px-1">
                We have implemented appropriate security measures to prevent
                your personal data from being lost, used, or accessed in an
                unauthorized way.
              </p>
              <div className="bg-white/5 border border-white/10 p-5 sm:p-6 rounded-2xl flex items-center gap-4">
                <FiShield className="text-accent shrink-0" size={24} />
                <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-white/60 leading-relaxed">
                  Data access is strictly limited to authorized
                  personnel only.
                </p>
              </div>
            </motion.div>

            {/* --- LEGAL RIGHTS (INTERACTIVE) --- */}
            <section>
              <h2 className="text-[9px] sm:text-[10px] font-black text-accent uppercase tracking-[0.4em] mb-6 sm:mb-8 flex items-center gap-3">
                <span className="w-6 sm:w-8 h-[1px] bg-accent" /> 05. Legal
                Rights
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Data Access",
                    desc: "Request a copy of all personal data we hold about your account.",
                  },
                  {
                    title: "Rectification",
                    desc: "Correct any inaccurate or incomplete identity information in your profile.",
                  },
                  {
                    title: "Erasure",
                    desc: "Request the permanent deletion of your account and rental history from our servers.",
                  },
                  {
                    title: "Object to Processing",
                    desc: "Restrict how we use your data for marketing.",
                  },
                ].map((right, idx) => (
                  <motion.div
                    key={idx}
                    initial={false}
                    whileHover={{ borderColor: "#FFB800" }} // Hover korle border accent hobe
                    className="bg-white border border-gray-100 p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] transition-all cursor-help group relative overflow-hidden"
                  >
                    {/* Title & Arrow */}
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-txt">
                        {right.title}
                      </span>
                      <FiZap
                        className="text-accent opacity-0 group-hover:opacity-100 transition-all transform group-hover:rotate-12"
                        size={14}
                      />
                    </div>

                    {/* Description - Visible on Hover/Click */}
                    <p className="text-[11px] sm:text-xs font-medium text-paragraph/40 leading-relaxed group-hover:text-paragraph/80 transition-colors">
                      {right.desc}
                    </p>

                    {/* Subtle Decoration */}
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent/5 rounded-full blur-xl group-hover:bg-accent/20 transition-all" />
                  </motion.div>
                ))}
              </div>

              <p className="mt-8 text-[9px] font-bold text-paragraph/30 uppercase tracking-widest text-center">
                To exercise any of these rights, please contact our privacy
                office.
              </p>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

// Simple Arrow icon helper
const FiArrowRight = ({ className }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

export default Policy;
