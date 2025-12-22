import React from 'react';
// IMPORTANT: Make sure this import matches your actual file name (NavBar vs Navbar)
import Navbar from './Navbar'; 
import Footer from './Footer'; // Import the new Footer component

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <Navbar />

      {/* Main Content Area - grows to fill available space */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default Layout;