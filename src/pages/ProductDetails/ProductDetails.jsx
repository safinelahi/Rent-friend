import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../../data/products';
import { FiMapPin, FiCalendar, FiShield, FiInfo, FiCheckCircle, FiClock } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ProductDetails = () => {
  // Pulling the ID from the URL bar
  const { id } = useParams();
  const navigate = useNavigate();
  
  // We convert to String here just to be safe, in case the data ID is a number.
  // This stops the page from crashing if there's a type mismatch.
  const product = products.find(p => String(p.id) === String(id));

  // --- PRICING INTERACTION STATE ---
  // We'll track which day-tier (1, 2, or 7) the user has clicked.
  const [selectedTier, setSelectedTier] = useState("1");

  // If the URL has a weird ID that doesn't exist, we show a clean error state.
  if (!product) return (
    <div className="pt-40 text-center h-screen bg-[#FDFDFC]">
      <h2 className="type-h2 mb-4">Oops! This item isn't here.</h2>
      <Link to="/browse" className="text-accent font-bold underline">Back to Browse</Link>
    </div>
  );

  // This helper calculates the total price based on the selected tier cards.
  const getDisplayPrice = () => {
    if (selectedTier === "2") return Math.round(product.price * 1.8);
    if (selectedTier === "7") return Math.round(product.price * 5);
    return product.price; // Default 1 day
  };

  // When they click confirm, we jump to the checkout page for this specific item.
  const handleBookingClick = () => {
    navigate(`/checkout/${product.id}`);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFC] pt-28 pb-20">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        
        {/* Navigation Breadcrumbs - Good for SEO and UX */}
        <div className="mb-8 flex gap-2 text-sm text-paragraph font-medium">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link> / 
          <Link to="/browse" className="hover:text-accent transition-colors">Browse</Link> / 
          <span className="text-txt font-bold">{product.title}</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          
          {/* ================= LEFT SIDE: ITEM INFO ================= */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* The main hero image with a nice entrance slide */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[40px] overflow-hidden border border-gray-100 shadow-sm aspect-video"
            >
              <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
            </motion.div>

            {/* Main Description Section */}
            <section>
              <h2 className="type-h3 text-txt mb-4">About this product</h2>
              <p className="type-p text-paragraph leading-relaxed">{product.description}</p>
            </section>

            {/* Safety Manual - Crucial for preventing damage! */}
            <section className="bg-secondary/30 p-8 rounded-[32px] border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <FiInfo className="text-accent" size={24} />
                <h3 className="type-h4 text-txt font-bold">Lender Manual & Rules</h3>
              </div>
              <p className="text-paragraph leading-relaxed italic">"{product.manual}"</p>
            </section>

            {/* WORKING GOOGLE MAP: Centers automatically on the product's location city */}
            <section>
              <h2 className="type-h3 text-txt mb-6">Item Location</h2>
              <div className="w-full h-96 bg-gray-100 rounded-[32px] overflow-hidden border border-gray-100">
                <iframe
                  title="product-location"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={`https://maps.google.com/maps?q=${product.location}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                  allowFullScreen
                ></iframe>
              </div>
            </section>
          </div>

          {/* ================= RIGHT SIDE: BOOKING BAR (STICKY) ================= */}
          <div className="space-y-6 lg:sticky lg:top-28">
            
            {/* MAIN BOOKING CARD */}
            <div className="bg-white border border-gray-100 rounded-[40px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
              
              {/* Dynamic Price Display */}
              <div className="mb-6">
                <span className="text-3xl font-black text-txt">৳{getDisplayPrice()}</span>
                <span className="text-paragraph text-sm ml-2 font-medium">
                   {selectedTier === "1" ? "average daily rental" : `total for ${selectedTier} days`}
                </span>
              </div>

              {/* Day Selection Boxes */}
              <div className="grid grid-cols-3 gap-2 mb-8">
                <button 
                  onClick={() => setSelectedTier("1")}
                  className={`p-3 rounded-2xl text-center border transition-all duration-300 ${selectedTier === "1" ? "bg-secondary border-accent" : "bg-secondary/30 border-transparent"}`}
                >
                  <p className={`text-xs font-bold ${selectedTier === "1" ? "text-accent" : "text-txt"}`}>৳{product.price}</p>
                  <p className="text-[10px] text-paragraph uppercase font-bold mt-1">Per day</p>
                </button>

                <button 
                  onClick={() => setSelectedTier("2")}
                  className={`p-3 rounded-2xl text-center border transition-all duration-300 ${selectedTier === "2" ? "bg-secondary border-accent" : "bg-secondary/30 border-transparent"}`}
                >
                  <p className={`text-xs font-bold ${selectedTier === "2" ? "text-accent" : "text-txt"}`}>৳{Math.round(product.price * 1.8)}</p>
                  <p className="text-[10px] text-paragraph uppercase font-bold mt-1">2 days</p>
                </button>

                <button 
                  onClick={() => setSelectedTier("7")}
                  className={`p-3 rounded-2xl text-center border transition-all duration-300 ${selectedTier === "7" ? "bg-secondary border-accent" : "bg-secondary/30 border-transparent"}`}
                >
                  <p className={`text-xs font-bold ${selectedTier === "7" ? "text-accent" : "text-txt"}`}>৳{Math.round(product.price * 5)}</p>
                  <p className="text-[10px] text-paragraph uppercase font-bold mt-1">7 days</p>
                </button>
              </div>

              {/* Date Input Selectors */}
              <div className="space-y-4 mb-8">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase text-paragraph ml-1">Start Date</label>
                  <div className="relative">
                    <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-accent" />
                    <input type="date" className="w-full bg-secondary py-3.5 pl-12 pr-4 rounded-xl border-none text-sm outline-none focus:ring-1 focus:ring-accent" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase text-paragraph ml-1">Return Date</label>
                  <div className="relative">
                    <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-accent" />
                    <input type="date" className="w-full bg-secondary py-3.5 pl-12 pr-4 rounded-xl border-none text-sm outline-none focus:ring-1 focus:ring-accent" />
                  </div>
                </div>
              </div>

              {/* THE BUTTON: Links directly to the checkout journey */}
              <button 
                onClick={handleBookingClick}
                className="w-full bg-accent text-txt font-bold py-5 rounded-2xl shadow-md hover:bg-accent/90 hover:scale-[1.01] active:scale-[0.99] transition-all mb-4"
              >
                Confirm Booking
              </button>

              {/* Safety & Trust Footer */}
              <div className="space-y-3 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-xs text-paragraph font-semibold">
                  <FiClock className="text-orange-500" /> Full refund with 72+ hours notice
                </div>
                <div className="flex items-center gap-2 text-xs text-paragraph font-semibold">
                  <FiShield className="text-green-500" /> Verified Identity Lender
                </div>
              </div>
            </div>

            {/* OWNER PROFILE CARD */}
            <div className="bg-white border border-gray-100 rounded-[32px] p-6 shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-widest text-paragraph mb-5">The Owner</h4>
              <div className="flex items-center gap-4 mb-5">
                <img src={product.owner.image} alt={product.owner.name} className="w-14 h-14 rounded-full border-2 border-accent object-cover" />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-txt">{product.owner.name}</p>
                    <FiCheckCircle className="text-green-500" />
                  </div>
                  <div className="flex items-center gap-3 text-xs font-medium">
                    <div className="flex items-center gap-1 text-accent"><FaStar /> {product.owner.rating}</div>
                    <div className="text-paragraph underline decoration-accent/30 cursor-pointer">{product.owner.reviews} reviews</div>
                  </div>
                </div>
              </div>
              <div className="bg-secondary/50 py-3.5 px-4 rounded-2xl text-center border border-gray-50/50">
                <p className="text-sm font-bold text-txt">{product.owner.listings} Active Listings</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;