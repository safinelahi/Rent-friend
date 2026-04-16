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

// --- NEW PAGE IMPORT ---
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Checkout from "./pages/Checkout/Checkout";

function App() {
  return (
    <>
      {/* Making sure users always land at the top of the page on route changes */}
      <ScrollToTop /> 

      <Routes>
        {/* ==========================================
            Pages WITH Navbar & Footer 
            ========================================== */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/browse" element={<Layout><Browse /></Layout>} />
        <Route path="/how-it-works" element={<Layout><HowItWorks /></Layout>} />
        <Route path="/list-item" element={<Layout><ListAnItem /></Layout>} />
        <Route path="/faqs" element={<Layout><FAQs /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        
        {/* DYNAMIC PRODUCT PAGE:  */}
        <Route path="/product/:id" element={<Layout><ProductDetails /></Layout>} />
        <Route path="/checkout/:id" element={<Layout><Checkout /></Layout>} />
        
        {/* Security & Legal Stuff */}
        <Route path="/terms-of-service" element={<Layout><Terms /></Layout>} />
        <Route path="/privacy-policy" element={<Layout><Policy /></Layout>} />
        <Route path="/lender-verification" element={<Layout><LenderVerification /></Layout>} />


        {/* ==========================================
            Pages WITHOUT Navbar & Footer
            (Clean, distraction-free forms)
            ========================================== */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
      </Routes>
    </>
  );
}

export default App;