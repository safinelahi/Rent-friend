import React from 'react';
import { motion } from 'framer-motion';

const Terms = () => {
  return (
    <div className="w-full bg-primary min-h-screen overflow-hidden">
      
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
            <h1 className="type-h1 text-txt mb-4">Terms of Service</h1>
            <p className="text-sm md:text-base text-gray-400 font-medium">
              Last Updated: April 13, 2026
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            
            {/* Section 1 */}
            <section>
              <h2 className="type-h3 text-txt mb-4">1. Agreement to Terms</h2>
              <p className="type-p text-paragraph leading-relaxed">
                By accessing or using RentFriend, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to all of these terms, do not use our platform. These terms constitute a legally binding agreement between you and RentFriend regarding your use of the service.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="type-h3 text-txt mb-4">2. Eligibility & Account</h2>
              <p className="type-p text-paragraph leading-relaxed mb-4">
                To use certain features of the platform, you must register for an account. By creating an account, you represent that:
              </p>
              <ul className="list-disc pl-5 type-p text-paragraph space-y-2 marker:text-accent">
                <li>You are at least 18 years of age.</li>
                <li>You will provide accurate, current, and complete information.</li>
                <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
                <li>You will notify us immediately of any unauthorized use of your account.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="type-h3 text-txt mb-4">3. Platform Rules for Lenders</h2>
              <p className="type-p text-paragraph leading-relaxed mb-4">
                When listing an item for rent, Lenders agree to:
              </p>
              <ul className="list-disc pl-5 type-p text-paragraph space-y-2 marker:text-accent">
                <li>Provide honest and accurate descriptions and photos of the item.</li>
                <li>Ensure the item is safe to use and functions as described.</li>
                <li>Honor the bookings made through the platform.</li>
                <li>Not list prohibited items (e.g., weapons, illegal substances, or hazardous materials).</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="type-h3 text-txt mb-4">4. Platform Rules for Renters</h2>
              <p className="type-p text-paragraph leading-relaxed mb-4">
                When borrowing an item, Renters agree to:
              </p>
              <ul className="list-disc pl-5 type-p text-paragraph space-y-2 marker:text-accent">
                <li>Treat the item with care and use it only for its intended purpose.</li>
                <li>Return the item on time and in the same condition it was received.</li>
                <li>Communicate honestly with the Lender regarding any issues or delays.</li>
                <li>Pay all applicable rental fees and security deposits.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="type-h3 text-txt mb-4">5. Fees and Payments</h2>
              <p className="type-p text-paragraph leading-relaxed">
                RentFriend charges a service fee for facilitating transactions. All payments are processed through our secure third-party payment gateway. By using the platform, you authorize us to charge your provided payment method for the rental amount, service fees, and any applicable security deposits or late return penalties.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="type-h3 text-txt mb-4">6. Damages and Disputes</h2>
              <p className="type-p text-paragraph leading-relaxed">
                If an item is returned damaged, the Renter may be charged for the cost of repair or replacement. RentFriend provides a mediation service to help resolve disputes between users, but users acknowledge that RentFriend is a marketplace platform and is not responsible for the individual actions of users or the specific condition of rented items.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="type-h3 text-txt mb-4">7. Termination</h2>
              <p className="type-p text-paragraph leading-relaxed">
                We reserve the right to suspend or terminate your account and access to the platform at our sole discretion, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users of the platform, us, or third parties, or for any other reason.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="type-h3 text-txt mb-4">8. Contact Information</h2>
              <p className="type-p text-paragraph leading-relaxed">
                Questions about the Terms of Service should be sent to us at:
              </p>
              <div className="mt-4 bg-secondary p-4 rounded-xl border border-gray-100 inline-block">
                <p className="type-h6 text-txt font-semibold">RentFriend Legal Department</p>
                <a href="mailto:legal@rentfriend.com" className="text-accent hover:underline font-medium">
                  legal@rentfriend.com
                </a>
              </div>
            </section>

          </div>
        </motion.div>
        
      </div>
    </div>
  );
};

export default Terms;