import React from 'react';
// FIX: Changed './Navbar' to './NavBar' to match your file name (Capital B)
import Navbar from './NavBar'; 
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