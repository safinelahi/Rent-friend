import React, { useState, useEffect } from 'react';
import { FiClock, FiCheckCircle, FiRotateCcw, FiUser, FiZap } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../api/axios';

const LenderBookingManager = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `http://localhost:5000${url}`;
  };

  const fetchBookings = async () => {
    try {
      const res = await api.get('/bookings/lender-rentals');
      if (res.data.success) {
        setBookings(res.data.bookings);
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch bookings where the current user is the lender
  useEffect(() => {
    fetchBookings();
  }, []);

  // Handle rental status updates
  const handleStatusUpdate = async (bookingId, nextStatus) => {
    try {
      const res = await api.patch(`/bookings/${bookingId}/status`, { status: nextStatus });
      if (res.data.success) {
        setBookings(bookings.map(b => b._id === bookingId ? { ...b, status: nextStatus } : b));
      }
    } catch (err) {
      console.error("Error updating booking status:", err);
      alert("Action failed: " + (err.response?.data?.error || "Server error"));
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#FDFDFC] flex flex-col items-center justify-center font-epilogue px-6 text-center">
      <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-[10px] font-black uppercase tracking-widest text-paragraph/40">Loading Bookings...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFDFC] pt-32 pb-20 px-6 md:px-12 lg:px-16 font-epilogue text-[#111]">
      <div className="max-w-[1440px] mx-auto">
        
        <header className="mb-16">
          <div className="flex items-center gap-3 text-accent mb-6">
            <FiZap size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.5em]">Bookings</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none">
            Booking <br /> <span className="text-paragraph/20">Manager.</span>
          </h2>
        </header>

        {/* --- BOOKING LOGS --- */}
        <div className="space-y-6">
          <AnimatePresence>
            {bookings.length === 0 ? (
              <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-[32px] bg-white">
                <FiCheckCircle size={40} className="mx-auto text-gray-200 mb-4" />
                <h3 className="text-xl font-black uppercase tracking-tight mb-2">No Requests</h3>
                <p className="text-paragraph text-xs font-medium uppercase tracking-widest">No active rental requests or bookings found.</p>
              </div>
            ) : (
              bookings.map((booking) => (
                <motion.div 
                  key={booking._id}
                  className="bg-white border border-gray-100 p-8 rounded-[40px] flex flex-col lg:flex-row items-center justify-between shadow-sm hover:shadow-md transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <div className="flex items-center gap-8 mb-8 lg:mb-0">
                     <div className="w-24 h-24 bg-[#F8F8F7] rounded-[28px] flex items-center justify-center overflow-hidden border border-gray-50 shrink-0">
                        <img src={getImageUrl(booking.product?.image)} alt={booking.product?.title} className="w-full h-full object-cover grayscale" />
                     </div>
                     <div>
                        <span className="bg-accent/10 text-accent text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 inline-block">
                          Status: {booking.status}
                        </span>
                        <h4 className="text-xl font-black uppercase tracking-tight mb-2 italic">{booking.product?.title}</h4>
                        <div className="flex flex-wrap items-center gap-6 text-paragraph/40 text-[9px] font-bold uppercase tracking-[0.2em]">
                           <span className="flex items-center gap-2"><FiUser className="text-accent" /> Renter: {booking.renter?.name}</span>
                           <span className="flex items-center gap-2"><FiClock className="text-accent" /> Duration: {booking.rentalDays} Days</span>
                        </div>
                     </div>
                  </div>

                  {/* Actions based on current booking status */}
                  <div className="flex flex-wrap gap-4 w-full lg:w-auto items-center justify-end">
                     {booking.status === 'Pending Approval' && (
                       <>
                         <button 
                           onClick={() => handleStatusUpdate(booking._id, 'Approved')}
                           className="px-8 py-4 bg-[#111] text-white rounded-full text-[9px] font-black uppercase tracking-[0.3em] hover:bg-green-500 hover:text-white transition-all active:scale-95 shadow-md"
                         >
                           Approve
                         </button>
                         <button 
                           onClick={() => handleStatusUpdate(booking._id, 'Rejected')}
                           className="px-8 py-4 bg-white border border-gray-100 text-txt rounded-full text-[9px] font-black uppercase tracking-[0.3em] hover:border-red-500 hover:text-red-500 transition-all active:scale-95"
                         >
                           Reject
                         </button>
                       </>
                     )}

                     {booking.status === 'Approved' && (
                       <span className="text-[10px] font-black text-paragraph/40 uppercase tracking-widest italic">
                         Awaiting Renter Pickup
                       </span>
                     )}

                     {booking.status === 'Active' && (
                       <span className="text-[10px] font-black text-accent uppercase tracking-widest italic animate-pulse">
                         Ongoing Rental
                       </span>
                     )}

                     {booking.status === 'Returned' && (
                       <button 
                         onClick={() => handleStatusUpdate(booking._id, 'Completed')}
                         className="px-8 py-4 bg-[#111] text-white rounded-full text-[9px] font-black uppercase tracking-[0.3em] hover:bg-green-500 transition-all flex items-center gap-2 shadow-md active:scale-95"
                       >
                         Confirm Return & Close <FiRotateCcw />
                       </button>
                     )}

                     {booking.status === 'Completed' && (
                       <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">
                         Completed & Settled
                       </span>
                     )}

                     {booking.status === 'Rejected' && (
                       <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">
                         Booking Rejected
                       </span>
                     )}
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default LenderBookingManager;