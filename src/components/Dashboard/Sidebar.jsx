import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FiBox, FiClock, FiUser, FiLogOut, FiHome, 
  FiX, FiZap, FiActivity, FiShield 
} from 'react-icons/fi';
import { AppContext } from '../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ isOpen, setIsOpen, activeTab, setActiveTab }) => {
  const { logout } = useContext(AppContext);
  const navigate = useNavigate();

  // 1. Updated Menu Items with Studio Icons
  const menuItems = [
    { id: 'profile', name: 'Identity Hub', icon: <FiUser size={18} /> },
    { id: 'rentals', name: 'Active Session', icon: <FiBox size={18} /> },
    { id: 'history', name: 'Protocol Logs', icon: <FiClock size={18} /> },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {/* --- MOBILE OVERLAY --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#111]/20 backdrop-blur-sm z-[150] lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* --- SIDEBAR CONTAINER --- */}
      <aside className={`fixed lg:static inset-y-0 left-0 w-72 sm:w-80 bg-white border-r border-gray-50 z-[200] transform transition-transform duration-500 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col p-8 sm:p-10">
          
          {/* --- BRANDING --- */}
          <div className="mb-12 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
               <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center font-black text-xl shadow-lg shadow-accent/20 transition-transform group-hover:rotate-12">
                 R
               </div>
               <span className="font-black text-[#111] text-xl tracking-tighter uppercase">Studio</span>
            </Link>
            <button onClick={() => setIsOpen(false)} className="lg:hidden p-2 text-paragraph/40 hover:text-accent transition-colors">
              <FiX size={24}/>
            </button>
          </div>

          {/* --- NAVIGATION --- */}
          <nav className="flex-1 flex flex-col">
            <Link to="/" className="flex items-center gap-3 px-6 py-4 text-paragraph/60 hover:text-accent transition-all font-black uppercase text-[10px] tracking-[0.3em] mb-8 bg-[#F8F8F7] rounded-[18px] border border-gray-50">
               <FiHome size={16} /> Back to Web
            </Link>

            <div className="space-y-3">
              <p className="text-[9px] font-black text-paragraph/20 uppercase tracking-[0.4em] mb-6 pl-4">Command Center</p>
              
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-[20px] transition-all font-black text-[10px] uppercase tracking-[0.3em] ${
                    activeTab === item.id 
                    ? 'bg-[#111] text-white shadow-xl shadow-black/10' 
                    : 'text-paragraph/60 hover:bg-[#F8F8F7] hover:text-[#111]'
                  }`}
                >
                  <span className={activeTab === item.id ? 'text-accent' : ''}>{item.icon}</span>
                  {item.name}
                </button>
              ))}
            </div>

            {/* --- SECURITY BADGE (STUDIO STYLE) --- */}
            <div className="mt-10 p-6 bg-[#F8F8F7] rounded-[24px] border border-gray-50 relative overflow-hidden hidden sm:block">
               <FiShield className="absolute -right-4 -bottom-4 text-accent/5" size={80} />
               <p className="text-[8px] font-black text-accent uppercase tracking-widest mb-1">Status</p>
               <p className="text-[10px] font-black text-[#111] uppercase tracking-tighter flex items-center gap-2">
                 <FiZap size={10} className="text-accent animate-pulse" /> Encrypted Session
               </p>
            </div>
          </nav>

          {/* --- TERMINATION (LOGOUT) --- */}
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 px-6 py-5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-[20px] transition-all font-black uppercase text-[10px] tracking-[0.3em] mt-auto group border border-transparent hover:border-red-100"
          >
            <FiLogOut size={18} className="group-hover:-translate-x-1 transition-transform" /> 
            Termination
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;