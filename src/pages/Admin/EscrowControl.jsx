import React, { useState } from 'react';
import { FiDollarSign, FiArrowUpRight, FiZap, FiShield } from 'react-icons/fi';

const EscrowControl = () => {
  // Mock data for payouts ready to be processed
  const [payouts, setPayouts] = useState([
    { id: 'TX-901', lender: 'Alfaz Sozib', amount: 4500, platformFee: 450, netAmount: 4050, status: 'Pending Payout' }
  ]);

  return (
    <div className="min-h-screen bg-[#FDFDFC] pt-32 pb-20 px-6 md:px-12 lg:px-16 font-epilogue">
      <div className="max-w-[1440px] mx-auto">
        
        <header className="mb-16">
          <div className="flex items-center gap-3 text-accent mb-6">
            <FiShield size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.5em]">Escrow & Liquidity</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none italic">
            Payout <br /> <span className="text-paragraph/20">Queue.</span>
          </h2>
        </header>

        <div className="overflow-hidden bg-white border border-gray-50 rounded-[48px] shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-50 bg-[#F8F8F7]/50">
                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.3em] text-paragraph/40">Lender Identity</th>
                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.3em] text-paragraph/40">Gross Amount</th>
                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.3em] text-paragraph/40">Platform Fee (10%)</th>
                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.3em] text-paragraph/40">Net Payout</th>
                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.3em] text-paragraph/40">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {payouts.map((tx) => (
                <tr key={tx.id} className="hover:bg-[#FDFDFC] transition-colors">
                  <td className="px-10 py-8 font-black uppercase tracking-tight italic text-txt">{tx.lender}</td>
                  <td className="px-10 py-8 font-bold text-sm text-paragraph/40">৳{tx.amount}</td>
                  <td className="px-10 py-8 font-bold text-sm text-red-400">-৳{tx.platformFee}</td>
                  <td className="px-10 py-8 font-black text-lg text-green-500 italic">৳{tx.netAmount}</td>
                  <td className="px-10 py-8">
                    <button className="flex items-center gap-2 bg-[#111] text-white px-6 py-3 rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-accent hover:text-[#111] transition-all">
                      Release Funds <FiArrowUpRight />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default EscrowControl;