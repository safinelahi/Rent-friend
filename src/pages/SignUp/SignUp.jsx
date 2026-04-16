import { useState } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff, FiUser, FiTag, FiUpload, FiCheckCircle, FiCamera } from "react-icons/fi";
import logo from '../../assets/logo 2.svg';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("renter");

  // State to track if files are selected (for UI feedback)
  const [nidFront, setNidFront] = useState(null);
  const [nidBack, setNidBack] = useState(null);

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-4">
      <div className="bg-primary w-full max-w-[662px] rounded-2xl shadow-sm p-6 md:p-12 my-8">
        
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Link to="/">
              <img src={logo} alt="Logo" className="cursor-pointer" />
            </Link>
          </div>
          <h1 className="type-h2 text-txt mb-2 leading-tight">Create Account</h1>
          <p className="type-p text-paragraph text-sm font-medium">
            {role === "renter" ? "Complete your verification to start renting" : "Turn your items into extra income"}
          </p>
        </div>

        {/* ROLE SELECTION TOGGLE */}
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

        <form className="space-y-6">
          {/* ... (First Name, Last Name, Email, Password - same as before) ... */}
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

          {/* NID UPLOAD SECTION: Only visible for Renters */}
          {role === "renter" && (
            <div className="pt-4 space-y-4 animate-in fade-in duration-500">
              <div className="flex items-center gap-2 mb-2">
                <FiCheckCircle className="text-accent" />
                <label className="type-small font-bold text-txt">Identity Verification (NID)</label>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Front Page Upload */}
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-paragraph uppercase ml-1">Front Page</p>
                  <label className={`
                    relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-2xl cursor-pointer transition-all
                    ${nidFront ? 'border-accent bg-accent/5' : 'border-gray-200 hover:border-accent hover:bg-secondary'}
                  `}>
                    <FiUpload className={nidFront ? 'text-accent' : 'text-paragraph'} size={24} />
                    <span className="text-[11px] font-bold text-txt mt-2 text-center leading-tight">
                      {nidFront ? nidFront.name : 'Click to upload NID Front'}
                    </span>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*" 
                      onChange={(e) => setNidFront(e.target.files[0])} 
                    />
                  </label>
                </div>

                {/* Back Page Upload */}
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-paragraph uppercase ml-1">Back Page</p>
                  <label className={`
                    relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-2xl cursor-pointer transition-all
                    ${nidBack ? 'border-accent bg-accent/5' : 'border-gray-200 hover:border-accent hover:bg-secondary'}
                  `}>
                    <FiUpload className={nidBack ? 'text-accent' : 'text-paragraph'} size={24} />
                    <span className="text-[11px] font-bold text-txt mt-2 text-center leading-tight">
                      {nidBack ? nidBack.name : 'Click to upload NID Back'}
                    </span>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*" 
                      onChange={(e) => setNidBack(e.target.files[0])} 
                    />
                  </label>
                </div>
              </div>
              <p className="text-[10px] text-paragraph italic text-center">Supported formats: JPG, PNG. Max 5MB per file.</p>
            </div>
          )}

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

        {/* ... (Footer and Social Login - same as before) ... */}
        <p className="text-center mt-8 text-xs font-medium text-paragraph">
          Already have an account?{" "}
          <Link to="/login" className="text-accent font-bold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;