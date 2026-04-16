import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FiBox, FiClock, FiHeart, FiSettings, FiLogOut, FiRepeat, FiHome } from 'react-icons/fi';

const Sidebar = () => {
  const menuItems = [
    { name: 'My Rentals', icon: <FiBox />, path: '/dashboard/rentals' },
    { name: 'Order History', icon: <FiClock />, path: '/dashboard/history' },
  ];

  return (
    <aside className="w-72 bg-white border-r border-gray-100 h-screen sticky top-0 hidden lg:flex flex-col py-8 px-6">
      
      {/* BRAND LOGO: The professional way to go home */}
      <Link to="/" className="flex items-center gap-2 px-4 mb-10 group">
        <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-lg shadow-accent/20 group-hover:scale-105 transition-transform">
           <span className="text-txt font-black text-xl">R</span>
        </div>
        <span className="text-xl font-black text-txt tracking-tighter">RentFriend</span>
      </Link>

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

      <nav className="flex-1 space-y-2">
        {/* Added an explicit "Back to Home" link for better UX */}
        <Link
          to="/"
          className="flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-[13px] text-paragraph hover:bg-secondary hover:text-txt transition-all mb-4"
        >
          <FiHome className="text-lg text-accent" />
          Back to Website
        </Link>

        <div className="pt-4 border-t border-gray-50 pb-4">
           <p className="text-[10px] font-bold text-paragraph uppercase tracking-widest px-5 mb-4">Management</p>
           {menuItems.map((item) => (
             <NavLink
               key={item.name}
               to={item.path}
               className={({ isActive }) => `
                 flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-[13px] transition-all
                 ${isActive 
                   ? 'bg-accent text-txt shadow-[0_10px_20px_rgba(255,184,0,0.15)]' 
                   : 'text-paragraph hover:bg-secondary hover:text-txt'}
               `}
             >
               <span className="text-lg">{item.icon}</span>
               {item.name}
             </NavLink>
           ))}
        </div>
      </nav>

      {/* Logout */}
      <div className="pt-6 border-t border-gray-50">
        <button className="flex items-center gap-4 px-5 py-4 w-full text-red-500 font-bold text-[13px] hover:bg-red-50 rounded-2xl transition-all">
          <FiLogOut className="text-lg" /> Logout Account
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;