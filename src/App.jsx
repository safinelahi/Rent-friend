import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Layout from "./components/Layout";

// Pages
import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/Forgetpassword/ForgotPassword";
import Browse from "./pages/Browse/Browse";
import HowItWorks from "./pages/HowItWorks/HowItWorks";
import ListAnItem from "./pages/ListAnItem/ListAnItem";
import FAQs from "./pages/FAQs/FAQs";
import Terms from "./pages/Terms/Terms";
import Policy from "./pages/Policy/Policy";
import Contact from "./pages/Contact/Contact";
import LenderVerification from "./pages/Verification/LenderVerification";

// --- NEW PAGE IMPORTS ---
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Checkout from "./pages/Checkout/Checkout";
import BookingSuccess from "./pages/BookingSuccess/BookingSuccess";
import RenterDashboard from "./pages/Dashboard/RenterDashboard"; // The new Dashboard!

function App() {
  return (
    <>
      {/* ScrollToTop ensures the user doesn't stay at the bottom when switching pages */}
      <ScrollToTop /> 

      <Routes>
        {/* ==========================================
            PUBLIC PAGES (With Navbar & Footer) 
            ========================================== */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/browse" element={<Layout><Browse /></Layout>} />
        <Route path="/how-it-works" element={<Layout><HowItWorks /></Layout>} />
        <Route path="/list-item" element={<Layout><ListAnItem /></Layout>} />
        <Route path="/faqs" element={<Layout><FAQs /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/booking-success" element={<Layout><BookingSuccess /></Layout>} />
        
        {/* Dynamic Product & Checkout Routes */}
        <Route path="/product/:id" element={<Layout><ProductDetails /></Layout>} />
        <Route path="/checkout/:id" element={<Layout><Checkout /></Layout>} />
        
        {/* Legal & Verification */}
        <Route path="/terms-of-service" element={<Layout><Terms /></Layout>} />
        <Route path="/privacy-policy" element={<Layout><Policy /></Layout>} />
        <Route path="/lender-verification" element={<Layout><LenderVerification /></Layout>} />


        {/* ==========================================
            DASHBOARD PAGES 
            (No standard Layout - uses its own Sidebar)
            ========================================== */}
        <Route path="/dashboard/rentals" element={<RenterDashboard />} />


        {/* ==========================================
            AUTH PAGES (Clean, no Navbar/Footer)
            ========================================== */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
      </Routes>
    </>
  );
}

export default App;