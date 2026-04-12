import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Layout from "./components/Layout";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/Forgetpassword/ForgotPassword";
import { SpeedInsights } from "@vercel/speed-insights/react";

// --- IMPORT THE SCROLL COMPONENT ---
import ScrollToTop from "./components/ScrollToTop";

import Browse from "./pages/Browse/Browse";
import HowItWorks from "./pages/HowItWorks/HowItWorks";
import ListAnItem from "./pages/ListAnItem/ListAnItem";
import FAQs from "./pages/FAQs/FAQs";
import Terms from "./pages/Terms/Terms";
import Policy from "./pages/Policy/Policy";

function App() {
  return (
    <>
      <ScrollToTop /> 

      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/browse" element={<Layout><Browse /></Layout>} />
        <Route path="/how-it-works" element={<Layout><HowItWorks /></Layout>} />
        <Route path="/list-item" element={<Layout><ListAnItem /></Layout>} />
        <Route path="/faqs" element={<Layout><FAQs /></Layout>} />
        <Route path="/terms-of-service" element={<Layout><Terms /></Layout>} />
        <Route path="/privacy-policy" element={<Layout><Policy /></Layout>} />

        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>

      <SpeedInsights />
    </>
  );
}

export default App;