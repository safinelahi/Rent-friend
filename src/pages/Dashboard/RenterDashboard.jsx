import React, { useState, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FiBox, FiClock, FiUser, FiLogOut, FiHome, FiMenu, 
  FiX, FiShield, FiMapPin, FiMessageSquare, FiRepeat, FiZap, 
  FiActivity, FiMail, FiTarget, FiCheckCircle, FiCamera, FiUploadCloud, FiTrash2, FiChevronRight
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { AppContext } from "../../context/AppContext";

const RenterDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("rentals");
  const { user, myRentals, logout } = useContext(AppContext);
  const navigate = useNavigate();

  const [sessionStatus, setSessionStatus] = useState('approval');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadType, setUploadType] = useState(''); 

  const [capturedImages, setCapturedImages] = useState({ 1: null, 2: null, 3: null });
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const refs = { 1: inputRef1, 2: inputRef2, 3: inputRef3 };

  const activeGear = myRentals.length > 0 ? myRentals[myRentals.length - 1] : null;
  const totalSpent = myRentals.reduce((acc, item) => (acc + (Number(item.price) || 0) + 1585), 0);

  const handleLogout = () => { logout(); navigate("/"); };

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
    <div className="flex w-full min-h-screen bg-[#F8F8F7] font-epilogue text-[#111] overflow-x-hidden">
      
      {/* SIDEBAR */}
      <AnimatePresence>
        {(isSidebarOpen || window.innerWidth > 1024) && (
          <>
            {/* Mobile Overlay */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-[#111]/20 backdrop-blur-sm z-40 lg:hidden"
            />
            
            <motion.aside 
              initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }}
              className="fixed lg:static inset-y-0 left-0 w-72 sm:w-80 bg-white border-r border-gray-50 z-50 flex flex-col p-8 sm:p-10 h-full"
            >
              <div className="mb-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3 group">
                  <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center font-black text-xl shadow-lg shadow-accent/20 transition-transform group-hover:rotate-12">R</div>
                  <span className="font-black text-xl tracking-tighter uppercase">rentfriend</span>
                </Link>
                <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-paragraph/40"><FiX size={24} /></button>
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
          </>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT AREA - Fixed with w-full and min-w-0 */}
      <main className="flex-1 w-full min-w-0 p-4 sm:p-10 lg:p-16 overflow-y-auto overflow-x-hidden">
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="w-full md:w-auto">
            <div className="flex items-center gap-2 text-accent mb-3 font-black text-[9px] uppercase tracking-[0.4em]">
               <FiZap size={12} /> Live Session Monitoring
            </div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tighter leading-none">
              {activeTab === 'rentals' ? 'Renter Hub.' : activeTab === 'profile' ? 'Profile.' : 'History.'}
            </h1>
          </div>
          
          <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-6 bg-white p-5 rounded-[24px] border border-gray-50 shadow-sm">
             <div className="px-2">
                <p className="text-[9px] font-black text-paragraph/40 uppercase tracking-widest mb-0.5">Total Deployed</p>
                <p className="text-xl sm:text-2xl font-black text-txt tracking-tighter">৳{totalSpent.toLocaleString()}</p>
             </div>
             <Link to="/browse" className="bg-[#F1F1F0] w-12 h-12 rounded-xl flex items-center justify-center hover:bg-accent transition-all shrink-0">
                <FiHome size={18} />
             </Link>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'rentals' ? (
            <motion.div key="rentals" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 w-full">
              
              {/* Lifecyle Status Bar - Fixed Horizontal Scroll on Mobile */}
              <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-gray-50 shadow-sm overflow-x-auto overflow-y-hidden custom-scrollbar">
                 <div className="flex items-center justify-between min-w-[550px] gap-8">
                    {steps.map((step, idx) => {
                      const isActive = (sessionStatus === step.id);
                      const isCompleted = (idx < steps.findIndex(s => s.id === sessionStatus));
                      return (
                        <div key={step.id} className="flex items-center gap-4 flex-1 whitespace-nowrap">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shrink-0 ${isCompleted ? 'bg-green-500 text-white' : isActive ? 'bg-accent text-txt shadow-lg shadow-accent/20 scale-110' : 'bg-gray-50 text-paragraph/30'}`}>
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
                          {idx !== steps.length - 1 && <FiChevronRight className="text-gray-100 ml-auto hidden sm:block" />}
                        </div>
                      );
                    })}
                 </div>
              </div>

              {activeGear ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
                  <div className="lg:col-span-8 bg-white rounded-[32px] border border-gray-50 shadow-sm flex flex-col md:flex-row overflow-hidden">
                    <div className="md:w-[45%] h-72 md:h-auto bg-[#F1F1F0] relative overflow-hidden">
                       <img src={activeGear.image} className="w-full h-full object-cover" alt="" />
                       <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[8px] font-black uppercase tracking-widest shadow-sm flex items-center gap-2">
                         <FiActivity className="text-accent animate-pulse"/> Ongoing Trip
                       </div>
                    </div>

                    <div className="p-8 sm:p-12 flex-1 flex flex-col justify-between">
                       <div>
                          <h2 className="text-3xl font-black tracking-tighter leading-tight mb-8">{activeGear.title}</h2>
                          <div className="grid grid-cols-2 gap-4">
                             <div>
                                <p className="text-[8px] font-black text-paragraph/40 uppercase tracking-widest mb-1">Asset ID</p>
                                <p className="text-xs font-black text-txt tracking-tighter">#{activeGear.identifier || "RF-RF-4LBZYU"}</p>
                             </div>
                             <div>
                                <p className="text-[8px] font-black text-paragraph/40 uppercase tracking-widest mb-1">Meetup</p>
                                <p className="text-xs font-black text-txt flex items-center gap-1"><FiMapPin className="text-accent"/> {activeGear.location}</p>
                             </div>
                          </div>
                       </div>

                       <div className="flex flex-col sm:flex-row gap-3 mt-10">
                          <button className="bg-secondary/50 text-txt py-4 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-accent transition-all flex items-center justify-center gap-2">
                             <FiMessageSquare /> Chat
                          </button>

                          {sessionStatus === 'approval' && (
                            <button onClick={() => setSessionStatus('pickup')} className="flex-1 bg-accent text-txt py-4 rounded-xl font-black text-[9px] uppercase tracking-widest shadow-xl shadow-accent/10">
                               Confirming...
                            </button>
                          )}

                          {sessionStatus === 'pickup' && (
                            <button onClick={() => { setUploadType('pickup'); setShowUploadModal(true); }} className="flex-1 bg-[#111] text-white py-4 rounded-xl font-black text-[9px] uppercase tracking-widest flex items-center justify-center gap-2">
                               <FiCamera /> Confirm Pickup
                            </button>
                          )}

                          {sessionStatus === 'active' && (
                            <button onClick={() => setSessionStatus('return')} className="flex-1 bg-[#111] text-white py-4 rounded-xl font-black text-[9px] uppercase tracking-widest flex items-center justify-center gap-2">
                               <FiRepeat /> Start Return
                            </button>
                          )}

                          {sessionStatus === 'return' && (
                            <button onClick={() => { setUploadType('return'); setShowUploadModal(true); }} className="flex-1 bg-orange-500 text-white py-4 rounded-xl font-black text-[9px] uppercase tracking-widest flex items-center justify-center gap-2">
                               <FiUploadCloud /> Final Audit
                            </button>
                          )}
                       </div>
                    </div>
                  </div>

                  <div className="lg:col-span-4 flex flex-col gap-6">
                     <div className="bg-[#111] text-white p-8 rounded-[32px] flex-1 flex flex-col justify-between relative overflow-hidden shadow-xl min-h-[200px]">
                        <FiShield size={120} className="absolute -right-10 -top-10 text-white/5 pointer-events-none" />
                        <p className="text-accent text-[10px] font-black uppercase tracking-[0.4em]">Escrow Status</p>
                        <div>
                           <p className="text-4xl font-black tracking-tighter">৳1,500</p>
                           <p className="text-[9px] font-bold opacity-30 uppercase tracking-widest mt-1">Security Hold</p>
                        </div>
                     </div>
                  </div>
                </div>
              ) : null}
            </motion.div>
          ) : activeTab === 'profile' ? (
            /* PROFILE VIEW FIXED WIDTH */
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
                        <div className="bg-[#F8F8F7] p-4 rounded-2xl text-xs sm:text-sm font-bold border border-gray-50 truncate">{user?.email || 'safin@example.com'}</div>
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

      {/* AUDIT MODAL - FIXED WIDTH AND OVERFLOW */}
      <AnimatePresence>
        {showUploadModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowUploadModal(false)} className="absolute inset-0 bg-[#111]/40 backdrop-blur-md" />
             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white w-full max-w-[600px] rounded-[40px] p-8 sm:p-12 relative z-10 text-center shadow-2xl max-h-[95vh] overflow-y-auto">
                <div className="w-20 h-20 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-8 shrink-0">
                   <FiCamera size={32} />
                </div>
                <h3 className="text-3xl font-black tracking-tight mb-4 uppercase">{uploadType === 'pickup' ? 'Pickup Audit' : 'Final Audit'}</h3>
                <p className="text-paragraph text-xs font-medium leading-relaxed mb-10 max-w-[350px] mx-auto uppercase tracking-widest opacity-60">
                   Capture gear from 3 different angles for session validation.
                </p>

                {/* UPLOAD GRID */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-10">
                   {[1, 2, 3].map(i => (
                     <div key={i} className="relative">
                        <div 
                           onClick={() => refs[i].current.click()}
                           className={`aspect-square rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center cursor-pointer overflow-hidden ${capturedImages[i] ? 'border-accent border-solid' : 'border-gray-100 bg-[#F8F8F7] hover:border-accent'}`}
                        >
                           {capturedImages[i] ? (
                             <img src={capturedImages[i]} className="w-full h-full object-cover" alt="" />
                           ) : (
                             <>
                               <FiUploadCloud className="text-paragraph/20" size={24} />
                               <span className="text-[7px] font-black uppercase text-paragraph/40 mt-1">Angle {i}</span>
                             </>
                           )}
                        </div>
                        <input type="file" accept="image/*" className="hidden" ref={refs[i]} onChange={(e) => handleImageChange(i, e)} />
                        {capturedImages[i] && (
                          <button onClick={() => clearImage(i)} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-md active:scale-90">
                            <FiTrash2 size={10} />
                          </button>
                        )}
                     </div>
                   ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <button onClick={() => setShowUploadModal(false)} className="py-4 rounded-2xl bg-[#F8F8F7] text-paragraph font-black uppercase text-[10px] tracking-widest active:scale-95">Cancel</button>
                   <button 
                      disabled={!capturedImages[1] || !capturedImages[2] || !capturedImages[3]}
                      onClick={() => {
                        setShowUploadModal(false);
                        setSessionStatus(uploadType === 'pickup' ? 'active' : 'completed');
                        setCapturedImages({ 1: null, 2: null, 3: null });
                      }} 
                      className={`py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl transition-all ${(!capturedImages[1] || !capturedImages[2] || !capturedImages[3]) ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#111] text-white hover:bg-black active:scale-95'}`}
                   >
                     Submit
                   </button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {!isSidebarOpen && (
        <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden fixed bottom-8 right-8 w-16 h-16 bg-[#111] text-white rounded-full flex items-center justify-center shadow-2xl z-[60] active:scale-90 transition-transform">
          <FiMenu size={24}/>
        </button>
      )}
    </div>
  );
};

export default RenterDashboard;