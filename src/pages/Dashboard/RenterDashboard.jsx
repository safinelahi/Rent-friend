import React, { useContext, useState } from "react";
import { 
  FiHome, FiBox, FiClock, FiUser, FiLogOut, FiMenu, FiX, 
  FiMapPin, FiMessageSquare, FiShield, FiMail, FiTarget, FiRepeat, FiCheckCircle 
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import api from "../../api/axios";

const RenterDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("rentals");
  const { user, myRentals, logout, refreshRentals } = useContext(AppContext);
  const navigate = useNavigate();

  const activeGear = myRentals.length > 0 ? myRentals[myRentals.length - 1] : null;
  const totalSpent = myRentals.reduce((acc, booking) => acc + (booking.grandTotal || 0), 0);

  const getSessionStatus = (status) => {
    switch (status) {
      case 'Pending Approval': return 'approval';
      case 'Approved': return 'pickup';
      case 'Active': return 'active';
      case 'Returned': return 'return';
      case 'Completed': return 'completed';
      default: return 'approval';
    }
  };

  const sessionStatus = activeGear ? getSessionStatus(activeGear.status) : 'approval';

  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `http://localhost:5000${url}`;
  };

  const handleLogout = () => { logout(); navigate("/"); };

  const handleConfirmPickup = async () => {
    try {
      const res = await api.patch(`/bookings/${activeGear._id}/status`, { status: 'Active' });
      if (res.data.success) {
        if (refreshRentals) await refreshRentals();
        alert("Rental is now ACTIVE.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to confirm pickup.");
    }
  };

  const handleStartReturn = async () => {
    try {
      const res = await api.patch(`/bookings/${activeGear._id}/status`, { status: 'Returned' });
      if (res.data.success) {
        if (refreshRentals) await refreshRentals();
        alert("Gear marked as returned to lender.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to mark as returned.");
    }
  };

  const steps = [
    { id: 'approval', label: 'Lender Approval', icon: <FiCheckCircle /> },
    { id: 'pickup', label: 'Meetup & Pickup', icon: <FiMapPin /> },
    { id: 'return', label: 'Return & Refund', icon: <FiRepeat /> }
  ];

  return (
    <div className="flex w-full min-h-screen bg-[#F8F8F7] font-epilogue text-[#111] overflow-x-hidden">
      
      {/* SIDEBAR */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} exit={{ opacity: 0 }} onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black z-40 lg:hidden" />
            <motion.aside initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} className="fixed inset-y-0 left-0 w-80 bg-white p-10 flex flex-col justify-between z-50 shadow-2xl lg:hidden">
              <div>
                <div className="flex justify-between items-center mb-16">
                  <span className="text-xl font-black uppercase italic tracking-wider">Rent <span className="text-accent">Friend.</span></span>
                  <button onClick={() => setIsSidebarOpen(false)} className="w-10 h-10 bg-[#F8F8F7] rounded-full flex items-center justify-center"><FiX /></button>
                </div>
                <nav className="space-y-4">
                  <button onClick={() => { setActiveTab("rentals"); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'rentals' ? 'bg-[#111] text-white shadow-xl' : 'hover:bg-[#F8F8F7]'}`}><FiHome /> Rentals</button>
                  <button onClick={() => { setActiveTab("profile"); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'profile' ? 'bg-[#111] text-white shadow-xl' : 'hover:bg-[#F8F8F7]'}`}><FiUser /> Profile</button>
                </nav>
              </div>
              <button onClick={handleLogout} className="flex items-center gap-4 text-red-500 font-black text-[10px] uppercase tracking-widest px-6 py-4 hover:bg-red-50 rounded-2xl transition-all"><FiLogOut /> Logout</button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex w-80 bg-white p-10 flex-col justify-between border-r border-gray-100 shrink-0 sticky top-0 h-screen">
        <div>
          <Link to="/" className="text-xl font-black uppercase italic tracking-wider mb-20 block">Rent <span className="text-accent">Friend.</span></Link>
          <nav className="space-y-4">
            <button onClick={() => setActiveTab("rentals")} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'rentals' ? 'bg-[#111] text-white shadow-xl' : 'hover:bg-[#F8F8F7] text-paragraph'}`}><FiHome /> Rentals</button>
            <button onClick={() => setActiveTab("profile")} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'profile' ? 'bg-[#111] text-white shadow-xl' : 'hover:bg-[#F8F8F7] text-paragraph'}`}><FiUser /> Profile</button>
          </nav>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-4 text-red-500 font-black text-[10px] uppercase tracking-widest px-6 py-4 hover:bg-red-50 rounded-2xl transition-all"><FiLogOut /> Logout</button>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 md:p-12 lg:p-16 flex justify-center items-start overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'rentals' ? (
            <motion.div key="rentals" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-[1440px] w-full space-y-12">
              
              <header className="flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] text-accent mb-4">Renter Hub</p>
                  <h1 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase leading-none">Dashboard.</h1>
                </div>
              </header>

              {/* RENTAL QUICK STATS */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white border border-gray-100 p-8 rounded-[32px] shadow-sm">
                  <FiDollarSign className="text-green-500 mb-4 text-2xl" />
                  <p className="text-[9px] font-black text-paragraph/30 uppercase tracking-widest mb-1">Total Spent</p>
                  <p className="text-3xl font-black tracking-tighter">৳{totalSpent.toLocaleString()}</p>
                </div>
                <div className="bg-white border border-gray-100 p-8 rounded-[32px] shadow-sm">
                  <FiBox className="text-accent mb-4 text-2xl" />
                  <p className="text-[9px] font-black text-paragraph/30 uppercase tracking-widest mb-1">My Rentals</p>
                  <p className="text-3xl font-black tracking-tighter">{myRentals.length}</p>
                </div>
                <div className="bg-white border border-gray-100 p-8 rounded-[32px] shadow-sm">
                  <FiClock className="text-blue-500 mb-4 text-2xl" />
                  <p className="text-[9px] font-black text-paragraph/30 uppercase tracking-widest mb-1">Ongoing Sessions</p>
                  <p className="text-3xl font-black tracking-tighter">
                    {myRentals.filter(r => ['Approved', 'Active', 'Returned'].includes(r.status)).length}
                  </p>
                </div>
              </div>

              {/* ACTIVE SESSION FLOW */}
              {activeGear ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  <div className="lg:col-span-8 bg-white border border-gray-100 rounded-[40px] shadow-sm overflow-hidden flex flex-col md:flex-row">
                    <div className="md:w-[320px] bg-[#F8F8F7] p-8 sm:p-12 flex flex-col justify-between shrink-0">
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-paragraph/30 mb-6">Current Progress</p>
                        <div className="space-y-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-200">
                          {steps.map((st) => {
                            const isDone = 
                              (st.id === 'approval' && ['Approved', 'Active', 'Returned', 'Completed'].includes(activeGear.status)) ||
                              (st.id === 'pickup' && ['Active', 'Returned', 'Completed'].includes(activeGear.status)) ||
                              (st.id === 'return' && ['Returned', 'Completed'].includes(activeGear.status));
                            
                            const isCurrent = 
                              (st.id === 'approval' && activeGear.status === 'Pending Approval') ||
                              (st.id === 'pickup' && activeGear.status === 'Approved') ||
                              (st.id === 'return' && activeGear.status === 'Active');

                            return (
                              <div key={st.id} className="flex items-center gap-4 relative z-10">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm border transition-all ${isDone ? 'bg-[#111] border-[#111] text-accent' : isCurrent ? 'bg-accent border-accent text-txt shadow-lg' : 'bg-white border-gray-200 text-paragraph/40'}`}>
                                  {st.icon}
                                </div>
                                <span className={`text-[10px] font-black uppercase tracking-widest ${isCurrent ? 'text-txt font-black' : isDone ? 'text-paragraph/60' : 'text-paragraph/30'}`}>{st.label}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="p-8 sm:p-12 flex-1 flex flex-col justify-between">
                      <div>
                        <h2 className="text-3xl font-black tracking-tighter leading-tight mb-8">{activeGear.product?.title}</h2>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-[8px] font-black text-paragraph/40 uppercase tracking-widest mb-1">Asset ID</p>
                            <p className="text-xs font-black text-txt tracking-tighter">{activeGear.product?.identifier || activeGear.product?._id}</p>
                          </div>
                          <div>
                            <p className="text-[8px] font-black text-paragraph/40 uppercase tracking-widest mb-1">Meetup</p>
                            <p className="text-xs font-black text-txt flex items-center gap-1"><FiMapPin className="text-accent"/> {activeGear.product?.location}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 mt-10">
                        <button className="bg-secondary/50 text-txt py-4 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-accent transition-all flex items-center justify-center gap-2">
                           <FiMessageSquare /> Chat
                        </button>

                        {sessionStatus === 'approval' && (
                          <button className="flex-1 bg-[#F1F1F0] text-paragraph/40 py-4 rounded-xl font-black text-[9px] uppercase tracking-widest cursor-not-allowed" disabled>
                             Waiting for Approval
                          </button>
                        )}

                        {sessionStatus === 'pickup' && (
                          <button onClick={handleConfirmPickup} className="flex-1 bg-[#111] text-white py-4 rounded-xl font-black text-[9px] uppercase tracking-widest flex items-center justify-center gap-2">
                             Confirm Pickup
                          </button>
                        )}

                        {sessionStatus === 'active' && (
                          <button onClick={handleStartReturn} className="flex-1 bg-[#111] text-white py-4 rounded-xl font-black text-[9px] uppercase tracking-widest flex items-center justify-center gap-2">
                             Mark as Returned
                          </button>
                        )}

                        {sessionStatus === 'return' && (
                          <button className="flex-1 bg-[#F1F1F0] text-paragraph/40 py-4 rounded-xl font-black text-[9px] uppercase tracking-widest cursor-not-allowed" disabled>
                             Awaiting Return Approval
                          </button>
                        )}

                        {sessionStatus === 'completed' && (
                          <span className="flex-1 text-center bg-green-50 text-green-600 py-4 rounded-xl font-black text-[9px] uppercase tracking-widest border border-green-100 flex items-center justify-center gap-2">
                             Completed & Released
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-4 flex flex-col gap-6">
                    <div className="bg-[#111] text-white p-8 rounded-[32px] flex-1 flex flex-col justify-between relative overflow-hidden shadow-xl min-h-[200px]">
                      <FiShield size={120} className="absolute -right-10 -top-10 text-white/5 pointer-events-none" />
                      <p className="text-accent text-[10px] font-black uppercase tracking-[0.4em]">Escrow Status</p>
                      <div>
                        <p className="text-4xl font-black tracking-tighter">৳{(activeGear.securityDeposit || 1500).toLocaleString()}</p>
                        <p className="text-[9px] font-bold opacity-30 uppercase tracking-widest mt-1">Security Hold</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </motion.div>
          ) : activeTab === 'profile' ? (
            /* PROFILE VIEW */
            <motion.div key="profile" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="max-w-4xl w-full">
              <div className="bg-white p-8 sm:p-14 rounded-[32px] border border-gray-50 shadow-sm overflow-hidden">
                <header className="flex flex-col md:flex-row items-center gap-10 mb-12 pb-12 border-b border-gray-50">
                  <div className="w-32 h-32 bg-[#111] text-accent rounded-[32px] flex items-center justify-center text-5xl font-black shadow-2xl border-[8px] border-[#F8F8F7] shrink-0">
                    {user?.name?.charAt(0) || 'S'}
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-4xl font-black tracking-tighter mb-2">{user?.name || 'User'}</h3>
                    <span className="bg-green-50 text-green-600 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-green-100">Verified Member</span>
                  </div>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
                  <div className="space-y-2">
                    <p className="text-[9px] font-black text-paragraph/40 uppercase tracking-widest flex items-center gap-2"><FiMail className="text-accent" /> Email</p>
                    <div className="bg-[#F8F8F7] p-4 rounded-2xl text-xs sm:text-sm font-bold border border-gray-50 truncate">{user?.email || ''}</div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[9px] font-black text-paragraph/40 uppercase tracking-widest flex items-center gap-2"><FiTarget className="text-accent" /> Role</p>
                    <div className="bg-[#F8F8F7] p-4 rounded-2xl text-xs sm:text-sm font-bold uppercase border border-gray-50">Renter Hub</div>
                  </div>
                </div>
                <button onClick={handleLogout} className="w-full sm:w-auto bg-red-50 text-red-500 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-sm">
                  Terminate Session
                </button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>

      {!isSidebarOpen && (
        <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden fixed bottom-8 right-8 w-16 h-16 bg-[#111] text-white rounded-full flex items-center justify-center shadow-2xl z-[60] active:scale-90 transition-transform">
          <FiMenu size={24}/>
        </button>
      )}
    </div>
  );
};

// Simple FiDollarSign replacement icon
const FiDollarSign = (props) => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" {...props}>
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

export default RenterDashboard;