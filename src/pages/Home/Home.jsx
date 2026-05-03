import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiMapPin,
  FiPlus,
  FiMinus,
  FiChevronLeft,
  FiChevronRight,
  FiZap,
  FiArrowRight,
} from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import {
  motion,
  useInView,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";

// Data & Components
import { products } from "../../data/products";
import RentalCard from "../../components/RentalCard";

// Assets
import heroImage from "../../assets/Section -Hero.png";
import cameraIcon from "../../assets/Camera.svg";
import wrenchIcon from "../../assets/Wrench.svg";
import musicIcon from "../../assets/MusicNote.svg";
import bikeIcon from "../../assets/PersonSimpleBike.svg";
import houseIcon from "../../assets/House.svg";
import laptopIcon from "../../assets/Laptop.svg";
import frameIcon from "../../assets/Frame.svg";
import workStep1 from "../../assets/How-It’s-Works-1.svg";
import workStep2 from "../../assets/How-It’s-Works-2.png";
import workStep3 from "../../assets/How-It’s-Works-3.png";
import arrowIcon from "../../assets/How-It’s-Works-arrow.svg";
import downArrowIcon from "../../assets/How-It’s-Work-downArrow.svg";
import sharingImage from "../../assets/Sharing-Revolution.svg";
import personSarah from "../../assets/presons/image.svg";
import personKarim from "../../assets/presons/image (1).svg";
import personNusrat from "../../assets/presons/image (2).svg";

// --- ANIMATED COUNTER ---
const Counter = ({ value, decimals = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { mass: 1, stiffness: 50, damping: 20 });
  const displayValue = useTransform(spring, (current) =>
    current.toFixed(decimals),
  );

  useEffect(() => {
    if (isInView) spring.set(value);
  }, [isInView, value, spring]);
  return <motion.span ref={ref}>{displayValue}</motion.span>;
};

// --- STUDIO FAQ ITEM ---
const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="bg-white border border-gray-50 rounded-[32px] overflow-hidden mb-6 transition-all hover:shadow-sm">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-8 text-left outline-none"
      >
        <span className="text-[#111] font-black text-lg uppercase tracking-tight">
          {question}
        </span>
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isOpen ? "bg-[#111] text-accent" : "bg-[#F8F8F7] text-paragraph"}`}
        >
          {isOpen ? <FiMinus /> : <FiPlus />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <div className="px-8 pb-8 text-paragraph/60 font-medium text-sm leading-loose uppercase tracking-widest">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Home = () => {
  const [cityInput, setCityInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [visibleCount, setVisibleCount] = useState(8);

  const featuredItems = products.slice(0, 6);
  const bangladeshCities = [
    "Dhaka",
    "Chittagong",
    "Khulna",
    "Rajshahi",
    "Sylhet",
    "Barisal",
    "Rangpur",
    "Comilla",
    "Cox's Bazar",
  ];
  const filteredCities = bangladeshCities.filter((city) =>
    city.toLowerCase().includes(cityInput.toLowerCase()),
  );

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setVisibleCount(8);
        setItemsPerPage(3);
      } else if (width >= 768) {
        setVisibleCount(6);
        setItemsPerPage(2);
      } else {
        setVisibleCount(4);
        setItemsPerPage(1);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    if (currentIndex < featuredItems.length - itemsPerPage)
      setCurrentIndex((prev) => prev + 1);
  };
  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

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

  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    // Function to navigate to the browse page with the category name
    navigate(`/browse?category=${encodeURIComponent(categoryName)}`);
  };

  const reviews = [
    {
      id: 1,
      name: "Sarah Ahmed",
      location: "Dhaka",
      image: personSarah,
      rating: 5,
      text: "Rented a DSLR camera for my cousin's wedding. The owner was super helpful and the camera was in perfect condition.",
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
      text: "Needed camping gear for a weekend trip. Found everything I needed nearby at a fraction of the buying cost.",
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

  return (
    <div className="w-full bg-[#FDFDFC] font-epilogue overflow-x-hidden text-[#111]">
      {/* ================= HERO SECTION ================= */}
      <section
        className="relative w-full max-w-[1440px] mx-auto min-h-screen bg-no-repeat bg-bottom bg-[length:100%_auto] flex items-start pt-32 md:pt-48"
        style={{ backgroundImage: `url('${heroImage}')` }}
      >
        <div className="w-full px-6 md:px-12 flex flex-col items-center text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-8">
              Access Any Asset. Anytime.
            </p>
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] mb-10">
              Rent Anything. Anytime. <br /> From Trusted Locals.
            </h1>
            <p className="text-paragraph/60 text-xs sm:text-sm max-w-xl mx-auto uppercase tracking-widest font-medium leading-relaxed mb-16">
              Access high-quality items when you need them – and earn money from
              the things you own. Simple, secure, and sustainable.
            </p>
          </motion.div>

          {/* Search Hub */}
          <div className="w-full max-w-5xl bg-white p-2 sm:p-3 rounded-[32px] sm:rounded-[48px] shadow-[0_40px_100px_rgba(0,0,0,0.05)] border border-gray-50 flex flex-col md:flex-row items-center gap-2">
            <div className="flex items-center w-full md:flex-[1.5] px-6 h-16 sm:h-20 bg-[#F8F8F7] rounded-[24px] sm:rounded-[36px] group transition-all">
              <FiSearch className="text-paragraph/40 text-xl mr-4 group-focus-within:text-accent" />
              <input
                type="text"
                placeholder="What are you looking for..."
                className="w-full bg-transparent outline-none text-sm font-black uppercase tracking-widest placeholder-paragraph/30"
              />
            </div>
            <div className="relative w-full md:flex-1">
              <div className="flex items-center w-full px-6 h-16 sm:h-20 bg-[#F8F8F7] rounded-[24px] sm:rounded-[36px] group transition-all">
                <FiMapPin className="text-paragraph/40 text-xl mr-4 group-focus-within:text-accent" />
                <input
                  type="text"
                  value={cityInput}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() =>
                    setTimeout(() => setShowSuggestions(false), 200)
                  }
                  onChange={(e) => setCityInput(e.target.value)}
                  placeholder="Select City"
                  className="w-full bg-transparent outline-none text-sm font-black uppercase tracking-widest placeholder-paragraph/30"
                />
              </div>
              <AnimatePresence>
                {showSuggestions && cityInput.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 w-full mt-3 bg-white border border-gray-100 rounded-[28px] shadow-2xl p-3 z-50"
                  >
                    {filteredCities.map((city, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setCityInput(city);
                          setShowSuggestions(false);
                        }}
                        className="px-5 py-4 hover:bg-[#F8F8F7] rounded-2xl cursor-pointer text-[10px] font-black uppercase tracking-widest flex items-center gap-3"
                      >
                        <FiMapPin size={14} className="text-accent" /> {city}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link
              to="/browse"
              className="w-full md:w-auto bg-[#111] text-white h-16 sm:h-20 px-10 rounded-[24px] sm:rounded-[36px] font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center hover:bg-black transition-all group active:scale-95"
            >
              Browse Rentals{" "}
              <FiArrowRight className="ml-3 text-accent group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= BROWSE BY CATEGORY  ================= */}
      <section className="py-24 sm:py-36 px-6 md:px-12 bg-white relative overflow-hidden">
        {/* Decorative BG Text */}
        <div className="absolute left-0 top-0 text-[15vw] font-black text-gray-50 leading-none select-none pointer-events-none -translate-x-10 -translate-y-10 uppercase opacity-40">
          Catalog
        </div>

        <div className="max-w-[1440px] mx-auto relative z-10">
          {/* Section Header */}
          <div className="mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 text-accent mb-6">
                <span className="w-8 h-[2px] bg-accent"></span>
                <p className="text-[10px] font-black uppercase tracking-[0.5em]">
                  Asset Discovery Hub
                </p>
              </div>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
                Browse by <br /> <span className="text-[#111]">Category.</span>
              </h2>
            </div>
            <p className="text-paragraph/60 text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] max-w-xs leading-relaxed border-l-2 border-gray-100 pl-6">
              Explore professional assets verified by our compliance team.
              Secure sessions guaranteed across all categories.
            </p>
          </div>

          {/* Interactive Bento-ish Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
            {categories.slice(0, visibleCount).map((category, idx) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -15 }}
                onClick={() => handleCategoryClick(category.name)} // ৩. ক্লিক লজিক যুক্ত করা হলো
                className="group relative bg-[#FDFDFC] border border-gray-100 rounded-[40px] sm:rounded-[56px] p-10 flex flex-col items-center justify-center text-center transition-all hover:bg-white hover:shadow-[0_40px_100px_rgba(0,0,0,0.06)] overflow-hidden cursor-pointer min-h-[320px]"
              >
                {/* Subtle Hover Reveal Background Icon */}
                <div className="absolute -right-6 -bottom-6 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 transform group-hover:scale-150 group-hover:-rotate-12">
                  <img
                    src={category.icon}
                    alt=""
                    className="w-40 h-40 object-contain"
                  />
                </div>

                {/* Icon Container */}
                <div className="relative mb-10 w-24 h-24 bg-white rounded-[32px] shadow-[0_15px_40px_rgba(0,0,0,0.03)] p-6 flex items-center justify-center group-hover:bg-accent transition-all duration-500 group-hover:rotate-6">
                  <img
                    src={category.icon}
                    alt=""
                    className="w-full h-full object-contain grayscale group-hover:grayscale-0 group-hover:brightness-0 transition-all"
                  />
                </div>

                {/* Text Content */}
                <div className="relative z-10 flex flex-col items-center">
                  <h3 className="text-sm sm:text-base font-black uppercase tracking-[0.2em] text-txt mb-3 group-hover:text-accent transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-[10px] font-bold text-paragraph/30 uppercase tracking-[0.2em]">
                    <Counter value={category.count} /> Assets Listed
                  </p>

                  {/* ৪. Explore Hub with a clean gap (mt-8) */}
                  <div className="mt-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <div className="flex items-center gap-2 text-accent text-[9px] font-black uppercase tracking-widest border-b border-accent/20 pb-1">
                      Explore Hub <FiArrowRight />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* See All Button */}
          {visibleCount < categories.length && (
            <div className="mt-24 flex flex-col items-center">
              <button
                onClick={() => setVisibleCount(categories.length)}
                className="group flex items-center gap-6 bg-[#111] text-white px-12 py-6 rounded-full font-black uppercase tracking-[0.3em] text-[10px] transition-all hover:bg-accent hover:text-[#111] active:scale-95 shadow-2xl"
              >
                Expand Full Catalog
                <FiPlus className="group-hover:rotate-180 transition-transform duration-500" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ================= FEATURED RENTALS ================= */}
      <section className="py-24 sm:py-32 bg-[#F8F8F7] px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between md:items-end mb-16 gap-6 text-center md:text-left">
            <div>
              <p className="text-accent text-[9px] font-black uppercase tracking-[0.4em] mb-4">
                Top Rated Assets
              </p>
              <h2 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase leading-none">
                Featured <br /> Rentals.
              </h2>
              <p className="text-paragraph/40 text-[10px] font-bold uppercase tracking-widest mt-4">
                Top-rated items from verified owners.
              </p>
            </div>
            <div className="flex gap-4 justify-center md:justify-start">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${currentIndex === 0 ? "bg-white/50 text-paragraph/20" : "bg-white text-[#111] shadow-xl"}`}
              >
                <FiChevronLeft size={24} />
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex >= featuredItems.length - itemsPerPage}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${currentIndex >= featuredItems.length - itemsPerPage ? "bg-white/50 text-paragraph/20" : "bg-white text-[#111] shadow-xl"}`}
              >
                <FiChevronRight size={24} />
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <motion.div
              animate={{
                x: `calc(-${currentIndex} * ((100% + 32px) / ${itemsPerPage}))`,
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex gap-8"
            >
              {featuredItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    minWidth: `calc((100% - ${(itemsPerPage - 1) * 32}px) / ${itemsPerPage})`,
                  }}
                >
                  <RentalCard item={item} />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-24 sm:py-32 px-6 md:px-12 bg-white text-center">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-20">
            <p className="text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-4">
              Simple Process
            </p>
            <h2 className="text-4xl sm:text-7xl font-black tracking-tighter uppercase leading-none">
              How It Works.
            </h2>
            <p className="text-paragraph/40 text-xs font-bold uppercase tracking-widest mt-4">
              Renting is simple, safe, and sustainable. Get started in minutes.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8 relative">
            <div className="flex-1 max-w-sm group">
              <div className="h-56 flex items-center justify-center mb-10 transition-transform duration-700">
                <img src={workStep1} alt="" className="h-full object-contain" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight mb-4">
                Browse & Search
              </h3>
              <p className="text-[10px] font-bold text-paragraph/40 uppercase tracking-widest leading-relaxed">
                Find exactly what you need from thousands of verified listings.
              </p>
            </div>

            <img
              src={arrowIcon}
              alt=""
              className="hidden lg:block w-32 mt-12 opacity-10"
            />
            <img
              src={downArrowIcon}
              alt=""
              className="lg:hidden w-10 opacity-10"
            />

            <div className="flex-1 max-w-sm group">
              <div className="h-56 flex items-center justify-center mb-10 transition-transform duration-700">
                <img
                  src={workStep2}
                  alt=""
                  className="h-full object-contain scale-110"
                />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight mb-4">
                Book Instantly
              </h3>
              <p className="text-[10px] font-bold text-paragraph/40 uppercase tracking-widest leading-relaxed">
                Select dates, confirm booking, and chat with the owner.
              </p>
            </div>

            <img
              src={arrowIcon}
              alt=""
              className="hidden lg:block w-32 mt-12 opacity-10"
            />
            <img
              src={downArrowIcon}
              alt=""
              className="lg:hidden w-10 opacity-10"
            />

            <div className="flex-1 max-w-sm group">
              <div className="h-56 flex items-center justify-center mb-10 transition-transform duration-700">
                <img src={workStep3} alt="" className="h-full object-contain" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight mb-4">
                Pick Up & Return
              </h3>
              <p className="text-[10px] font-bold text-paragraph/40 uppercase tracking-widest leading-relaxed">
                Meet the owner, enjoy your rental, and return it on time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SHARING REVOLUTION ================= */}
      <section className="py-24 sm:py-32 bg-[#111] text-white px-6 md:px-12 relative overflow-hidden">
        <FiZap
          className="absolute -right-20 -top-20 text-white/5 pointer-events-none"
          size={400}
        />
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-32">
          <div className="flex-1">
            <p className="text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-8">
              Green Mission
            </p>
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] mb-12 uppercase">
              Join the Sharing <br /> Revolution.
            </h2>
            <div className="space-y-8 text-white/40 text-[11px] font-black uppercase tracking-[0.2em] leading-loose max-w-lg">
              <p>
                Every time you rent through RentFriend, you are making a small
                choice with a big impact. By sharing instead of buying, you help
                reduce waste, lower overproduction, and give useful items a
                longer life.
              </p>
              <p>
                Together, we are building a smarter, more sustainable world —
                one that values access over ownership and community over
                consumption.
              </p>
              <p>
                When you rent, everyone benefits — you save money, others earn,
                and the planet gets a little cleaner.
              </p>
            </div>
          </div>
          <div className="flex-1 w-full">
            <img
              src={sharingImage}
              alt=""
              className="w-full h-auto rounded-[48px] shadow-[0_40px_100px_rgba(0,0,0,0.5)] border border-white/5"
            />
          </div>
        </div>
      </section>

      {/* ================= REVIEWS SECTION ================= */}
      <section className="py-24 sm:py-32 bg-[#F8F8F7] px-4 text-center">
        <div className="max-w-[1440px] mx-auto mb-16">
          <p className="text-accent text-[9px] font-black uppercase tracking-[0.4em] mb-4">
            Feedback
          </p>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase leading-none">
            What Our <br /> Community Says.
          </h2>
          <p className="text-paragraph/40 text-[10px] font-bold uppercase tracking-widest mt-4">
            Join thousands of happy renters and lenders.
          </p>
        </div>

        <div className="relative w-full overflow-hidden mb-24">
          <motion.div
            className="flex gap-6 w-max"
            animate={{ x: "-50%" }}
            transition={{ duration: 60, ease: "linear", repeat: Infinity }}
          >
            {[...reviews, ...reviews, ...reviews, ...reviews].map(
              (review, idx) => (
                <div
                  key={idx}
                  className="w-[300px] sm:w-[400px] flex-shrink-0 bg-white p-10 rounded-[40px] border border-gray-50 shadow-sm text-left"
                >
                  <div className="flex items-center gap-5 mb-8">
                    <img
                      src={review.image}
                      alt=""
                      className="w-14 h-14 rounded-[18px] object-cover grayscale"
                    />
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-widest">
                        {review.name}
                      </h4>
                      <p className="text-[8px] font-bold text-paragraph/40 uppercase tracking-widest">
                        {review.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-6">
                    {[...Array(review.rating)].map((_, i) => (
                      <FaStar key={i} className="text-accent text-[10px]" />
                    ))}
                  </div>
                  <p className="text-[11px] font-bold text-paragraph/60 leading-relaxed uppercase tracking-widest mb-8">
                    "{review.text}"
                  </p>
                  <span className="text-[8px] font-black text-accent bg-accent/10 px-3 py-1 rounded-full uppercase tracking-widest">
                    {review.time}
                  </span>
                </div>
              ),
            )}
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto flex justify-around gap-8 px-6">
          {[
            { v: 4.9, l: "Average Rating", d: 1, suffix: "/5" },
            { v: 90, l: "Reviews", d: 0, suffix: "+" },
            { v: 98, l: "Satisfaction", d: 0, suffix: "%" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl sm:text-6xl font-black text-[#111] tracking-tighter mb-2">
                <Counter value={stat.v} decimals={stat.d} />
                {stat.suffix}
              </div>
              <p className="text-[9px] font-black text-paragraph/40 uppercase tracking-[0.3em]">
                {stat.l}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="py-24 sm:py-32 px-6 md:px-12 bg-white">
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-20">
          <div className="lg:w-1/3 text-center lg:text-left">
            <p className="text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-4">
              Support Hub
            </p>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase leading-[0.9] mb-8">
              Frequently <br /> Asked Questions.
            </h2>
            <p className="text-paragraph/40 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
              Cant find what you are looking for? Reach out to{" "}
              <Link
                to="/contact"
                className="text-accent font-black underline underline-offset-8"
              >
                RentFriend Support
              </Link>
              .
            </p>
          </div>
          <div className="lg:w-2/3">
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
      </section>
    </div>
  );
};

export default Home;
