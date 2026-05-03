import { useState, useContext, useEffect, useRef } from 'react';
import { FiMenu, FiX, FiChevronDown, FiLayout, FiLogOut, FiZap, FiActivity, FiHelpCircle, FiPhoneCall } from "react-icons/fi";
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo 2.svg';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout, isLender } = useContext(AppContext);
  const location = useLocation();
  const dropdownRef = useRef(null);

  // 1. Logic to close the dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 2. Close both menus when the route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  }, [location]);

  // 3. Prevent body scrolling when the mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  // Updated navLinks to include Contact
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Browse", path: "/browse" },
    { name: "How it Works", path: "/how-it-works" },
    { name: isLender ? "List Gear" : "Start Earning", path: "/lender/upload" },
    { name: "FAQs", path: "/faqs" },
    { name: "Contact", path: "/contact" }, // Added Contact Option
  ];

  return (
    <nav className="bg-white w-full border-b border-gray-50 sticky top-0 z-[1000]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 h-20 flex items-center justify-between">
        
        {/* --- LOGO SECTION --- */}
        <Link to="/" className="flex-shrink-0 relative z-[1100]">
          <img src={logo} alt="Rent Friend" className="h-7 md:h-8 lg:h-9 object-contain" />
        </Link>

        {/* --- DESKTOP NAVIGATION LINKS --- */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `text-[10px] xl:text-[11px] font-black uppercase tracking-[0.25em] transition-all ${
                    isActive ? "text-accent" : "text-paragraph/40 hover:text-accent"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* --- AUTHENTICATION ACTIONS --- */}
        <div className="flex items-center gap-3 sm:gap-4 relative z-[1100]">
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login" className="hidden sm:block text-txt font-black text-[10px] uppercase tracking-widest px-4 py-2.5">
                Sign In
              </Link>
              <Link to="/signup" className="bg-[#111] text-white font-black text-[9px] sm:text-[10px] uppercase px-5 sm:px-7 py-3 rounded-xl shadow-lg">
                Join
              </Link>
            </div>
          ) : (
            /* --- USER DROPDOWN BUTTON --- */
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDropdownOpen(!isDropdownOpen);
                }}
                className={`flex items-center gap-2 sm:gap-3 bg-[#F8F8F7] p-1.5 pr-3 sm:pr-4 rounded-full border transition-all ${isDropdownOpen ? 'border-accent ring-2 ring-accent/10' : 'border-gray-100'}`}
              >
                <div className="w-8 h-8 rounded-full bg-[#111] flex items-center justify-center font-black text-accent text-[10px]">
                  {user.name.charAt(0)}
                </div>
                <FiChevronDown className={`text-paragraph/30 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                    className="absolute right-0 mt-4 w-60 bg-white rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-50 py-3 overflow-hidden"
                  >
                    <div className="px-6 py-3 border-b border-gray-50 mb-1">
                      <p className="text-[11px] font-black text-txt truncate">{user.name}</p>
                    </div>
                    <Link to="/dashboard/rentals" className="flex items-center gap-3 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-paragraph hover:bg-[#F8F8F7]">
                      <FiActivity size={14} className="text-accent" /> Renter Hub
                    </Link>
                    {isLender && (
                      <Link to="/lender-dashboard" className="flex items-center gap-3 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-paragraph hover:bg-[#F8F8F7]">
                        <FiLayout size={14} className="text-accent" /> Lender Hub
                      </Link>
                    )}
                    {/* Updated Link to Contact */}
                    <Link to="/contact" className="flex items-center gap-3 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-paragraph hover:bg-[#F8F8F7]">
                      <FiPhoneCall size={14} className="text-accent" /> Contact Us
                    </Link>
                    <button onClick={logout} className="w-full flex items-center gap-3 px-6 py-4 text-[10px] font-black uppercase text-red-500 hover:bg-red-50 border-t border-gray-50 mt-1">
                      <FiLogOut size={14} /> End Session
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* MOBILE TOGGLE BUTTON */}
          <button 
            onClick={() => setIsMenuOpen(true)} 
            className="lg:hidden w-10 h-10 flex items-center justify-center bg-[#F8F8F7] rounded-full text-txt"
          >
            <FiMenu size={20} />
          </button>
        </div>
      </div>

      {/* --- MOBILE DRAWER SECTION --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Dark Overlay Background */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-[#111]/40 backdrop-blur-md z-[2000]"
            />
            {/* Drawer Sidebar */}
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              className="fixed inset-y-0 right-0 w-[280px] bg-white z-[2100] shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between px-6 h-20 border-b border-gray-50">
                <img src={logo} alt="Logo" className="h-6" />
                <button onClick={() => setIsMenuOpen(false)} className="w-10 h-10 flex items-center justify-center bg-[#F8F8F7] rounded-full">
                  <FiX size={20} />
                </button>
              </div>
              
              <ul className="flex-1 px-6 pt-6 overflow-y-auto">
                {navLinks.map((link) => (
                  <li key={link.name} className="mb-2">
                    <Link 
                      to={link.path} 
                      className={`block py-3 text-[11px] font-black uppercase tracking-[0.2em] transition-colors ${
                        location.pathname === link.path ? "text-accent" : "text-txt"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}

                {/* --- MOBILE USER SECTION --- */}
                {user && (
                  <div className="mt-8 pt-8 border-t border-gray-50 space-y-2">
                    <p className="px-1 text-[9px] font-black uppercase tracking-widest text-paragraph/40 mb-4">User Controls</p>
                    <li>
                      <Link 
                        to="/dashboard/rentals" 
                        className="flex items-center gap-3 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-txt"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <FiActivity className="text-accent" /> Renter Hub
                      </Link>
                    </li>
                    {isLender && (
                      <li>
                        <Link 
                          to="/lender-dashboard" 
                          className="flex items-center gap-3 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-txt"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <FiLayout className="text-accent" /> Lender Hub
                        </Link>
                      </li>
                    )}
                    {/* Added Mobile Contact Link */}
                    <li>
                      <Link 
                        to="/contact" 
                        className="flex items-center gap-3 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-txt"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <FiPhoneCall className="text-accent" /> Contact Us
                      </Link>
                    </li>
                    <li>
                      <button 
                        onClick={() => { logout(); setIsMenuOpen(false); }}
                        className="w-full flex items-center gap-3 py-4 mt-4 text-[11px] font-black uppercase tracking-[0.2em] text-red-500 border-t border-gray-50 text-left"
                      >
                        <FiLogOut /> Sign Out
                      </button>
                    </li>
                  </div>
                )}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;