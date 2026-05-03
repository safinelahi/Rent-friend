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
import PublicProfile from "./pages/Profile/PublicProfile";

// --- LENDER PAGES ---
import LenderUpload from "./pages/Lender/LenderUpload";
import LenderVerification from "./pages/Verification/LenderVerification";
import LenderDashboard from "./pages/Lender/LenderDashboard";
import LenderBookingManager from "./pages/Lender/LenderBookingManager";
import MyListings from "./pages/Lender/MyListings";
import LenderEarnings from "./pages/Lender/LenderEarnings";

// --- DASHBOARD & VERIFICATION PAGES ---
import RenterDashboard from "./pages/Dashboard/RenterDashboard";
import RenterVerification from "./pages/Verification/RenterVerification";
import VerificationPending from "./pages/Verification/VerificationPending";

// --- COMMUNICATION HUB ---
import SignalHub from "./pages/Messages/SignalHub";

// --- ADMIN PAGES (NEW) ---
import AdminDashboard from "./pages/Admin/AdminDashboard"; // The Oversight Hub
import VerificationCenter from "./pages/Admin/VerificationCenter"; // Flowchart: Admin Reviews NID
import EscrowControl from "./pages/Admin/EscrowControl"; // Flowchart: Payout Management
import ReturnAudit from "./pages/Admin/ReturnAudit";

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
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/browse"
          element={
            <Layout>
              <Browse />
            </Layout>
          }
        />
        <Route
          path="/how-it-works"
          element={
            <Layout>
              <HowItWorks />
            </Layout>
          }
        />
        <Route
          path="/faqs"
          element={
            <Layout>
              <FAQs />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout>
              <Contact />
            </Layout>
          }
        />
        <Route
          path="/product/:id"
          element={
            <Layout>
              <ProductDetails />
            </Layout>
          }
        />
        <Route
          path="/terms-of-service"
          element={
            <Layout>
              <Terms />
            </Layout>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <Layout>
              <Policy />
            </Layout>
          }
        />
        {/* Public Profile Route */}
        <Route
          path="/profile/:id"
          element={
            <Layout>
              <PublicProfile />
            </Layout>
          }
        />

        {/* ============================================================
            2. APP CORE (Login Required - Common)
            ============================================================ */}
        <Route
          path="/checkout/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <Checkout />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking-success"
          element={
            <ProtectedRoute>
              <Layout>
                <BookingSuccess />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/rentals"
          element={
            <ProtectedRoute>
              <RenterDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <Layout>
                <SignalHub />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Verification Paths */}
        <Route path="/verification-pending" element={<VerificationPending />} />
        <Route path="/renter-verification" element={<RenterVerification />} />
        <Route
          path="/lender-verification"
          element={
            <ProtectedRoute requireLender={true}>
              <LenderVerification />
            </ProtectedRoute>
          }
        />

        {/* ============================================================
            3. LENDER PROTOCOL (Lender Status Required)
            ============================================================ */}
        <Route
          path="/lender-dashboard"
          element={
            <ProtectedRoute requireLender={true}>
              <Layout>
                <LenderDashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/lender/upload"
          element={
            <ProtectedRoute requireLender={true}>
              <Layout>
                <LenderUpload />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/lender/bookings"
          element={
            <ProtectedRoute requireLender={true}>
              <Layout>
                <LenderBookingManager />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/lender/my-listings"
          element={
            <ProtectedRoute requireLender={true}>
              <Layout>
                <MyListings />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/lender/earnings"
          element={
            <ProtectedRoute requireLender={true}>
              <Layout>
                <LenderEarnings />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* ============================================================
            4. ADMIN PROTOCOL (Restricted Access)
            ============================================================ */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requireAdmin={true}>
              <Layout>
                <AdminDashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/verifications"
          element={
            <ProtectedRoute requireAdmin={true}>
              <Layout>
                <VerificationCenter />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/payouts"
          element={
            <ProtectedRoute requireAdmin={true}>
              <Layout>
                <EscrowControl />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/returns"
          element={
            <ProtectedRoute requireAdmin={true}>
              <Layout>
                <ReturnAudit />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* ============================================================
            5. AUTHENTICATION
            ============================================================ */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="*"
          element={
            <Layout>
              <div className="min-h-screen flex items-center justify-center font-black uppercase tracking-widest text-paragraph/20">
                404 | Protocol Not Found
              </div>
            </Layout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
