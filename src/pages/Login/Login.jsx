import { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiEye, FiEyeOff, FiArrowRight, FiShield, FiLock } from "react-icons/fi";
import { AppContext } from "../../context/AppContext";
import { motion } from "framer-motion";
import logo from "../../assets/logo 2.svg";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AppContext);

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("renter");
  const [email, setEmail] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Simulate finding user.
    const mockUser = {
      name: "Safin Elahi", 
      email: email || "safin@dev.com",
      role: role,
    };

    login(mockUser);

    // Redirect to where they were going, or the home page
    const origin = location.state?.from || "/";
    navigate(origin);
  };

  return (
    <div className="min-h-screen bg-[#F8F8F7] flex flex-col lg:flex-row font-epilogue overflow-hidden">
      
      {/* LEFT SIDE: BRAND IMMERSION */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#111] p-20 flex-col justify-between relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-accent/15 via-transparent to-transparent opacity-60" />
        
        <Link to="/" className="relative z-10">
          <img src={logo} alt="Logo" className="h-10" />
        </Link>

        <div className="relative z-10">
          <p className="text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-6">Security Protocol</p>
          <h2 className="text-white text-8xl font-black tracking-tighter leading-[0.85] mb-8">
            Access <br /> <span className="text-accent">Studio.</span>
          </h2>
          <p className="text-white/40 text-sm max-w-md font-medium leading-relaxed">
            Sign in to manage your active gear sessions, <br /> check earnings, and explore the catalog.
          </p>
        </div>

        <div className="flex gap-8 relative z-10">
          <div className="text-white/20 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
            <FiShield /> SECURE SESSION
          </div>
          <div className="text-white/20 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
            <FiLock /> AES-256
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: LOGIN HUB */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-20 bg-white">
        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }} 
          className="w-full max-w-[460px]"
        >
          <div className="mb-12">
            <h1 className="text-4xl font-black tracking-tighter mb-3">Welcome Back.</h1>
            <p className="text-xs font-bold text-paragraph uppercase tracking-widest">Identify your session role</p>
          </div>

          {/* ROLE SWITCHER */}
          <div className="flex bg-[#F1F1F0] p-1.5 rounded-[24px] mb-10 border border-gray-100">
            {["renter", "lender"].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 py-5 rounded-[20px] text-[11px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${
                  role === r ? "bg-white text-txt shadow-[0_10px_30px_rgba(0,0,0,0.05)]" : "text-paragraph hover:text-txt"
                }`}
              >
                {role === r && <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />} {r}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.3em] ml-1 text-paragraph">Email Address</label>
              <input 
                required
                type="email" 
                placeholder="name@email.com" 
                className="w-full bg-[#F1F1F0] px-8 py-5 rounded-[24px] text-sm font-bold outline-none focus:ring-2 focus:ring-accent/20 transition-all" 
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[9px] font-black uppercase tracking-[0.3em] text-paragraph">Password</label>
                <Link to="/forgot-password" size={14} className="text-[9px] font-black text-accent uppercase tracking-widest hover:underline">Forgot Password?</Link>
              </div>
              <div className="relative">
                <input 
                  required
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  className="w-full bg-[#F1F1F0] px-8 py-5 rounded-[24px] text-sm font-bold outline-none focus:ring-2 focus:ring-accent/20 transition-all" 
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-8 top-1/2 -translate-y-1/2 text-paragraph hover:text-accent">
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            <div className="pt-4">
              <button type="submit" className="w-full bg-[#111] text-white py-6 rounded-[28px] font-black uppercase tracking-[0.3em] text-[11px] shadow-2xl hover:bg-black transition-all flex items-center justify-center gap-4 group active:scale-95">
                Sign In <FiArrowRight className="text-accent group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </form>

          <p className="text-center mt-12 text-[10px] font-black uppercase tracking-[0.3em] text-paragraph">
            New to the Studio? <Link to="/signup" className="text-accent hover:underline ml-1">Create Account</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;