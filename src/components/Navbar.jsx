import { useState, useContext } from 'react'; // Added useContext
import { FiMenu, FiUser, FiX, FiChevronDown, FiLayout, FiLogOut } from "react-icons/fi"; // Added Icons
import { Link, NavLink } from 'react-router-dom';
import { AppContext } from '../context/AppContext'; // Import AppContext
import logo from '../assets/logo 2.svg';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown state
  
  // Detect system login via AppContext
  const { user, logout } = useContext(AppContext);

  // Navigation Links Data
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Browse", path: "/browse" },
    { name: "How it Works", path: "/how-it-works" },
    { name: "List an Item", path: "/list-item" },
    { name: "FAQs", path: "/faqs" },
  ];

  return (
    <nav className="bg-primary w-full border-b border-gray-100 sticky top-0 z-50">
      
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        
        {/* 1. Logo Section */}
        <Link to="/" className="flex-shrink-0">
          <img 
            src={logo} 
            alt="Rent Friend Logo" 
            className="h-6 md:h-8 lg:h-10 w-auto object-contain" 
          />
        </Link>

        {/* 2. Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-accent font-medium text-base transition-colors"
                    : "text-paragraph text-base hover:text-accent transition-colors"
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Action Buttons & Menu */}
        <div className="flex items-center gap-3 md:gap-4">
          
          {!user ? (
            <>
              {/* Sign In Button - Show only if NOT logged in */}
              <Link 
                to="/login"
                className="hidden md:flex items-center gap-2 border border-accent/50 hover:border-accent text-txt font-medium px-4 py-2.5 rounded-lg transition-all hover:bg-secondary whitespace-nowrap"
              >
                <FiUser size={18} />
                <span>Sign In</span>
              </Link>

              {/* Get Started Button - Show only if NOT logged in */}
              <Link 
                to="/signup"
                className="bg-accent hover:bg-accent/90 text-txt font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-opacity whitespace-nowrap"
              >
                Get Started
              </Link>
            </>
          ) : (
            /* USER PROFILE & GLASSMORPHISM DROPDOWN - Show only if logged in */
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 bg-secondary p-1.5 pr-3 rounded-full border border-gray-100 transition-all hover:shadow-sm"
              >
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center font-bold text-txt text-xs uppercase">
                  {user.name.charAt(0)}
                </div>
                <FiChevronDown className={`text-paragraph transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Glassmorphism Dropdown */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-52 bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl py-2 overflow-hidden z-[60]">
                  <div className="px-4 py-2 border-b border-gray-100/50 mb-1">
                    <p className="text-[10px] font-bold text-paragraph uppercase tracking-widest">Account</p>
                    <p className="text-xs font-bold text-txt truncate">{user.email}</p>
                  </div>
                  <Link 
                    to="/dashboard/rentals" 
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-paragraph hover:bg-accent/10 hover:text-accent transition-all"
                  >
                    <FiLayout size={16} /> Dashboard
                  </Link>
                  <button 
                    onClick={() => { logout(); setIsDropdownOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50/50 transition-all border-t border-gray-100/50"
                  >
                    <FiLogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Hamburger Menu */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-txt hover:text-accent transition-colors p-1"
          >
            {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-primary border-b border-gray-100 shadow-lg py-4 px-4 flex flex-col gap-4">
          <ul className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)} 
                  className={({ isActive }) =>
                    isActive
                      ? "block text-accent font-medium text-lg"
                      : "block text-paragraph text-lg hover:text-accent"
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

        
        </div>
      )}
    </nav>
  );
};

export default Navbar;