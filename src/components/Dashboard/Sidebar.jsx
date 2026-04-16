import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FiBox, FiClock, FiHeart, FiSettings, FiLogOut, FiRepeat, FiHome, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const menuItems = [
    { name: 'My Rentals', icon: <FiBox />, path: '/dashboard/rentals' },
    { name: 'Order History', icon: <FiClock />, path: '/dashboard/history' },
  ];

  return (
    <>
      {/* MOBILE OVERLAY (Backdrop) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-txt/40 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* SIDEBAR CONTENT */}
      <aside className={`
        fixed lg:sticky top-0 left-0 z-50 h-screen bg-white border-r border-gray-100 transition-transform duration-300 ease-in-out
        w-72 flex flex-col py-8 px-6
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        
        {/* Header with Close Button for Mobile */}
        <div className="flex items-center justify-between mb-10">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-lg shadow-accent/20">
               <span className="text-txt font-black text-xl">R</span>
            </div>
            <span className="text-xl font-black text-txt tracking-tighter">RentFriend</span>
          </Link>
          <button onClick={() => setIsOpen(false)} className="lg:hidden p-2 text-paragraph hover:text-txt">
            <FiX size={24} />
          </button>
        </div>

        {/* Role Switcher */}
        <div className="mb-8 p-4 bg-secondary rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-paragraph uppercase tracking-widest">View Mode</p>
            <p className="text-sm font-bold text-txt">Renter Hub</p>
          </div>
          <button className="p-2 bg-white rounded-lg text-accent shadow-sm hover:rotate-180 transition-all duration-500">
            <FiRepeat size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-1">
          <Link to="/" className="flex items-center gap-4 px-5 py-3 rounded-2xl font-bold text-[13px] text-paragraph hover:bg-secondary transition-all mb-4">
            <FiHome className="text-lg text-accent" /> Back to Website
          </Link>

          <div className="pt-4 border-t border-gray-50 pb-4">
             <p className="text-[10px] font-bold text-paragraph uppercase tracking-widest px-5 mb-4">Management</p>
             {menuItems.map((item) => (
               <NavLink
                 key={item.name}
                 to={item.path}
                 onClick={() => setIsOpen(false)} // Close on click for mobile
                 className={({ isActive }) => `
                   flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-[13px] transition-all
                   ${isActive 
                     ? 'bg-accent text-txt shadow-lg shadow-accent/20' 
                     : 'text-paragraph hover:bg-secondary hover:text-txt'}
                 `}
               >
                 <span className="text-lg">{item.icon}</span>
                 {item.name}
               </NavLink>
             ))}
          </div>
        </nav>

        <div className="pt-6 border-t border-gray-50">
          <button className="flex items-center gap-4 px-5 py-4 w-full text-red-500 font-bold text-[13px] hover:bg-red-50 rounded-2xl transition-all">
            <FiLogOut className="text-lg" /> Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;