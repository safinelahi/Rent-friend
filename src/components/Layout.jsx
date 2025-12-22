// src/components/Layout.jsx
import React from 'react';
import Navbar from './NavBar';
// import Footer from './Footer'; // (If you have one)

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;