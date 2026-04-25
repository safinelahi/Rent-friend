import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FiUpload, FiCheckCircle, FiTag, FiDollarSign, 
  FiZap, FiCamera, FiMapPin, FiInfo, FiChevronLeft, FiPlus, FiTrash2, FiCalendar 
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { AppContext } from '../../context/AppContext';

const LenderUpload = () => {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
  const [images, setImages] = useState([]);

  // UPDATED: gearData now includes a pricing object for backend sync
  const [gearData, setGearData] = useState({
    title: '',
    category: 'Camera',
    description: '',
    prices: {
      day1: '',
      day2: '',
      day7: ''
    },
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

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (images.length < 3) {
      alert("Please upload 3 photos from different angles.");
      return;
    }
    // Final object for backend: gearData.prices will contain { day1, day2, day7 }
    console.log("Ready for Backend:", gearData);
    navigate('/dashboard/rentals'); 
  };

  return (
    <div className="min-h-screen bg-[#FDFDFC] pt-28 pb-32 font-epilogue text-[#111]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* --- BREADCRUMBS --- */}
        <nav className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-paragraph/40 mb-10">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <span className="text-gray-200">/</span>
          <span className="text-txt">Lender Studio</span>
        </nav>

        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
           <div className="max-w-2xl">
              <div className="bg-accent/10 text-accent px-4 py-1.5 rounded-full border border-accent/10 inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-widest mb-6">
                 <FiZap size={12}/> Asset Onboarding
              </div>
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85]">List My Gear.</h1>
           </div>
           <div className="hidden md:block text-right px-4">
              <p className="text-[10px] font-black text-paragraph/40 uppercase tracking-widest mb-2">Verified Owner</p>
              <div className="flex items-center gap-3 justify-end">
                <span className="text-sm font-black">{user?.name || "Professional Lender"}</span>
                <div className="w-8 h-8 bg-[#111] text-accent rounded-lg flex items-center justify-center text-xs font-black">
                  {user?.name?.charAt(0) || 'L'}
                </div>
              </div>
           </div>
        </div>

        <form onSubmit={handleFinalSubmit} className="grid lg:grid-cols-12 gap-10">
          
          {/* ================= LEFT: PHOTOS & SPECS ================= */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* 1. PHOTO GRID */}
            <div className="bg-white rounded-[32px] p-8 md:p-12 border border-gray-100 shadow-sm">
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-paragraph mb-8 flex items-center gap-2">
                 <FiCamera className="text-accent"/> Verification Photos
               </h3>

               <div className="grid grid-cols-3 gap-4">
                  {[0, 1, 2].map((idx) => (
                    <div key={idx} className="relative aspect-square">
                      {images[idx] ? (
                        <div className="w-full h-full rounded-2xl overflow-hidden border border-gray-100 relative group">
                           <img src={URL.createObjectURL(images[idx])} className="w-full h-full object-cover" alt="Preview" />
                           <button type="button" onClick={() => removeImage(idx)} className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                              <FiTrash2 size={12}/>
                           </button>
                        </div>
                      ) : (
                        <label className="w-full h-full rounded-2xl border-2 border-dashed border-gray-100 bg-[#FBFBFA] flex flex-col items-center justify-center cursor-pointer hover:border-accent hover:bg-accent/5 transition-all">
                           <FiPlus size={20} className="text-gray-300 mb-1"/>
                           <span className="text-[8px] font-black uppercase text-paragraph/40">Angle {idx + 1}</span>
                           <input type="file" className="hidden" onChange={handleImageUpload} />
                        </label>
                      )}
                    </div>
                  ))}
               </div>
            </div>

            {/* 2. SPECIFICATIONS */}
            <div className="bg-white rounded-[32px] p-8 md:p-12 border border-gray-100 shadow-sm">
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-paragraph mb-10 flex items-center gap-2">
                 <FiTag className="text-accent"/> Asset Details
               </h3>
               <div className="space-y-10">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-paragraph/40 tracking-widest ml-1">Product Title</label>
                    <input required type="text" placeholder="e.g. DJI Mavic 3 Pro Cine" className="w-full text-2xl font-black bg-transparent border-b border-gray-100 focus:border-accent outline-none pb-4 transition-all"
                      onChange={(e) => setGearData({...gearData, title: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-paragraph/40 tracking-widest ml-1">Condition Description</label>
                    <textarea rows="4" placeholder="Mention any scratches, lens mounts, or inclusions..." className="w-full bg-[#FBFBFA] rounded-2xl p-6 text-sm font-medium outline-none border border-gray-50 focus:border-accent/30 transition-all"
                      onChange={(e) => setGearData({...gearData, description: e.target.value})} />
                  </div>
               </div>
            </div>
          </div>

          {/* ================= RIGHT: TIERED PRICING & LOGISTICS ================= */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
            
            {/* 3. NEW: TIERED PRICING BENTO */}
            <div className="bg-[#111] text-white rounded-[32px] p-10 shadow-xl relative overflow-hidden">
               <div className="relative z-10">
                  <h3 className="text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-10">Economic Strategy</h3>
                  
                  <div className="space-y-6">
                     {/* 1 DAY */}
                     <div className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/5">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent text-[10px] font-black">1D</div>
                           <span className="text-[10px] font-black uppercase tracking-widest">Base Day</span>
                        </div>
                        <div className="flex items-center gap-1 text-xl font-black">
                           <span className="text-accent text-sm">৳</span>
                           <input required type="number" placeholder="00" className="bg-transparent w-20 outline-none text-right" 
                             onChange={(e) => setGearData({...gearData, prices: {...gearData.prices, day1: e.target.value}})} />
                        </div>
                     </div>

                     {/* 2 DAYS */}
                     <div className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/5">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent text-[10px] font-black">2D</div>
                           <span className="text-[10px] font-black uppercase tracking-widest">Two Days</span>
                        </div>
                        <div className="flex items-center gap-1 text-xl font-black">
                           <span className="text-accent text-sm">৳</span>
                           <input required type="number" placeholder="00" className="bg-transparent w-20 outline-none text-right" 
                             onChange={(e) => setGearData({...gearData, prices: {...gearData.prices, day2: e.target.value}})} />
                        </div>
                     </div>

                     {/* 7 DAYS */}
                     <div className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/5">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent text-[10px] font-black">7D</div>
                           <span className="text-[10px] font-black uppercase tracking-widest">Full Week</span>
                        </div>
                        <div className="flex items-center gap-1 text-xl font-black">
                           <span className="text-accent text-sm">৳</span>
                           <input required type="number" placeholder="00" className="bg-transparent w-20 outline-none text-right" 
                             onChange={(e) => setGearData({...gearData, prices: {...gearData.prices, day7: e.target.value}})} />
                        </div>
                     </div>
                  </div>

                  <p className="mt-8 pt-6 border-t border-white/10 text-[9px] font-medium text-white/40 uppercase tracking-widest leading-relaxed">
                    Setting competitive week-long rates increases your booking frequency by up to 40%.
                  </p>
               </div>
               <FiDollarSign className="absolute -right-10 -top-10 text-white/5" size={200} />
            </div>

            {/* 4. LOGISTICS */}
            <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm">
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-paragraph mb-8 flex items-center gap-2">
                 <FiMapPin className="text-accent"/> Meetup & Rules
               </h3>
               <div className="space-y-4">
                  <div className="p-5 bg-[#FBFBFA] rounded-2xl border border-transparent hover:border-accent/20 transition-all">
                    <p className="text-[8px] font-black uppercase text-paragraph/40 tracking-widest mb-1">Handover Point</p>
                    <input type="text" placeholder="e.g. Banani, Road 11" className="w-full bg-transparent font-black text-xs outline-none"
                      onChange={(e) => setGearData({...gearData, location: e.target.value})} />
                  </div>
                  <div className="p-5 bg-[#FBFBFA] rounded-2xl border border-transparent hover:border-accent/20 transition-all">
                    <p className="text-[8px] font-black uppercase text-paragraph/40 tracking-widest mb-1">Custom Rules</p>
                    <input type="text" placeholder="e.g. Memory card not included" className="w-full bg-transparent font-black text-xs outline-none"
                      onChange={(e) => setGearData({...gearData, rules: e.target.value})} />
                  </div>
               </div>
            </div>

            <button type="submit" className="w-full bg-accent text-txt py-6 rounded-[24px] font-black uppercase tracking-[0.3em] text-[11px] shadow-2xl shadow-accent/20 hover:-translate-y-1 active:scale-95 transition-all">
               List My Gear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LenderUpload;