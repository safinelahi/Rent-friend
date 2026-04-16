import React, { useState, useMemo } from "react";
import { FiSearch, FiMapPin, FiFilter, FiX } from "react-icons/fi";
import { products } from "../../data/products";
import RentalCard from "../../components/RentalCard";
import { motion, AnimatePresence } from "framer-motion";

const Browse = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [priceRange, setPriceRange] = useState(1000);

  const categories = [
    "All",
    "Photography",
    "Tools & DIY",
    "Camping & Outdoor",
    "Music Equipment",
    "Sports & Bikes",
    "Party & Events",
    "Electronics",
  ];
  const locations = [
    "All",
    "Dhaka",
    "Rajshahi",
    "Sylhet",
    "Chittagong",
    "Khulna",
  ];

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesLocation =
        selectedLocation === "All" || item.location === selectedLocation;
      const matchesPrice = item.price <= priceRange;
      return (
        matchesSearch && matchesCategory && matchesLocation && matchesPrice
      );
    });
  }, [searchQuery, selectedCategory, selectedLocation, priceRange]);

  return (
    <div className="min-h-screen bg-[#FDFDFC] pt-24 pb-20">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        {/* PAGE HEADER & SEARCH */}
        <div className="mb-12">
          <h1 className="type-h2 text-txt mb-6">Find What You Need</h1>
          <div className="relative max-w-2xl">
            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-paragraph text-xl" />
            <input
              type="text"
              placeholder="Search cameras, tools, camping gear..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-16 bg-white border border-gray-100 rounded-2xl pl-14 pr-6 outline-none focus:ring-2 focus:ring-accent shadow-sm transition-all"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* FILTER SIDEBAR */}
          <aside className="w-full lg:w-72 flex-shrink-0 space-y-8">
            <div className="bg-white border border-gray-100 p-8 rounded-[32px] shadow-sm">
              <div className="flex items-center gap-2 mb-8 text-txt font-bold">
                <FiFilter className="text-accent" />
                <span>Filters</span>
              </div>

              {/* Category Filter */}
              <div className="mb-8">
                <h4 className="type-small font-bold text-txt mb-4">Category</h4>
                <div className="space-y-3">
                  {categories.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === cat}
                        onChange={() => setSelectedCategory(cat)}
                        className="w-5 h-5 accent-accent cursor-pointer"
                      />
                      <span
                        className={`text-sm transition-colors ${selectedCategory === cat ? "text-txt font-bold" : "text-paragraph group-hover:text-txt"}`}
                      >
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div className="mb-8">
                <h4 className="type-small font-bold text-txt mb-4">Location</h4>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full bg-secondary border-none rounded-xl p-3 text-sm text-txt outline-none focus:ring-1 focus:ring-accent"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="type-small font-bold text-txt">Max Price</h4>
                  <span className="text-accent font-bold">৳{priceRange}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full accent-accent cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-paragraph mt-2 font-medium">
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
                }}
                className="w-full mt-6 text-xs font-bold text-paragraph hover:text-accent transition-colors flex items-center justify-center gap-2"
              >
                <FiX /> Reset All Filters
              </button>
            </div>
          </aside>

          {/* MAIN GRID */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <p className="text-paragraph text-sm font-medium">
                Showing{" "}
                <span className="text-txt font-bold">
                  {filteredProducts.length}
                </span>{" "}
                results
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredProducts.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <RentalCard item={item} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-[32px] border border-dashed border-gray-200">
                <p className="text-paragraph type-p">
                  No items match your filters. Try adjusting them!
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Browse;
