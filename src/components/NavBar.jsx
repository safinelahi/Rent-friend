import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-primary py-4 px-8 border-b border-gray-100 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="font-epilogue font-bold text-xl text-txt">
        rent<span className="font-normal">friend</span>
      </Link>
      
      {/* Links */}
      <div className="flex gap-6">
          <Link to="/" className="type-small font-medium text-txt hover:text-accent">Home</Link>
          <Link to="/signup" className="type-small font-medium text-txt hover:text-accent">Sign Up</Link>
      </div>
    </nav>
  );
};

export default NavBar;