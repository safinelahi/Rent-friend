import React, { useState, useMemo } from "react";
import { FiSearch, FiMapPin, FiFilter, FiX, FiChevronRight } from "react-icons/fi";
import { products } from "../../data/products";
import RentalCard from "../../components/RentalCard";
import { motion, AnimatePresence } from "framer-motion";

const Browse = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [priceRange, setPriceRange] = useState(1000);
  
  // State for mobile filter visibility
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const categories = ["All", "Photography", "Tools & DIY", "Camping & Outdoor", "Music Equipment", "Sports & Bikes", "Party & Events", "Electronics"];
  const locations = ["All", "Dhaka", "Rajshahi", "Sylhet", "Chittagong", "Khulna"];

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      const matchesLocation = selectedLocation === "All" || item.location === selectedLocation;
      const matchesPrice = item.price <= priceRange;
      return matchesSearch && matchesCategory && matchesLocation && matchesPrice;
    });
  }, [searchQuery, selectedCategory, selectedLocation, priceRange]);

  // Reusable Filter Content Component
  const FilterContent = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between lg:justify-start gap-2 text-txt font-black uppercase tracking-widest text-[11px]">
        <div className="flex items-center gap-2">
          <FiFilter className="text-accent" />
          <span>Filters</span>
        </div>
        {/* Close button only for mobile */}
        <button onClick={() => setShowMobileFilters(false)} className="lg:hidden p-2 bg-secondary rounded-full">
          <FiX size={18} />
        </button>
      </div>

      {/* Category Filter */}
      <div>
        <h4 className="text-[10px] font-black text-paragraph uppercase tracking-wider mb-4">Category</h4>
        <div className="space-y-2.5">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
              <input type="radio" name="category" checked={selectedCategory === cat} onChange={() => setSelectedCategory(cat)} className="hidden" />
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${selectedCategory === cat ? "border-accent" : "border-gray-200"}`}>
                {selectedCategory === cat && <div className="w-2.5 h-2.5 bg-accent rounded-full" />}
              </div>
              <span className={`text-sm font-bold transition-colors ${selectedCategory === cat ? "text-txt" : "text-paragraph group-hover:text-txt"}`}>{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Location Filter - UPDATED: No more ugly select box */}
      <div>
        <h4 className="text-[10px] font-black text-paragraph uppercase tracking-wider mb-4">Location</h4>
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
          {locations.map((loc) => (
            <button
              key={loc}
              onClick={() => setSelectedLocation(loc)}
              className={`text-left px-4 py-3 rounded-xl text-xs font-bold transition-all border ${
                selectedLocation === loc ? "bg-accent border-accent text-txt shadow-sm" : "bg-secondary/40 border-transparent text-paragraph hover:border-gray-200"
              }`}
            >
              {loc}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-[10px] font-black text-paragraph uppercase tracking-wider">Max Price</h4>
          <span className="text-accent font-black text-sm">৳{priceRange}</span>
        </div>
        <input type="range" min="0" max="1000" value={priceRange} onChange={(e) => setPriceRange(e.target.value)} className="w-full accent-accent cursor-pointer" />
        <div className="flex justify-between text-[9px] text-paragraph mt-2 font-black uppercase">
          <span>৳0</span>
          <span>৳1000+</span>
        </div>
      </div>

      <button
        onClick={() => {
          setSelectedCategory("All");
          setSelectedLocation("All");
          setPriceRange(1000);
          setSearchQuery("");
          setShowMobileFilters(false);
        }}
        className="w-full py-4 bg-secondary text-txt font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
      >
        <FiX /> Reset All
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFDFC] pt-24 pb-20">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-5xl font-black text-txt mb-6 tracking-tight">Find What You Need</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-paragraph text-xl" />
              <input
                type="text"
                placeholder="Search cameras, tools, camping gear..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-16 bg-white border border-gray-100 rounded-2xl pl-14 pr-6 outline-none focus:ring-2 focus:ring-accent shadow-sm transition-all font-medium"
              />
            </div>
            {/* MOBILE FILTER TOGGLE BUTTON */}
            <button 
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden flex items-center justify-center gap-3 bg-txt text-white h-16 px-8 rounded-2xl font-black text-sm shadow-lg active:scale-95 transition-all"
            >
              <FiFilter /> Filters
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* DESKTOP SIDEBAR */}
          <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-28 h-fit bg-white border border-gray-100 p-8 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
            <FilterContent />
          </aside>

          {/* MOBILE FILTER DRAWER */}
          <AnimatePresence>
            {showMobileFilters && (
              <>
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => setShowMobileFilters(false)}
                  className="fixed inset-0 bg-txt/40 backdrop-blur-sm z-[60] lg:hidden"
                />
                <motion.div 
                  initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white z-[70] p-8 lg:hidden overflow-y-auto shadow-2xl"
                >
                  <FilterContent />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* MAIN GRID */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <p className="text-paragraph text-[11px] font-black uppercase tracking-widest">
                Showing <span className="text-accent font-black">{filteredProducts.length}</span> results
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                {filteredProducts.map((item) => (
                  <motion.div key={item.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <RentalCard item={item} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-32 bg-white rounded-[40px] border border-dashed border-gray-200">
                <p className="text-paragraph font-bold">No items match your search.</p>
                <button onClick={() => {setSearchQuery(""); setSelectedCategory("All");}} className="text-accent underline font-black text-xs mt-2">Clear all filters</button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Browse;