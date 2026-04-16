import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { FiMapPin, FiArrowRight } from 'react-icons/fi'; 

const RentalCard = ({ item }) => {
  return (
    <Link to={`/product/${item.id}`} className="block group h-full">
      <div className="bg-white border border-gray-100 rounded-[32px] p-4 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500 h-full flex flex-col">
        
        {/* IMAGE CONTAINER */}
        <div className="relative h-[220px] w-full overflow-hidden rounded-[24px] bg-gray-100">
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
          />
          
          {/* BADGES */}
          <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
            {item.verified && (
              <span className="bg-accent text-txt text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm uppercase tracking-wider">
                Verified
              </span>
            )}
            <span className="bg-white/90 backdrop-blur-sm text-txt text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm uppercase tracking-wider">
              {item.category}
            </span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex flex-col flex-grow pt-6 px-2">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-txt leading-tight group-hover:text-accent transition-colors line-clamp-1">
              {item.title}
            </h3>
          </div>

          <div className="flex items-center gap-4 text-sm text-paragraph mb-6">
            <div className="flex items-center gap-1.5">
              <FaStar className="text-accent" />
              <span className="font-bold text-txt">{item.rating}</span>
              <span className="text-paragraph/60 font-medium">({item.reviews})</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <FiMapPin className="text-paragraph/40" size={16} />
              <span className="truncate">{item.location}</span>
            </div>
          </div>

          {/* PRICE & BUTTON SECTION */}
          <div className="mt-auto">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-txt">৳{item.price}</span>
                <span className="text-paragraph/60 text-xs font-bold uppercase tracking-tighter">/ day</span>
              </div>
            </div>

            {/* THE "BOOK NOW" BUTTON (Styled Div) */}
            <div className="w-full bg-secondary group-hover:bg-accent py-4 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300">
              <span className="text-txt font-bold text-sm uppercase tracking-widest">Rent Now</span>
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RentalCard;