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

function App() {
  return (
    <>
      <ScrollToTop /> 

      <Routes>
        {/* ============================================================
            GROUP A: Pages WITH Navbar & Footer 
            (Wrapped in <Layout> so they look like the rest of the site)
            ============================================================ */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/browse" element={<Layout><Browse /></Layout>} />
        <Route path="/how-it-works" element={<Layout><HowItWorks /></Layout>} />
        <Route path="/list-item" element={<Layout><ListAnItem /></Layout>} />
        <Route path="/faqs" element={<Layout><FAQs /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        
        {/*Security Pages */}
        <Route path="/terms-of-service" element={<Layout><Terms /></Layout>} />
        <Route path="/privacy-policy" element={<Layout><Policy /></Layout>} />
        <Route path="/lender-verification" element={<Layout><LenderVerification /></Layout>} />


        {/* ============================================================
            GROUP B: Pages WITHOUT Navbar & Footer
            (Standalone pages like Login/Signup/Forms)
            ============================================================ */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
      </Routes>
    </>
  );
}

export default App;