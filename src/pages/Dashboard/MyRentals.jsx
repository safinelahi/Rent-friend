import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext'; // DOUBLE CHECK THIS PATH
import { FiMessageSquare, FiExternalLink, FiPackage } from 'react-icons/fi';

const MyRentals = () => {
  // 1. Pull the real rentals from your Context
  const { myRentals } = useContext(AppContext);

  // 2. Debugging: This will show in your browser console (F12)
  console.log("Current Rentals in Memory:", myRentals);

  return (
    <div className="font-epilogue">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <h2 className="type-h3 text-txt font-black">My Rentals</h2>
          <p className="type-small text-paragraph font-bold mt-1 uppercase tracking-widest">
            Tracking your active gear and schedules.
          </p>
        </div>
        
        {/* Total Spent Card - Now Dynamic-ish */}
        <div className="bg-white border border-gray-100 p-5 rounded-3xl shadow-sm text-right">
          <p className="text-[10px] font-black text-paragraph uppercase tracking-widest mb-1">Total Spent</p>
          <p className="type-h5 text-txt font-black">
            ৳{myRentals.reduce((acc, item) => acc + (item.price * 3), 0).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* 3. DYNAMIC LOGIC: If you have rentals, show them. Otherwise, show "No Rentals" */}
        {myRentals && myRentals.length > 0 ? (
          myRentals.map((item, index) => (
            <div key={index} className="flex flex-col md:flex-row bg-white rounded-[40px] border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
              
              {/* IMAGE: Now comes from the item you actually booked */}
              <div className="md:w-80 h-56 overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>

              <div className="p-8 flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-accent/10 text-accent text-[9px] font-black uppercase px-3 py-1 rounded-full tracking-widest border border-accent/20">
                        {item.category || 'Gear'}
                      </span>
                      <span className="type-small text-paragraph font-bold text-[10px]">#{item.bookingId}</span>
                    </div>
                    <h3 className="type-h4 text-txt font-black">{item.title}</h3>
                    
                    <div className="flex gap-10 pt-4">
                      <div>
                        <p className="text-[10px] font-bold text-paragraph uppercase tracking-widest mb-1">Time Remaining</p>
                        <p className="type-small font-bold text-txt">3 Days Left</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-paragraph uppercase tracking-widest mb-1">Pickup Point</p>
                        <p className="type-small font-bold text-txt">New Market, Rajshahi</p>
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:block text-right bg-secondary/50 p-5 rounded-3xl border border-gray-50">
                    <p className="text-[10px] font-bold text-paragraph uppercase tracking-widest mb-1">Security Hold</p>
                    <p className="type-h5 text-txt font-black">৳{item.price * 2}</p>
                    <p className="text-[9px] font-bold text-green-600 uppercase mt-1">Held in Escrow</p>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button className="flex items-center gap-2 bg-txt text-white type-small font-bold px-8 py-3.5 rounded-2xl hover:bg-black transition-all">
                    <FiMessageSquare /> Chat Owner
                  </button>
                  <button className="flex items-center gap-2 border border-gray-100 text-paragraph type-small font-bold px-8 py-3.5 rounded-2xl hover:bg-secondary transition-all">
                    View Receipt <FiExternalLink />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          /* 4. NEW ACCOUNT VIEW: This is what you should see if you haven't booked anything */
          <div className="py-24 bg-secondary/20 rounded-[48px] border-2 border-dashed border-gray-100 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
              <FiPackage className="text-gray-200" size={32} />
            </div>
            <h4 className="type-h4 text-txt font-black mb-2">No active rentals</h4>
            <p className="type-p text-paragraph max-w-xs mb-8">
              Your booked items will appear here for tracking and communication.
            </p>
            <button onClick={() => window.location.href='/browse'} className="bg-accent text-txt type-small font-bold px-10 py-4 rounded-2xl shadow-lg shadow-accent/20">
              Browse Gear
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRentals;