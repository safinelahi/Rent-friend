import React, { useState, useContext } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiArrowLeft, FiShield, FiCheckCircle, FiSmartphone, 
  FiCreditCard, FiInfo, FiLock, FiCalendar, FiClock, FiAlertCircle 
} from 'react-icons/fi';
import { products } from '../../data/products';
import { AppContext } from '../../context/AppContext';

const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); 
  const { addRental } = useContext(AppContext);

  const product = products.find(p => String(p.id) === String(id));

  const bookingState = location.state || {};
  const rentalTotal = bookingState.totalPrice || product?.price || 0;
  const rentalDays = bookingState.days || 1;
  const pickupDate = bookingState.pickup || "";
  const returnDate = bookingState.return || "";

  // UPDATED: Initialized as null so user MUST select
  const [paymentMethod, setPaymentMethod] = useState(null); 
  const [error, setError] = useState(false);
  const [isEditingTrip, setIsEditingTrip] = useState(false);
  const [dates, setDates] = useState({ start: pickupDate, end: returnDate });

  if (!product) return <div className="h-screen flex items-center justify-center font-black uppercase tracking-widest text-txt">Item not found.</div>;

  // UPDATED: Validation logic
  const handleConfirmAndPay = () => {
    if (!paymentMethod) {
      setError(true);
      // Auto-scroll to payment section on mobile
      const paymentSection = document.getElementById('payment-section');
      paymentSection?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    
    setError(false);
    if (addRental) addRental(product);
    navigate('/booking-success', { state: { identifier: `#RF-${Math.random().toString(36).substr(2, 6).toUpperCase()}` } });
  };

  const securityDeposit = 1500;
  const serviceFee = 85;
  const grandTotal = rentalTotal + securityDeposit + serviceFee;

  return (
    <div className="min-h-screen bg-[#FDFDFC] pt-24 pb-20 sm:pt-32 sm:pb-32 font-epilogue text-[#111] overflow-x-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 sm:mb-16 gap-6 sm:gap-8">
          <div className="max-w-4xl">
             <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-paragraph mb-4 sm:mb-6 hover:text-accent transition-all">
               <FiArrowLeft size={14} /> Back to Gear
             </button>
             <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] sm:leading-[0.85]">Confirm & Pay.</h1>
          </div>
          <div className="inline-flex items-center gap-2 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-green-600 bg-green-50 px-4 py-2 rounded-full border border-green-100/50 self-start lg:self-end shadow-sm">
             <FiLock size={12}/> Safe & Private
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          
          {/* LEFT CONTENT */}
          <div className="lg:col-span-8 space-y-8 sm:space-y-10">
            
            {/* 1. TRIP PERIOD */}
            <section className="bg-white p-6 sm:p-10 rounded-[28px] sm:rounded-[32px] border border-gray-50 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 sm:gap-8">
              <div className="flex items-start sm:items-center gap-4 sm:gap-6 w-full">
                 <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-xl sm:rounded-2xl flex items-center justify-center text-accent shrink-0">
                    <FiCalendar size={20} className="sm:size-6" />
                 </div>
                 <div className="flex-1">
                    <p className="text-[9px] sm:text-[10px] font-black uppercase text-paragraph mb-1 sm:mb-2 tracking-widest">Rental Period</p>
                    <p className="text-base sm:text-xl font-black tracking-tight">{dates.start || "Select"} — {dates.end || "Select"}</p>
                 </div>
              </div>
              <button onClick={() => setIsEditingTrip(!isEditingTrip)} className="w-full md:w-auto px-6 py-4 rounded-xl font-black uppercase tracking-widest text-[9px] sm:text-[10px] bg-secondary/50 text-paragraph hover:bg-accent transition-all">
                Change
              </button>
            </section>

            {/* 2. ESCROW INFO */}
            <section className="bg-[#111] p-8 sm:p-14 rounded-[28px] sm:rounded-[32px] text-white relative overflow-hidden shadow-xl">
              <FiShield className="absolute -right-6 -top-6 sm:-right-10 sm:-top-10 text-white/5 pointer-events-none" size={160} sm:size={220} />
              <div className="relative z-10">
                <div className="flex items-center gap-2 sm:gap-3 text-accent mb-4 sm:mb-6">
                   <FiShield size={20} className="sm:size-6"/>
                   <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em]">Protection Protocol</span>
                </div>
                <h4 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 leading-tight">Secured by Escrow.</h4>
                <p className="text-[11px] sm:text-sm text-white/40 leading-relaxed font-medium uppercase tracking-wider">Funds are held safely and dispatched only after a successful asset return audit.</p>
              </div>
            </section>

            {/* 3. PAYMENT METHODS (Target for Scroll) */}
            <section id="payment-section" className={`space-y-4 sm:space-y-6 p-2 rounded-[36px] transition-all duration-700 ${error ? 'bg-red-50/50 ring-2 ring-red-100' : ''}`}>
              <div className="flex justify-between items-center px-2">
                <h3 className="text-lg sm:text-xl font-black tracking-tight">Payment Method</h3>
                <AnimatePresence>
                  {error && (
                    <motion.p initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="text-red-500 text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                      <FiAlertCircle /> Select an option
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div 
                  onClick={() => { setPaymentMethod('mobile'); setError(false); }}
                  className={`relative p-6 sm:p-10 rounded-[28px] sm:rounded-[32px] border transition-all cursor-pointer bg-white ${paymentMethod === 'mobile' ? 'border-accent shadow-xl ring-4 ring-accent/5' : 'border-gray-50 opacity-60'}`}
                >
                  <FiSmartphone className={`mb-3 sm:mb-4 ${paymentMethod === 'mobile' ? 'text-accent' : 'text-gray-200'}`} size={28} sm:size={32} />
                  <span className="block font-black text-txt text-[10px] sm:text-[11px] uppercase tracking-widest">Mobile Wallet</span>
                  <p className="text-[8px] sm:text-[9px] text-paragraph font-bold mt-1 uppercase tracking-widest">bKash, Nagad, Rocket</p>
                  {paymentMethod === 'mobile' && <FiCheckCircle className="absolute top-6 right-6 sm:top-8 sm:right-8 text-accent" size={20} sm:size={24}/>}
                </div>
                
                <div 
                  onClick={() => { setPaymentMethod('card'); setError(false); }}
                  className={`relative p-6 sm:p-10 rounded-[28px] sm:rounded-[32px] border transition-all cursor-pointer bg-white ${paymentMethod === 'card' ? 'border-accent shadow-xl ring-4 ring-accent/5' : 'border-gray-50 opacity-40'}`}
                >
                  <FiCreditCard className={`mb-3 sm:mb-4 ${paymentMethod === 'card' ? 'text-accent' : 'text-gray-200'}`} size={28} sm:size={32} />
                  <span className="block font-black text-txt text-[10px] sm:text-[11px] uppercase tracking-widest">Credit Card</span>
                  <p className="text-[8px] sm:text-[9px] text-paragraph font-bold mt-1 uppercase tracking-widest">Visa / Mastercard</p>
                  {paymentMethod === 'card' && <FiCheckCircle className="absolute top-6 right-6 sm:top-8 sm:right-8 text-accent" size={20} sm:size={24}/>}
                </div>
              </div>
            </section>
          </div>

          {/* --- SIDEBAR (ORDER SUMMARY) --- */}
          <aside className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
            <div className="bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-10 md:p-12 shadow-[0_40px_100px_rgba(0,0,0,0.03)] border border-gray-50">
              <div className="flex gap-4 sm:gap-6 mb-8 pb-8 border-b border-gray-50">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shadow-sm shrink-0">
                   <img src={product.image} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-base font-black text-txt tracking-tighter mb-1">{product.title}</p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-accent flex items-center gap-2"><FiCheckCircle size={10}/> Verified Asset</p>
                </div>
              </div>

              <div className="space-y-4 mb-10">
                <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-paragraph">
                  <span>Rental ({rentalDays}d)</span>
                  <span className="text-txt">৳{rentalTotal}</span>
                </div>
                <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-paragraph">
                  <span>Hold Deposit</span>
                  <span className="text-txt">৳{securityDeposit}</span>
                </div>
                <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-paragraph">
                  <span>Service Protocol</span>
                  <span className="text-txt">৳{serviceFee}</span>
                </div>
                <div className="pt-8 border-t border-gray-50 flex justify-between items-end">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-accent mb-1">Grand Total</p>
                    <span className="text-4xl sm:text-5xl font-black tracking-tighter text-txt">৳{grandTotal}</span>
                  </div>
                </div>
              </div>

              {/* ACTION BUTTON */}
              <button 
                onClick={handleConfirmAndPay}
                className={`w-full py-5 sm:py-6 rounded-[20px] sm:rounded-[24px] font-black uppercase tracking-[0.3em] text-[10px] sm:text-[11px] transition-all shadow-2xl active:scale-95 mb-6 ${error ? 'bg-red-500 text-white shadow-red-200 animate-pulse' : 'bg-accent text-txt shadow-accent/20 hover:-translate-y-1'}`}
              >
                {error ? "Select Payment Option" : "Confirm & Dispatch"}
              </button>

              <div className="bg-[#FBFBFA] p-5 rounded-[20px] border border-gray-50 text-center">
                 <p className="text-[8px] text-paragraph/60 font-bold uppercase tracking-[0.2em] leading-relaxed">
                   SECURE SESSION VIA AES-256
                 </p>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default Checkout;