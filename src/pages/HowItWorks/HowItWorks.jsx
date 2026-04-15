import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; 
import { 
  FiSearch, FiCalendar, FiShield, FiMapPin, FiStar, 
  FiPlusCircle, FiUserCheck, FiMessageSquare, FiPackage, FiZap 
} from 'react-icons/fi';

const HowItWorks = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const renterSteps = [
    { icon: <FiSearch />, title: "Find Gear", desc: "Browse thousands of items near you using filters for category, price, and location." },
    { icon: <FiCalendar />, title: "Book Dates", desc: "Select your rental period and send a request to the lender instantly." },
    { icon: <FiShield />, title: "Secure Pay", desc: "Pay safely through RentFriend. We hold the funds until the rental is complete." },
    { icon: <FiMapPin />, title: "Pick Up", desc: "Coordinate with the lender to meet and collect your item at a convenient spot." },
    { icon: <FiStar />, title: "Rate & Return", desc: "Return the item on time and leave a review to build community trust." },
  ];

  const lenderSteps = [
    { icon: <FiPlusCircle />, title: "List Items", desc: "Upload photos, set your daily price, and describe your item's condition." },
    { icon: <FiUserCheck />, title: "Get Verified", desc: "Complete our security check to earn a 'Verified' badge and attract more renters." },
    { icon: <FiMessageSquare />, title: "Accept Requests", desc: "Chat with potential renters and approve bookings that work for you." },
    { icon: <FiPackage />, title: "Handover", desc: "Meet the renter, give them a quick demo, and hand over the gear." },
    { icon: <FiZap />, title: "Earn Money", desc: "Receive your payout directly to your bank account once the item is returned." },
  ];

  return (
    <div className="w-full bg-primary overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-secondary/30">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 text-center relative z-10">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-accent font-bold tracking-widest uppercase text-sm mb-4 block"
          >
            The Ultimate Guide
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="type-h1 text-txt mb-6"
          >
            How RentFriend Works
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="type-p text-paragraph max-w-2xl mx-auto"
          >
            Join the community built on trust. Whether you're looking to save money by borrowing or earn money by lending, we've got you covered.
          </motion.p>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            
            {/* Renter Column */}
            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col">
              <div className="bg-white p-8 md:p-12 lg:p-16 rounded-[40px] border border-gray-100 shadow-sm h-full">
                <div className="border-l-4 border-accent pl-6 mb-12">
                  <h2 className="type-h2 text-txt mb-2">For Renters</h2>
                  <p className="type-p text-paragraph">Access everything without the cost of ownership.</p>
                </div>
                <div className="space-y-10">
                  {renterSteps.map((step, idx) => (
                    <motion.div key={idx} variants={itemVariants} className="flex gap-6 group">
                      <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center text-accent text-2xl shrink-0 group-hover:bg-accent group-hover:text-txt transition-all duration-300">{step.icon}</div>
                      <div>
                        <h4 className="type-h6 font-bold text-txt mb-1">{idx + 1}. {step.title}</h4>
                        <p className="text-paragraph text-sm md:text-base leading-relaxed">{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Lender Column */}
            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col">
              <div className="bg-[#1A1A1A] p-8 md:p-12 lg:p-16 rounded-[40px] text-white h-full shadow-xl">
                <div className="border-l-4 border-accent pl-6 mb-12">
                  <h2 className="type-h2 text-white mb-2">For Lenders</h2>
                  <p className="type-p text-gray-400">Turn your idle items into a revenue stream.</p>
                </div>
                <div className="space-y-10">
                  {lenderSteps.map((step, idx) => (
                    <motion.div key={idx} variants={itemVariants} className="flex gap-6 group">
                      <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-accent text-2xl shrink-0 group-hover:bg-accent group-hover:text-txt transition-all duration-300">{step.icon}</div>
                      <div>
                        <h4 className="type-h6 font-bold text-white mb-1">{idx + 1}. {step.title}</h4>
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed">{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/*CTA Section */}
      <section className="py-20">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="bg-accent rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="type-h1 text-txt mb-6">Ready to get started?</h2>
              <p className="type-h6 text-txt/70 mb-10 max-w-xl mx-auto font-medium">Join thousands of people in Bangladesh sharing and earning every day.</p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/browse" 
                  className="bg-txt text-white px-10 py-4 rounded-xl font-bold hover:bg-txt/90 transition-all text-center"
                >
                  Start Renting
                </Link>
                <Link 
                  to="/list-item" 
                  className="bg-white text-txt px-10 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all text-center"
                >
                  List an Item
                </Link>
              </div>

            </div>
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HowItWorks;