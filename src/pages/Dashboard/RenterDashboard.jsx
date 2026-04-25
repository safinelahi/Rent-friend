import React, { useState, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FiBox, FiClock, FiUser, FiLogOut, FiHome, FiMenu, 
  FiX, FiShield, FiMapPin, FiMessageSquare, FiRepeat, FiZap, 
  FiActivity, FiMail, FiTarget, FiCheckCircle, FiCamera, FiUploadCloud, FiTrash2
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { AppContext } from "../../context/AppContext";

const RenterDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("rentals");
  const { user, myRentals, logout } = useContext(AppContext);
  const navigate = useNavigate();

  // --- LIFECYCLE LOGIC ---
  const [sessionStatus, setSessionStatus] = useState('approval');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadType, setUploadType] = useState(''); 

  // --- IMAGE UPLOAD STATE & REFS ---
  const [capturedImages, setCapturedImages] = useState({ 1: null, 2: null, 3: null });
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const refs = { 1: inputRef1, 2: inputRef2, 3: inputRef3 };

  const activeGear = myRentals.length > 0 ? myRentals[myRentals.length - 1] : null;
  const totalSpent = myRentals.reduce((acc, item) => (acc + (Number(item.price) || 0) + 1585), 0);

  const handleLogout = () => { logout(); navigate("/"); };

  // --- IMAGE HELPERS ---
  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedImages(prev => ({ ...prev, [index]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = (index) => {
    setCapturedImages(prev => ({ ...prev, [index]: null }));
  };

  const steps = [
    { id: 'approval', label: 'Lender Approval', icon: <FiCheckCircle /> },
    { id: 'pickup', label: 'Meetup & Pickup', icon: <FiMapPin /> },
    { id: 'return', label: 'Return & Refund', icon: <FiRepeat /> }
  ];

  return (
    <div className="flex min-h-screen bg-[#F8F8F7] font-epilogue text-[#111] overflow-hidden">
      
      {/* SIDEBAR */}
      <AnimatePresence>
        {(isSidebarOpen || window.innerWidth > 1024) && (
          <motion.aside 
            initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }}
            className="fixed lg:static inset-y-0 left-0 w-80 bg-white border-r border-gray-50 z-50 flex flex-col p-10"
          >
            <div className="mb-16 flex items-center justify-between">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center font-black text-xl shadow-lg shadow-accent/20 transition-transform group-hover:rotate-12">R</div>
                <span className="font-black text-xl tracking-tighter uppercase">rentfriend</span>
              </Link>
              <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden"><FiX /></button>
            </div>

            <nav className="flex-1 space-y-2">
              <p className="text-[10px] font-black text-paragraph/30 uppercase tracking-[0.4em] mb-8 pl-2">Command Center</p>
              {[
                { id: 'rentals', name: 'Active Gear', icon: <FiBox /> },
                { id: 'profile', name: 'Profile Settings', icon: <FiUser /> },
                { id: 'history', name: 'Order History', icon: <FiClock /> },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-[20px] transition-all font-black text-[11px] uppercase tracking-widest ${
                    activeTab === item.id ? 'bg-[#111] text-white shadow-xl' : 'text-paragraph hover:bg-[#F1F1F0]'
                  }`}
                >
                  <span className={activeTab === item.id ? 'text-accent' : ''}>{item.icon}</span> {item.name}
                </button>
              ))}
            </nav>

            <button onClick={handleLogout} className="flex items-center gap-4 px-6 py-4 text-red-500 font-black uppercase text-[10px] tracking-[0.3em] mt-auto hover:opacity-50 transition-all">
              <FiLogOut /> Sign Out
            </button>
          </motion.aside>
        )}
      </AnimatePresence>

      <main className="flex-1 min-w-0 p-6 md:p-14 lg:p-16 overflow-y-auto">
        <header className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <div className="flex items-center gap-2 text-accent mb-3 font-black text-[9px] uppercase tracking-[0.4em]">
               <FiZap size={12} /> Live Session Monitoring
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
              {activeTab === 'rentals' ? 'Renter Hub.' : activeTab === 'profile' ? 'Profile Settings.' : 'Order History.'}
            </h1>
          </div>
          
          <div className="hidden md:flex items-center gap-6 bg-white p-4 rounded-[24px] border border-gray-50 shadow-sm">
             <div className="text-right px-2">
                <p className="text-[9px] font-black text-paragraph/40 uppercase tracking-widest mb-0.5">Total Deployed</p>
                <p className="text-xl font-black text-txt">৳{totalSpent.toLocaleString()}</p>
             </div>
             <Link to="/browse" className="bg-[#F1F1F0] w-10 h-10 rounded-xl flex items-center justify-center hover:bg-accent transition-all">
                <FiHome size={18} />
             </Link>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'rentals' ? (
            <motion.div key="rentals" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              
              {/* Lifecyle Status Bar */}
              <div className="bg-white p-8 rounded-[32px] border border-gray-50 shadow-sm">
                 <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    {steps.map((step, idx) => {
                      const isActive = (sessionStatus === step.id);
                      const isCompleted = (idx < steps.findIndex(s => s.id === sessionStatus));
                      return (
                        <div key={step.id} className={`flex items-center gap-4 flex-1 ${idx !== steps.length - 1 ? 'md:border-r border-gray-50 pr-8' : ''}`}>
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isCompleted ? 'bg-green-500 text-white' : isActive ? 'bg-accent text-txt shadow-lg shadow-accent/20 scale-110' : 'bg-gray-50 text-paragraph/30'}`}>
                             {isCompleted ? <FiCheckCircle size={20}/> : step.icon}
                          </div>
                          <div>
                            <p className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-txt' : 'text-paragraph/40'}`}>{step.label}</p>
                            <p className="text-[9px] font-medium text-paragraph/60 mt-0.5">
                               {step.id === 'approval' && (isCompleted ? 'Verified' : 'Pending')}
                               {step.id === 'pickup' && (isActive ? 'Ready' : isCompleted ? 'Handover Done' : 'Next')}
                               {step.id === 'return' && (isActive ? 'Active Window' : 'Secure Session')}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                 </div>
              </div>

              {activeGear ? (
                <div className="grid lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-8 bg-white rounded-[32px] border border-gray-50 shadow-sm flex flex-col md:flex-row overflow-hidden">
                    <div className="md:w-[45%] h-80 md:h-auto bg-[#F1F1F0] relative">
                       <img src={activeGear.image} className="w-full h-full object-cover" alt="" />
                       <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[8px] font-black uppercase tracking-widest shadow-sm flex items-center gap-2">
                         <FiActivity className="text-accent animate-pulse"/> Ongoing Trip
                       </div>
                    </div>

                    <div className="p-10 flex-1 flex flex-col justify-between">
                       <div>
                          <h2 className="text-3xl font-black tracking-tighter leading-tight mb-8">{activeGear.title}</h2>
                          <div className="grid grid-cols-2 gap-6">
                             <div>
                                <p className="text-[8px] font-black text-paragraph/40 uppercase tracking-widest mb-1">Asset ID</p>
                                <p className="text-xs font-black text-txt">{activeGear.identifier || "#RF-RF-4LBZYU"}</p>
                             </div>
                             <div>
                                <p className="text-[8px] font-black text-paragraph/40 uppercase tracking-widest mb-1">Meetup</p>
                                <p className="text-xs font-black text-txt flex items-center gap-1"><FiMapPin className="text-accent"/> {activeGear.location}</p>
                             </div>
                          </div>
                       </div>

                       <div className="flex gap-3 mt-10">
                          <button className="flex-[0.5] bg-secondary/50 text-txt py-4 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-accent transition-all flex items-center justify-center gap-2">
                             <FiMessageSquare /> Chat
                          </button>

                          {sessionStatus === 'approval' && (
                            <button onClick={() => setSessionStatus('pickup')} className="flex-1 bg-accent text-txt py-4 rounded-xl font-black text-[9px] uppercase tracking-widest shadow-xl shadow-accent/10">
                               Confirming Request...
                            </button>
                          )}

                          {sessionStatus === 'pickup' && (
                            <button 
                              onClick={() => { setUploadType('pickup'); setShowUploadModal(true); }} 
                              className="flex-1 bg-[#111] text-white py-4 rounded-xl font-black text-[9px] uppercase tracking-widest flex items-center justify-center gap-2"
                            >
                               <FiCamera /> Confirm Item Pickup
                            </button>
                          )}

                          {sessionStatus === 'active' && (
                            <button onClick={() => setSessionStatus('return')} className="flex-1 bg-[#111] text-white py-4 rounded-xl font-black text-[9px] uppercase tracking-widest flex items-center justify-center gap-2">
                               <FiRepeat /> Start Return
                            </button>
                          )}

                          {sessionStatus === 'return' && (
                            <button 
                              onClick={() => { setUploadType('return'); setShowUploadModal(true); }} 
                              className="flex-1 bg-orange-500 text-white py-4 rounded-xl font-black text-[9px] uppercase tracking-widest flex items-center justify-center gap-2"
                            >
                               <FiUploadCloud /> Submit Return Audit
                            </button>
                          )}
                       </div>
                    </div>
                  </div>

                  <div className="lg:col-span-4 flex flex-col gap-6">
                     <div className="bg-[#111] text-white p-8 rounded-[32px] flex-1 flex flex-col justify-between relative overflow-hidden shadow-xl min-h-[220px]">
                        <FiShield size={120} className="absolute -right-8 -top-8 text-white/5" />
                        <p className="text-accent text-[9px] font-black uppercase tracking-[0.3em]">Escrow Health</p>
                        <div>
                           <p className="text-4xl font-black tracking-tighter">৳1,500</p>
                           <p className="text-[9px] font-bold opacity-30 uppercase tracking-widest mt-1">Safe-Guard Hold</p>
                        </div>
                     </div>
                     <div className="bg-white p-8 rounded-[32px] border border-gray-50 flex-1 flex flex-col justify-between shadow-sm min-h-[220px]">
                        <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent"><FiClock size={18} /></div>
                        <div>
                           <p className="text-3xl font-black tracking-tighter">72:00:00</p>
                           <p className="text-[9px] font-black text-paragraph/40 uppercase tracking-widest mt-1">Duration</p>
                        </div>
                     </div>
                  </div>
                </div>
              ) : null}
            </motion.div>
          ) : activeTab === 'profile' ? (
            /* PROFILE VIEW */
            <motion.div key="profile" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="max-w-4xl">
               <div className="bg-white p-10 md:p-14 rounded-[32px] border border-gray-50 shadow-sm">
                  <div className="mb-12">
                     <h2 className="text-2xl font-black tracking-tight mb-1">Profile Settings</h2>
                     <p className="text-[10px] font-bold text-paragraph/40 uppercase tracking-[0.2em]">Manage your identity.</p>
                  </div>
                  <div className="flex flex-col md:flex-row items-center gap-10 mb-14 pb-14 border-b border-gray-50">
                     <div className="w-32 h-32 bg-[#111] text-accent rounded-[32px] flex items-center justify-center text-5xl font-black shadow-2xl border-[8px] border-[#F8F8F7]">
                        {user?.name?.charAt(0) || 'S'}
                     </div>
                     <div className="text-center md:text-left">
                        <h3 className="text-4xl font-black tracking-tighter mb-2">{user?.name || 'Safin Elahi'}</h3>
                        <span className="bg-green-50 text-green-600 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-green-100">Verified Member</span>
                     </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8 mb-14">
                     <div className="space-y-2">
                        <p className="text-[9px] font-black text-paragraph/40 uppercase tracking-widest flex items-center gap-2"><FiMail className="text-accent" /> Email Address</p>
                        <div className="bg-[#F8F8F7] p-4 rounded-2xl text-sm font-bold border border-gray-50">{user?.email || 'safin@example.com'}</div>
                     </div>
                     <div className="space-y-2">
                        <p className="text-[9px] font-black text-paragraph/40 uppercase tracking-widest flex items-center gap-2"><FiTarget className="text-accent" /> Account Type</p>
                        <div className="bg-[#F8F8F7] p-4 rounded-2xl text-sm font-bold uppercase tracking-widest border border-gray-50">Renter</div>
                     </div>
                  </div>
                  <button onClick={handleLogout} className="flex items-center gap-3 bg-red-50 text-red-500 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-sm">
                    <FiLogOut /> Logout
                  </button>
               </div>
            </motion.div>
          ) : (
            /* HISTORY VIEW */
            <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
               <div className="grid gap-4">
                 {myRentals.map((rental, index) => (
                   <div key={index} className="bg-white p-6 rounded-[24px] border border-gray-50 flex items-center justify-between shadow-sm group">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-secondary">
                           <img src={rental.image} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" alt="" />
                        </div>
                        <h4 className="font-black text-base tracking-tight">{rental.title}</h4>
                      </div>
                      <p className="text-[10px] font-black uppercase text-green-600">Completed</p>
                   </div>
                 ))}
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ================= UPDATED: DYNAMIC CONDITION UPLOAD MODAL ================= */}
      <AnimatePresence>
        {showUploadModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowUploadModal(false)} className="absolute inset-0 bg-[#111]/40 backdrop-blur-md" />
             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white w-full max-w-[600px] rounded-[40px] p-12 relative z-10 text-center shadow-2xl">
                <div className="w-20 h-20 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-8">
                   <FiCamera size={32} />
                </div>
                <h3 className="text-3xl font-black tracking-tight mb-4">{uploadType === 'pickup' ? 'Pickup Condition Audit' : 'Return Condition Audit'}</h3>
                <p className="text-paragraph text-sm font-medium leading-relaxed mb-10">
                   Capture gear from 3 different angles to verify condition for the Admin.
                </p>

                {/* UPLOAD GRID */}
                <div className="grid grid-cols-3 gap-4 mb-10">
                   {[1, 2, 3].map(i => (
                     <div key={i} className="relative">
                        <div 
                           onClick={() => refs[i].current.click()}
                           className={`aspect-square rounded-3xl border-2 border-dashed transition-all flex flex-col items-center justify-center cursor-pointer overflow-hidden ${capturedImages[i] ? 'border-accent border-solid shadow-lg shadow-accent/10' : 'border-gray-100 bg-[#F8F8F7] hover:border-accent'}`}
                        >
                           {capturedImages[i] ? (
                             <img src={capturedImages[i]} className="w-full h-full object-cover" alt="" />
                           ) : (
                             <>
                               <FiUploadCloud className="text-paragraph/20 group-hover:text-accent" size={24} />
                               <span className="text-[8px] font-black uppercase text-paragraph/40 mt-1">Angle {i}</span>
                             </>
                           )}
                        </div>
                        {/* Hidden Input Trigger */}
                        <input type="file" accept="image/*" className="hidden" ref={refs[i]} onChange={(e) => handleImageChange(i, e)} />
                        
                        {/* Trash Icon to Reset */}
                        {capturedImages[i] && (
                          <button onClick={() => clearImage(i)} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-600 transition-colors">
                            <FiTrash2 size={10} />
                          </button>
                        )}
                     </div>
                   ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <button onClick={() => setShowUploadModal(false)} className="py-5 rounded-2xl bg-[#F8F8F7] text-paragraph font-black uppercase text-[10px] tracking-widest">Cancel</button>
                   <button 
                      disabled={!capturedImages[1] || !capturedImages[2] || !capturedImages[3]}
                      onClick={() => {
                        setShowUploadModal(false);
                        setSessionStatus(uploadType === 'pickup' ? 'active' : 'completed');
                        setCapturedImages({ 1: null, 2: null, 3: null });
                        alert("Secure condition data logged for Admin verification!");
                      }} 
                      className={`py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl transition-all ${(!capturedImages[1] || !capturedImages[2] || !capturedImages[3]) ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#111] text-white hover:bg-black'}`}
                   >
                     Submit Audit
                   </button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden fixed bottom-10 right-10 w-14 h-14 bg-[#111] text-white rounded-full flex items-center justify-center shadow-2xl z-[60]"><FiMenu size={20}/></button>
    </div>
  );
};

export default RenterDashboard;