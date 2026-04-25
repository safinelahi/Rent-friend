import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"; // IMPORTED GATEKEEPER

// --- PUBLIC PAGES ---
import Home from "./pages/Home/Home";
import Browse from "./pages/Browse/Browse";
import HowItWorks from "./pages/HowItWorks/HowItWorks";
import FAQs from "./pages/FAQs/FAQs";
import Contact from "./pages/Contact/Contact";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Checkout from "./pages/Checkout/Checkout";
import BookingSuccess from "./pages/BookingSuccess/BookingSuccess";

// --- LENDER PAGES ---
import LenderUpload from './pages/Lender/LenderUpload';
import LenderVerification from "./pages/Verification/LenderVerification";

// --- DASHBOARD & VERIFICATION PAGES ---
import RenterDashboard from "./pages/Dashboard/RenterDashboard"; 
import RenterVerification from './pages/Verification/RenterVerification';
import VerificationPending from './pages/Verification/VerificationPending';

// --- AUTH PAGES ---
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/Forgetpassword/ForgotPassword";

// --- LEGAL ---
import Terms from "./pages/Terms/Terms";
import Policy from "./pages/Policy/Policy";

function App() {
  return (
    <>
      <ScrollToTop /> 

      <Routes>
        {/* ============================================================
            1. PUBLIC ROUTES
            ============================================================ */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/browse" element={<Layout><Browse /></Layout>} />
        <Route path="/how-it-works" element={<Layout><HowItWorks /></Layout>} />
        
        {/* PROTECTED: Only Lenders can list items. Renters will see the "Upgrade" screen */}
        <Route 
          path="/lender/upload" 
          element={
            <ProtectedRoute requireLender={true}>
              <Layout><LenderUpload /></Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route path="/faqs" element={<Layout><FAQs /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        
        <Route path="/product/:id" element={<Layout><ProductDetails /></Layout>} />
        <Route path="/checkout/:id" element={<Layout><Checkout /></Layout>} />
        <Route path="/booking-success" element={<Layout><BookingSuccess /></Layout>} />

        <Route path="/terms-of-service" element={<Layout><Terms /></Layout>} />
        <Route path="/privacy-policy" element={<Layout><Policy /></Layout>} />


        {/* ============================================================
            2. APP CORE (Login Required)
            ============================================================ */}
        {/* Protected Dashboard: User must be logged in */}
        <Route 
          path="/dashboard/rentals" 
          element={
            <ProtectedRoute>
              <RenterDashboard />
            </ProtectedRoute>
          } 
        />

        <Route path="/verification-pending" element={<VerificationPending />} />
        <Route path="/renter-verification" element={<RenterVerification />} />
        
        {/* PROTECTED: Lender Verification requires Lender status first */}
        <Route 
          path="/lender-verification" 
          element={
            <ProtectedRoute requireLender={true}>
              <LenderVerification />
            </ProtectedRoute>
          } 
        />


        {/* ============================================================
            3. AUTHENTICATION
            ============================================================ */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
      </Routes>
    </>
  );
}

export default App;