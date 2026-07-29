import { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiArrowRight, FiShield, FiZap, FiLock } from "react-icons/fi";
import { AppContext } from '../../context/AppContext';
import { motion } from 'framer-motion';
import logo from '../../assets/logo 2.svg';
import api from '../../api/axios';

const SignUp = () => {
  const navigate = useNavigate();
  const { login } = useContext(AppContext);

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("renter");
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await api.post('/auth/register', {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        role: role
      });

      if (res.data.success) {
        login(res.data.user, res.data.token);
        if (role === "lender") {
          navigate("/lender-verification");
        } else {
          navigate("/renter-verification");
        }
      } else {
        setError(res.data.error || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Registration failed. Please check your credentials.");
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
          <p className="text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-6">Join the Community</p>
          <h2 className="text-white text-7xl xl:text-8xl font-black tracking-tighter leading-[0.85] mb-8">
            Start <br /> <span className="text-accent">Sharing.</span>
          </h2>
          <p className="text-white/40 text-sm max-w-md font-medium leading-relaxed uppercase tracking-widest">
            The easiest way to rent and lend gear. <br /> Safe, fast, and easy for everyone.
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
        
        {/* Mobile Logo (Visible only on mobile) */}
        <div className="lg:hidden mb-12">
           <Link to="/">
             <img src={logo} alt="Logo" className="h-8" />
           </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="w-full max-w-[500px]"
        >
          <div className="mb-10 sm:mb-12 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tighter mb-3">Create Account.</h1>
            <p className="text-[10px] sm:text-xs font-bold text-paragraph uppercase tracking-widest mb-4">Choose how you want to join</p>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-500 rounded-2xl p-4 text-xs font-bold uppercase tracking-widest text-center mt-4">
                {error}
              </div>
            )}
          </div>

          {/* ROLE SELECTOR - Soft Radius */}
          <div className="flex bg-[#F8F8F7] p-1.5 rounded-[32px] mb-10 sm:mb-12 border border-gray-50">
            {["renter", "lender"].map((r) => (
              <button
                key={r} type="button" onClick={() => setRole(r)}
                className={`flex-1 py-4 sm:py-5 rounded-[28px] text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${
                  role === r ? "bg-white text-txt shadow-lg" : "text-paragraph hover:text-txt"
                }`}
              >
                {role === r && <FiZap className="text-accent animate-pulse" size={12} />} {r}
              </button>
            ))}
          </div>

          <form onSubmit={handleFinalSubmit} className="space-y-6 sm:space-y-8">
            {/* NAME GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-4">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.3em] ml-2 text-paragraph/60">First Name</label>
                <input required type="text" placeholder="John" className="w-full bg-[#F8F8F7] px-6 sm:px-8 py-4 sm:py-5 rounded-[24px] text-xs sm:text-sm font-bold outline-none focus:bg-white focus:ring-2 focus:ring-accent/20 transition-all border border-transparent focus:border-accent/10" onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.3em] ml-2 text-paragraph/60">Last Name</label>
                <input required type="text" placeholder="Doe" className="w-full bg-[#F8F8F7] px-6 sm:px-8 py-4 sm:py-5 rounded-[24px] text-xs sm:text-sm font-bold outline-none focus:bg-white focus:ring-2 focus:ring-accent/20 transition-all border border-transparent focus:border-accent/10" onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
              </div>
            </div>

            {/* EMAIL */}
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.3em] ml-2 text-paragraph/60">Email Address</label>
              <input required type="email" placeholder="name@email.com" className="w-full bg-[#F8F8F7] px-6 sm:px-8 py-4 sm:py-5 rounded-[24px] text-xs sm:text-sm font-bold outline-none focus:bg-white focus:ring-2 focus:ring-accent/20 transition-all border border-transparent focus:border-accent/10" onChange={(e) => setFormData({...formData, email: e.target.value})} />
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.3em] ml-2 text-paragraph/60">Password</label>
              <div className="relative">
                <input required type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full bg-[#F8F8F7] px-6 sm:px-8 py-4 sm:py-5 rounded-[24px] text-xs sm:text-sm font-bold outline-none focus:bg-white focus:ring-2 focus:ring-accent/20 transition-all border border-transparent focus:border-accent/10" onChange={(e) => setFormData({...formData, password: e.target.value})} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-6 sm:right-8 top-1/2 -translate-y-1/2 text-paragraph hover:text-accent transition-colors">
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-4 sm:pt-6">
              <button type="submit" disabled={loading} className="w-full bg-[#111] text-white py-5 sm:py-6 rounded-[32px] font-black uppercase tracking-[0.3em] text-[10px] sm:text-[11px] shadow-2xl hover:bg-black transition-all flex items-center justify-center gap-4 group active:scale-95 disabled:opacity-50">
                {loading ? "Creating..." : <>Create Account <FiArrowRight className="text-accent group-hover:translate-x-2 transition-transform" /></>}
              </button>
            </div>
          </form>

          {/* SIGN IN LINK */}
          <p className="text-center mt-10 sm:mt-12 text-[10px] font-black uppercase tracking-[0.3em] text-paragraph">
            Already have an account? <Link to="/login" className="text-accent hover:underline ml-1">Sign In</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;