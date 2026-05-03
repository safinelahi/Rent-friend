import React from 'react';
import { FiShield, FiStar, FiMapPin, FiCheckCircle } from 'react-icons/fi';

const PublicProfile = () => {
  /* 
    BACKEND SYNC: 
    Fetch user data based on the ID in the URL.
    API: GET /api/users/profile/:id
  */
  const userData = {
    name: "MD Safin Elahi",
    isVerified: true,
    rating: 4.9,
    totalRentals: 42,
    bio: "Software Engineer & Tech Enthusiast. Providing high-quality gear in Rajshahi."
  };

  return (
    <div className="min-h-screen bg-[#FDFDFC] pt-40 pb-20 px-6 md:px-12 lg:px-16 font-epilogue">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
        
        {/* --- LEFT: USER IDENTITY --- */}
        <div className="lg:col-span-1 space-y-8">
           <div className="relative w-48 h-48 mx-auto lg:mx-0">
              <div className="w-full h-full bg-secondary rounded-[64px] overflow-hidden border-4 border-white shadow-xl">
                 <img src="https://via.placeholder.com/200" alt="Profile" className="w-full h-full object-cover grayscale" />
              </div>
              {userData.isVerified && (
                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-3 rounded-2xl shadow-lg">
                  <FiShield size={20} />
                </div>
              )}
           </div>

           <div>
              <h2 className="text-4xl font-black uppercase italic tracking-tighter">{userData.name}</h2>
              <p className="text-paragraph/40 text-[10px] font-black uppercase tracking-[0.3em] mt-2 flex items-center gap-2">
                 <FiMapPin className="text-accent" /> Rajshahi, Bangladesh
              </p>
           </div>

           <div className="p-8 bg-white border border-gray-50 rounded-[40px] shadow-sm space-y-6">
              <div className="flex justify-between items-center">
                 <span className="text-[10px] font-black uppercase tracking-widest text-paragraph/30">Reputation</span>
                 <span className="flex items-center gap-1 font-black text-accent"><FiStar fill="currentColor" /> {userData.rating}</span>
              </div>
              <div className="flex justify-between items-center">
                 <span className="text-[10px] font-black uppercase tracking-widest text-paragraph/30">Successful Rentals</span>
                 <span className="font-black text-txt">{userData.totalRentals}+</span>
              </div>
           </div>
        </div>

        {/* --- RIGHT: LISTINGS & REVIEWS --- */}
        <div className="lg:col-span-2">
           <div className="border-b border-gray-100 pb-6 mb-12 flex gap-12">
              <button className="text-[12px] font-black uppercase tracking-[0.3em] border-b-2 border-accent pb-4">Active Assets</button>
              <button className="text-[12px] font-black uppercase tracking-[0.3em] text-paragraph/20 pb-4">User Reviews</button>
           </div>

           {/* Grid for Assets will go here */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="aspect-[4/5] bg-secondary/20 rounded-[40px] flex items-center justify-center text-[10px] font-black uppercase tracking-widest opacity-20 border border-dashed border-paragraph">
                 No active listings yet
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default PublicProfile;