import { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import { AppContext } from "../../context/AppContext";
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
    
    // Simulate finding user. In real life, this data comes from MongoDB.
    const mockUser = {
      name: "Safin Elahi", 
      email: email || "safin@dev.com",
      role: role,
      avatar: "S"
    };

    login(mockUser);

    // Redirect logic: Check if they were sent here from a specific product page
    const origin = location.state?.from || "/";
    navigate(origin);
  };

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-4 font-epilogue">
      <div className="bg-primary w-full max-w-[550px] rounded-[40px] shadow-[0_30px_80px_rgba(0,0,0,0.05)] p-8 md:p-14 border border-gray-100">
        
        <div className="text-center mb-10">
          <Link to="/" className="inline-block mb-6 hover:scale-105 transition-transform">
            <img src={logo} alt="Logo" className="h-10 mx-auto" />
          </Link>
          {/* Typography System: type-h2 */}
          <h1 className="type-h2 text-txt mb-2 tracking-tight">Welcome Back</h1>
          <p className="type-small text-paragraph font-bold uppercase tracking-[0.2em]">Secure Access Hub</p>
        </div>

        {/* ROLE TOGGLE - Matching SignUp Pill Style */}
        <div className="flex bg-secondary p-1.5 rounded-2xl mb-10 border border-gray-100">
          <button
            onClick={() => setRole("renter")}
            className={`flex-1 py-4 rounded-xl type-small font-bold uppercase tracking-widest transition-all ${
              role === "renter" ? "bg-accent text-txt shadow-md" : "text-paragraph hover:text-txt"
            }`}
          >
            Renter
          </button>
          <button
            onClick={() => setRole("lender")}
            className={`flex-1 py-4 rounded-xl type-small font-bold uppercase tracking-widest transition-all ${
              role === "lender" ? "bg-accent text-txt shadow-md" : "text-paragraph hover:text-txt"
            }`}
          >
            Lender
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-1.5">
            <label className="type-small font-bold text-txt uppercase tracking-widest ml-1">Email Address</label>
            <input 
              required
              type="email" 
              placeholder="name@email.com" 
              className="w-full bg-secondary text-txt type-p px-6 py-4 rounded-2xl border-none outline-none focus:ring-2 focus:ring-accent transition-all" 
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center px-1">
              <label className="type-small font-bold text-txt uppercase tracking-widest">Password</label>
              <Link to="/forgot-password" size={14} className="type-small font-bold text-accent uppercase tracking-widest hover:underline">Forgot?</Link>
            </div>
            <div className="relative">
              <input 
                required
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                className="w-full bg-secondary text-txt type-p px-6 py-4 rounded-2xl border-none outline-none focus:ring-2 focus:ring-accent transition-all" 
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-6 top-1/2 -translate-y-1/2 text-paragraph hover:text-accent">
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="w-full bg-txt text-primary type-p font-bold py-5 rounded-[20px] shadow-xl hover:bg-black transition-all flex items-center justify-center gap-3 group mt-4 active:scale-95">
            Sign In <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <p className="text-center mt-10 type-small text-paragraph font-bold uppercase tracking-widest">
          New here? <Link to="/signup" className="text-accent hover:underline ml-1">Create Account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;