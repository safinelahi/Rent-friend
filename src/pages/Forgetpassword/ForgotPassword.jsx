import React from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import logo from "../../assets/logo 2.svg";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen bg-[#FDFDFC] flex flex-col items-center justify-center px-4">
      {/*Container */}
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100 w-full max-w-md text-center">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className="cursor-pointer"
            />
          </Link>
        </div>

        {/* Headings */}
        <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-2">
          Reset your password
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          Enter your email and we'll send you a reset link
        </p>

        {/* Form */}
        <form className="text-left flex flex-col gap-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-[#1A1A1A] mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="your@gmail.com"
              className="w-full bg-[#F9F9F9] border border-gray-200 text-gray-800 text-sm rounded-lg focus:ring-accent focus:border-accent block p-3 outline-none transition-all"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#FFB800] hover:bg-[#E5A600] text-[#1A1A1A] font-semibold rounded-lg text-sm px-5 py-3 text-center transition-colors mt-2"
          >
            Send Reset Link
          </button>
        </form>

        {/* Back Link */}
        <div className="mt-8">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#1A1A1A] font-medium text-sm transition-colors"
          >
            <FiArrowLeft size={16} />
            <span>Back to Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
