import React, { useState, useEffect, useMemo, useContext } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiArrowLeft, FiShield, FiCheckCircle, FiSmartphone, 
  FiCreditCard, FiInfo, FiLock, FiCalendar, FiClock, FiAlertCircle 
} from 'react-icons/fi';
import api from '../../api/axios';
import { AppContext } from '../../context/AppContext';

const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); 
  const { addRental } = useContext(AppContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const bookingState = location.state || {};

  // Default to today and tomorrow if dates are missing or invalid
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const initialStart = bookingState.pickup && bookingState.pickup !== "Not Set" ? bookingState.pickup : todayStr;
  const initialEnd = bookingState.return && bookingState.return !== "Not Set" ? bookingState.return : tomorrowStr;

  const [dates, setDates] = useState({ start: initialStart, end: initialEnd });
  const [paymentMethod, setPaymentMethod] = useState(null); 
  const [error, setError] = useState(false);
  const [isEditingTrip, setIsEditingTrip] = useState(false);

  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `http://localhost:5000${url}`;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        if (res.data.success) {
          setProduct(res.data.product);
        }
      } catch (err) {
        console.error("Error fetching product on checkout page:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Real-time calculation based on selected dates
  const calculatedDays = useMemo(() => {
    if (dates.start && dates.end) {
      const start = new Date(dates.start);
      const end = new Date(dates.end);
      const diffTime = Math.abs(end - start);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    }
    return 1;
  }, [dates]);

  const calculatedTotal = useMemo(() => {
    if (!product) return 0;
    if (calculatedDays >= 7) return Math.round(product.price * 5 * (calculatedDays / 7));
    return calculatedDays * product.price;
  }, [product, calculatedDays]);

  const securityDeposit = useMemo(() => {
    if (!product) return 0;
    return product.price > 10000 ? Math.round(product.price * 0.4) : Math.round(product.price * 0.1);
  }, [product]);

  const serviceFee = 85;

  const grandTotal = useMemo(() => {
    return calculatedTotal + securityDeposit + serviceFee;
  }, [calculatedTotal, securityDeposit, serviceFee]);

  const handleConfirmAndPay = async () => {
    if (!paymentMethod) {
      setError(true);
      const paymentSection = document.getElementById('payment-section');
      paymentSection?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    
    setError(false);
    
    const bookingData = {
      productId: product._id || product.id,
      pickupDate: dates.start,
      returnDate: dates.end,
      rentalDays: calculatedDays,
      rentalTotal: calculatedTotal,
      securityDeposit: securityDeposit,
      grandTotal: grandTotal,
      paymentMethod: paymentMethod,
    };

    const res = await addRental(bookingData);
    if (res.success) {
      navigate('/booking-success', { state: { identifier: `#RF-${Math.random().toString(36).substr(2, 6).toUpperCase()}` } });
    } else {
      if (res.error === 'LIMIT_REACHED') {
        alert("You already have an active rental session. To maintain trust and security, Rent Friend limits each user to one active rental at a time. Please complete your current rental before starting a new one.");
      } else {
        alert(res.error || "Booking failed. Please try again.");
      }
    }
  };

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center font-black uppercase tracking-widest text-txt">
      <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4" />
      <span>Loading Checkout Details...</span>
    </div>
  );

  if (!product) return <div className="h-screen flex items-center justify-center font-black uppercase tracking-widest text-txt">Item not found.</div>;

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
                 <div className="flex-1 w-full">
                    <p className="text-[9px] sm:text-[10px] font-black uppercase text-paragraph mb-1 sm:mb-2 tracking-widest">Rental Period</p>
                    {isEditingTrip ? (
                      <div className="flex flex-col sm:flex-row gap-4 mt-2">
                        <div>
                          <label className="text-[8px] font-black uppercase text-accent block mb-1">Pickup Date</label>
                          <input 
                            type="date" 
                            value={dates.start} 
                            onChange={(e) => setDates(prev => ({ ...prev, start: e.target.value }))}
                            className="border border-gray-100 p-2.5 rounded-xl text-xs font-bold outline-none focus:border-accent"
                          />
                        </div>
                        <div>
                          <label className="text-[8px] font-black uppercase text-accent block mb-1">Return Date</label>
                          <input 
                            type="date" 
                            value={dates.end} 
                            onChange={(e) => setDates(prev => ({ ...prev, end: e.target.value }))}
                            className="border border-gray-100 p-2.5 rounded-xl text-xs font-bold outline-none focus:border-accent"
                          />
                        </div>
                      </div>
                    ) : (
                      <p className="text-base sm:text-xl font-black tracking-tight">{dates.start} — {dates.end}</p>
                    )}
                 </div>
              </div>
              <button onClick={() => setIsEditingTrip(!isEditingTrip)} className="w-full md:w-auto px-6 py-4 rounded-xl font-black uppercase tracking-widest text-[9px] sm:text-[10px] bg-secondary/50 text-paragraph hover:bg-accent transition-all shrink-0">
                {isEditingTrip ? "Done" : "Change"}
              </button>
            </section>

            {/* 2. ESCROW INFO */}
            <section className="bg-[#111] p-8 sm:p-14 rounded-[28px] sm:rounded-[32px] text-white relative overflow-hidden shadow-xl">
              <FiShield className="absolute -right-6 -top-6 sm:-right-10 sm:-top-10 text-white/5 pointer-events-none" size={160} sm:size={220} />
              <div className="relative z-10">
                <div className="flex items-center gap-2 sm:gap-3 text-accent mb-4 sm:mb-6">
                   <FiShield size={20} className="sm:size-6"/>
                   <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em]">Safe Escrow Protection</span>
                </div>
                <h4 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 leading-tight">Secured by Escrow.</h4>
                <p className="text-[11px] sm:text-sm text-white/40 leading-relaxed font-medium uppercase tracking-wider">Funds are held safely and released to the lender after the item is returned.</p>
              </div>
            </section>

            {/* 3. PAYMENT METHODS */}
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
                   <img src={getImageUrl(product.image)} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-base font-black text-txt tracking-tighter mb-1">{product.title}</p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-accent flex items-center gap-2"><FiCheckCircle size={10}/> Verified Asset</p>
                </div>
              </div>

              <div className="space-y-4 mb-10">
                <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-paragraph">
                  <span>Rental ({calculatedDays}d)</span>
                  <span className="text-txt">৳{calculatedTotal}</span>
                </div>
                <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-paragraph">
                  <span>Hold Deposit</span>
                  <span className="text-txt">৳{securityDeposit}</span>
                </div>
                <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-paragraph">
                  <span>Service Fee</span>
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
                {error ? "Select Payment Option" : "Confirm & Pay"}
              </button>

              <div className="bg-[#FBFBFA] p-5 rounded-[20px] border border-gray-50 text-center">
                 <p className="text-[8px] text-paragraph/60 font-bold uppercase tracking-[0.2em] leading-relaxed">
                   SECURE CHECKOUT
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