import { useState, useContext } from 'react';
import { FiMenu, FiUser, FiX, FiChevronDown, FiLayout, FiLogOut, FiPlusSquare, FiZap, FiActivity } from "react-icons/fi";
import { Link, NavLink } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import logo from '../assets/logo 2.svg';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const { user, logout, isLender } = useContext(AppContext);

  // Dynamic Navigation: Changes based on user role
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Browse", path: "/browse" },
    { name: "How it Works", path: "/how-it-works" },
    // If not a lender, show "Start Earning" to encourage them to list
    { name: isLender ? "List Gear" : "Start Earning", path: "/lender/upload" },
    { name: "FAQs", path: "/faqs" },
  ];

  return (
    <nav className="bg-white w-full border-b border-gray-50 sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="flex-shrink-0 group">
          <img src={logo} alt="Rent Friend" className="h-7 md:h-9 object-contain group-hover:opacity-80 transition-opacity" />
        </Link>

        {/* MAIN NAVIGATION */}
        <ul className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive 
                    ? "text-accent font-black text-[11px] uppercase tracking-[0.2em] transition-all" 
                    : "text-paragraph/60 text-[11px] font-bold uppercase tracking-[0.2em] hover:text-accent transition-all"
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* AUTH ACTIONS */}
        <div className="flex items-center gap-3 md:gap-4">
          {!user ? (
            <>
              <Link to="/login" className="hidden md:flex items-center gap-2 text-txt font-black text-[10px] uppercase tracking-widest px-6 py-3 transition-all hover:text-accent">
                Sign In
              </Link>
              <Link to="/signup" className="bg-[#111] text-white font-black text-[10px] uppercase tracking-[0.2em] px-7 py-3.5 rounded-xl shadow-xl shadow-black/10 transition-all hover:-translate-y-0.5 active:scale-95">
                Join Studio
              </Link>
            </>
          ) : (
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 bg-[#F8F8F7] p-1.5 pr-4 rounded-full border border-gray-100 transition-all hover:shadow-md group"
              >
                <div className="w-8 h-8 rounded-full bg-[#111] flex items-center justify-center font-black text-accent text-[10px] uppercase group-hover:rotate-12 transition-transform">
                  {user.name.charAt(0)}
                </div>
                <div className="text-left hidden md:block">
                  <p className="text-[9px] font-black uppercase text-txt leading-none mb-0.5">{user.name.split(' ')[0]}</p>
                  <p className="text-[8px] font-bold uppercase text-accent leading-none tracking-widest">{isLender ? 'Lender' : 'Renter'}</p>
                </div>
                <FiChevronDown className={`text-paragraph/40 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* DROPDOWN MENU */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-4 w-64 bg-white rounded-[32px] shadow-[0_40px_80px_rgba(0,0,0,0.08)] border border-gray-50 py-4 overflow-hidden z-[60]">
                  <div className="px-7 py-5 border-b border-gray-50 mb-2">
                    <p className="text-[9px] font-black text-paragraph/40 uppercase tracking-[0.2em] mb-1">Session Identity</p>
                    <p className="text-xs font-black text-txt truncate">{user.email}</p>
                  </div>
                  
                  {/* Common Link */}
                  <Link to="/dashboard/rentals" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-4 px-7 py-4 text-[10px] font-black uppercase tracking-widest text-paragraph hover:bg-[#F8F8F7] hover:text-txt transition-all">
                    <FiActivity size={16} className="text-accent" /> Renter Hub
                  </Link>
                  
                  {/* Conditional Link: Lender Hub or Upgrade Option */}
                  {isLender ? (
                    <Link to="/lender-dashboard" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-4 px-7 py-4 text-[10px] font-black uppercase tracking-widest text-paragraph hover:bg-[#F8F8F7] hover:text-txt transition-all">
                      <FiLayout size={16} className="text-accent" /> Lender Hub
                    </Link>
                  ) : (
                    <Link to="/lender/upload" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-4 px-7 py-4 text-[10px] font-black uppercase tracking-widest text-accent hover:bg-accent/5 transition-all bg-accent/5">
                      <FiZap size={16} /> Become a Lender
                    </Link>
                  )}

                  <button 
                    onClick={() => { logout(); setIsDropdownOpen(false); }}
                    className="w-full flex items-center gap-4 px-7 py-5 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all border-t border-gray-50 mt-2"
                  >
                    <FiLogOut size={16} /> End Session
                  </button>
                </div>
              )}
            </div>
          )}

          {/* MOBILE TOGGLE */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-txt p-1 hover:bg-[#F8F8F7] rounded-lg transition-colors">
            {isMenuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;