import React, { useState, useEffect, useRef } from "react";
import { FiSearch, FiMapPin, FiPlus, FiMinus } from "react-icons/fi"; // Added Plus/Minus
import { FaStar } from "react-icons/fa";
import {
  motion,
  useInView,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion"; // Added AnimatePresence

// --- IMAGE IMPORTS ---
import heroImage from "../../assets/Section -Hero.png";

// Category Icons
import cameraIcon from "../../assets/Camera.svg";
import wrenchIcon from "../../assets/Wrench.svg";
import musicIcon from "../../assets/MusicNote.svg";
import bikeIcon from "../../assets/PersonSimpleBike.svg";
import houseIcon from "../../assets/House.svg";
import laptopIcon from "../../assets/Laptop.svg";
import frameIcon from "../../assets/Frame.svg";

// How It Works Assets
import workStep1 from "../../assets/How-It’s-Works-1.svg";
import workStep2 from "../../assets/How-It’s-Works-2.png";
import workStep3 from "../../assets/How-It’s-Works-3.png";
import arrowIcon from "../../assets/How-It’s-Works-arrow.svg";
import downArrowIcon from "../../assets/How-It’s-Work-downArrow.svg";

// Sharing Revolution Asset
import sharingImage from "../../assets/Sharing-Revolution.svg";

// Testimonial Person Images
import personSarah from "../../assets/presons/image.svg";
import personKarim from "../../assets/presons/image (1).svg";
import personNusrat from "../../assets/presons/image (2).svg";

// --- ANIMATED COUNTER COMPONENT ---
const Counter = ({ value, decimals = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, {
    mass: 1,
    stiffness: 50,
    damping: 20,
    duration: 2,
  });
  const displayValue = useTransform(spring, (current) =>
    current.toFixed(decimals)
  );

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  return <motion.span ref={ref}>{displayValue}</motion.span>;
};

// --- FAQ ITEM COMPONENT ---
const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden mb-4 transition-all hover:shadow-sm">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
      >
        <span className="text-[#1A1A1A] font-semibold text-lg">{question}</span>
        <span className="text-[#FFB800] text-xl">
          {isOpen ? <FiMinus /> : <FiPlus />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 text-gray-500 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Home = () => {
  // --- HERO STATE ---
  const [cityInput, setCityInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(0); // State for FAQ

  const bangladeshCities = [
    "Dhaka",
    "Chittagong",
    "Khulna",
    "Rajshahi",
    "Sylhet",
    "Barisal",
    "Rangpur",
    "Mymensingh",
    "Comilla",
    "Gazipur",
    "Narayanganj",
    "Savar",
    "Jessore",
    "Bogra",
    "Cox's Bazar",
  ];

  const filteredCities = bangladeshCities.filter((city) =>
    city.toLowerCase().includes(cityInput.toLowerCase())
  );

  const handleCitySelect = (city) => {
    setCityInput(city);
    setShowSuggestions(false);
  };

  // --- DATA ARRAYS ---
  const categories = [
    { id: 1, name: "Photography", count: 1240, icon: cameraIcon },
    { id: 2, name: "Tools & DIY", count: 825, icon: wrenchIcon },
    { id: 3, name: "Camping & Outdoor", count: 345, icon: wrenchIcon },
    { id: 4, name: "Music Equipment", count: 123, icon: musicIcon },
    { id: 5, name: "Sports & Bikes", count: 678, icon: bikeIcon },
    { id: 6, name: "Party & Events", count: 432, icon: houseIcon },
    { id: 7, name: "Electronics", count: 965, icon: laptopIcon },
    { id: 8, name: "Creative & Art", count: 278, icon: frameIcon },
  ];

  const reviews = [
    {
      id: 1,
      name: "Sarah Ahmed",
      location: "Dhaka",
      image: personSarah,
      rating: 5,
      text: "Rented a DSLR camera for my cousin's wedding. The owner was super helpful and the camera was in perfect condition. Saved me thousands of taka!",
      time: "2 weeks ago",
    },
    {
      id: 2,
      name: "Karim Hassan",
      location: "Chittagong",
      image: personKarim,
      rating: 5,
      text: "I've been listing my power tools on RentFriend for 3 months now. Great extra income and the platform makes everything so easy and secure.",
      time: "1 month ago",
    },
    {
      id: 3,
      name: "Nusrat Rahman",
      location: "Sylhet",
      image: personNusrat,
      rating: 5,
      text: "Needed camping gear for a weekend trip. Found everything I needed nearby at a fraction of the buying cost. The verification system made me feel safe.",
      time: "3 weeks ago",
    },
  ];

  const faqs = [
    {
      question: "How does RentFriend work?",
      answer:
        "RentFriend connects people who own items with people who need to rent them. Simply search for what you need, book it for your desired dates, and meet the owner for pickup.",
    },
    {
      question: "Is it safe to rent from or lend to someone?",
      answer:
        "Yes! We verify all users through ID checks and phone verification. We also offer insurance coverage for items during the rental period.",
    },
    {
      question: "What happens if something gets damaged or lost?",
      answer:
        "In the rare event of damage, our RentFriend Guarantee covers repairs or replacement up to a certain limit. We handle the dispute resolution process.",
    },
    {
      question: "What kind of items can I rent?",
      answer:
        "You can rent almost anything! Cameras, drones, power tools, camping gear, party supplies, musical instruments, and even bicycles.",
    },
    {
      question: "How do payments and deposits work?",
      answer:
        "Payments are secure and cashless. You pay through the app when you book. Deposits are held temporarily and released once the item is returned safely.",
    },
    {
      question: "Why should I rent instead of buy?",
      answer:
        "Renting saves you money, reduces household clutter, and is better for the environment. It allows you to access high-quality items without the full cost of ownership.",
    },
  ];

  // --- RESPONSIVE VISIBILITY LOGIC ---
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setVisibleCount(8);
      } else if (width >= 768) {
        setVisibleCount(6);
      } else {
        setVisibleCount(4);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSeeAll = () => {
    setVisibleCount(categories.length);
  };

  // --- ANIMATION VARIANTS ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="w-full bg-primary overflow-x-hidden">
      {/* ================= HERO SECTION ================= */}
      <section
        className="relative w-full max-w-[1440px] mx-auto min-h-[686px] md:min-h-[748px] lg:min-h-[887px] bg-no-repeat bg-bottom bg-[length:100%_auto] flex pt-[20px] md:pt-[55px]"
        style={{ backgroundImage: `url('${heroImage}')` }}
      >
        <div className="container mx-auto px-4 flex flex-col items-center text-center relative z-10 pt-10 md:pt-0">
          <h1 className="type-h1 text-txt mb-6 max-w-4xl">
            Rent Anything. Anytime. <br className="hidden md:block" />
            From Trusted Locals.
          </h1>
          <p className="type-p text-paragraph mb-12 max-w-2xl mx-auto">
            Access high-quality items when you need them – and earn money from
            the things you own. Simple, secure, and sustainable.
          </p>
          <div className="w-full max-w-4xl flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center w-full md:flex-[1.5] bg-secondary border border-gray-200 rounded-xl px-4 h-14 shadow-sm hover:border-accent transition-colors">
              <FiSearch className="text-paragraph text-xl flex-shrink-0 mr-3" />
              <input
                type="text"
                placeholder="What are you looking for..."
                className="w-full bg-transparent outline-none text-txt type-small placeholder-paragraph/70"
              />
            </div>
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
                  onBlur={() =>
                    setTimeout(() => setShowSuggestions(false), 200)
                  }
                  placeholder="Select City"
                  className="w-full bg-transparent outline-none text-txt type-small placeholder-paragraph/70"
                />
              </div>
              {showSuggestions && cityInput.length > 0 && (
                <div className="absolute top-full left-0 w-full mt-2 bg-primary border border-gray-100 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                  {filteredCities.length > 0 ? (
                    filteredCities.map((city, index) => (
                      <div
                        key={index}
                        onClick={() => handleCitySelect(city)}
                        className="px-4 py-3 hover:bg-secondary cursor-pointer text-left text-txt type-small flex items-center gap-2"
                      >
                        {" "}
                        <FiMapPin size={14} className="text-paragraph" /> {city}{" "}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-paragraph type-small text-left">
                      No city found
                    </div>
                  )}
                </div>
              )}
            </div>
            <button className="w-full md:w-auto bg-accent hover:opacity-90 text-txt type-h6 font-semibold h-14 px-10 rounded-xl transition-all shadow-md hover:shadow-lg whitespace-nowrap">
              Browse Rentals
            </button>
          </div>
        </div>
      </section>

      {/* ================= BROWSE BY CATEGORY ================= */}
      <section className="py-16 md:py-24 bg-primary max-w-[1440px] mx-auto">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-12 text-center md:text-left">
            <h2 className="type-h2 text-txt mb-3">Browse by Category</h2>
            <p className="type-p text-paragraph">
              Discover thousands of items available for rent in your area
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.slice(0, visibleCount).map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                className="bg-[#FDFDFC] border border-[#F5F5F5] rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:border-accent/30 group min-h-[180px] md:h-[200px]"
              >
                <div className="mb-5 w-14 h-14 md:w-16 md:h-16 bg-white rounded-[18px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] p-3 flex items-center justify-center transition-shadow group-hover:shadow-[0_8px_24px_rgba(255,195,0,0.15)]">
                  <img
                    src={category.icon}
                    alt={category.name}
                    className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <h3 className="type-h6 font-semibold text-txt mb-1.5 group-hover:text-accent transition-colors line-clamp-1">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-400 font-medium">
                  <Counter value={category.count} /> items
                </p>
              </motion.div>
            ))}
          </div>
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

      {/* ================= HOW IT WORKS SECTION ================= */}
      <section className="py-16 md:py-24 bg-[#FDFDFC] max-w-[1440px] mx-auto">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="type-h2 text-txt mb-4">How It Works</h2>
            <p className="type-p text-paragraph max-w-2xl mx-auto">
              Renting is simple, safe, and sustainable. Get started in minutes.
            </p>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col lg:flex-row items-center justify-center gap-0 relative"
          >
            <motion.div
              variants={itemVariants}
              className="flex-1 flex flex-col items-center text-center px-4 max-w-[350px] mx-auto z-10"
            >
              <div className="h-48 w-full flex items-center justify-center mb-6">
                <img
                  src={workStep1}
                  alt="Browse"
                  className="h-full object-contain"
                />
              </div>
              <h3 className="type-h4 text-txt mb-3">Browse & Search</h3>
              <p className="type-small text-paragraph leading-relaxed">
                Find exactly what you need from thousands of verified listings
                in your area.
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="lg:hidden py-8">
              <img
                src={downArrowIcon}
                alt="Next"
                className="w-12 h-12 opacity-80"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="hidden lg:block w-32 mt-12 -mx-8 self-start z-0"
            >
              <img src={arrowIcon} alt="arrow" className="w-full" />
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="flex-1 flex flex-col items-center text-center px-4 max-w-[350px] mx-auto z-10"
            >
              <div className="h-48 w-full flex items-center justify-center mb-6">
                <img
                  src={workStep2}
                  alt="Book"
                  className="h-full object-contain scale-110"
                />
              </div>
              <h3 className="type-h4 text-txt mb-3">Book Instantly</h3>
              <p className="type-small text-paragraph leading-relaxed">
                Select your dates, confirm the booking, and communicate directly
                with the owner.
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="lg:hidden py-8">
              <img
                src={downArrowIcon}
                alt="Next"
                className="w-12 h-12 opacity-80"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="hidden lg:block w-32 mt-12 -mx-8 self-start z-0"
            >
              <img src={arrowIcon} alt="arrow" className="w-full" />
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="flex-1 flex flex-col items-center text-center px-4 max-w-[350px] mx-auto z-10"
            >
              <div className="h-48 w-full flex items-center justify-center mb-6">
                <img
                  src={workStep3}
                  alt="Pickup"
                  className="h-full object-contain"
                />
              </div>
              <h3 className="type-h4 text-txt mb-3">Pick Up & Return</h3>
              <p className="type-small text-paragraph leading-relaxed">
                Meet the owner, enjoy your rental, and return it on time. Leave
                a review!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= SHARING REVOLUTION SECTION ================= */}
      <section className="py-16 md:py-24 bg-[#333] text-white w-full">
        <div className="container mx-auto px-4 md:px-8 max-w-[1440px]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-1 text-center md:text-left"
            >
              <h2 className="type-h2 mb-6 md:mb-8 leading-tight">
                Join the Sharing <br className="hidden md:block" /> Revolution
              </h2>
              <div className="space-y-6 text-gray-300 type-p leading-relaxed">
                <p>
                  Every time you rent through RentFriend, you’re making a small
                  choice with a big impact. By sharing instead of buying, you
                  help reduce waste.
                </p>
                <p>
                  Together, we’re building a smarter, more sustainable world –
                  one that values access over ownership.
                </p>
                <p>
                  When you rent, everyone benefits – you save money, others
                  earn, and the planet gets a little cleaner.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 w-full"
            >
              <img
                src={sharingImage}
                alt="People sharing items"
                className="w-full h-auto object-contain rounded-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS SECTION ================= */}
      <section className="py-16 md:py-24 bg-secondary w-full overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="type-h2 text-txt mb-3">What Our Community Says</h2>
            <p className="type-p text-paragraph">
              Join thousands of happy renters and lenders sharing their
              experiences
            </p>
          </div>
        </div>

        {/* Infinite Marquee */}
        <div className="relative w-full overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-15 z-10 bg-gradient-to-r from-secondary to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-15 z-10 bg-gradient-to-l from-secondary to-transparent pointer-events-none" />
          <motion.div
            className="flex gap-6 w-max"
            animate={{ x: "-50%" }}
            transition={{ duration: 100, ease: "linear", repeat: Infinity }}
          >
            {[...reviews, ...reviews, ...reviews, ...reviews].map(
              (review, index) => (
                <div
                  key={index}
                  className="w-[320px] md:w-[400px] flex-shrink-0 bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="type-h6 font-bold text-txt">
                        {review.name}
                      </h4>
                      <p className="text-sm text-gray-400">{review.location}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <FaStar key={i} className="text-[#FFB800] text-sm" />
                    ))}
                  </div>
                  <p className="type-p text-paragraph text-sm md:text-[15px] leading-relaxed mb-6">
                    "{review.text}"
                  </p>
                  <span className="text-xs font-semibold text-[#FFB800] bg-[#FFB800]/10 px-2 py-1 rounded">
                    {review.time}
                  </span>
                </div>
              )
            )}
          </motion.div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 md:px-8 mt-20">
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-[#FFB800] mb-2 flex justify-center items-center gap-1">
                <Counter value={4.9} decimals={1} />
                /5
              </div>
              <p className="text-gray-500 font-medium">Average Rating</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-[#FFB800] mb-2 flex justify-center items-center">
                <Counter value={90} />+
              </div>
              <p className="text-gray-500 font-medium">Reviews</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-[#FFB800] mb-2 flex justify-center items-center">
                <Counter value={98} />%
              </div>
              <p className="text-gray-500 font-medium">Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="py-16 md:py-24 bg-primary max-w-[1440px] mx-auto">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
            {/* Left Side: Header */}
            {/* CHANGE: Added 'text-center' (for mobile) and 'lg:text-left' (for desktop) */}
            <div className="w-full lg:w-1/3 text-center lg:text-left">
              <h2 className="type-h2 text-txt mb-4">
                Frequently Asked Questions
              </h2>
              <p className="type-p text-paragraph mb-6 leading-relaxed">
                Can't find what you're looking for? Reach out to{" "}
                <span className="font-bold text-txt">RentFriend Support</span> –
                we're happy to help!
              </p>
            </div>

            {/* Right Side: Accordion */}
            <div className="w-full lg:w-2/3">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFAQ === index}
                  onClick={() => setOpenFAQ(openFAQ === index ? -1 : index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
