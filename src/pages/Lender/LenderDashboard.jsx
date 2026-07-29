import React, { useState, useEffect } from 'react';
import { 
  FiZap, FiBox, FiDollarSign, FiActivity, FiArrowUpRight, 
  FiPlus, FiEye, FiEyeOff, FiTrash2, FiClock, FiCheck, FiX, FiCheckCircle 
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

const LenderDashboard = () => {
  const [stats, setStats] = useState({
    totalEarnings: 0,
    activeSessions: 0,
    totalAssets: 0,
    pendingRequests: 0
  });

  const [activeTab, setActiveTab] = useState('inventory'); // inventory, requests, earnings
  const [listings, setListings] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `http://localhost:5000${url}`;
  };

  const fetchLenderData = async () => {
    try {
      const [listingsRes, bookingsRes] = await Promise.all([
        api.get('/products/my-listings'),
        api.get('/bookings/lender-rentals')
      ]);

      if (listingsRes.data.success && bookingsRes.data.success) {
        const myItems = listingsRes.data.listings;
        const myRentals = bookingsRes.data.bookings;

        setListings(myItems);
        setBookings(myRentals);

        const totalAssets = myItems.length;
        const pendingRequests = myRentals.filter(b => b.status === 'Pending Approval').length;
        const activeSessions = myRentals.filter(b => ['Approved', 'Active', 'Returned'].includes(b.status)).length;
        
        // Earnings: sum of rentalTotal * 0.9 for Completed bookings (10% platform fee)
        const completedBookings = myRentals.filter(b => b.status === 'Completed');
        const totalEarnings = completedBookings.reduce((sum, b) => sum + (b.rentalTotal * 0.9), 0);

        setStats({
          totalEarnings: Math.round(totalEarnings),
          activeSessions,
          totalAssets,
          pendingRequests
        });
      }
    } catch (err) {
      console.error("Failed to load lender stats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLenderData();
  }, []);

  // Inventory Actions
  const toggleStatus = async (id) => {
    try {
      const res = await api.patch(`/products/${id}/status`);
      if (res.data.success) {
        setListings(prev => prev.map(item => 
          item._id === id ? { ...item, status: res.data.product.status } : item
        ));
      }
    } catch (err) {
      console.error("Failed to toggle listing status:", err);
      alert(err.response?.data?.error || "Status update failed");
    }
  };

  const deleteListing = async (id) => {
    if (!window.confirm("Are you sure you want to remove this listed item?")) return;
    try {
      const res = await api.delete(`/products/${id}`);
      if (res.data.success) {
        setListings(prev => prev.filter(item => item._id !== id));
        setStats(prev => ({ ...prev, totalAssets: prev.totalAssets - 1 }));
      }
    } catch (err) {
      console.error("Failed to delete listed item:", err);
      alert(err.response?.data?.error || "Delete failed");
    }
  };

  // Booking Actions
  const handleStatusUpdate = async (bookingId, nextStatus) => {
    try {
      const res = await api.patch(`/bookings/${bookingId}/status`, { status: nextStatus });
      if (res.data.success) {
        setBookings(prev => prev.map(b => b._id === bookingId ? { ...b, status: nextStatus } : b));
        fetchLenderData();
      }
    } catch (err) {
      console.error("Error updating booking status:", err);
      alert(err.response?.data?.error || "Status update failed");
    }
  };

  const statCards = [
    { label: "Total Revenue", value: `৳${stats.totalEarnings.toLocaleString()}`, icon: <FiDollarSign />, color: "text-green-500" },
    { label: "Active Rentals", value: stats.activeSessions, icon: <FiActivity />, color: "text-accent" },
    { label: "My Items", value: stats.totalAssets, icon: <FiBox />, color: "text-blue-500" },
    { label: "Pending Requests", value: stats.pendingRequests, icon: <FiZap />, color: "text-orange-500" },
  ];

  if (loading) return (
    <div className="min-h-screen bg-[#FDFDFC] flex flex-col items-center justify-center font-epilogue px-6 text-center text-[#111]">
      <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-[10px] font-black uppercase tracking-widest text-paragraph/40">Loading Lender Hub...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFDFC] p-6 md:p-12 lg:p-16 font-epilogue text-[#111]">
      <div className="max-w-[1440px] mx-auto">
        
        {/* HEADER SECTION */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <p className="text-accent text-[10px] font-black uppercase tracking-[0.5em] mb-4">Lender Dashboard</p>
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none">
              Lender <br /> <span className="text-paragraph/20">Hub.</span>
            </h2>
          </div>

          <Link 
            to="/lender/upload"
            className="group flex items-center gap-4 bg-[#111] text-white px-10 py-6 rounded-[24px] text-[10px] font-black uppercase tracking-[0.3em] hover:bg-accent hover:text-[#111] transition-all shadow-xl active:scale-95 shrink-0"
          >
            Add New Item <FiPlus className="group-hover:rotate-90 transition-transform" />
          </Link>
        </header>

        {/* TILES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statCards.map((card, idx) => (
            <motion.div 
              key={idx}
              className="bg-white border border-gray-50 p-8 rounded-[32px] shadow-sm hover:shadow-xl transition-all"
            >
              <div className={`w-12 h-12 rounded-2xl bg-[#F8F8F7] flex items-center justify-center mb-6 text-xl ${card.color}`}>
                {card.icon}
              </div>
              <p className="text-[9px] font-black text-paragraph/30 uppercase tracking-[0.3em] mb-2">{card.label}</p>
              <h3 className="text-3xl font-black tracking-tighter">{card.value}</h3>
            </motion.div>
          ))}
        </div>

        {/* TABS SWITCHER */}
        <div className="flex gap-3 mb-10 bg-[#F1F1F0] p-1.5 rounded-[24px] max-w-fit">
          {[
            { id: 'inventory', label: 'My Inventory', icon: <FiBox /> },
            { id: 'requests', label: 'Rental Requests', icon: <FiZap /> },
            { id: 'earnings', label: 'Earnings Details', icon: <FiDollarSign /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 rounded-[18px] text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab.id 
                ? 'bg-white text-txt shadow-md' 
                : 'text-paragraph/60 hover:text-[#111]'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* TAB CONTENTS */}
        <div className="space-y-6">
          
          {/* TAB 1: MY INVENTORY */}
          {activeTab === 'inventory' && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {listings.length === 0 ? (
                <div className="col-span-full text-center py-20 border-2 border-dashed border-gray-100 rounded-[32px] bg-white">
                  <FiBox size={40} className="mx-auto text-gray-200 mb-4" />
                  <h3 className="text-xl font-black uppercase tracking-tight mb-2">No Items Listed</h3>
                  <p className="text-paragraph text-xs font-medium uppercase tracking-widest">Click "Add New Item" to list your gear.</p>
                </div>
              ) : (
                listings.map((item) => (
                  <div key={item._id} className="bg-white border border-gray-100 p-8 rounded-[40px] shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
                    <div>
                      <div className="aspect-square bg-[#F8F8F7] rounded-[32px] mb-8 overflow-hidden relative border border-gray-50">
                        <span className={`absolute top-4 right-4 z-10 px-4 py-2 rounded-full text-[8px] font-black uppercase tracking-widest ${item.status === 'Live' ? 'bg-green-500 text-white' : 'bg-paragraph/10 text-paragraph/40'}`}>
                          {item.status}
                        </span>
                        <img src={getImageUrl(item.image)} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <p className="text-[9px] font-black text-accent uppercase tracking-widest mb-2">{item.category}</p>
                      <h4 className="text-xl font-black tracking-tight uppercase leading-tight mb-2">{item.title}</h4>
                      <p className="text-txt font-black text-sm">৳{item.price} <span className="text-paragraph/40 font-bold uppercase text-[9px] tracking-widest">/ Per Day</span></p>
                    </div>

                    <div className="flex items-center gap-3 pt-6 border-t border-gray-50 mt-6">
                      <button 
                        onClick={() => toggleStatus(item._id)}
                        className="flex-1 py-4 bg-secondary/50 rounded-2xl flex items-center justify-center gap-2 text-paragraph hover:bg-secondary transition-all"
                      >
                        {item.status === "Live" ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                        <span className="text-[9px] font-black uppercase tracking-widest">{item.status === "Live" ? "Hide" : "Show"}</span>
                      </button>
                      
                      <button 
                        onClick={() => deleteListing(item._id)}
                        className="p-4 border border-gray-100 rounded-2xl text-paragraph/40 hover:text-red-500 hover:border-red-500 transition-all active:scale-95"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: INCOMING BOOKING REQUESTS */}
          {activeTab === 'requests' && (
            <div className="space-y-6">
              {bookings.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-[32px] bg-white">
                  <FiCheckCircle size={40} className="mx-auto text-gray-200 mb-4" />
                  <h3 className="text-xl font-black uppercase tracking-tight mb-2">No Requests</h3>
                  <p className="text-paragraph text-xs font-medium uppercase tracking-widest">No active requests or booking history found.</p>
                </div>
              ) : (
                bookings.map((booking) => (
                  <div key={booking._id} className="bg-white border border-gray-100 p-8 rounded-[32px] flex flex-col md:flex-row items-center justify-between shadow-sm hover:shadow-md transition-all gap-6">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 bg-[#F8F8F7] rounded-[24px] overflow-hidden border border-gray-50 shrink-0">
                        <img src={getImageUrl(booking.product?.image)} alt={booking.product?.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <span className="bg-accent/10 text-accent text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2 inline-block">
                          Status: {booking.status}
                        </span>
                        <h4 className="text-lg font-black uppercase tracking-tight mb-1">{booking.product?.title}</h4>
                        <p className="text-paragraph/40 text-[9px] font-bold uppercase tracking-widest">
                          Renter: {booking.renter?.name} | Duration: {booking.rentalDays} Days
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 w-full md:w-auto items-center justify-end">
                      {booking.status === 'Pending Approval' && (
                        <>
                          <button 
                            onClick={() => handleStatusUpdate(booking._id, 'Approved')}
                            className="px-6 py-3 bg-[#111] text-white rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-green-500 hover:text-white transition-all active:scale-95 shadow-md"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => handleStatusUpdate(booking._id, 'Rejected')}
                            className="px-6 py-3 bg-white border border-gray-100 text-txt rounded-full text-[9px] font-black uppercase tracking-widest hover:border-red-500 hover:text-red-500 transition-all active:scale-95"
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
                          className="px-8 py-4 bg-[#111] text-white rounded-full text-[9px] font-black uppercase tracking-[0.2em] hover:bg-green-500 transition-all flex items-center gap-2 shadow-md active:scale-95"
                        >
                          Confirm Return <FiRotateCcw />
                        </button>
                      )}

                      {booking.status === 'Completed' && (
                        <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">
                          Settled & Complete
                        </span>
                      )}

                      {booking.status === 'Rejected' && (
                        <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">
                          Rejected
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: EARNINGS DETAILS */}
          {activeTab === 'earnings' && (
            <div className="space-y-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-[#111] text-white p-10 rounded-[36px] flex flex-col justify-between relative overflow-hidden">
                  <FiDollarSign className="absolute -right-6 -bottom-6 text-white/5" size={200} />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-3">Withdrawable Balance</p>
                    <h3 className="text-4xl md:text-5xl font-black tracking-tighter italic">৳{stats.totalEarnings.toLocaleString()}</h3>
                  </div>
                  <div className="mt-8">
                    <button 
                      onClick={() => alert("Payout request received. Settled in next batch run.")}
                      className="px-8 py-4 bg-white text-[#111] rounded-full text-[10px] font-black uppercase tracking-[0.25em] hover:bg-accent transition-all active:scale-95"
                    >
                      Request Payout
                    </button>
                  </div>
                </div>

                <div className="bg-white border border-gray-100 p-10 rounded-[36px] shadow-sm flex flex-col justify-center">
                  <p className="text-[9px] font-black text-paragraph/30 uppercase tracking-[0.4em] mb-2">Platform Fee Deducted</p>
                  <p className="text-xs text-paragraph/60 leading-relaxed">
                    A standard 10% platform fee is deducted from each rental. Security deposits are kept in escrow and returned completely to renters post-audits.
                  </p>
                </div>
              </div>

              {/* Transactions list */}
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#111] mb-6 pl-2">Past Settlements</p>
                <div className="space-y-4">
                  {bookings.filter(b => b.status === 'Completed').length === 0 ? (
                    <div className="text-center py-10 bg-white border border-gray-50 rounded-[24px]">
                      <p className="text-[9px] font-black text-paragraph/30 uppercase tracking-widest">No transaction history found.</p>
                    </div>
                  ) : (
                    bookings.filter(b => b.status === 'Completed').map(tx => (
                      <div key={tx._id} className="bg-white border border-gray-50 p-6 rounded-[24px] flex items-center justify-between">
                        <div>
                          <h5 className="text-[11px] font-black uppercase tracking-widest text-txt">{tx.product?.title}</h5>
                          <p className="text-[8px] font-bold text-paragraph/40 mt-1 uppercase">Booking Ref: #{tx._id}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-black text-txt">+৳{Math.round(tx.rentalTotal * 0.9).toLocaleString()}</p>
                          <p className="text-[8px] font-bold text-paragraph/20 mt-1 uppercase">Net payout</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default LenderDashboard;