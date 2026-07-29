import React, { useState, useEffect } from 'react';
import { 
  FiUsers, FiShield, FiCreditCard, FiAlertCircle, 
  FiTrendingUp, FiCheck, FiX, FiMaximize2, FiRotateCcw, FiClock, FiCamera, FiZap 
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../api/axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingVerifications: 0,
    activeRentals: 0,
    platformRevenue: 0
  });

  const [activeTab, setActiveTab] = useState('verifications'); // verifications, payouts, returns, bookings
  const [pendingUsers, setPendingUsers] = useState([]);
  const [payouts, setPayouts] = useState([]);
  const [returns, setReturns] = useState([]);
  const [bookings, setBookings] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `http://localhost:5000${url}`;
  };

  const fetchStats = async () => {
    try {
      const res = await api.get('/admin/stats');
      if (res.data.success) {
        setStats(res.data.stats);
      }
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  const loadTabData = async (tab) => {
    setLoading(true);
    setError(null);
    try {
      if (tab === 'verifications') {
        const res = await api.get('/admin/pending-verifications');
        if (res.data.success) setPendingUsers(res.data.users);
      } else if (tab === 'payouts') {
        const res = await api.get('/admin/payouts');
        if (res.data.success) setPayouts(res.data.payouts);
      } else if (tab === 'returns') {
        const res = await api.get('/admin/returns');
        if (res.data.success) setReturns(res.data.returns);
      } else if (tab === 'bookings') {
        const res = await api.get('/admin/bookings');
        if (res.data.success) setBookings(res.data.bookings);
      }
    } catch (err) {
      console.error(`Error loading data for tab ${tab}:`, err);
      setError("Failed to load list details. Please check server connections.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    loadTabData(activeTab);
  }, [activeTab]);

  // Actions
  const processVerification = async (userId, status) => {
    let reason = '';
    if (status === 'Rejected') {
      reason = prompt("Please enter the reason for rejecting this verification:");
      if (reason === null) return;
      if (!reason.trim()) {
        alert("A rejection reason is required.");
        return;
      }
    }
    try {
      const res = await api.patch(`/admin/verify/${userId}`, { status, reason });
      if (res.data.success) {
        setPendingUsers(prev => prev.filter(u => u._id !== userId));
        fetchStats();
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Error processing NID verification");
    }
  };

  const handlePayLender = async (bookingId) => {
    try {
      const res = await api.patch(`/admin/payouts/${bookingId}`);
      if (res.data.success) {
        setPayouts(prev => prev.filter(p => p._id !== bookingId));
        fetchStats();
        alert("Payout marked as paid successfully.");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Payout processing failed.");
    }
  };

  const handleApproveReturn = async (bookingId) => {
    try {
      const res = await api.patch(`/admin/returns/${bookingId}/approve`);
      if (res.data.success) {
        setReturns(prev => prev.filter(r => r._id !== bookingId));
        fetchStats();
        alert("Return audit approved successfully.");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to approve return.");
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking? This overrides current status to Cancelled/Rejected.")) return;
    try {
      const res = await api.patch(`/admin/bookings/${bookingId}/cancel`);
      if (res.data.success) {
        setBookings(prev => prev.map(b => b._id === bookingId ? { ...b, status: 'Rejected' } : b));
        fetchStats();
        alert("Booking cancelled successfully.");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Error cancelling booking");
    }
  };

  const adminStats = [
    { label: "Total Users", value: stats.totalUsers, icon: <FiUsers />, color: "text-blue-500" },
    { label: "Pending Approvals", value: stats.pendingVerifications, icon: <FiShield />, color: "text-orange-500" },
    { label: "Active Rentals", value: stats.activeRentals, icon: <FiTrendingUp />, color: "text-accent" },
    { label: "Platform Earnings", value: `৳${stats.platformRevenue.toLocaleString()}`, icon: <FiCreditCard />, color: "text-green-500" },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFC] p-6 md:p-12 lg:p-16 font-epilogue text-[#111]">
      <div className="max-w-[1440px] mx-auto">
        
        <header className="mb-16">
          <p className="text-accent text-[10px] font-black uppercase tracking-[0.5em] mb-4">Admin Dashboard</p>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none mb-6">
            Admin <br /> <span className="text-paragraph/20">Portal.</span>
          </h1>
        </header>

        {/* STATS TILES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {adminStats.map((stat, idx) => (
            <motion.div 
              key={idx}
              className="bg-white border border-gray-50 p-8 rounded-[32px] shadow-sm hover:shadow-xl transition-all"
            >
              <div className={`w-12 h-12 rounded-2xl bg-[#F8F8F7] flex items-center justify-center mb-6 text-xl ${stat.color}`}>
                {stat.icon}
              </div>
              <p className="text-[9px] font-black text-paragraph/30 uppercase tracking-[0.3em] mb-2">{stat.label}</p>
              <h3 className="text-3xl font-black tracking-tighter italic">{stat.value}</h3>
            </motion.div>
          ))}
        </div>

        {/* TABS SELECTOR */}
        <div className="flex flex-wrap gap-3 mb-10 bg-[#F1F1F0] p-1.5 rounded-[24px] max-w-fit">
          {[
            { id: 'verifications', label: 'Verifications', icon: <FiShield /> },
            { id: 'payouts', label: 'Payout Queue', icon: <FiCreditCard /> },
            { id: 'bookings', label: 'Manage Rentals', icon: <FiClock /> }
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

        {/* ERROR DISPLAY */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-500 rounded-3xl p-6 text-xs font-bold uppercase tracking-widest text-center mb-8">
            {error}
          </div>
        )}

        {/* LOADING INDICATOR */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-gray-50 rounded-[32px]">
            <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-[10px] font-black uppercase tracking-widest text-paragraph/40">Fetching records...</p>
          </div>
        )}

        {/* TAB WORKFLOW ACTIONS */}
        {!loading && (
          <div className="space-y-6">
            
            {/* 1. VERIFICATIONS REQUEST PANEL */}
            {activeTab === 'verifications' && (
              <AnimatePresence>
                {pendingUsers.length === 0 ? (
                  <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-[32px] bg-white">
                    <FiCheck size={40} className="mx-auto text-gray-200 mb-4" />
                    <h3 className="text-xl font-black uppercase tracking-tight mb-2">Verifications Clear</h3>
                    <p className="text-paragraph text-xs font-medium uppercase tracking-widest">No users are waiting for identity review.</p>
                  </div>
                ) : (
                  pendingUsers.map((user) => (
                    <motion.div 
                      key={user._id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white border border-gray-100 p-8 rounded-[40px] flex flex-col xl:flex-row gap-8 items-center shadow-sm"
                    >
                      <div className="flex items-center gap-6 min-w-[250px]">
                        <div className="w-16 h-16 bg-[#F8F8F7] rounded-[20px] flex items-center justify-center overflow-hidden border border-gray-50 shrink-0">
                          {user.selfie ? (
                            <img src={getImageUrl(user.selfie)} alt="Selfie" className="w-full h-full object-cover" />
                          ) : (
                            <FiUsers size={20} className="text-gray-300" />
                          )}
                        </div>
                        <div>
                          <h4 className="text-lg font-black uppercase italic tracking-tight">{user.name}</h4>
                          <p className="text-[9px] font-bold text-accent uppercase tracking-widest">{user.role}</p>
                          <p className="text-[8px] font-medium text-paragraph/40 tracking-wider mt-0.5">{user.email}</p>
                        </div>
                      </div>

                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
                        {user.nidFront && (
                          <a href={getImageUrl(user.nidFront)} target="_blank" rel="noreferrer" className="aspect-video bg-[#F8F8F7] rounded-2xl overflow-hidden border border-gray-100 block hover:border-accent transition-all relative group">
                            <img src={getImageUrl(user.nidFront)} alt="NID Front" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[8px] font-black uppercase tracking-widest">NID Front</div>
                          </a>
                        )}
                        {user.nidBack && (
                          <a href={getImageUrl(user.nidBack)} target="_blank" rel="noreferrer" className="aspect-video bg-[#F8F8F7] rounded-2xl overflow-hidden border border-gray-100 block hover:border-accent transition-all relative group">
                            <img src={getImageUrl(user.nidBack)} alt="NID Back" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[8px] font-black uppercase tracking-widest">NID Back</div>
                          </a>
                        )}
                        {user.selfie && (
                          <a href={getImageUrl(user.selfie)} target="_blank" rel="noreferrer" className="aspect-video bg-[#F8F8F7] rounded-2xl overflow-hidden border border-gray-100 block hover:border-accent transition-all relative group">
                            <img src={getImageUrl(user.selfie)} alt="Selfie" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[8px] font-black uppercase tracking-widest">Selfie Check</div>
                          </a>
                        )}
                      </div>

                      <div className="flex gap-3 w-full xl:w-auto">
                        <button 
                          onClick={() => processVerification(user._id, 'Verified')}
                          className="flex-1 xl:flex-none px-6 py-4 bg-[#111] text-white rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-green-500 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-md"
                        >
                          Approve <FiCheck />
                        </button>
                        <button 
                          onClick={() => processVerification(user._id, 'Rejected')}
                          className="flex-1 xl:flex-none px-6 py-4 bg-white border border-gray-100 text-txt rounded-full text-[9px] font-black uppercase tracking-widest hover:border-red-500 hover:text-red-500 transition-all flex items-center justify-center gap-2 active:scale-95"
                        >
                          Reject <FiX />
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            )}

            {/* 2. ESCROW PAYOUTS QUEUE PANEL */}
            {activeTab === 'payouts' && (
              <AnimatePresence>
                {payouts.length === 0 ? (
                  <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-[32px] bg-white">
                    <FiCheck size={40} className="mx-auto text-gray-200 mb-4" />
                    <h3 className="text-xl font-black uppercase tracking-tight mb-2">Payout Queue Empty</h3>
                    <p className="text-paragraph text-xs font-medium uppercase tracking-widest">All lender earnings have been settled.</p>
                  </div>
                ) : (
                  <div className="overflow-hidden bg-white border border-gray-50 rounded-[32px] shadow-sm">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-gray-50 bg-[#F8F8F7]/50">
                          <th className="px-8 py-6 text-[9px] font-black uppercase tracking-widest text-paragraph/40">Lender Details</th>
                          <th className="px-8 py-6 text-[9px] font-black uppercase tracking-widest text-paragraph/40">Gross Amount</th>
                          <th className="px-8 py-6 text-[9px] font-black uppercase tracking-widest text-paragraph/40">10% Platform Fee</th>
                          <th className="px-8 py-6 text-[9px] font-black uppercase tracking-widest text-paragraph/40">Net Payout</th>
                          <th className="px-8 py-6 text-[9px] font-black uppercase tracking-widest text-paragraph/40">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {payouts.map((tx) => (
                          <tr key={tx._id} className="hover:bg-[#FDFDFC]">
                            <td className="px-8 py-6">
                              <p className="font-black text-txt uppercase tracking-tight italic">{tx.product?.owner?.name}</p>
                              <p className="text-[8px] font-medium text-paragraph/40">{tx.product?.owner?.email}</p>
                            </td>
                            <td className="px-8 py-6 font-bold text-xs text-paragraph/60">৳{tx.rentalTotal}</td>
                            <td className="px-8 py-6 font-bold text-xs text-red-400">-৳{Math.round(tx.rentalTotal * 0.1)}</td>
                            <td className="px-8 py-6 font-black text-base text-green-500">৳{Math.round(tx.rentalTotal * 0.9)}</td>
                            <td className="px-8 py-6">
                              <button 
                                onClick={() => handlePayLender(tx._id)}
                                className="flex items-center gap-2 bg-[#111] text-white px-5 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-green-500 hover:text-white transition-all active:scale-95"
                              >
                                Pay Lender
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </AnimatePresence>
            )}


            {/* 4. MANAGE RENTALS / BOOKINGS PANEL */}
            {activeTab === 'bookings' && (
              <AnimatePresence>
                {bookings.length === 0 ? (
                  <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-[32px] bg-white">
                    <FiCheck size={40} className="mx-auto text-gray-200 mb-4" />
                    <h3 className="text-xl font-black uppercase tracking-tight mb-2">No Active Rentals</h3>
                    <p className="text-paragraph text-xs font-medium uppercase tracking-widest">No gear rentals exist in database records.</p>
                  </div>
                ) : (
                  <div className="overflow-hidden bg-white border border-gray-50 rounded-[32px] shadow-sm">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-gray-50 bg-[#F8F8F7]/50">
                          <th className="px-8 py-6 text-[9px] font-black uppercase tracking-widest text-paragraph/40">Gear Details</th>
                          <th className="px-8 py-6 text-[9px] font-black uppercase tracking-widest text-paragraph/40">Renter</th>
                          <th className="px-8 py-6 text-[9px] font-black uppercase tracking-widest text-paragraph/40">Rental Dates</th>
                          <th className="px-8 py-6 text-[9px] font-black uppercase tracking-widest text-paragraph/40">Escrow Value</th>
                          <th className="px-8 py-6 text-[9px] font-black uppercase tracking-widest text-paragraph/40">Status</th>
                          <th className="px-8 py-6 text-[9px] font-black uppercase tracking-widest text-paragraph/40">Override</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {bookings.map((b) => (
                          <tr key={b._id} className="hover:bg-[#FDFDFC]">
                            <td className="px-8 py-6">
                              <p className="font-black text-txt uppercase tracking-tight italic leading-none mb-1">{b.product?.title}</p>
                              <p className="text-[8px] font-bold text-accent uppercase tracking-widest">Lender: {b.product?.owner?.name}</p>
                            </td>
                            <td className="px-8 py-6">
                              <p className="font-bold text-xs text-paragraph">{b.renter?.name}</p>
                              <p className="text-[8px] text-paragraph/40 font-medium">{b.renter?.email}</p>
                            </td>
                            <td className="px-8 py-6">
                              <p className="text-xs font-black tracking-tight">{b.pickupDate} to {b.returnDate}</p>
                              <p className="text-[8px] font-bold text-paragraph/30 uppercase tracking-widest mt-0.5">{b.rentalDays} Days</p>
                            </td>
                            <td className="px-8 py-6 font-black text-xs text-txt">
                              ৳{(b.grandTotal || b.rentalTotal).toLocaleString()}
                            </td>
                            <td className="px-8 py-6">
                              <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                                b.status === 'Completed' ? 'bg-green-500 text-white' :
                                b.status === 'Rejected' ? 'bg-red-500 text-white' :
                                b.status === 'Active' ? 'bg-accent text-txt shadow-sm shadow-accent/10' :
                                'bg-[#F8F8F7] text-paragraph/60'
                              }`}>
                                {b.status}
                              </span>
                            </td>
                            <td className="px-8 py-6">
                              {b.status !== 'Rejected' && b.status !== 'Completed' ? (
                                <button 
                                  onClick={() => handleCancelBooking(b._id)}
                                  className="px-4 py-2 border border-red-100 text-red-500 rounded-full text-[8px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all active:scale-95"
                                >
                                  Cancel Booking
                                </button>
                              ) : (
                                <span className="text-[8px] font-bold text-paragraph/20 uppercase tracking-widest">Frozen</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </AnimatePresence>
            )}

          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;