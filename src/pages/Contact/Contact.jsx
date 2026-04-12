import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend } from 'react-icons/fi';

const Contact = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="w-full bg-primary min-h-screen">
      {/* Header Section */}
      <section className="py-16 md:py-24 border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="type-h1 text-txt mb-6"
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="type-p text-paragraph max-w-2xl mx-auto"
          >
            Have questions about renting or lending? Our team is here to help you navigate the RentFriend community.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-16"
          >
            {/* Contact Info Column */}
            <motion.div variants={itemVariants} className="space-y-12">
              <div>
                <h2 className="type-h2 text-txt mb-8">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-accent shrink-0 border border-gray-100">
                      <FiMail size={24} />
                    </div>
                    <div>
                      <h4 className="type-h6 font-bold text-txt">Email Us</h4>
                      <p className="type-p text-paragraph text-sm">support@rentfriend.com</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-accent shrink-0 border border-gray-100">
                      <FiPhone size={24} />
                    </div>
                    <div>
                      <h4 className="type-h6 font-bold text-txt">Call Us</h4>
                      <p className="type-p text-paragraph text-sm">+880 1234-567890</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-accent shrink-0 border border-gray-100">
                      <FiMapPin size={24} />
                    </div>
                    <div>
                      <h4 className="type-h6 font-bold text-txt">Visit Our Office</h4>
                      <p className="type-p text-paragraph text-sm">Rajshahi, Bangladesh</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-accent shrink-0 border border-gray-100">
                      <FiClock size={24} />
                    </div>
                    <div>
                      <h4 className="type-h6 font-bold text-txt">Working Hours</h4>
                      <p className="type-p text-paragraph text-sm">Mon - Fri: 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Badge (Added for Trust) */}
              <div className="bg-secondary/50 border border-accent/20 rounded-2xl p-6">
                <h4 className="type-h6 font-bold text-txt mb-2">Verified Support</h4>
                <p className="text-sm text-paragraph leading-relaxed">
                  All inquiries are handled by our locally-based support team to ensure the highest level of trust and security for our community.
                </p>
              </div>
            </motion.div>

            {/* Contact Form Column */}
            <motion.div variants={itemVariants}>
              <div className="bg-white rounded-[32px] border border-gray-100 p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.03)]">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="type-small font-bold text-txt">Full Name</label>
                      <input 
                        type="text" 
                        placeholder="John Doe"
                        className="w-full bg-secondary px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-accent outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="type-small font-bold text-txt">Email Address</label>
                      <input 
                        type="email" 
                        placeholder="john@example.com"
                        className="w-full bg-secondary px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-accent outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="type-small font-bold text-txt">Subject</label>
                    <input 
                      type="text" 
                      placeholder="How can we help?"
                      className="w-full bg-secondary px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-accent outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="type-small font-bold text-txt">Message</label>
                    <textarea 
                      rows="5" 
                      placeholder="Write your message here..."
                      className="w-full bg-secondary px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-accent outline-none resize-none"
                    ></textarea>
                  </div>

                  <button className="w-full bg-accent hover:opacity-90 transition-all text-txt type-p font-bold py-4 rounded-xl shadow-md flex items-center justify-center gap-2">
                    Send Message <FiSend />
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;