import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiMapPin } from 'react-icons/fi';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

// --- IMAGE IMPORTS ---
import heroImage from '../../assets/Section -Hero.png';
import cameraIcon from '../../assets/Camera.svg';
import wrenchIcon from '../../assets/Wrench.svg';
import musicIcon from '../../assets/MusicNote.svg';
import bikeIcon from '../../assets/PersonSimpleBike.svg';
import houseIcon from '../../assets/House.svg';
import laptopIcon from '../../assets/Laptop.svg';
import frameIcon from '../../assets/Frame.svg';

// --- ANIMATED COUNTER COMPONENT ---
const Counter = ({ value }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { mass: 1, stiffness: 50, damping: 20, duration: 2 });
  const displayValue = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  return <motion.span ref={ref}>{displayValue}</motion.span>;
};

const Home = () => {
  // --- HERO STATE ---
  const [cityInput, setCityInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const bangladeshCities = [
    "Dhaka", "Chittagong", "Khulna", "Rajshahi", "Sylhet", 
    "Barisal", "Rangpur", "Mymensingh", "Comilla", "Gazipur", 
    "Narayanganj", "Savar", "Jessore", "Bogra", "Cox's Bazar"
  ];

  const filteredCities = bangladeshCities.filter(city =>
    city.toLowerCase().includes(cityInput.toLowerCase())
  );

  const handleCitySelect = (city) => {
    setCityInput(city);
    setShowSuggestions(false);
  };

  // --- CATEGORY DATA ---
  const categories = [
    { id: 1, name: "Photography", count: 1240, icon: cameraIcon },
    { id: 2, name: "Tools & DIY", count: 825, icon: wrenchIcon },
    { id: 3, name: "Camping & Outdoor", count: 345, icon: wrenchIcon }, // Using Wrench as fallback per request
    { id: 4, name: "Music Equipment", count: 123, icon: musicIcon },
    { id: 5, name: "Sports & Bikes", count: 678, icon: bikeIcon },
    { id: 6, name: "Party & Events", count: 432, icon: houseIcon },
    { id: 7, name: "Electronics", count: 965, icon: laptopIcon },
    { id: 8, name: "Creative & Art", count: 278, icon: frameIcon },
  ];

  // --- RESPONSIVE VISIBILITY LOGIC ---
  const [visibleCount, setVisibleCount] = useState(8); 

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setVisibleCount(8); // Desktop: Show All
      } else if (width >= 768) {
        setVisibleCount(6); // Tablet: Show 6
      } else {
        setVisibleCount(4); // Mobile: Show 4
      }
    };

    handleResize(); // Run on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSeeAll = () => {
    setVisibleCount(categories.length);
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto bg-primary overflow-hidden">
      
      {/* ================= HERO SECTION ================= */}
      {/* Using your exact code for background positioning */}
      <section 
        className="relative w-full min-h-[686px] md:min-h-[748px] lg:min-h-[887px] bg-no-repeat bg-bottom bg-[length:100%_auto] flex pt-[20px] md:pt-[55px]"
        style={{ backgroundImage: `url('${heroImage}')` }} 
      >

        <div className="container mx-auto px-4 flex flex-col items-center text-center relative z-10 pt-10 md:pt-0">
          
          {/* Main Heading */}
          <h1 className="type-h1 text-txt mb-6 max-w-4xl">
            Rent Anything. Anytime. <br className="hidden md:block" />
            From Trusted Locals.
          </h1>

          {/* Subheading */}
          <p className="type-p text-paragraph mb-12 max-w-2xl mx-auto">
            Access high-quality items when you need them – and earn money from the things you own. Simple, secure, and sustainable.
          </p>

          {/* Search Inputs & Button Container */}
          <div className="w-full max-w-4xl flex flex-col md:flex-row items-center gap-4">
            
            {/* Input 1: Keyword Search */}
            <div className="flex items-center w-full md:flex-[1.5] bg-secondary border border-gray-200 rounded-xl px-4 h-14 shadow-sm hover:border-accent transition-colors">
              <FiSearch className="text-paragraph text-xl flex-shrink-0 mr-3" />
              <input 
                type="text" 
                placeholder="What are you looking for..." 
                className="w-full bg-transparent outline-none text-txt type-small placeholder-paragraph/70"
              />
            </div>

            {/* Input 2: Location (With Suggestions) */}
            <div className="relative w-full md:flex-1 z-30">
              <div className="flex items-center w-full bg-secondary border border-gray-200 rounded-xl px-4 h-14 shadow-sm hover:border-accent transition-colors">
                <FiMapPin className="text-paragraph text-xl flex-shrink-0 mr-3" />
                <input 
                  type="text" 
                  value={cityInput}
                  onChange={(e) => {
                    setCityInput(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  placeholder="Select City" 
                  className="w-full bg-transparent outline-none text-txt type-small placeholder-paragraph/70"
                />
              </div>

              {/* Suggestion Dropdown */}
              {showSuggestions && cityInput.length > 0 && (
                <div className="absolute top-full left-0 w-full mt-2 bg-primary border border-gray-100 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                  {filteredCities.length > 0 ? (
                    filteredCities.map((city, index) => (
                      <div 
                        key={index}
                        onClick={() => handleCitySelect(city)}
                        className="px-4 py-3 hover:bg-secondary cursor-pointer text-left text-txt type-small flex items-center gap-2"
                      >
                        <FiMapPin size={14} className="text-paragraph"/>
                        {city}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-paragraph type-small text-left">No city found</div>
                  )}
                </div>
              )}
            </div>

            {/* Search Button */}
            <button className="w-full md:w-auto bg-accent hover:opacity-90 text-txt type-h6 font-semibold h-14 px-10 rounded-xl transition-all shadow-md hover:shadow-lg whitespace-nowrap">
              Browse Rentals
            </button>
          </div>

        </div>
      </section>

      {/* ================= BROWSE BY CATEGORY SECTION ================= */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="container mx-auto px-4 md:px-8">
          
          {/* Section Header */}
          <div className="mb-12">
            <h2 className="type-h2 text-txt mb-3">Browse by Category</h2>
            <p className="type-p text-paragraph">Discover thousands of items available for rent in your area</p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.slice(0, visibleCount).map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                className="bg-[#FAF9F4] border border-[#F5F5F5] rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:border-accent/30 group h-[200px]"
              >
                {/* Icon Container */}
                <div className="mb-6 w-12 h-12 flex items-center justify-center">
                  <img 
                    src={category.icon} 
                    alt={category.name} 
                    className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity" 
                  />
                </div>
                
                {/* Text Content */}
                <h3 className="type-h6 font-semibold text-txt mb-2 group-hover:text-accent transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-400 font-medium">
                  <Counter value={category.count} /> items
                </p>
              </motion.div>
            ))}
          </div>

          {/* "See All" Button (Only shows if there are hidden items) */}
          {visibleCount < categories.length && (
            <div className="flex justify-center mt-12">
              <button 
                onClick={handleSeeAll}
                className="bg-accent hover:bg-[#E5A600] text-txt font-semibold py-3 px-8 rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                See all category
              </button>
            </div>
          )}
          
        </div>
      </section>

    </div>
  );
};

export default Home;