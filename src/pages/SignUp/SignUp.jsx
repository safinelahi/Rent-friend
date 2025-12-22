import { useState } from "react";
import { Link } from "react-router-dom";
// Make sure you have installed react-icons: npm install react-icons
import { FiEye, FiEyeOff } from "react-icons/fi";
import logo from '../../assets/logo 2.svg';

const SignUp = () => {
  // State to handle password visibility
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-4">
      {/* Main Card */}
      <div className="bg-primary w-full max-w-[662px] rounded-2xl shadow-sm p-8 md:p-12">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Link to="/">
              <img 
                src={logo} 
                alt="Logo" 
                className="cursor-pointer" 
              />
            </Link>
          </div>
          <h1 className="type-h2 text-txt mb-2">Create Account</h1>
          <p className="type-p text-paragraph">Join the sharing economy today</p>
        </div>

        {/* Form Section */}
        <form className="space-y-5">
          {/* Name Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="type-small font-medium text-txt">First Name</label>
              <input
                type="text"
                placeholder="first name"
                className="w-full bg-secondary text-txt type-small px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-accent outline-none placeholder:text-paragraph/50"
              />
            </div>
            <div className="space-y-1.5">
              <label className="type-small font-medium text-txt">Last Name</label>
              <input
                type="text"
                placeholder="last name"
                className="w-full bg-secondary text-txt type-small px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-accent outline-none placeholder:text-paragraph/50"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="type-small font-medium text-txt">Email Address</label>
            <input
              type="email"
              placeholder="your@gmail.com"
              className="w-full bg-secondary text-txt type-small px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-accent outline-none "
            />
          </div>

          {/* Password Section */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="type-small font-medium text-txt">Password</label>
            </div>
            
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                className="w-full bg-secondary text-txt type-small px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-accent outline-none "
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-paragraph hover:text-txt transition-colors"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>

          {/*CIRCLE CHECKBOX START*/}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                id="terms"
                className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-gray-300 transition-all checked:border-accent checked:bg-accent hover:border-accent"
              />
              {/* Checkmark Icon  */}
              <svg
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-primary opacity-0 transition-opacity peer-checked:opacity-100"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="12"
                height="12"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            
            <label htmlFor="terms" className="type-small text-paragraph select-none pt-0.5">
              I agree to the <span className="text-accent cursor-pointer hover:underline mx-1">Terms of Service</span> 
              and 
              <span className="text-accent cursor-pointer hover:underline mx-1">Privacy Policy</span>
            </label>
          </div>

          {/* Submit Button */}
          <button className="w-full bg-accent hover:opacity-90 transition-opacity text-txt type-p font-semibold py-4 rounded-lg shadow-sm">
            Create Account
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex py-6 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink-0 mx-4 type-small text-paragraph">or sign up with</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 border border-gray-200 hover:bg-secondary transition-colors py-3 rounded-lg">
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
               <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
               <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
               <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
               <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span className="type-small font-medium text-txt leading-none pt-0.5">Google</span>
          </button>
          
          <button className="flex items-center justify-center gap-2 border border-gray-200 hover:bg-secondary transition-colors py-3 rounded-lg">
             <svg className="w-5 h-5 text-[#1877F2] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
             </svg>
            <span className="type-small font-medium text-txt leading-none pt-0.5">Facebook</span>
          </button>
        </div>

        {/* Footer */}
        <p className="text-center mt-8 type-small text-paragraph">
          Already have an account?{" "}
          <Link to="/login" className="text-accent font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;