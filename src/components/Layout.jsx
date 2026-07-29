import React from 'react';
// FIX: Changed to './Navbar' (lowercase 'b') to match your file structure in Screenshot 4
import Navbar from './Navbar'; 
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;