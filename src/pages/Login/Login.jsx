import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiEye, FiEyeOff, FiArrowRight, FiShield, FiLock, FiZap } from "react-icons/fi";
import { AppContext } from "../../context/AppContext";
import { motion } from "framer-motion";
import logo from "../../assets/logo 2.svg";
import api from "../../api/axios";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AppContext);

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("renter");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data.success) {
        const userObj = res.data.user;
        if (userObj.role === 'admin') {
          setError("Access Denied: Please use the admin portal to log in.");
          setLoading(false);
          return;
        }
        if (userObj.role !== role) {
          setError(`Account is registered as a ${userObj.role.toUpperCase()}. Please check your role toggle.`);
          setLoading(false);
          return;
        }

        login(userObj, res.data.token);
        
        if (userObj.verificationStatus === 'pending_upload') {
          navigate(userObj.role === 'lender' ? '/lender-verification' : '/renter-verification');
        } else if (userObj.verificationStatus === 'pending_approval') {
          navigate('/verification-pending');
        } else {
          const origin = location.state?.from || "/";
          navigate(origin);
        }
      } else {
        setError(res.data.error || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFC] flex flex-col lg:flex-row font-epilogue overflow-x-hidden text-[#111]">
      
      {/* Left side info panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#111] p-16 xl:p-20 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-accent/15 via-transparent to-transparent opacity-60" />
        
        <Link to="/" className="relative z-10">
          <img src={logo} alt="Logo" className="h-10" />
        </Link>

        <div className="relative z-10">
          <p className="text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-6">Secure Login</p>
          <h2 className="text-white text-7xl xl:text-8xl font-black tracking-tighter leading-[0.85] mb-8">
            Log <br /> <span className="text-accent">In.</span>
          </h2>
          <p className="text-white/40 text-sm max-w-md font-medium leading-relaxed uppercase tracking-widest">
            Sign in to manage your active rentals, check earnings, and explore the catalog.
          </p>
        </div>

        <div className="flex gap-8 relative z-10">
          <div className="text-white/20 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
            <FiShield /> SECURE
          </div>
          <div className="text-white/20 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
            <FiLock /> SAFE
          </div>
        </div>
      </div>

      {/* Right side form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10 md:p-20 bg-white">
        
        {/* Mobile Logo Only */}
        <div className="lg:hidden mb-12">
           <Link to="/">
             <img src={logo} alt="Logo" className="h-8" />
           </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="w-full max-w-[460px]"
        >
          <div className="mb-10 sm:mb-12 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tighter mb-3">Welcome Back.</h1>
            <p className="text-[10px] sm:text-xs font-bold text-paragraph uppercase tracking-widest mb-4">Select your account type</p>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-500 rounded-2xl p-4 text-xs font-bold uppercase tracking-widest text-center mt-4">
                {error}
              </div>
            )}
          </div>

          {/* ROLE SWITCHER - Soft Radius */}
          <div className="flex bg-[#F8F8F7] p-1.5 rounded-[32px] mb-8 sm:mb-10 border border-gray-50">
            {["renter", "lender"].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 py-4 sm:py-5 rounded-[28px] text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${
                  role === r ? "bg-white text-txt shadow-lg" : "text-paragraph hover:text-txt"
                }`}
              >
                {role === r && <FiZap className="text-accent animate-pulse" size={12} />} {r}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-6 sm:space-y-8">
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.3em] ml-2 text-paragraph/60">Email Address</label>
              <input 
                required
                type="email" 
                placeholder="name@email.com" 
                className="w-full bg-[#F8F8F7] px-6 sm:px-8 py-4 sm:py-5 rounded-[24px] text-xs sm:text-sm font-bold outline-none focus:bg-white focus:ring-2 focus:ring-accent/20 transition-all border border-transparent focus:border-accent/10" 
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-2">
                <label className="text-[9px] font-black uppercase tracking-[0.3em] text-paragraph/60">Password</label>
                <Link to="/forgot-password" size={14} className="text-[9px] font-black text-accent uppercase tracking-widest hover:underline">Forgot Password?</Link>
              </div>
              <div className="relative">
                <input 
                  required
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  className="w-full bg-[#F8F8F7] px-6 sm:px-8 py-4 sm:py-5 rounded-[24px] text-xs sm:text-sm font-bold outline-none focus:bg-white focus:ring-2 focus:ring-accent/20 transition-all border border-transparent focus:border-accent/10" 
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-6 sm:right-8 top-1/2 -translate-y-1/2 text-paragraph hover:text-accent transition-colors">
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            <div className="pt-4 sm:pt-6">
              <button type="submit" disabled={loading} className="w-full bg-[#111] text-white py-5 sm:py-6 rounded-[32px] font-black uppercase tracking-[0.3em] text-[10px] sm:text-[11px] shadow-2xl hover:bg-black transition-all flex items-center justify-center gap-4 group active:scale-95 disabled:opacity-50">
                {loading ? "Signing In..." : <>Sign In <FiArrowRight className="text-accent group-hover:translate-x-2 transition-transform" /></>}
              </button>
            </div>
          </form>

          <p className="text-center mt-10 sm:mt-12 text-[10px] font-black uppercase tracking-[0.3em] text-paragraph">
            New to Rent Friend? <Link to="/signup" className="text-accent hover:underline ml-1">Create Account</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;