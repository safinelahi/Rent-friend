import { motion } from "framer-motion";
import { useState, useContext } from "react";
import { FaStar } from "react-icons/fa";
import {
  FiCalendar,
  FiCheckCircle,
  FiChevronRight,
  FiClock,
  FiInfo,
  FiMapPin,
  FiShield,
} from "react-icons/fi";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { products } from "../../data/products";
import { AppContext } from "../../context/AppContext";
import LimitModal from "../../components/modals/LimitModal"; // Added Import

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // 1. Updated: Accessing myRentals from global context
  const { user, myRentals } = useContext(AppContext);
  
  // 2. Added: State to control the Limit Modal
  const [showLimitModal, setShowLimitModal] = useState(false);

  const product = products.find((p) => String(p.id) === String(id));
  const [selectedTier, setSelectedTier] = useState("1");

  if (!product)
    return (
      <div className="pt-40 text-center h-screen bg-[#FDFDFC]">
        <h2 className="type-h2 mb-4 font-black">Oops! This item isn't here.</h2>
        <Link to="/browse" className="text-accent font-bold underline">
          Back to Browse
        </Link>
      </div>
    );

  const getDisplayPrice = () => {
    if (selectedTier === "2") return Math.round(product.price * 1.8);
    if (selectedTier === "7") return Math.round(product.price * 5);
    return product.price;
  };

  const handleBookingClick = () => {
    // AUTH GUARD: Check if user is logged in
    if (!user) {
      navigate("/login", { state: { from: location.pathname } });
      return; // Exit
    } 

    // 3. UPDATED LOGIC: Check for active bookings
    if (myRentals && myRentals.length > 0) {
      setShowLimitModal(true); // Show the professional popup
      return; // Stop the user from going to checkout
    }

    // Proceed if logged in and has 0 active bookings
    navigate(`/checkout/${product.id}`);
  };

  return (
    <>
      <div className="min-h-screen bg-[#FDFDFC] pt-24 md:pt-32 pb-20">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          {/* FIXED BREADCRUMBS: Now with visible arrows */}
          <nav className="mb-8 flex items-center flex-wrap gap-2 text-[10px] uppercase tracking-widest font-bold">
            <Link
              to="/"
              className="text-paragraph hover:text-accent transition-colors"
            >
              Home
            </Link>
            <FiChevronRight size={14} className="text-accent/60" />{" "}
            {/* Arrow is now accent color for visibility */}
            <Link
              to="/browse"
              className="text-paragraph hover:text-accent transition-colors"
            >
              Browse
            </Link>
            <FiChevronRight size={14} className="text-accent/60" />
            <span className="text-txt truncate max-w-[150px] md:max-w-none">
              {product.title}
            </span>
          </nav>

          <div className="grid lg:grid-cols-3 gap-8 md:gap-12 items-start">
            {/* ================= LEFT COLUMN ================= */}
            <div className="lg:col-span-2 space-y-10 md:space-y-12">
              {/* Title & Info Section */}
              <div className="px-2 md:px-0">
                <h1 className="text-3xl md:text-5xl font-black text-txt mb-4 tracking-tight leading-tight">
                  {product.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 md:gap-6">
                  <div className="flex items-center gap-1.5 bg-secondary px-3 py-1.5 rounded-full border border-gray-100/50">
                    <FaStar className="text-accent" size={14} />
                    <span className="text-sm font-black text-txt">
                      {product.rating}
                    </span>
                    <span className="text-xs font-bold text-paragraph">
                      ({product.reviews} reviews)
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-sm font-bold text-paragraph">
                    <FiMapPin className="text-accent" />
                    <span>{product.location}, Bangladesh</span>
                  </div>
                </div>
              </div>

              {/* Main Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-[32px] md:rounded-[48px] overflow-hidden border border-gray-100 shadow-sm aspect-video relative group"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-txt shadow-sm border border-white">
                    Verified Gear
                  </span>
                </div>
              </motion.div>

              {/* About Section */}
              <section className="px-2 md:px-0">
                <h2 className="text-xl md:text-2xl font-black text-txt mb-4 tracking-tight">
                  About this product
                </h2>
                <p className="text-sm md:text-base text-paragraph leading-relaxed font-medium">
                  {product.description}
                </p>
              </section>

              {/* Manual Section */}
              <section className="bg-secondary/30 p-6 md:p-10 rounded-[32px] border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <FiInfo className="text-accent" size={20} />
                  </div>
                  <h3 className="text-lg font-black text-txt">
                    Lender Manual & Rules
                  </h3>
                </div>
                <p className="text-sm text-paragraph leading-relaxed italic font-medium">
                  "{product.manual}"
                </p>
              </section>

              {/* MAP SECTION */}
              <section>
                <h2 className="text-xl font-black text-txt mb-6 px-2 md:px-0">
                  Live Item Location
                </h2>
                <div className="w-full h-80 md:h-96 bg-gray-100 rounded-[32px] overflow-hidden border border-gray-100 shadow-inner">
                  <iframe
                    title="product-location"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0 }}
                    src={`https://maps.google.com/maps?q=$${product.location}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                    allowFullScreen
                  ></iframe>
                </div>
              </section>
            </div>

            {/* ================= RIGHT COLUMN: BOOKING ================= */}
            <div className="space-y-6 lg:sticky lg:top-32 px-1 md:px-0">
              <div className="bg-white border border-gray-100 rounded-[40px] p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-txt">
                      ৳{getDisplayPrice()}
                    </span>
                    <span className="text-xs font-bold text-paragraph uppercase tracking-widest">
                      {selectedTier === "1" ? "/ day" : `Total`}
                    </span>
                  </div>
                  <p className="text-[10px] font-bold text-accent uppercase mt-1 tracking-wider flex  gap-1">
                    <FiShield size={12} /> Secure Transaction
                  </p>
                </div>

                {/* TIER SELECTION */}
                <div className="grid grid-cols-3 gap-2 mb-8 bg-secondary/30 p-1 rounded-2xl border border-gray-50">
                  {["1", "2", "7"].map((tier) => (
                    <button
                      key={tier}
                      onClick={() => setSelectedTier(tier)}
                      className={`py-3 rounded-xl text-center transition-all duration-300 ${
                        selectedTier === tier
                          ? "bg-white text-txt shadow-md"
                          : "text-paragraph hover:text-txt"
                      }`}
                    >
                      <p className="text-[11px] font-black">
                        {tier === "1"
                          ? "1 Day"
                          : tier === "2"
                            ? "2 Days"
                            : "7 Days"}
                      </p>
                      <p className="text-[9px] font-bold opacity-60">
                        ৳
                        {tier === "1"
                          ? product.price
                          : tier === "2"
                            ? Math.round(product.price * 1.8)
                            : Math.round(product.price * 5)}
                      </p>
                    </button>
                  ))}
                </div>

                {/* DATE SELECTION CARD */}
                <div className="bg-secondary/40 rounded-2xl border border-gray-100 overflow-hidden mb-8">
                  <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
                    <div className="flex-1 p-4 group cursor-pointer hover:bg-white transition-colors duration-300">
                      <label className="text-[9px] font-black uppercase text-paragraph tracking-widest flex items-center gap-1.5 mb-1 group-hover:text-accent">
                        <FiCalendar size={12} /> Pickup Date
                      </label>
                      <input
                        type="date"
                        className="bg-transparent border-none p-0 text-sm font-black text-txt outline-none w-full cursor-pointer"
                      />
                    </div>
                    <div className="flex-1 p-4 group cursor-pointer hover:bg-white transition-colors duration-300">
                      <label className="text-[9px] font-black uppercase text-paragraph tracking-widest flex items-center gap-1.5 mb-1 group-hover:text-accent">
                        <FiClock size={12} /> Return Date
                      </label>
                      <input
                        type="date"
                        className="bg-transparent border-none p-0 text-sm font-black text-txt outline-none w-full cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleBookingClick}
                  className="w-full bg-accent text-txt font-black py-5 rounded-2xl shadow-[0_10px_20px_rgba(255,184,0,0.2)] hover:bg-accent hover:shadow-[0_15px_30px_rgba(255,184,0,0.3)] transition-all mb-6 active:scale-[0.98]"
                >
                  {user ? "Confirm Booking" : "Login to Rent"}
                </button>

                <div className="space-y-3 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-3 text-[10px] text-paragraph font-bold uppercase tracking-wider">
                    <FiClock className="text-orange-500" size={14} /> Full refund
                    72h notice
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-paragraph font-bold uppercase tracking-wider">
                    <FiShield className="text-green-500" size={14} /> Verified
                    Identity Lender
                  </div>
                </div>
              </div>

              {/* OWNER CARD */}
              <div className="bg-white border border-gray-100 rounded-[32px] p-6 shadow-sm">
                <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-paragraph mb-5 px-1">
                  Professional Owner
                </h4>
                <div className="flex items-center gap-4 mb-5">
                  <div className="relative">
                    <img
                      src={product.owner.image}
                      alt={product.owner.name}
                      className="w-12 h-12 rounded-full border-2 border-accent object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-green-500 p-0.5 rounded-full border-2 border-white">
                      <FiCheckCircle className="text-white" size={10} />
                    </div>
                  </div>
                  <div>
                    <p className="font-black text-txt text-sm leading-tight">
                      {product.owner.name}
                    </p>
                    <div className="flex items-center gap-3 text-[10px] mt-1 font-bold">
                      <div className="flex items-center gap-1 text-accent">
                        <FaStar size={10} /> {product.owner.rating}
                      </div>
                      <div className="text-paragraph underline decoration-accent/20">
                        {product.owner.reviews} reviews
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-secondary/50 py-3 rounded-xl text-center">
                  <p className="text-[10px] font-black text-txt uppercase tracking-wider">
                    {product.owner.listings} Active Listings
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Added: Professional Modal Component */}
      <LimitModal 
        isOpen={showLimitModal} 
        onClose={() => setShowLimitModal(false)} 
      />
    </>
  );
};

export default ProductDetails;