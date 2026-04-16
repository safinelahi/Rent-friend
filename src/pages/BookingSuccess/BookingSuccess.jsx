import React from 'react';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiHome, FiLayout, FiDownload, FiShield } from 'react-icons/fi';
import { motion } from 'framer-motion';
// We're using jsPDF for the client-side download logic
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const BookingSuccess = () => {
  // Generate a unique ID so the receipt looks official
  const bookingId = "RF-" + Math.random().toString(36).substr(2, 9).toUpperCase();

  // --- THE DOWNLOAD LOGIC ---
  const handleDownloadReceipt = () => {
    const doc = new jsPDF();

    // 1. Setup branding and header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(26, 26, 26); // Match our #1A1A1A color
    doc.text("RentFriend", 20, 20);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text("Official Rental Receipt", 150, 20);

    // 2. Transaction Details
    doc.setFontSize(12);
    doc.setTextColor(26, 26, 26);
    doc.text(`Booking ID: ${bookingId}`, 20, 40);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 47);
    doc.text(`Status: Payment in Escrow`, 20, 54);

    // 3. Price Table (This makes the PDF look professional)
    doc.autoTable({
      startY: 65,
      head: [['Description', 'Amount (BDT)']],
      body: [
        ['Rental Fee (3 Days)', '450.00'],
        ['Refundable Security Deposit', '1,500.00'],
        ['Platform Service Fee', '85.00'],
      ],
      foot: [['Total Paid', '৳2,035.00']],
      theme: 'grid',
      headStyles: { fillColor: [255, 184, 0], textColor: [26, 26, 26] }, // Our accent yellow
      footStyles: { fillColor: [245, 245, 245], textColor: [26, 26, 26], fontStyle: 'bold' }
    });

    // 4. Footer & Trust Promise (The 6-hour refund logic)
    const finalY = doc.lastAutoTable.finalY + 20;
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Important Notice:", 20, finalY);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    const splitText = doc.splitTextToSize(
      "Your security deposit is held in a secure escrow. Once the item is returned and verified, your refund will be processed back to your original payment method within 6 hours.", 
      170
    );
    doc.text(splitText, 20, finalY + 7);

    // Trigger the actual download
    doc.save(`RentFriend-Receipt-${bookingId}.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFC] pt-32 pb-20">
      <div className="max-w-[800px] mx-auto px-4 text-center">
        
        {/* Animated Success Icon */}
        <motion.div 
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="inline-flex items-center justify-center w-24 h-24 bg-green-50 text-green-500 rounded-full mb-8"
        >
          <FiCheckCircle size={48} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="type-h2 text-txt mb-4 font-black tracking-tight">Booking Request Sent!</h1>
          <p className="type-p text-paragraph mb-2 leading-relaxed">
            Great news! Your request has been sent to the lender. They usually respond within a few hours.
          </p>
          <p className="text-sm font-bold text-accent mb-10">Booking ID: {bookingId}</p>
        </motion.div>

        {/* --- TIMELINE SECTION --- */}
        <div className="bg-white border border-gray-100 rounded-[40px] p-8 md:p-12 shadow-[0_30px_60px_rgba(0,0,0,0.04)] text-left mb-12">
          <h3 className="type-h4 text-txt mb-8 font-bold">What happens next?</h3>
          
          <div className="space-y-8 relative">
            <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-50"></div>

            <div className="flex gap-6 relative z-10">
              <div className="w-6 h-6 rounded-full bg-accent flex-shrink-0 border-4 border-white shadow-sm"></div>
              <div>
                <h4 className="font-bold text-txt text-sm mb-1">Lender Approval</h4>
                <p className="text-xs text-paragraph leading-relaxed">
                  The owner will review your request. Once approved, your payment is safely held in our escrow.
                </p>
              </div>
            </div>

            <div className="flex gap-6 relative z-10">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex-shrink-0 border-4 border-white shadow-sm"></div>
              <div>
                <h4 className="font-bold text-txt text-sm mb-1">Meetup & Pickup</h4>
                <p className="text-xs text-paragraph leading-relaxed">
                  Coordinate the meetup via your dashboard. Inspect the item together before starting your rental.
                </p>
              </div>
            </div>

            <div className="flex gap-6 relative z-10">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex-shrink-0 border-4 border-white shadow-sm"></div>
              <div>
                <h4 className="font-bold text-txt text-sm mb-1">Safe Return & Refund</h4>
                <p className="text-xs text-paragraph leading-relaxed">
                  Return the item on time. Once confirmed, your <strong>security deposit</strong> is sent back within 6 hours.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-gray-50 flex items-center gap-4">
             <div className="p-3 bg-secondary rounded-xl text-accent"><FiShield size={20}/></div>
             <p className="text-[11px] text-paragraph leading-relaxed">
               Have questions? Our support team is here 24/7 to make sure everything goes perfectly. 
               <Link to="/contact" className="text-txt font-bold underline ml-1">Contact Support</Link>
             </p>
          </div>
        </div>

        {/* --- NAVIGATION --- */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Link 
            to="/dashboard/rentals" 
            className="w-full md:w-auto bg-accent text-txt font-bold px-10 py-5 rounded-2xl shadow-md flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
          >
            <FiLayout /> View My Rentals
          </Link>
          <Link 
            to="/" 
            className="w-full md:w-auto bg-secondary text-txt font-bold px-10 py-5 rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-all"
          >
            <FiHome /> Back to Home
          </Link>
        </div>

        {/* --- THE WORKING DOWNLOAD BUTTON --- */}
        <button 
          onClick={handleDownloadReceipt}
          className="mt-8 text-paragraph text-xs font-bold flex items-center gap-2 mx-auto hover:text-accent transition-colors group"
        >
          <FiDownload className="group-hover:translate-y-0.5 transition-transform" /> Save Receipt (PDF)
        </button>

      </div>
    </div>
  );
};

export default BookingSuccess;