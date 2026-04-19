import { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiEye, FiEyeOff, FiUpload } from "react-icons/fi";
import { AppContext } from '../../context/AppContext';
import logo from '../../assets/logo 2.svg';

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AppContext);

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("renter");
  const [nidFront, setNidFront] = useState(null);
  const [nidBack, setNidBack] = useState(null);

  // Form Data State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleSignUp = (e) => {
    e.preventDefault();
    
    // Create the user object from form inputs
    const userData = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      role: role,
      avatar: formData.firstName.charAt(0)
    };

    login(userData); // Save to "Fake Database" (Local Storage)
    
    // Redirect logic: Go back to product if they came from one, otherwise go home
    const origin = location.state?.from || "/";
    navigate(origin);
  };

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-4 py-20 font-epilogue">
      <div className="bg-primary w-full max-w-[600px] rounded-[40px] shadow-[0_30px_80px_rgba(0,0,0,0.05)] p-8 md:p-14 border border-gray-100">
        
        <div className="text-center mb-10">
          <Link to="/" className="inline-block mb-6 hover:opacity-80 transition-opacity">
            <img src={logo} alt="Logo" className="h-10 mx-auto" />
          </Link>
          {/* Headline 2 from your typography system */}
          <h1 className="type-h2 text-txt mb-2 tracking-tight">Create Account</h1>
          <p className="type-small text-paragraph font-bold uppercase tracking-[0.2em]">
            Join as a <span className="text-accent">{role}</span>
          </p>
        </div>

        {/* ROLE TOGGLE - Matching the Login Page Pill Design */}
        <div className="flex bg-secondary p-1.5 rounded-2xl mb-10 border border-gray-100">
          <button
            type="button"
            onClick={() => setRole("renter")}
            className={`flex-1 py-4 rounded-xl type-small font-bold uppercase tracking-widest transition-all ${
              role === "renter" ? "bg-accent text-txt shadow-md" : "text-paragraph hover:text-txt"
            }`}
          >
            Renter
          </button>
          <button
            type="button"
            onClick={() => setRole("lender")}
            className={`flex-1 py-4 rounded-xl type-small font-bold uppercase tracking-widest transition-all ${
              role === "lender" ? "bg-accent text-txt shadow-md" : "text-paragraph hover:text-txt"
            }`}
          >
            Lender
          </button>
        </div>

        <form onSubmit={handleSignUp} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="type-small font-bold text-txt uppercase tracking-widest ml-1">First Name</label>
              <input 
                required
                type="text" 
                placeholder="First Name" 
                className="w-full bg-secondary text-txt type-p px-6 py-4 rounded-2xl border-none outline-none focus:ring-2 focus:ring-accent transition-all"
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
            </div>
            <div className="space-y-1.5">
              <label className="type-small font-bold text-txt uppercase tracking-widest ml-1">Last Name</label>
              <input 
                required
                type="text" 
                placeholder="Last Name" 
                className="w-full bg-secondary text-txt type-p px-6 py-4 rounded-2xl border-none outline-none focus:ring-2 focus:ring-accent transition-all"
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="type-small font-bold text-txt uppercase tracking-widest ml-1">Email Address</label>
            <input 
              required
              type="email" 
              placeholder="name@email.com" 
              className="w-full bg-secondary text-txt type-p px-6 py-4 rounded-2xl border-none outline-none focus:ring-2 focus:ring-accent transition-all"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="space-y-1.5">
            <label className="type-small font-bold text-txt uppercase tracking-widest ml-1">Secure Password</label>
            <div className="relative">
              <input 
                required
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                className="w-full bg-secondary text-txt type-p px-6 py-4 rounded-2xl border-none outline-none focus:ring-2 focus:ring-accent transition-all"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-6 top-1/2 -translate-y-1/2 text-paragraph hover:text-accent">
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          {role === "renter" && (
            <div className="pt-4 space-y-4">
              <p className="type-small font-bold text-paragraph uppercase tracking-widest ml-1">Identity Verification (NID)</p>
              <div className="grid grid-cols-2 gap-4">
                <label className={`border-2 border-dashed p-6 rounded-[24px] cursor-pointer flex flex-col items-center transition-all ${nidFront ? 'border-accent bg-accent/5' : 'border-gray-100 hover:border-accent'}`}>
                  <FiUpload className={nidFront ? 'text-accent' : 'text-gray-300'} size={24} />
                  <span className="type-small font-bold mt-2 text-txt uppercase truncate w-full text-center">
                    {nidFront ? nidFront.name : 'Front Side'}
                  </span>
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => setNidFront(e.target.files[0])} />
                </label>
                <label className={`border-2 border-dashed p-6 rounded-[24px] cursor-pointer flex flex-col items-center transition-all ${nidBack ? 'border-accent bg-accent/5' : 'border-gray-100 hover:border-accent'}`}>
                  <FiUpload className={nidBack ? 'text-accent' : 'text-gray-300'} size={24} />
                  <span className="type-small font-bold mt-2 text-txt uppercase truncate w-full text-center">
                    {nidBack ? nidBack.name : 'Back Side'}
                  </span>
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => setNidBack(e.target.files[0])} />
                </label>
              </div>
            </div>
          )}

          <button type="submit" className="w-full bg-accent text-txt type-p font-bold py-5 rounded-[20px] shadow-lg shadow-accent/10 hover:-translate-y-1 active:scale-95 transition-all uppercase tracking-widest mt-4">
            Create Account
          </button>
        </form>

        <p className="text-center mt-10 type-small text-paragraph font-bold uppercase tracking-widest">
          Already have an account? <Link to="/login" className="text-accent hover:underline ml-1">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;