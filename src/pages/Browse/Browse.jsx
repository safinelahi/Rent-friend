import React, { useState, useMemo } from "react";
import { FiSearch, FiMapPin, FiFilter, FiX, FiChevronRight, FiZap } from "react-icons/fi";
import { products } from "../../data/products";
import RentalCard from "../../components/RentalCard";
import { motion, AnimatePresence } from "framer-motion";

const Browse = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [priceRange, setPriceRange] = useState(10000); // Increased range for diverse gear

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const categories = ["All", "Photography", "Tools & DIY", "Camping & Outdoor", "Music Equipment", "Sports & Bikes", "Electronics"];
  const locations = ["All", "Dhaka", "Rajshahi", "Sylhet", "Chittagong", "Khulna"];

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      const matchesLocation = selectedLocation === "All" || item.city === selectedLocation;
      const matchesPrice = item.price <= priceRange;
      return matchesSearch && matchesCategory && matchesLocation && matchesPrice;
    });
  }, [searchQuery, selectedCategory, selectedLocation, priceRange]);

  const FilterContent = () => (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-accent font-black uppercase tracking-[0.3em] text-[10px]">
          <FiFilter /> <span>Refine Search</span>
        </div>
        <button onClick={() => setShowMobileFilters(false)} className="lg:hidden p-2 text-paragraph/40 hover:text-txt">
          <FiX size={20} />
        </button>
      </div>

      {/* Category Section */}
      <div>
        <p className="text-[9px] font-black text-paragraph/30 uppercase tracking-[0.4em] mb-6">Asset Category</p>
        <div className="space-y-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`w-full text-left flex items-center justify-between group transition-all ${
                selectedCategory === cat ? "text-txt" : "text-paragraph/50 hover:text-txt"
              }`}
            >
              <span className="text-[11px] font-black uppercase tracking-widest">{cat}</span>
              <div className={`w-1.5 h-1.5 rounded-full transition-all ${selectedCategory === cat ? "bg-accent scale-150" : "bg-transparent group-hover:bg-gray-200"}`} />
            </button>
          ))}
        </div>
      </div>

      {/* Location Section */}
      <div>
        <p className="text-[9px] font-black text-paragraph/30 uppercase tracking-[0.4em] mb-6">Regional Focus</p>
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
          {locations.map((loc) => (
            <button
              key={loc}
              onClick={() => setSelectedLocation(loc)}
              className={`text-left px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                selectedLocation === loc
                  ? "bg-[#111] border-[#111] text-white shadow-xl"
                  : "bg-secondary/50 border-transparent text-paragraph hover:border-gray-200"
              }`}
            >
              {loc}
            </button>
          ))}
        </div>
      </div>

      {/* Price Slider Section */}
      <div>
        <div className="flex justify-between items-end mb-6">
          <p className="text-[9px] font-black text-paragraph/30 uppercase tracking-[0.4em]">Daily Limit</p>
          <span className="text-txt font-black text-xs">৳{priceRange.toLocaleString()}</span>
        </div>
        <input
          type="range"
          min="0"
          max="10000"
          step="100"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="w-full accent-accent cursor-pointer h-1.5 bg-secondary rounded-full appearance-none"
        />
      </div>

      {/* Reset Action */}
      <button
        onClick={() => {
          setSelectedCategory("All");
          setSelectedLocation("All");
          setPriceRange(10000);
          setSearchQuery("");
        }}
        className="w-full py-5 bg-white border border-gray-100 text-txt font-black text-[9px] uppercase tracking-[0.3em] rounded-2xl hover:bg-secondary transition-all flex items-center justify-center gap-2"
      >
        Clear Parameters
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFDFC] pt-32 pb-32 font-epilogue text-[#111]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* --- EDITORIAL HEADER --- */}
        <div className="mb-20">
          <div className="flex items-center gap-3 text-accent mb-6">
             <FiZap size={14} />
             <span className="text-[10px] font-black uppercase tracking-[0.5em]">Inventory Access</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85]">
              The <br className="hidden md:block" /> Collection.
            </h1>
            
            {/* Search Bar - Modern Style */}
            <div className="relative w-full lg:max-w-md">
              <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-paragraph opacity-30" size={20} />
              <input
                type="text"
                placeholder="Search by keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-16 bg-white border border-gray-100 rounded-[20px] pl-16 pr-6 outline-none focus:border-accent shadow-sm transition-all text-sm font-bold"
              />
              <button 
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden absolute right-4 top-1/2 -translate-y-1/2 bg-[#111] text-white p-3 rounded-xl shadow-lg"
              >
                <FiFilter size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-16">
          
          {/* --- SIDEBAR FILTERS (BENTO STYLE) --- */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-32 h-fit bg-white border border-gray-50 p-10 rounded-[32px] shadow-[0_40px_100px_rgba(0,0,0,0.02)]">
            <FilterContent />
          </aside>

          {/* MOBILE DRAWER */}
          <AnimatePresence>
            {showMobileFilters && (
              <>
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => setShowMobileFilters(false)}
                  className="fixed inset-0 bg-[#111]/40 backdrop-blur-md z-[60] lg:hidden"
                />
                <motion.div
                  initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                  className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-[70] p-10 lg:hidden overflow-y-auto"
                >
                  <FilterContent />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* --- RESULTS GRID --- */}
          <main className="lg:col-span-9">
            <div className="flex items-center justify-between mb-12 border-b border-gray-50 pb-8">
              <p className="text-paragraph/40 text-[10px] font-black uppercase tracking-[0.3em]">
                Live Stock / <span className="text-txt">{filteredProducts.length} Results</span>
              </p>
              <div className="hidden md:flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-paragraph/30">
                Sorted by: <span className="text-txt underline underline-offset-4 decoration-accent">Newest Deployed</span>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <RentalCard item={item} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-40 bg-white rounded-[32px] border-2 border-dashed border-gray-100">
                <FiSearch size={48} className="mx-auto text-gray-200 mb-6" />
                <h3 className="text-2xl font-black tracking-tight mb-2">Zero Assets Found.</h3>
                <p className="text-paragraph text-xs font-medium mb-8">Try adjusting your filters or clearing parameters.</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                    setSelectedLocation("All");
                  }}
                  className="text-accent text-[10px] font-black uppercase tracking-[0.3em] underline underline-offset-8"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Browse;