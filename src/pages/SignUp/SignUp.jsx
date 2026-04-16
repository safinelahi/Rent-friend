import { useState } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff, FiUser, FiTag } from "react-icons/fi";
import logo from '../../assets/logo 2.svg';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("renter");

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-4">
      <div className="bg-primary w-full max-w-[662px] rounded-2xl shadow-sm p-6 md:p-12">
        
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Link to="/">
              <img src={logo} alt="Logo" className="cursor-pointer" />
            </Link>
          </div>
          <h1 className="type-h2 text-txt mb-2 leading-tight">Create Account</h1>
          <p className="type-p text-paragraph text-sm">
            {role === "renter" ? "Find what you need, when you need it" : "Turn your items into extra income"}
          </p>
        </div>

        {/* ROLE SELECTION TOGGLE: Fixed for Mobile */}
        <div className="flex bg-secondary p-1 rounded-xl mb-8 border border-gray-100">
          <button
            type="button"
            onClick={() => setRole("renter")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-2 rounded-lg transition-all font-bold text-sm ${
              role === "renter" ? "bg-accent text-txt shadow-sm" : "text-paragraph hover:text-txt"
            }`}
          >
            <FiUser size={18} className="shrink-0" />
            <span className="truncate">
              <span className="hidden sm:inline">Join as </span>Renter
            </span>
          </button>
          <button
            type="button"
            onClick={() => setRole("lender")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-2 rounded-lg transition-all font-bold text-sm ${
              role === "lender" ? "bg-accent text-txt shadow-sm" : "text-paragraph hover:text-txt"
            }`}
          >
            <FiTag size={18} className="shrink-0" />
            <span className="truncate">
              <span className="hidden sm:inline">Join as </span>Lender
            </span>
          </button>
        </div>

        <form className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="type-small font-bold text-txt">First Name</label>
              <input type="text" placeholder="first name" className="w-full bg-secondary text-txt type-small px-4 py-3.5 rounded-lg border-none focus:ring-2 focus:ring-accent outline-none" />
            </div>
            <div className="space-y-1.5">
              <label className="type-small font-bold text-txt">Last Name</label>
              <input type="text" placeholder="last name" className="w-full bg-secondary text-txt type-small px-4 py-3.5 rounded-lg border-none focus:ring-2 focus:ring-accent outline-none" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="type-small font-bold text-txt">Email Address</label>
            <input type="email" placeholder="your@gmail.com" className="w-full bg-secondary text-txt type-small px-4 py-3.5 rounded-lg border-none focus:ring-2 focus:ring-accent outline-none " />
          </div>

          <div className="space-y-1.5">
            <label className="type-small font-bold text-txt">Password</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} placeholder="password" className="w-full bg-secondary text-txt type-small px-4 py-3.5 rounded-lg border-none focus:ring-2 focus:ring-accent outline-none " />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-paragraph hover:text-txt">
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-start gap-3 pt-2">
            <div className="relative flex items-center justify-center ">
              <input type="checkbox" id="terms" className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-gray-300 transition-all checked:border-accent checked:bg-accent hover:border-accent" />
              <svg className="pointer-events-none absolute text-primary opacity-0 transition-opacity peer-checked:opacity-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" width="12" height="12">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <label htmlFor="terms" className="text-xs font-medium text-paragraph select-none leading-relaxed">
              I agree to the <Link to="/terms-of-service" className="text-accent font-bold hover:underline mx-1">Terms of Service</Link> and <Link to="/privacy-policy" className="text-accent font-bold hover:underline mx-1">Privacy Policy</Link>
            </label>
          </div>

          <button className="w-full bg-accent hover:opacity-95 transition-all text-txt type-p font-bold py-4 rounded-lg shadow-md mt-4">
            Create {role.charAt(0).toUpperCase() + role.slice(1)} Account
          </button>
        </form>

        <div className="relative flex py-8 items-center">
          <div className="flex-grow border-t border-gray-100"></div>
          <span className="flex-shrink-0 mx-4 type-small text-paragraph font-medium">or sign up with</span>
          <div className="flex-grow border-t border-gray-100"></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 border border-gray-200 hover:bg-secondary py-3.5 rounded-xl transition-all">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
               <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
               <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
               <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
               <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span className="text-xs font-bold text-txt">Google</span>
          </button>
          <button className="flex items-center justify-center gap-2 border border-gray-200 hover:bg-secondary py-3.5 rounded-xl transition-all">
             <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
             </svg>
            <span className="text-xs font-bold text-txt">Facebook</span>
          </button>
        </div>

        <p className="text-center mt-8 text-xs font-medium text-paragraph">
          Already have an account?{" "}
          <Link to="/login" className="text-accent font-bold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;