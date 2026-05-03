import React, { useState, useContext, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { 
  FiMapPin, FiChevronLeft, FiShield, FiZap, FiInfo, 
  FiStar, FiCalendar, FiCheckCircle, FiClock, FiHash, FiMap, FiArrowRight, FiUser
} from 'react-icons/fi';
import { products } from '../../data/products';
import { AppContext } from '../../context/AppContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AppContext);

  const product = products.find((p) => String(p.id) === String(id));
  const [selectedTier, setSelectedTier] = useState("1");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  // --- ১. DYNAMIC TOTAL CALCULATION (Added logic, removed nothing) ---
  const calculateTotal = useMemo(() => {
    if (!product) return 0;
    if (pickupDate && returnDate) {
      const start = new Date(pickupDate);
      const end = new Date(returnDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
      if (diffDays >= 7) return Math.round(product.price * 5 * (diffDays / 7));
      return diffDays * product.price;
    }
    if (selectedTier === "2") return Math.round(product.price * 1.8);
    if (selectedTier === "7") return Math.round(product.price * 5);
    return product.price;
  }, [pickupDate, returnDate, selectedTier, product]);

  if (!product) return (
    <div className="h-screen bg-[#FDFDFC] flex flex-col items-center justify-center font-epilogue px-6 text-center">
      <h2 className="text-4xl font-black tracking-tighter mb-6 text-txt">Asset Missing.</h2>
      <button onClick={() => navigate('/browse')} className="bg-[#111] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px]">Return to Catalog</button>
    </div>
  );

  const handleBooking = () => {
    const bookingData = {
      tier: selectedTier,
      totalPrice: calculateTotal,
      pickup: pickupDate || "Not Set",
      return: returnDate || "Not Set",
      days: pickupDate && returnDate 
        ? Math.ceil(Math.abs(new Date(returnDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24)) 
        : (selectedTier === "1" ? 1 : selectedTier === "2" ? 2 : 7)
    };

    if (!user) navigate('/login', { state: { from: `/product/${id}` } });
    else navigate(`/checkout/${product.id}`, { state: bookingData });
  };

  return (
    <div className="min-h-screen bg-[#FDFDFC] pt-28 pb-32 font-epilogue text-[#111] selection:bg-accent selection:text-txt">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* --- DYNAMIC BREADCRUMBS (Kept exactly as yours) --- */}
        <nav className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-paragraph/40 mb-10 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <span className="text-gray-200">/</span>
          <Link to="/browse" className="hover:text-accent transition-colors">Browse</Link>
          <span className="text-gray-200">/</span>
          <span className="text-txt">{product.title}</span>
        </nav>

        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="max-w-4xl">
             <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="bg-accent/10 text-accent px-4 py-1.5 rounded-full border border-accent/10 flex items-center gap-2 text-[9px] font-black uppercase tracking-widest">
                   <FiHash size={12}/> {product.identifier}
                </div>
                <div className="bg-secondary/50 text-paragraph px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">
                   {product.category}
                </div>
             </div>
             <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-[0.85] mb-4">
                {product.title}
             </h1>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-3">
             <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full border border-gray-100 shadow-sm">
                <FiStar className="text-accent" fill="currentColor" />
                <span className="text-xs font-black">{product.rating}</span>
                <span className="text-[10px] font-bold text-paragraph uppercase tracking-widest">({product.reviews} Reviews)</span>
             </div>
             <div className="flex items-center gap-2 text-paragraph font-black uppercase text-[10px] tracking-[0.3em] px-2">
                <FiMapPin className="text-accent" /> {product.location}, BD
             </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-8 space-y-12">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-3 rounded-[32px] border border-gray-100 shadow-sm relative overflow-hidden">
               <div className="aspect-video rounded-[24px] overflow-hidden bg-secondary/20">
                  <img src={product.image} className="w-full h-full object-cover" alt="" />
               </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
               <div className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-sm">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-8 flex items-center gap-2">
                    <FiInfo /> Gear Specs
                  </h3>
                  <p className="text-sm font-medium leading-relaxed text-paragraph">
                    {product.description}
                  </p>
               </div>
               <div className="bg-[#111] text-white p-10 rounded-[32px] relative overflow-hidden">
                  <FiShield className="absolute -right-10 -top-10 text-white/5" size={200} />
                  <h3 className="text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-8 flex items-center gap-2">
                    <FiZap /> Owner Rules
                  </h3>
                  <p className="text-xs italic font-medium leading-relaxed text-white/60">"{product.manual}"</p>
               </div>
            </div>

            <section className="space-y-8">
               <h3 className="text-2xl font-black tracking-tighter flex items-center gap-4 px-4"><FiMap className="text-accent"/> Live Item Location</h3>
               <div className="w-full h-[300px] sm:h-[450px] bg-white rounded-[32px] border border-gray-100 overflow-hidden relative shadow-sm">
                  <iframe
                    title="map"
                    width="100%" height="100%" frameBorder="0" style={{ border: 0, filter: 'grayscale(1)' }}
                    src={`https://maps.google.com/maps?q=${product.location}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                  />
               </div>
            </section>
          </div>

          <aside className="lg:col-span-4 sticky top-32 space-y-8">
            <div className="bg-white border border-gray-100 rounded-[32px] p-10 shadow-[0_40px_100px_rgba(0,0,0,0.03)]">
              
              {/* DYNAMIC PRICE DISPLAY */}
              <div className="flex items-baseline justify-between mb-8 pb-8 border-b border-gray-50">
                <div>
                  <span className="text-5xl font-black tracking-tighter">৳{calculateTotal.toLocaleString()}</span>
                  <p className="text-[10px] font-black uppercase tracking-widest text-paragraph/40 mt-1">Total Rental Cost</p>
                </div>
              </div>

              {/* ২. BIGGER BUTTONS (Padding barano hoyeche) */}
              <div className="grid grid-cols-3 gap-2 mb-10 bg-[#F1F1F0] p-1.5 rounded-[20px]">
                {["1", "2", "7"].map((tier) => (
                  <button 
                    key={tier} 
                    onClick={() => { setSelectedTier(tier); setPickupDate(""); setReturnDate(""); }}
                    className={`py-5 sm:py-6 rounded-[16px] text-center transition-all ${selectedTier === tier && !pickupDate ? 'bg-white text-txt shadow-md' : 'text-paragraph hover:text-txt'}`}
                  >
                    <p className="text-[11px] font-black uppercase">{tier}D</p>
                    <p className="text-[9px] font-bold opacity-40">৳{tier === "1" ? product.price : tier === "2" ? Math.round(product.price * 1.8) : Math.round(product.price * 5)}</p>
                  </button>
                ))}
              </div>

              {/* ৩. TALLER DATE INPUTS */}
              <div className="bg-[#F1F1F0] rounded-[24px] p-2 mb-10 border border-gray-50">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                   <div className="bg-white p-5 rounded-[20px] shadow-sm">
                      <p className="text-[8px] font-black uppercase text-accent mb-2 tracking-widest flex items-center gap-1"><FiCalendar/> Pickup</p>
                      <input type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} className="bg-transparent w-full text-[11px] font-black outline-none cursor-pointer" />
                   </div>
                   <div className="bg-white p-5 rounded-[20px] shadow-sm">
                      <p className="text-[8px] font-black uppercase text-accent mb-2 tracking-widest flex items-center gap-1"><FiClock/> Return</p>
                      <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} className="bg-transparent w-full text-[11px] font-black outline-none cursor-pointer" />
                   </div>
                </div>
              </div>

              <button 
                onClick={handleBooking}
                className="w-full bg-accent text-txt py-6 rounded-[24px] font-black uppercase tracking-[0.4em] text-[11px] shadow-2xl shadow-accent/20 transition-all flex items-center justify-center gap-4 active:scale-95 mb-8"
              >
                {user ? "Confirm Booking" : "Login to Rent"} <FiArrowRight />
              </button>
            </div>

            <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm group">
               <p className="text-[9px] font-black text-paragraph uppercase tracking-[0.3em] mb-6">Professional Owner</p>
               <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-[20px] overflow-hidden border-2 border-accent p-1">
                     <img src={product.owner.image} className="w-full h-full object-cover rounded-[14px]" alt="" />
                  </div>
                  <div>
                    <h4 className="font-black text-lg tracking-tight leading-none mb-2">{product.owner.name}</h4>
                    <div className="flex items-center gap-3 text-[10px] font-black text-accent uppercase tracking-widest">
                       <FaStar size={10}/> {product.owner.rating} <span className="text-paragraph/40">({product.owner.reviews})</span>
                    </div>
                  </div>
               </div>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;