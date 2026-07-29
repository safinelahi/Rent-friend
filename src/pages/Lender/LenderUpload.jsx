import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FiUpload, FiCheckCircle, FiTag, FiDollarSign, 
  FiZap, FiCamera, FiMapPin, FiInfo, FiChevronLeft, FiPlus, FiTrash2, FiCalendar 
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { AppContext } from '../../context/AppContext';
import api from '../../api/axios';

const LenderUpload = () => {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [gearData, setGearData] = useState({
    title: '',
    category: 'Photography', // Changed to match Browse page defaults
    description: '',
    prices: { day1: '', day2: '', day7: '' },
    location: '',
    rules: ''
  });

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 3) {
      alert("Please upload exactly 3 clear photos.");
      return;
    }
    setImages([...images, ...files]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    if (images.length < 3) {
      alert("Please upload exactly 3 photos from different angles.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    images.forEach(img => formData.append('images', img));
    formData.append('title', gearData.title);
    formData.append('category', gearData.category);
    formData.append('description', gearData.description);
    formData.append('price', gearData.prices.day1); // Base daily rate
    formData.append('location', gearData.location);
    formData.append('rules', gearData.rules);

    try {
      const res = await api.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data.success) {
        navigate('/lender/my-listings');
      } else {
        setError(res.data.error || "Failed to list gear");
      }
    } catch (err) {
      console.error("Listing submission failed:", err);
      setError(err.response?.data?.error || "Error listing your gear. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFC] pt-24 pb-20 sm:pt-32 sm:pb-32 font-epilogue text-[#111] overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 sm:gap-3 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-paragraph/40 mb-8 sm:mb-10">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <span className="text-gray-200">/</span>
          <span className="text-txt">Lender Area</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6 sm:gap-8">
           <div className="max-w-2xl">
              <div className="bg-accent/10 text-accent px-4 py-1.5 rounded-full border border-accent/10 inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-widest mb-4 sm:mb-6">
                 <FiZap size={12}/> List New Item
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] sm:leading-[0.85]">List My Gear.</h1>
           </div>
           <div className="flex items-center gap-3 md:text-right">
              <div className="md:hidden w-10 h-10 bg-[#111] text-accent rounded-xl flex items-center justify-center text-sm font-black shadow-lg">
                {user?.name?.charAt(0) || 'L'}
              </div>
              <div className="hidden md:block">
                <p className="text-[10px] font-black text-paragraph/40 uppercase tracking-widest mb-1">Lender Profile</p>
                <span className="text-sm font-black">{user?.name || "Lender"}</span>
              </div>
              <div className="hidden md:flex w-10 h-10 bg-[#111] text-accent rounded-xl items-center justify-center text-sm font-black shadow-lg">
                {user?.name?.charAt(0) || 'L'}
              </div>
           </div>
        </div>

        <form onSubmit={handleFinalSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10">
          
          {/* Left side: Photos and details */}
          <div className="lg:col-span-7 space-y-8 sm:space-y-10">
            
            {/* 1. PHOTO GRID */}
            <div className="bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-10 md:p-12 border border-gray-50 shadow-sm">
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-paragraph mb-6 sm:mb-8 flex items-center gap-2">
                 <FiCamera className="text-accent"/> Verification Photos
               </h3>

               <div className="grid grid-cols-3 gap-3 sm:gap-4">
                  {[0, 1, 2].map((idx) => (
                    <div key={idx} className="relative aspect-square">
                      {images[idx] ? (
                        <div className="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden border border-gray-100 relative group">
                           <img src={URL.createObjectURL(images[idx])} className="w-full h-full object-cover" alt="Preview" />
                           <button type="button" onClick={() => removeImage(idx)} className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform">
                              <FiTrash2 size={12}/>
                           </button>
                        </div>
                      ) : (
                        <label className="w-full h-full rounded-xl sm:rounded-2xl border-2 border-dashed border-gray-100 bg-[#FBFBFA] flex flex-col items-center justify-center cursor-pointer hover:border-accent hover:bg-white transition-all active:scale-95">
                           <FiPlus size={20} className="text-gray-300 mb-1"/>
                           <span className="text-[7px] sm:text-[8px] font-black uppercase text-paragraph/40 text-center">Angle {idx + 1}</span>
                           <input type="file" className="hidden" onChange={handleImageUpload} />
                        </label>
                      )}
                    </div>
                  ))}
               </div>
                <p className="mt-6 text-[9px] font-bold text-paragraph/30 uppercase tracking-widest text-center">3 mandatory angles required for protection.</p>
            </div>

            {/* 2. SPECIFICATIONS */}
            <div className="bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-10 md:p-12 border border-gray-50 shadow-sm">
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-paragraph mb-8 sm:mb-10 flex items-center gap-2">
                 <FiTag className="text-accent"/> Asset Details
               </h3>
               <div className="space-y-8 sm:space-y-10">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-paragraph/40 tracking-widest ml-1">Product Title</label>
                    <input required type="text" placeholder="e.g. Sony A7IV Body Only" className="w-full text-xl sm:text-2xl font-black bg-transparent border-b border-gray-100 focus:border-accent outline-none pb-3 sm:pb-4 transition-all"
                      onChange={(e) => setGearData({...gearData, title: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-paragraph/40 tracking-widest ml-1">Condition Description</label>
                    <textarea rows="4" placeholder="Mention any technical specifics..." className="w-full bg-[#FBFBFA] rounded-xl sm:rounded-2xl p-5 sm:p-6 text-xs sm:text-sm font-medium outline-none border border-gray-50 focus:border-accent/30 transition-all resize-none"
                      onChange={(e) => setGearData({...gearData, description: e.target.value})} />
                  </div>
               </div>
            </div>
          </div>

          {/* Right side: Pricing and rules */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8 lg:sticky lg:top-32 h-fit">
            
            {/* 3. Pricing */}
            <div className="bg-[#111] text-white rounded-[28px] sm:rounded-[32px] p-8 sm:p-10 shadow-xl relative overflow-hidden">
               <div className="relative z-10">
                  <h3 className="text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-8 sm:mb-10">Pricing Plans</h3>
                  
                  <div className="space-y-4 sm:space-y-6">
                     {[
                       { id: 'day1', label: '1D', title: 'Base Day' },
                       { id: 'day2', label: '2D', title: 'Two Days' },
                       { id: 'day7', label: '7D', title: 'Full Week' }
                     ].map((tier) => (
                       <div key={tier.id} className="flex items-center justify-between bg-white/5 p-4 rounded-xl sm:rounded-2xl border border-white/5 group focus-within:border-accent/50 transition-all">
                          <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent text-[10px] font-black">{tier.label}</div>
                             <span className="text-[10px] font-black uppercase tracking-widest text-white/60">{tier.title}</span>
                          </div>
                          <div className="flex items-center gap-1 text-lg sm:text-xl font-black">
                             <span className="text-accent text-sm">৳</span>
                             <input required type="number" placeholder="00" className="bg-transparent w-16 sm:w-20 outline-none text-right placeholder:text-white/10" 
                               onChange={(e) => setGearData({...gearData, prices: {...gearData.prices, [tier.id]: e.target.value}})} />
                          </div>
                       </div>
                     ))}
                  </div>

                  <p className="mt-8 pt-6 border-t border-white/10 text-[8px] sm:text-[9px] font-medium text-white/30 uppercase tracking-widest leading-relaxed">
                    Week-long rates boost bookings by ~40% in Bangladesh.
                  </p>
               </div>
               <FiDollarSign className="absolute -right-10 -top-10 text-white/5 pointer-events-none" size={180} />
            </div>

            {/* 4. LOGISTICS */}
            <div className="bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 border border-gray-50 shadow-sm">
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-paragraph mb-6 sm:mb-8 flex items-center gap-2">
                 <FiMapPin className="text-accent"/> Meetup & Rules
               </h3>
               <div className="space-y-3 sm:space-y-4">
                  <div className="p-4 sm:p-5 bg-[#FBFBFA] rounded-xl sm:rounded-2xl border border-transparent focus-within:border-accent/20 transition-all">
                    <p className="text-[8px] font-black uppercase text-paragraph/40 tracking-widest mb-1">Handover Point</p>
                    <input type="text" placeholder="e.g. Dhanmondi, Lake" className="w-full bg-transparent font-black text-[11px] sm:text-xs outline-none"
                      onChange={(e) => setGearData({...gearData, location: e.target.value})} />
                  </div>
                  <div className="p-4 sm:p-5 bg-[#FBFBFA] rounded-xl sm:rounded-2xl border border-transparent focus-within:border-accent/20 transition-all">
                    <p className="text-[8px] font-black uppercase text-paragraph/40 tracking-widest mb-1">Custom Rules</p>
                    <input type="text" placeholder="e.g. Battery not included" className="w-full bg-transparent font-black text-[11px] sm:text-xs outline-none"
                      onChange={(e) => setGearData({...gearData, rules: e.target.value})} />
                  </div>
               </div>
            </div>

            {error && (
               <div className="bg-red-50 border border-red-200 text-red-500 rounded-2xl p-4 text-xs font-bold uppercase tracking-widest text-center mt-4">
                 {error}
               </div>
            )}

            <button 
               type="submit" 
               disabled={loading}
               className="w-full bg-accent text-txt py-5 sm:py-6 rounded-2xl sm:rounded-[24px] font-black uppercase tracking-[0.3em] text-[10px] sm:text-[11px] shadow-2xl shadow-accent/20 hover:-translate-y-1 active:scale-95 transition-all disabled:opacity-50 mt-4"
            >
               {loading ? "Listing Gear..." : "List My Gear Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LenderUpload;