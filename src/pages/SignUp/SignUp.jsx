import { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiArrowRight, FiShield } from "react-icons/fi";
import { AppContext } from '../../context/AppContext';
import { motion } from 'framer-motion';
import logo from '../../assets/logo 2.svg';

const SignUp = () => {
  const navigate = useNavigate();
  const { login } = useContext(AppContext);

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("renter");
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    
    const newUser = { name: `${formData.firstName} ${formData.lastName}`, email: formData.email, role: role };
    login(newUser);

    // Simple routing: Lender goes to Selfie page, Renter goes to NID page
    if (role === "lender") {
      navigate("/lender-verification");
    } else {
      navigate("/renter-verification");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F7] flex flex-col lg:flex-row font-epilogue overflow-hidden">
      
      {/* LEFT SIDE: WELCOME SECTION */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#111] p-20 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent opacity-50" />
        
        <Link to="/">
          <img src={logo} alt="Logo" className="h-10 relative z-10" />
        </Link>

        <div className="relative z-10">
          <p className="text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-6">Welcome to RentFriend</p>
          <h2 className="text-white text-8xl font-black tracking-tighter leading-[0.85] mb-8">
            Start <br /> <span className="text-accent">Sharing.</span>
          </h2>
          <p className="text-white/40 text-sm max-w-md font-medium leading-relaxed">
            The easiest way to rent and lend gear. <br /> Safe, fast, and professional for everyone.
          </p>
        </div>

        <div className="flex gap-8 relative z-10">
          <div className="text-white/20 text-[10px] font-black uppercase tracking-widest">© 2026 RENTFRIEND</div>
          <div className="text-white/20 text-[10px] font-black uppercase tracking-widest">SECURE & PRIVATE</div>
        </div>
      </div>

      {/* RIGHT SIDE: SIGN UP FORM */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-20 bg-white">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-[500px]">
          
          <div className="mb-12">
            <h1 className="text-4xl font-black tracking-tighter mb-3">Create Account.</h1>
            <p className="text-xs font-bold text-paragraph uppercase tracking-widest">Choose how you want to join</p>
          </div>

          {/* ROLE SELECTOR */}
          <div className="flex bg-[#F1F1F0] p-1.5 rounded-[24px] mb-12 border border-gray-100">
            {["renter", "lender"].map((r) => (
              <button
                key={r} type="button" onClick={() => setRole(r)}
                className={`flex-1 py-5 rounded-[20px] text-[11px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${
                  role === r ? "bg-white text-txt shadow-[0_10px_30px_rgba(0,0,0,0.05)]" : "text-paragraph hover:text-txt"
                }`}
              >
                {role === r && <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />} {r}
              </button>
            ))}
          </div>

          <form onSubmit={handleFinalSubmit} className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.3em] ml-1 text-paragraph">First Name</label>
                <input required type="text" placeholder="John" className="w-full bg-[#F1F1F0] px-8 py-5 rounded-[24px] text-sm font-bold outline-none focus:ring-2 focus:ring-accent/20 transition-all" onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.3em] ml-1 text-paragraph">Last Name</label>
                <input required type="text" placeholder="Doe" className="w-full bg-[#F1F1F0] px-8 py-5 rounded-[24px] text-sm font-bold outline-none focus:ring-2 focus:ring-accent/20 transition-all" onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.3em] ml-1 text-paragraph">Email Address</label>
              <input required type="email" placeholder="name@email.com" className="w-full bg-[#F1F1F0] px-8 py-5 rounded-[24px] text-sm font-bold outline-none focus:ring-2 focus:ring-accent/20 transition-all" onChange={(e) => setFormData({...formData, email: e.target.value})} />
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.3em] ml-1 text-paragraph">Password</label>
              <div className="relative">
                <input required type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full bg-[#F1F1F0] px-8 py-5 rounded-[24px] text-sm font-bold outline-none focus:ring-2 focus:ring-accent/20 transition-all" onChange={(e) => setFormData({...formData, password: e.target.value})} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-8 top-1/2 -translate-y-1/2 text-paragraph hover:text-accent">
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            <div className="pt-4">
              {/* SIMPLE WORD: Create Account */}
              <button type="submit" className="w-full bg-[#111] text-white py-6 rounded-[28px] font-black uppercase tracking-[0.3em] text-[11px] shadow-2xl hover:bg-black transition-all flex items-center justify-center gap-4 group">
                Create Account <FiArrowRight className="text-accent group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </form>

          {/* SIMPLE WORD: Already have an account? */}
          <p className="text-center mt-12 text-[10px] font-black uppercase tracking-[0.3em] text-paragraph">
            Already have an account? <Link to="/login" className="text-accent hover:underline ml-1">Sign In</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;