import React, { useState, useEffect } from 'react';
import { FiDollarSign, FiArrowUpRight, FiClock, FiCheckCircle, FiZap, FiDownload } from 'react-icons/fi';
import { motion } from 'framer-motion';
import api from '../../api/axios';

const LenderEarnings = () => {
  const [earningsData, setEarningsData] = useState({
    totalBalance: 0,
    withdrawable: 0,
    history: []
  });
  const [loading, setLoading] = useState(true);

  // Fetch earnings data from backend
  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const res = await api.get('/bookings/lender-rentals');
        if (res.data.success) {
          const bookings = res.data.bookings || [];
          
          // Only Completed bookings yield earnings
          const completed = bookings.filter(b => b.status === 'Completed');
          
          const totalBalance = completed.reduce((sum, b) => sum + (b.rentalTotal * 0.9), 0);
          
          // Withdrawable is Completed bookings with payoutStatus === 'Pending'
          const withdrawable = completed.filter(b => b.payoutStatus === 'Pending')
            .reduce((sum, b) => sum + (b.rentalTotal * 0.9), 0);

          setEarningsData({
            totalBalance: Math.round(totalBalance),
            withdrawable: Math.round(withdrawable),
            history: completed
          });
        }
      } catch (err) {
        console.error("Error loading earnings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEarnings();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-[#FDFDFC] flex flex-col items-center justify-center font-epilogue px-6 text-center text-[#111]">
      <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-[10px] font-black uppercase tracking-widest text-paragraph/40">Loading Earnings...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFDFC] pt-32 pb-20 px-6 md:px-12 lg:px-16 font-epilogue text-[#111]">
      <div className="max-w-[1440px] mx-auto">
        
        <header className="mb-16">
          <div className="flex items-center gap-3 text-accent mb-6">
            <FiZap size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.5em]">Earnings</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none">
            Payouts <br /> <span className="text-paragraph/20">History.</span>
          </h2>
        </header>

        {/* --- BALANCE OVERVIEW --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2 bg-[#111] text-white p-10 rounded-[48px] flex flex-col justify-between relative overflow-hidden">
             <FiDollarSign className="absolute -right-10 -bottom-10 text-white/5" size={300} />
             <div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-4">Withdrawable Balance</p>
                <h3 className="text-5xl md:text-7xl font-black tracking-tighter italic">৳{earningsData.withdrawable.toLocaleString()}</h3>
             </div>
             <div className="mt-12 flex flex-wrap gap-4">
                <button 
                  onClick={() => alert("Payout request submitted! Admin will process your transfer in the next queue run.")}
                  className="px-10 py-5 bg-white text-[#111] rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-accent transition-all active:scale-95"
                >
                  Request Payout
                </button>
                <button className="px-10 py-5 bg-white/10 text-white border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/20 transition-all">
                  Withdrawal Settings
                </button>
             </div>
          </div>

          <div className="bg-white border border-gray-100 p-10 rounded-[48px] shadow-sm flex flex-col justify-center">
             <p className="text-[10px] font-black text-paragraph/30 uppercase tracking-[0.4em] mb-4">Total Revenue</p>
             <h3 className="text-4xl font-black tracking-tighter mb-4 text-txt">৳{earningsData.totalBalance.toLocaleString()}</h3>
             <p className="text-paragraph/40 text-[9px] font-bold uppercase tracking-widest leading-loose">
               Total income generated after platform fee deduction.
             </p>
          </div>
        </div>

        {/* Transaction Logs */}
        <section>
          <div className="flex items-center justify-between mb-8 border-b border-gray-50 pb-6">
            <h4 className="text-[12px] font-black uppercase tracking-[0.3em]">Transaction History</h4>
            <button className="text-accent text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
              Export History <FiDownload />
            </button>
          </div>

          <div className="space-y-4">
            {earningsData.history.length === 0 ? (
              <div className="text-center py-10 border border-gray-100 rounded-[32px] bg-white">
                 <p className="text-[10px] font-black text-paragraph/30 uppercase tracking-widest">No past transactions found.</p>
              </div>
            ) : (
              earningsData.history.map((tx) => (
                <div key={tx._id} className="bg-white border border-gray-50 p-6 md:p-8 rounded-[32px] flex flex-col md:flex-row items-center justify-between group hover:border-accent transition-all">
                   <div className="flex items-center gap-6 mb-4 md:mb-0">
                      <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-2xl flex items-center justify-center">
                         <FiCheckCircle size={20} />
                      </div>
                      <div>
                         <h5 className="text-[11px] font-black uppercase tracking-widest text-txt group-hover:italic transition-all">
                           Settlement: {tx.product?.title}
                         </h5>
                         <p className="text-[9px] font-bold text-paragraph/40 uppercase tracking-widest mt-1">
                           Payout: {tx.payoutStatus} | Booking ID: {tx._id}
                         </p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-sm font-black text-txt">+৳{Math.round(tx.rentalTotal * 0.9).toLocaleString()}</p>
                      <p className="text-[8px] font-black text-paragraph/20 uppercase tracking-widest mt-1">10% Platform Fee Deducted</p>
                   </div>
                </div>
              ))
            )}
          </div>
        </section>

      </div>
    </div>
  );
};

export default LenderEarnings;