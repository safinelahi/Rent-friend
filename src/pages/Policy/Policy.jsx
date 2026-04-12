import React from 'react';
import { motion } from 'framer-motion';

const Policy = () => {
  return (
    <div className="w-full bg-primary min-h-screen overflow-hidden">
      
      {/* Page Container */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-16 md:py-24">
        
        {/* Animated Content Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl mx-auto bg-white rounded-[24px] border border-gray-100 p-6 md:p-12 lg:p-16 shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
        >
          
          {/* Header */}
          <div className="text-center mb-12 border-b border-gray-100 pb-8">
            <h1 className="type-h1 text-txt mb-4">Privacy Policy</h1>
            <p className="text-sm md:text-base text-gray-400 font-medium">
              Last Updated: October 25, 2025
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            
            {/* Section 1 */}
            <section>
              <h2 className="type-h3 text-txt mb-4">1. Introduction</h2>
              <p className="type-p text-paragraph leading-relaxed">
                Welcome to RentFriend. We respect your privacy and are committed to protecting your personal data. This Privacy Policy will inform you as to how we look after your personal data when you visit our website and use our platform, and tell you about your privacy rights and how the law protects you.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="type-h3 text-txt mb-4">2. The Data We Collect About You</h2>
              <p className="type-p text-paragraph leading-relaxed mb-4">
                We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
              </p>
              <ul className="list-disc pl-5 type-p text-paragraph space-y-2 marker:text-accent">
                <li><strong className="text-txt">Identity Data:</strong> includes first name, last name, username or similar identifier, and government-issued ID for verification purposes.</li>
                <li><strong className="text-txt">Contact Data:</strong> includes billing address, delivery address, email address, and telephone numbers.</li>
                <li><strong className="text-txt">Financial Data:</strong> includes bank account and payment card details (processed securely via our payment partners).</li>
                <li><strong className="text-txt">Transaction Data:</strong> includes details about payments to and from you and other details of items you have rented or listed on our platform.</li>
                <li><strong className="text-txt">Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="type-h3 text-txt mb-4">3. How We Use Your Personal Data</h2>
              <p className="type-p text-paragraph leading-relaxed mb-4">
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
              </p>
              <ul className="list-disc pl-5 type-p text-paragraph space-y-2 marker:text-accent">
                <li>To register you as a new user and verify your identity.</li>
                <li>To process and facilitate rental transactions between users.</li>
                <li>To manage our relationship with you, including notifying you about changes to our terms or privacy policy.</li>
                <li>To improve our website, products/services, marketing, customer relationships and experiences.</li>
                <li>To prevent fraud, maintain platform safety, and resolve disputes.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="type-h3 text-txt mb-4">4. Disclosures of Your Personal Data</h2>
              <p className="type-p text-paragraph leading-relaxed">
                To facilitate the rental process, we must share limited personal data (such as your first name and general location) with the other party in a transaction (the renter or the lender). We may also share your data with third-party service providers who assist us in operating our platform, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="type-h3 text-txt mb-4">5. Data Security</h2>
              <p className="type-p text-paragraph leading-relaxed">
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="type-h3 text-txt mb-4">6. Your Legal Rights</h2>
              <p className="type-p text-paragraph leading-relaxed mb-4">
                Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
              </p>
              <ul className="list-disc pl-5 type-p text-paragraph space-y-2 marker:text-accent">
                <li>Request access to your personal data.</li>
                <li>Request correction of your personal data.</li>
                <li>Request erasure of your personal data.</li>
                <li>Object to processing of your personal data.</li>
                <li>Request restriction of processing your personal data.</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="type-h3 text-txt mb-4">7. Contact Us</h2>
              <p className="type-p text-paragraph leading-relaxed">
                If you have any questions about this Privacy Policy or our privacy practices, please contact our support team at:
              </p>
              <div className="mt-4 bg-secondary p-4 rounded-xl border border-gray-100 inline-block">
                <p className="type-h6 text-txt font-semibold">RentFriend Support Team</p>
                <a href="mailto:privacy@rentfriend.com" className="text-accent hover:underline font-medium">
                  privacy@rentfriend.com
                </a>
              </div>
            </section>

          </div>
        </motion.div>
        
      </div>
    </div>
  );
};

export default Policy;