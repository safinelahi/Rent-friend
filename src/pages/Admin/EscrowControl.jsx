import React, { useState, useEffect } from 'react';
import { FiDollarSign, FiArrowUpRight, FiZap, FiShield, FiCheck } from 'react-icons/fi';
import api from '../../api/axios';

const EscrowControl = () => {
  const [payouts, setPayouts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPayouts = async () => {
    try {
      const res = await api.get('/admin/payouts');
      if (res.data.success) {
        setPayouts(res.data.payouts);
      }
    } catch (err) {
      console.error("Error fetching payouts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayouts();
  }, []);

  const handlePayLender = async (bookingId) => {
    try {
      const res = await api.patch(`/admin/payouts/${bookingId}`);
      if (res.data.success) {
        setPayouts(prev => prev.filter(p => p._id !== bookingId));
        alert("Lender paid successfully.");
      }
    } catch (err) {
      console.error("Error processing payout:", err);
      alert("Payout failed: " + (err.response?.data?.error || "Server error"));
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#FDFDFC] flex flex-col items-center justify-center font-epilogue px-6 text-center text-[#111]">
      <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-[10px] font-black uppercase tracking-widest text-paragraph/40">Loading Payout Queue...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFDFC] pt-32 pb-20 px-6 md:px-12 lg:px-16 font-epilogue">
      <div className="max-w-[1440px] mx-auto">
        
        <header className="mb-16">
          <div className="flex items-center gap-3 text-accent mb-6">
            <FiShield size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.5em]">Payout Panel</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none italic">
            Payout <br /> <span className="text-paragraph/20">Queue.</span>
          </h2>
        </header>

        {payouts.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-[32px] bg-white">
            <FiCheck size={40} className="mx-auto text-gray-200 mb-4" />
            <h3 className="text-xl font-black uppercase tracking-tight mb-2">Queue Empty</h3>
            <p className="text-paragraph text-xs font-medium uppercase tracking-widest">All lender payouts have been processed.</p>
          </div>
        ) : (
          <div className="overflow-hidden bg-white border border-gray-50 rounded-[48px] shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-50 bg-[#F8F8F7]/50">
                  <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.3em] text-paragraph/40">Lender Name</th>
                  <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.3em] text-paragraph/40">Gross Amount</th>
                  <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.3em] text-paragraph/40">Platform Fee (10%)</th>
                  <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.3em] text-paragraph/40">Net Payout</th>
                  <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.3em] text-paragraph/40">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {payouts.map((tx) => (
                  <tr key={tx._id} className="hover:bg-[#FDFDFC] transition-colors">
                    <td className="px-10 py-8 font-black uppercase tracking-tight italic text-txt">{tx.product?.owner?.name}</td>
                    <td className="px-10 py-8 font-bold text-sm text-paragraph/40">৳{tx.rentalTotal}</td>
                    <td className="px-10 py-8 font-bold text-sm text-red-400">-৳{Math.round(tx.rentalTotal * 0.1)}</td>
                    <td className="px-10 py-8 font-black text-lg text-green-500 italic">৳{Math.round(tx.rentalTotal * 0.9)}</td>
                    <td className="px-10 py-8">
                      <button 
                        onClick={() => handlePayLender(tx._id)}
                        className="flex items-center gap-2 bg-[#111] text-white px-6 py-3 rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-accent hover:text-[#111] transition-all active:scale-95"
                      >
                        Pay Lender <FiArrowUpRight />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
};

export default EscrowControl;