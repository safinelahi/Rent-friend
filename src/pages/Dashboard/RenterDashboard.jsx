import React, { useState, useContext } from "react";
import Sidebar from "../../components/Dashboard/Sidebar";
import {
  FiClock,
  FiMapPin,
  FiExternalLink,
  FiMessageCircle,
  FiMenu,
  FiPackage,
  FiUser,
  FiMail,
  FiShield,
  FiLogOut,
} from "react-icons/fi";
import { AppContext } from "../../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";

const RenterDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("rentals");

  const { myRentals, logout, user } = useContext(AppContext);

  const activeItem = myRentals.length > 0 ? myRentals[0] : null;
  const totalSpent = myRentals.reduce(
    (acc, item) => acc + item.price * 3 + 1500 + 85,
    0,
  );

  return (
    <div className="flex min-h-screen bg-secondary font-epilogue">
      {/* Sidebar handling the new Profile button and Logout */}
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="flex-1 min-w-0">
        <div className="p-6 md:p-12 lg:p-16 max-w-5xl mx-auto">
          {/* MOBILE TOP NAV */}
          <div className="lg:hidden flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center font-black text-sm">
                R
              </div>
              <span className="font-black text-txt tracking-tighter">
                RentFriend
              </span>
            </div>
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 bg-white rounded-xl shadow-sm"
            >
              <FiMenu size={20} />
            </button>
          </div>

          <header className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h1 className="type-h3 font-black text-txt tracking-tight uppercase">
                {activeTab === "profile" ? "Profile Settings" : "Renter Hub"}
              </h1>
              <p className="text-paragraph text-sm mt-1 font-medium">
                {activeTab === "profile"
                  ? "Manage your personal identity."
                  : "Tracking your active gear."}
              </p>
            </div>
            {activeTab === "rentals" && (
              <div className="bg-primary border border-gray-100 px-6 py-3 rounded-2xl shadow-sm self-start">
                <p className="text-[10px] font-bold text-paragraph uppercase tracking-widest">
                  Total Spent
                </p>
                <p className="text-lg font-black text-txt">
                  ৳{totalSpent.toLocaleString()}
                </p>
              </div>
            )}
          </header>

          <AnimatePresence mode="wait">
            {activeTab === "profile" ? (
              /* ================= PROFILE VIEW ================= */
              <motion.div
                key="profile"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-8"
              >
                <div className="bg-primary p-8 md:p-12 rounded-[40px] border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-6 mb-10">
                    <div className="w-24 h-24 bg-accent rounded-3xl flex items-center justify-center text-3xl font-black text-txt shadow-lg shadow-accent/20">
                      {user?.name?.charAt(0)}
                    </div>
                    <div>
                      <h2 className="type-h4 font-black text-txt">
                        {user?.name}
                      </h2>
                      <p className="text-paragraph font-black uppercase text-[10px] tracking-[0.2em] opacity-60">
                        Verified Member
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-1 p-6 bg-secondary rounded-2xl border border-gray-50">
                      <label className="text-[9px] font-black text-paragraph uppercase tracking-widest flex items-center gap-2">
                        <FiMail className="text-accent" /> Email Address
                      </label>
                      <p className="type-p font-bold text-txt">{user?.email}</p>
                    </div>
                    <div className="space-y-1 p-6 bg-secondary rounded-2xl border border-gray-50">
                      <label className="text-[9px] font-black text-paragraph uppercase tracking-widest flex items-center gap-2">
                        <FiShield className="text-accent" /> Account Type
                      </label>
                      <p className="type-p font-bold text-txt uppercase tracking-widest text-xs">
                        {user?.role}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={logout}
                  className="flex items-center gap-3 text-red-500 font-black uppercase text-[10px] tracking-widest p-4 hover:bg-red-50 rounded-2xl transition-all"
                >
                  <FiLogOut /> Sign out
                </button>
              </motion.div>
            ) : (
              /* ================= RENTALS VIEW ================= */
              <motion.div
                key="rentals"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                {activeItem ? (
                  <section className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="type-small font-bold uppercase tracking-widest text-paragraph px-2">
                        Ongoing Trip
                      </h3>
                      <span className="flex items-center gap-1.5 text-[10px] font-bold text-green-500 uppercase">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>{" "}
                        Live Tracking
                      </span>
                    </div>

                    <div className="bg-primary border border-gray-100 rounded-[32px] overflow-hidden shadow-sm">
                      <div className="flex flex-col xl:flex-row">
                        <div className="w-full xl:w-72 h-64 xl:h-auto bg-secondary overflow-hidden">
                          <img
                            src={activeItem.image}
                            className="w-full h-full object-cover"
                            alt="rental"
                          />
                        </div>

                        <div className="p-8 flex-1 flex flex-col justify-between">
                          <div className="space-y-4">
                            <div className="flex gap-2">
                              <span className="bg-accent text-txt px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                {activeItem.category || "Outdoor"}
                              </span>
                              <span className="bg-secondary text-txt px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                #{activeItem.bookingId}
                              </span>
                            </div>
                            <h2 className="type-h4 font-black text-txt leading-tight">
                              {activeItem.title}
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-y border-gray-50">
                              <div className="space-y-1">
                                <p className="text-[10px] font-bold text-paragraph uppercase tracking-widest">
                                  Time Remaining
                                </p>
                                <p className="text-xs font-bold text-txt flex items-center gap-1.5">
                                  <FiClock className="text-accent" /> 3 Days
                                  Left
                                </p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-[10px] font-bold text-paragraph uppercase tracking-widest">
                                  Pickup Point
                                </p>
                                <p className="text-xs font-bold text-txt flex items-center gap-1.5">
                                  <FiMapPin className="text-accent" />{" "}
                                  {activeItem.location || "Rajshahi"}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-3 pt-6">
                            <button className="flex-1 bg-txt text-primary py-4 rounded-xl font-bold text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-black transition-all shadow-lg">
                              <FiMessageCircle size={16} /> Chat Owner
                            </button>
                            <button className="flex-1 border border-gray-100 text-txt py-4 rounded-xl font-bold text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-all">
                              View Receipt <FiExternalLink size={14} />
                            </button>
                          </div>
                        </div>

                        <div className="p-8 bg-[#faf9f4] xl:border-l border-gray-100 flex flex-col justify-center items-center text-center min-w-[200px]">
                          <p className="text-[10px] font-bold text-paragraph uppercase mb-1 tracking-widest">
                            Security Hold
                          </p>
                          <p className="text-2xl font-black text-txt">
                            ৳{(activeItem.deposit || 1500).toLocaleString()}
                          </p>
                          <div className="mt-4 px-3 py-1.5 bg-primary rounded-lg text-[9px] font-black text-green-600 uppercase border border-green-100 tracking-tighter">
                            Held in Escrow
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                ) : (
                  <section className="py-24 px-6 border-2 border-dashed border-gray-100 rounded-[48px] text-center bg-white/50 mb-12 flex flex-col items-center">
                    <FiPackage className="text-gray-200 mb-6" size={56} />
                    <h3 className="type-h4 font-black text-txt mb-2 uppercase">
                      No active gear found
                    </h3>
                    <p className="text-paragraph type-p max-w-xs mb-8">
                      Ready to start your next adventure? Find the perfect gear
                      now.
                    </p>
                    <button
                      onClick={() => (window.location.href = "/browse")}
                      className="bg-accent text-txt type-small font-black px-12 py-4 rounded-2xl shadow-lg shadow-accent/20 uppercase tracking-widest"
                    >
                      Browse Catalog
                    </button>
                  </section>
                )}

                <section>
                  <h3 className="type-small font-bold uppercase tracking-widest text-paragraph mb-6 px-2">
                    Recent History
                  </h3>
                  <div className="p-10 border border-gray-100 bg-white rounded-[32px] text-center">
                    <p className="text-xs font-bold text-paragraph uppercase tracking-widest opacity-40">
                      No completed trips yet.
                    </p>
                  </div>
                </section>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default RenterDashboard;
