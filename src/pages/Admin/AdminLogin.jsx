import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiArrowRight, FiShield, FiLock, FiZap, FiAlertCircle } from "react-icons/fi";
import { AppContext } from "../../context/AppContext";
import { motion } from "framer-motion";
import api from "../../api/axios";
import logo from "../../assets/logo 2.svg";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useContext(AppContext);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data.success) {
        const userObj = res.data.user;
        
        // Check if user is admin
        if (userObj.role !== 'admin') {
          setError("Access Denied: Admin role required.");
          setLoading(false);
          return;
        }

        login(userObj, res.data.token);
        navigate('/admin/dashboard');
      } else {
        setError(res.data.error || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center font-epilogue text-white overflow-hidden relative">
      {/* Decorative Grid BG & Radial Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[460px] bg-black border border-white/5 p-8 sm:p-12 rounded-[40px] shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative z-10"
      >
        <div className="text-center mb-10">
          <img src={logo} alt="Logo" className="h-8 mx-auto mb-8 invert grayscale brightness-200" />
          
          <div className="bg-accent/15 text-accent px-4 py-1.5 rounded-full border border-accent/20 inline-flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.3em] mb-4">
             <FiShield size={12} className="animate-pulse" /> Admin Portal
          </div>
          
          <h1 className="text-3xl font-black tracking-tighter uppercase leading-none mt-2">
            Admin Login.
          </h1>
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-2">
            Enter your admin email and password to log in
          </p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-950/40 border border-red-900/50 text-red-400 rounded-2xl p-4 text-[10px] font-black uppercase tracking-widest text-center mb-8 flex items-center justify-center gap-2"
          >
            <FiAlertCircle className="shrink-0 text-red-500" size={14} />
            <span>{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleAdminLogin} className="space-y-6 sm:space-y-8">
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.3em] ml-2 text-white/40">Admin Email</label>
            <input 
              required
              type="email" 
              placeholder="admin@domain.com" 
              className="w-full bg-[#111] text-white border border-white/5 px-6 py-4 rounded-[20px] text-xs font-bold outline-none focus:bg-[#1a1a1a] focus:border-accent/40 focus:ring-4 focus:ring-accent/5 transition-all placeholder-white/20" 
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.3em] ml-2 text-white/40">Password</label>
            <div className="relative">
              <input 
                required
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                className="w-full bg-[#111] text-white border border-white/5 px-6 py-4 rounded-[20px] text-xs font-bold outline-none focus:bg-[#1a1a1a] focus:border-accent/40 focus:ring-4 focus:ring-accent/5 transition-all placeholder-white/20" 
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-6 top-1/2 -translate-y-1/2 text-white/30 hover:text-accent transition-colors">
                {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-[#111] text-white border border-white/10 hover:bg-white hover:text-black hover:border-white py-5 rounded-[24px] font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl transition-all flex items-center justify-center gap-4 group active:scale-95 disabled:opacity-50"
            >
              {loading ? "Logging in..." : <>Log In <FiArrowRight className="text-accent group-hover:translate-x-2 transition-transform duration-300" /></>}
            </button>
          </div>
        </form>

        <p className="text-center mt-10 text-[8px] font-black uppercase tracking-[0.4em] text-white/20">
          Rent Friend Admin Panel
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
