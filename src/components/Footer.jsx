import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";
import { FiArrowUpRight, FiShield, FiGlobe, FiZap } from "react-icons/fi";
import whiteLogo from "../assets/icon 1.svg"; // Ensure this matches your logo path
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#111] text-white pt-24 pb-12 w-full font-epilogue overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* --- MAIN GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">
          
          {/* 1. BRAND STORY */}
          <div className="lg:col-span-4 space-y-8">
            <Link to="/" className="inline-block group">
              <img src={whiteLogo} alt="RentFriend" className="h-10 transition-transform group-hover:rotate-12" />
            </Link>
            <h2 className="text-2xl font-bold tracking-tighter leading-tight max-w-xs text-gray-300">
              The sustainable studio for the modern creative. <span className="text-accent">Own less, create more.</span>
            </h2>
            
            <div className="flex items-center gap-4 pt-4">
              {[FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-gray-500 hover:bg-accent hover:text-txt transition-all shadow-2xl">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* 2. FOR RENTERS */}
          <div className="lg:col-span-2">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-8">For Renters</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/browse" className="text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all flex items-center gap-2 group">
                  Browse Inventory <FiArrowUpRight className="opacity-0 group-hover:opacity-100 transition-all text-accent" />
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all">
                  How it Works
                </Link>
              </li>
              <li>
                <Link to="/dashboard/rentals" className="text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all">
                  Renter Hub
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all">
                  Safety & Trust
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. FOR LENDERS */}
          <div className="lg:col-span-2">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-8">For Lenders</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/lender/upload" className="text-[11px] font-black uppercase tracking-widest text-white flex items-center gap-2 group">
                  List My Gear <FiZap className="text-accent" />
                </Link>
              </li>
              <li>
                <Link to="/lender-dashboard" className="text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all">
                  Lender Hub
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all">
                  Earning Guide
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all">
                  Protection
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. COMPANY */}
          <div className="lg:col-span-2">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-8">Company</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/contact" className="text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all">
                  System FAQs
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* 5. CONTACT WIDGET */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/5 p-8 rounded-[32px] border border-white/5 relative overflow-hidden group hover:border-accent/20 transition-all">
              <p className="text-[9px] font-black uppercase tracking-widest text-gray-500 mb-4">Direct Channel</p>
              <a href="mailto:hello@rentfriend.com" className="text-[10px] font-black text-accent break-all flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                <FaEnvelope /> HELLO@RENTFRIEND.COM
              </a>
              <FiZap className="absolute -right-4 -bottom-4 text-white/5 group-hover:text-accent/10 transition-colors" size={80} />
            </div>
            <div className="flex items-center gap-2 px-4">
               <FiGlobe className="text-accent animate-spin-slow" />
               <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Global / Bangladesh</span>
            </div>
          </div>

        </div>

        {/* --- BOTTOM STRIP --- */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">
              © 2026 RENTFRIEND STUDIO
            </p>
            <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-gray-700 bg-white/5 px-4 py-2 rounded-full border border-white/5">
               <FiShield className="text-accent" /> SECURE PAYMENT
            </div>
          </div>
          
          <div className="flex space-x-10">
            <Link to="/privacy-policy" className="text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-accent transition-colors">
              Privacy
            </Link>
            <Link to="/terms-of-service" className="text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-accent transition-colors">
              Terms
            </Link>
            <Link to="/contact" className="text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-accent transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;