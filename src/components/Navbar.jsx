import { useState } from 'react';
import { FiMenu, FiUser, FiX } from "react-icons/fi";
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo 2.svg';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Navigation Links Data
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Browse", path: "/browse" },
    { name: "How it Works", path: "/how-it-works" },
    { name: "List an Item", path: "/list-item" },
    { name: "FAQs", path: "/faqs" },
  ];

  return (
    // Added w-full to ensure the nav background spans the full width
    <nav className="bg-primary w-full border-b border-gray-100 sticky top-0 z-50">
      
      {/* ALIGNMENT FIX:
        Using the exact same container class as Home.jsx sections:
        max-w-[1440px] mx-auto px-4 md:px-8
      */}
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
          
          {/* Sign In Button */}
          <Link 
            to="/login"
            className="hidden md:flex items-center gap-2 border border-accent/50 hover:border-accent text-txt font-medium px-4 py-2.5 rounded-lg transition-all hover:bg-secondary whitespace-nowrap"
          >
            <FiUser size={18} />
            <span>Sign In</span>
          </Link>

          {/* Get Started Button */}
          <Link 
            to="/signup"
            className="bg-accent hover:bg-accent/90 text-txt font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-opacity whitespace-nowrap"
          >
            Get Started
          </Link>

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
          {/* Mobile Nav Links */}
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

          {/* Mobile Sign In */}
          <div className="md:hidden border-t border-gray-100 pt-4 mt-2">
             <Link 
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 text-paragraph hover:text-accent font-medium"
            >
              <FiUser size={20} />
              <span>Sign In</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;