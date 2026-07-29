import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
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
  const [featuredItems, setFeaturedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await api.get('/products');
        if (res.data.success) {
          // Keep only live products
          const live = res.data.products.filter(p => p.status === 'Live');
          setFeaturedItems(live.slice(0, 6));
        }
      } catch (err) {
        console.error("Error loading products on Home:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);
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
        setItemsPerPage(3);
      } else if (width >= 768) {
        setItemsPerPage(2);
      } else {
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
      location: "Dhanmondi, Dhaka",
      image: personSarah,
      rating: 5,
      text: "Needed a Sony A7III for a wedding shoot. Found one 10 minutes away from my house! Smooth pickup and excellent condition.",
      time: "2 weeks ago",
    },
    {
      id: 2,
      name: "Karim Hassan",
      location: "Halishahar, Chittagong",
      image: personKarim,
      rating: 5,
      text: "I've been renting out my projector and camping tents. Rent Friend secures the deposit in escrow, so I never worry about damage.",
      time: "1 month ago",
    },
    {
      id: 3,
      name: "Nusrat Rahman",
      location: "Zindabazar, Sylhet",
      image: personNusrat,
      rating: 5,
      text: "Rented a 4-person tent and sleeping bags for our Sreemangal trip. Saved me so much money compared to buying new gear.",
      time: "3 weeks ago",
    },
  ];

  const faqs = [
    {
      question: "How does Rent Friend work?",
      answer:
        "Search for the gear you need, pick your pickup/return dates, and submit booking. Once the lender approves, pay the rental fee + security deposit. Meet at the agreed Dhaka spot, take pickup audit photos, and start creating!",
    },
    {
      question: "Is it safe to rent or list items?",
      answer:
        "Absolutely. Every user must verify their identity with a Government NID card and selfie. Furthermore, we keep the security deposit locked in escrow, which is only returned after the lender verifies the item condition.",
    },
    {
      question: "What happens if an item is damaged?",
      answer:
        "Lenders and renters perform quick pickup and return audit photos. In case of disputes, our support reviews the audit photos. If damage is confirmed, repairs are deducted directly from the security deposit held in escrow.",
    },
    {
      question: "How do payouts and deposits work?",
      answer:
        "Renters pay securely using Bkash, Nagad, or Cards. The rental amount and security deposit are held. When the return is completed, the deposit is refunded instantly and the lender can request their payout.",
    },
  ];

  return (
    <div className="w-full bg-[#FDFDFC] font-epilogue overflow-x-hidden text-[#111]">
      {/* Hero section */}
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
              Why Buy? Just Rent from Your Neighbors.
            </p>
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] mb-10">
              Rent DSLR Cameras, Camping Gear, <br /> and More in Dhaka.
            </h1>
            <p className="text-paragraph/60 text-xs sm:text-sm max-w-xl mx-auto uppercase tracking-widest font-medium leading-relaxed mb-16">
              Unlock premium gear near you at a fraction of the cost—or list your own items to start making easy passive income today.
            </p>
          </motion.div>

          {/* Search Hub */}
          <div className="w-full max-w-5xl bg-white p-2 sm:p-3 rounded-[32px] sm:rounded-[48px] shadow-[0_40px_100px_rgba(0,0,0,0.05)] border border-gray-50 flex flex-col md:flex-row items-center gap-2">
            <div className="flex items-center w-full md:flex-[1.5] px-6 h-16 sm:h-20 bg-[#F8F8F7] rounded-[24px] sm:rounded-[36px] group transition-all">
              <FiSearch className="text-paragraph/40 text-xl mr-4 group-focus-within:text-accent" />
              <input
                type="text"
                placeholder="What do you need today? DSLR, Camping Tent, Projector..."
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

      {/* Featured rentals */}
      <section className="py-24 sm:py-32 bg-[#F8F8F7] px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between md:items-end mb-16 gap-6 text-center md:text-left">
            <div>
              <p className="text-accent text-[9px] font-black uppercase tracking-[0.4em] mb-4">
                Locals' Choice
              </p>
              <h2 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase leading-none">
                Trending <br /> Gear Nearby.
              </h2>
              <p className="text-paragraph/40 text-[10px] font-bold uppercase tracking-widest mt-4">
                Top picks with transparent rules, flexible pickups, and fair daily rates.
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

      {/* How it works */}
      <section className="py-24 sm:py-32 px-6 md:px-12 bg-white text-center">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-20">
            <p className="text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-4">
              Three Easy Steps
            </p>
            <h2 className="text-4xl sm:text-7xl font-black tracking-tighter uppercase leading-none">
              How Sharing Works.
            </h2>
            <p className="text-paragraph/40 text-[10px] font-bold uppercase tracking-widest mt-4">
              Zero hassle. We secure your money in escrow until you verify the gear is in your hands.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8 relative">
            <div className="flex-1 max-w-sm group">
              <div className="h-56 flex items-center justify-center mb-10 transition-transform duration-700">
                <img src={workStep1} alt="" className="h-full object-contain" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight mb-4">
                1. Find Your Gear
              </h3>
              <p className="text-[10px] font-bold text-paragraph/40 uppercase tracking-widest leading-relaxed">
                Search for nearby cameras, tools, or event gear with clear rules.
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
                2. Secure Escrow Booking
              </h3>
              <p className="text-[10px] font-bold text-paragraph/40 uppercase tracking-widest leading-relaxed">
                Lock in your rental dates. Your deposit is kept safe in our secure vault.
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
                3. Meet Up & Create
              </h3>
              <p className="text-[10px] font-bold text-paragraph/40 uppercase tracking-widest leading-relaxed">
                Quick NID validation at pickup. Create your project, and return the item to unlock your deposit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
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

      {/* FAQ section */}
      <section className="py-24 sm:py-32 px-6 md:px-12 bg-white">
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-20">
          <div className="lg:w-1/3 text-center lg:text-left">
            <p className="text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-4">
              Help Center
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
