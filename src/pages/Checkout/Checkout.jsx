import React, { useState, useContext } from 'react'; // Added useContext
import { useParams, useNavigate, Link } from 'react-router-dom';
import { products } from '../../data/products';
import { FiArrowLeft, FiShield, FiInfo, FiCreditCard, FiCheckCircle, FiEdit2 } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContext } from '../../context/AppContext'; // Imported AppContext


const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Access addRental from context
  const { addRental } = useContext(AppContext);

  const product = products.find(p => String(p.id) === String(id));

  // --- INTERACTIVE STATES ---
  const [paymentMethod, setPaymentMethod] = useState('mobile'); 
  const [isEditingTrip, setIsEditingTrip] = useState(false);
  const [dates, setDates] = useState({ start: "Oct 12, 2026", end: "Oct 15, 2026" });

  if (!product) return <div className="pt-40 text-center">Product not found.</div>;

  // Logic to handle the final confirmation
  const handleConfirmAndPay = () => {
    // 1. Call addRental to save THIS specific product to the dashboard/memory
    const result = addRental(product);

    // 2. Only navigate if the save was successful
    if (result.success) {
      navigate('/booking-success');
    }
  };

  // Mock numbers for the final breakdown
  const rentalDays = 3;
  const securityDeposit = 1500;
  const serviceFee = 85;
  const totalRental = product.price * rentalDays;
  const grandTotal = totalRental + securityDeposit + serviceFee;

  return (
    <div className="min-h-screen bg-[#FDFDFC] pt-28 pb-20 font-sans">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-paragraph hover:text-txt mb-8 transition-colors font-bold text-sm"
        >
          <FiArrowLeft /> Back to item
        </button>

        <h1 className="type-h2 text-txt mb-10 font-black">Confirm and Pay</h1>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* ================= LEFT SIDE: DETAILS ================= */}
          <div className="space-y-10">
            
            {/* 1. Trip Summary */}
            <section className="space-y-6">
              <h3 className="type-h4 text-txt font-bold">Your Rental Trip</h3>
              <div className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[11px] font-bold uppercase text-paragraph mb-1 tracking-wider">Dates</p>
                    {isEditingTrip ? (
                      <div className="flex gap-2 mt-2">
                        <input 
                          type="text" 
                          className="bg-secondary text-xs p-2 rounded-lg outline-none border border-accent/20" 
                          value={dates.start}
                          onChange={(e) => setDates({...dates, start: e.target.value})}
                        />
                        <input 
                          type="text" 
                          className="bg-secondary text-xs p-2 rounded-lg outline-none border border-accent/20" 
                          value={dates.end}
                          onChange={(e) => setDates({...dates, end: e.target.value})}
                        />
                      </div>
                    ) : (
                      <p className="text-sm font-bold text-txt">{dates.start} – {dates.end}</p>
                    )}
                  </div>
                  <button 
                    onClick={() => setIsEditingTrip(!isEditingTrip)}
                    className="text-accent font-bold text-sm flex items-center gap-1 hover:text-txt transition-colors"
                  >
                    {isEditingTrip ? "Save" : <><FiEdit2 size={14}/> Edit</>}
                  </button>
                </div>
              </div>
            </section>

            {/* 2. Professional Protection Text */}
            <section className="bg-secondary/30 p-8 rounded-[32px] border border-accent/10">
              <div className="flex gap-5">
                <div className="p-3 bg-white rounded-2xl shadow-sm self-start">
                  <FiShield className="text-accent" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-txt mb-2 text-lg">RentFriend Secure Escrow</h4>
                  <p className="text-[13px] text-paragraph leading-relaxed">
                    Your payment is held securely in an <strong>insurance-backed escrow</strong>. This deposit is required to ensure the safety of the product. 
                    It will remain on hold until the item is returned in the same condition as it was received from the lender.
                  </p>
                  <p className="text-[13px] text-paragraph leading-relaxed mt-4">
                    Once you receive and verify that the item is in proper condition, your payment will be released or refunded using the <strong>same method you used to pay</strong>. 
                    For example, if you paid via mobile banking, the refund will be sent back to your account within 6 hours after verification.
                  </p>
                </div>
              </div>
            </section>

            {/* 3. Payment Selection */}
            <section className="space-y-4">
              <h3 className="type-h4 text-txt font-bold">Pay with</h3>
              <div className="space-y-3">
                <div 
                  onClick={() => setPaymentMethod('mobile')}
                  className={`flex items-center justify-between p-5 border-2 transition-all rounded-2xl cursor-pointer ${paymentMethod === 'mobile' ? 'border-accent bg-white' : 'border-gray-100 bg-transparent opacity-70 hover:opacity-100'}`}
                >
                  <div className="flex items-center gap-3">
                    <FiCreditCard className={paymentMethod === 'mobile' ? 'text-accent' : 'text-paragraph'} />
                    <span className="font-bold text-txt text-sm">Mobile Wallet (bKash / Nagad)</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-4 ${paymentMethod === 'mobile' ? 'border-accent bg-accent' : 'border-gray-200 bg-white'}`}></div>
                </div>
                
                <div 
                  onClick={() => setPaymentMethod('card')}
                  className={`flex items-center justify-between p-5 border-2 transition-all rounded-2xl cursor-pointer ${paymentMethod === 'card' ? 'border-accent bg-white' : 'border-gray-100 bg-transparent opacity-70 hover:opacity-100'}`}
                >
                  <div className="flex items-center gap-3">
                    <FiCreditCard className={paymentMethod === 'card' ? 'text-accent' : 'text-paragraph'} />
                    <span className="font-bold text-txt text-sm">Credit or Debit Card</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-4 ${paymentMethod === 'card' ? 'border-accent bg-accent' : 'border-gray-200 bg-white'}`}></div>
                </div>
              </div>
            </section>
          </div>

          {/* ================= RIGHT SIDE: SUMMARY ================= */}
          <div className="lg:sticky lg:top-28">
            <div className="bg-white border border-gray-100 rounded-[40px] p-10 shadow-[0_30px_60px_rgba(0,0,0,0.05)]">
              
              <div className="flex gap-4 mb-8 pb-8 border-b border-gray-100">
                <img src={product.image} className="w-20 h-20 rounded-2xl object-cover" alt={product.title} />
                <div className="flex flex-col justify-center">
                  <p className="text-sm font-bold text-txt line-clamp-1">{product.title}</p>
                  <div className="flex items-center gap-1 text-[10px] mt-2 font-bold text-accent">
                    <FiCheckCircle /> Verified Owner
                  </div>
                </div>
              </div>

              <h3 className="type-h4 text-txt mb-6 font-bold">Price Breakdown</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm text-paragraph font-medium">
                  <span>৳{product.price} x {rentalDays} days</span>
                  <span className="text-txt font-bold">৳{totalRental}</span>
                </div>
                
                <div className="flex justify-between items-center text-sm text-paragraph font-medium relative group">
                  <span className="flex items-center gap-1 underline decoration-dotted cursor-help">
                    Refundable Deposit <FiInfo size={14} />
                  </span>
                  
                  <div className="absolute bottom-full left-0 mb-2 w-64 p-3 bg-txt text-white text-[10px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 leading-relaxed shadow-xl">
                    This is a security hold to protect the lender's item. It will be automatically refunded to your {paymentMethod === 'mobile' ? 'mobile wallet' : 'card'} after a successful return.
                  </div>

                  <span className="text-txt font-bold">৳{securityDeposit}</span>
                </div>
                
                <div className="flex justify-between text-sm text-paragraph font-medium">
                  <span>Service Fee</span>
                  <span className="text-txt font-bold">৳{serviceFee}</span>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 flex justify-between items-center mb-10">
                <span className="text-lg font-bold text-txt">Total (BDT)</span>
                <span className="text-2xl font-black text-txt">৳{grandTotal}</span>
              </div>

              <button 
                onClick={handleConfirmAndPay}
                className="w-full bg-accent text-txt font-bold py-5 rounded-2xl shadow-md hover:opacity-90 transition-all active:scale-[0.98]"
              >
                Confirm and Pay
              </button>

              <p className="text-[10px] text-center text-paragraph mt-6 leading-relaxed">
                By clicking the button above, you agree to the <Link to="/terms-of-service" className="underline font-bold hover:text-accent">Rental Rules</Link> and our <Link to="/privacy-policy" className="underline font-bold hover:text-accent">Cancellation Policy</Link>.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;