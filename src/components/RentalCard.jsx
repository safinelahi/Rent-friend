import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { FiMapPin, FiArrowRight, FiHash } from 'react-icons/fi';

const RentalCard = ({ item }) => {
  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `http://localhost:5000${url}`;
  };

  return (
    <Link to={`/product/${item._id || item.id}`} className="group block h-full">
      <div className="bg-white border border-gray-100 rounded-[45px] p-5 hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] transition-all duration-700 h-full flex flex-col">
        
        {/* IMAGE HUB */}
        <div className="relative h-[260px] w-full overflow-hidden rounded-[35px] bg-[#F1F1F0]">
          <img 
            src={getImageUrl(item.image)} 
            alt={item.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out" 
          />
          
          {/* TOP BADGES */}
          <div className="absolute top-4 left-4 flex gap-2">
            {item.verified && (
              <span className="bg-accent text-txt text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-xl">
                Verified
              </span>
            )}
          </div>

          {/* NEW: CATEGORY OVERLAY BADGE */}
          <div className="absolute top-4 right-4">
            <span className="bg-white/90 backdrop-blur-md text-[#111] text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-sm">
              {item.category}
            </span>
          </div>
        </div>

        {/* CONTENT HUB */}
        <div className="flex flex-col flex-grow pt-8 px-2">
          {/* NEW: IDENTIFIER (SKU) DISPLAY */}
          <div className="flex items-center gap-1 text-[9px] font-bold text-paragraph/40 uppercase tracking-[0.2em] mb-2">
            <FiHash size={10} /> {item.identifier}
          </div>

          <h3 className="text-2xl font-black text-txt tracking-tighter leading-tight mb-4 group-hover:text-accent transition-colors line-clamp-1">
            {item.title}
          </h3>

          <div className="flex items-center gap-4 text-xs font-bold text-paragraph/60 mb-8">
            <div className="flex items-center gap-1.5">
              <FaStar className="text-accent" />
              <span className="text-txt">{item.rating}</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <FiMapPin className="text-accent" />
              <span className="truncate uppercase tracking-widest">{item.location}</span>
            </div>
          </div>

          {/* PRICE & ACTION */}
          <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
            <div>
              <span className="text-2xl font-black text-txt">৳{item.price}</span>
              <span className="text-[10px] font-black text-paragraph uppercase tracking-tighter ml-1">/ day</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#111] text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-txt transition-all duration-500 shadow-lg shadow-black/5">
              <FiArrowRight size={20} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RentalCard;