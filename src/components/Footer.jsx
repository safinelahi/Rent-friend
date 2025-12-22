import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaEnvelope } from 'react-icons/fa';
import whiteLogo from '../assets/icon 1.svg';

const Footer = () => {
  return (
    <footer className="bg-[#333] text-white py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
          
          {/* Logo, Slogan & Contact */}
          <div className="lg:col-span-2">
            <img src={whiteLogo} alt="RentFriend Logo" className="h-8 mb-6" />
            
            <p className="text-gray-400 mb-6 max-w-xs">
              Share more, own less. The sustainable way to access what you need.
            </p>

            {/* --- Added Email Section --- */}
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white/10 p-2 rounded-full text-white">
                <FaEnvelope size={14} />
              </div>
              <a 
                href="mailto:hello@rentfriend.com" 
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                hello@rentfriend.com
              </a>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaLinkedinIn size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter size={20} />
              </a>
            </div>
          </div>

          {/* For Renters */}
          <div>
            <h3 className="text-lg font-semibold mb-4">For Renters</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Browse Items</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Safety & Trust</a></li>
            </ul>
          </div>

          {/* For Lenders */}
          <div>
            <h3 className="text-lg font-semibold mb-4">For Lenders</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">List an Item</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Earnings Calculator</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Insurance</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Listing Tips</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#ffffff40] pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 RentFriend. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;