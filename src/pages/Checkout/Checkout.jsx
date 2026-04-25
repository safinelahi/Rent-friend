import React, { useState, useContext } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiArrowLeft, FiShield, FiCheckCircle, FiSmartphone, 
  FiCreditCard, FiInfo, FiLock, FiEdit2, FiCalendar, FiClock 
} from 'react-icons/fi';
import { products } from '../../data/products';
import { AppContext } from '../../context/AppContext';

const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); 
  const { addRental } = useContext(AppContext);

  const product = products.find(p => String(p.id) === String(id));

  // --- DYNAMIC LOGIC FROM PRODUCT PAGE ---
  const bookingState = location.state || {};
  const rentalTotal = bookingState.totalPrice || product?.price || 0;
  const rentalDays = bookingState.days || 1;
  const pickupDate = bookingState.pickup || "";
  const returnDate = bookingState.return || "";

  const [paymentMethod, setPaymentMethod] = useState('mobile'); 
  const [isEditingTrip, setIsEditingTrip] = useState(false);
  const [dates, setDates] = useState({ start: pickupDate, end: returnDate });

  if (!product) return <div className="h-screen flex items-center justify-center font-black uppercase tracking-widest text-txt">Item not found.</div>;

  const handleConfirmAndPay = () => {
    if (addRental) addRental(product);
    navigate('/booking-success');
  };

  const securityDeposit = 1500;
  const serviceFee = 85;
  const grandTotal = rentalTotal + securityDeposit + serviceFee;

  return (
    <div className="min-h-screen bg-[#F8F8F7] pt-28 pb-32 font-epilogue text-[#111]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="max-w-4xl">
             <button 
               onClick={() => navigate(-1)} 
               className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-paragraph mb-6 hover:text-accent transition-all"
             >
               <FiArrowLeft size={16} /> Back to Gear
             </button>
             <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85]">
                Confirm & Pay.
             </h1>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-green-600 bg-green-50 px-5 py-2 rounded-full border border-green-100/50 shadow-sm">
             <FiLock size={12}/> Safe & Private
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-8 space-y-10">
            
            {/* 1. UPDATED: Trip Bento with dynamic Calendar Boxes */}
            <section className="bg-white p-10 rounded-[32px] border border-gray-50 shadow-sm flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-6 w-full">
                 <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent shrink-0">
                    <FiCalendar size={24} />
                 </div>
                 
                 <div className="flex-1">
                    <p className="text-[10px] font-black uppercase text-paragraph mb-2 tracking-widest">Rental Period</p>
                    
                    {isEditingTrip ? (
                      /* NEW CALENDAR BOXES ON CHANGE */
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                        <div className="bg-[#F5F5F3] p-4 rounded-[20px] border border-gray-100">
                          <p className="text-[8px] font-black uppercase text-accent mb-1 tracking-[0.2em] flex items-center gap-1">
                            <FiCalendar size={10}/> Pickup
                          </p>
                          <input 
                            type="date" 
                            className="bg-transparent w-full text-[11px] font-black outline-none cursor-pointer" 
                            value={dates.start} 
                            onChange={(e) => setDates({...dates, start: e.target.value})} 
                          />
                        </div>
                        <div className="bg-[#F5F5F3] p-4 rounded-[20px] border border-gray-100">
                          <p className="text-[8px] font-black uppercase text-accent mb-1 tracking-[0.2em] flex items-center gap-1">
                            <FiClock size={10}/> Return
                          </p>
                          <input 
                            type="date" 
                            className="bg-transparent w-full text-[11px] font-black outline-none cursor-pointer" 
                            value={dates.end} 
                            onChange={(e) => setDates({...dates, end: e.target.value})} 
                          />
                        </div>
                      </div>
                    ) : (
                      /* STATIC DISPLAY */
                      <p className="text-xl font-black tracking-tight">
                        {dates.start || "Select Date"} — {dates.end || "Select Date"}
                      </p>
                    )}
                 </div>
              </div>
              
              <button 
                onClick={() => setIsEditingTrip(!isEditingTrip)} 
                className={`px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shrink-0 ${isEditingTrip ? 'bg-accent text-txt shadow-lg' : 'bg-secondary/50 text-paragraph hover:bg-accent hover:text-txt'}`}
              >
                {isEditingTrip ? "Save Details" : "Change"}
              </button>
            </section>

            {/* 2. RentFriend Escrow Section */}
            <section className="bg-[#111] p-10 md:p-14 rounded-[32px] text-white relative overflow-hidden group shadow-xl">
              <FiShield className="absolute -right-10 -top-10 text-white/5" size={220} />
              <div className="relative z-10">
                <div className="flex items-center gap-3 text-accent mb-6">
                   <FiShield size={24}/>
                   <span className="text-[10px] font-black uppercase tracking-[0.4em]">RentFriend Escrow</span>
                </div>
                <h4 className="text-3xl font-bold tracking-tight mb-6 leading-tight">We hold your money safely.</h4>
                <p className="text-sm text-white/50 leading-relaxed font-medium max-w-lg uppercase tracking-wider">
                   The deposit is a safety hold. We only send the money to the lender after you return the item and confirm it’s okay. 
                   <span className="text-white block mt-4 font-bold">Refunds go back to your account within 6 hours.</span>
                </p>
              </div>
            </section>

            {/* 3. Payment Methods */}
            <section className="space-y-6">
              <h3 className="text-xl font-black tracking-tight px-4">Choose Payment Method</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div 
                  onClick={() => setPaymentMethod('mobile')}
                  className={`relative p-10 rounded-[32px] border transition-all cursor-pointer bg-white ${paymentMethod === 'mobile' ? 'border-accent shadow-xl shadow-accent/5' : 'border-gray-50 opacity-60'}`}
                >
                  <FiSmartphone className={`mb-4 ${paymentMethod === 'mobile' ? 'text-accent' : 'text-gray-200'}`} size={32} />
                  <span className="block font-black text-txt text-[11px] uppercase tracking-widest">Mobile Wallet</span>
                  <p className="text-[9px] text-paragraph font-bold mt-1 uppercase tracking-widest">bKash, Nagad, Rocket</p>
                  {paymentMethod === 'mobile' && <FiCheckCircle className="absolute top-8 right-8 text-accent" size={24}/>}
                </div>
                
                <div 
                  onClick={() => setPaymentMethod('card')}
                  className={`relative p-10 rounded-[32px] border transition-all cursor-pointer bg-white ${paymentMethod === 'card' ? 'border-accent shadow-xl shadow-accent/5' : 'border-gray-50 opacity-60'}`}
                >
                  <FiCreditCard className={`mb-4 ${paymentMethod === 'card' ? 'text-accent' : 'text-gray-200'}`} size={32} />
                  <span className="block font-black text-txt text-[11px] uppercase tracking-widest">Credit Card</span>
                  <p className="text-[9px] text-paragraph font-bold mt-1 uppercase tracking-widest">Visa / Mastercard</p>
                  {paymentMethod === 'card' && <FiCheckCircle className="absolute top-8 right-8 text-accent" size={24}/>}
                </div>
              </div>
            </section>
          </div>

          <aside className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
            <div className="bg-white rounded-[32px] p-10 md:p-12 shadow-[0_40px_100px_rgba(0,0,0,0.03)] border border-gray-50">
              
              <div className="flex gap-6 mb-10 pb-10 border-b border-gray-50">
                <div className="w-20 h-20 rounded-[20px] overflow-hidden shadow-sm">
                   <img src={product.image} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-lg font-black text-txt tracking-tighter leading-none mb-2">{product.title}</p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-accent flex items-center gap-2">
                    <FiCheckCircle size={12}/> Verified Asset
                  </p>
                </div>
              </div>

              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-paragraph mb-8">Cost Details</h3>
              
              <div className="space-y-6 mb-12">
                <div className="flex justify-between items-center group">
                  <span className="text-[10px] font-black text-paragraph uppercase tracking-widest">Rental ({rentalDays}d)</span>
                  <span className="text-sm font-black">৳{rentalTotal}</span>
                </div>
                
                <div className="flex justify-between items-center relative group">
                  <span className="text-[10px] font-black text-paragraph uppercase tracking-widest border-b border-dotted border-gray-200 cursor-help flex items-center gap-1">
                    Refundable Deposit <FiInfo size={12} className="text-accent"/>
                  </span>
                  
                  <div className="absolute bottom-full left-0 mb-2 w-64 p-4 bg-[#111] text-white text-[10px] rounded-2xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-20 leading-relaxed shadow-2xl">
                    This is a security hold to protect the lender's item. It will be automatically refunded to your {paymentMethod === 'mobile' ? 'mobile wallet' : 'card'} after a successful return.
                  </div>

                  <span className="text-sm font-black text-txt">৳{securityDeposit}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-paragraph uppercase tracking-widest">Service Fee</span>
                  <span className="text-sm font-black">৳{serviceFee}</span>
                </div>

                <div className="pt-10 border-t border-gray-50 flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-2">Final Total</p>
                    <span className="text-6xl font-black tracking-tighter text-txt">৳{grandTotal}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleConfirmAndPay}
                className="w-full bg-accent text-txt py-6 rounded-[24px] font-black uppercase tracking-[0.3em] text-[11px] shadow-2xl shadow-accent/20 hover:-translate-y-1 active:scale-95 transition-all mb-8"
              >
                Confirm & Pay Now
              </button>

              <div className="bg-[#FDFDFC] p-6 rounded-[24px] border border-gray-50">
                 <p className="text-[9px] text-center text-paragraph font-bold uppercase tracking-widest leading-loose">
                   By clicking the button above, you agree to the <Link to="/terms-of-service" className="text-txt underline">Rental Rules</Link> and our <Link to="/privacy-policy" className="text-txt underline">Cancellation Policy</Link>.
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