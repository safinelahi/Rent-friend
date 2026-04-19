import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiBox, FiClock, FiUser, FiLogOut, FiHome, FiRepeat, FiX } from 'react-icons/fi';
import { AppContext } from '../../context/AppContext';

const Sidebar = ({ isOpen, setIsOpen, activeTab, setActiveTab }) => {
  const { logout } = useContext(AppContext);
  const navigate = useNavigate();

  // 1. Updated Menu Items with Profile at the TOP
  const menuItems = [
    { id: 'profile', name: 'Profile', icon: <FiUser size={18} /> },
    { id: 'rentals', name: 'My Rentals', icon: <FiBox size={18} /> },
    { id: 'history', name: 'Order History', icon: <FiClock size={18} /> },
  ];

  // 4. FIXED: Function to handle logout and redirect
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <div className={`fixed inset-0 bg-txt/20 backdrop-blur-sm z-40 lg:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsOpen(false)} />

      <aside className={`fixed lg:static inset-y-0 left-0 w-72 bg-white border-r border-gray-100 z-50 transform transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col p-8">
          
          <div className="mb-10 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
               <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center font-black text-lg">R</div>
               <span className="font-black text-txt text-xl tracking-tighter uppercase">RentFriend</span>
            </Link>
            <button onClick={() => setIsOpen(false)} className="lg:hidden p-2 text-paragraph"><FiX size={20}/></button>
          </div>

          <nav className="space-y-2 flex-1 pt-4">
            <Link to="/" className="flex items-end gap-2 px-6 py-4 text-paragraph  transition-all font-black uppercase text-[11px] tracking-widest mb-6">
               <FiHome size={18} className="text-accent" /> Back to Website
            </Link>

            <div className="space-y-2">
              <p className="text-[9px] font-black text-paragraph uppercase tracking-[0.2em] mb-6 ml-6 opacity-50">Management</p>
              
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-black text-xs uppercase tracking-widest ${
                    activeTab === item.id 
                    ? 'bg-accent text-txt shadow-lg shadow-accent/20' 
                    : 'text-paragraph hover:bg-secondary hover:text-txt'
                  }`}
                >
                  {item.icon} {item.name}
                </button>
              ))}
            </div>
          </nav>

          {/* 4. FIXED: Logout button now works */}
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 px-6 py-4 text-red-500 hover:bg-red-50 rounded-2xl transition-all font-black uppercase text-[11px] tracking-widest mt-auto group"
          >
            <FiLogOut size={18} className="group-hover:-translate-x-1 transition-transform" /> Sign Out
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;