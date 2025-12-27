import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { FiMapPin } from 'react-icons/fi';

const RentalCard = ({ item }) => {
  return (
    <Link to="/browse" className="block group h-full">
      {/* CARD CONTAINER: Added p-4 (16px) to create the white frame around the image */}
      <div className="bg-white border border-gray-100 rounded-[24px] p-4 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 h-full flex flex-col">
        
        {/* IMAGE CONTAINER */}
        <div className="relative h-[240px] w-full overflow-hidden rounded-[20px] bg-gray-100">
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
          
          {/* BADGES: Positioned Top-Left inside the image */}
          <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
            {item.verified && (
              <span className="bg-[#FFB800] text-[#1A1A1A] text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm">
                Verified
              </span>
            )}
            <span className="bg-white text-[#1A1A1A] text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm">
              {item.category}
            </span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex flex-col flex-grow pt-5 px-1">
          <h3 className="text-[20px] font-bold text-[#1A1A1A] mb-2 leading-tight group-hover:text-[#FFB800] transition-colors line-clamp-1">
            {item.title}
          </h3>

          <div className="flex items-center gap-4 text-[15px] text-gray-500 mb-5">
            <div className="flex items-center gap-1.5">
              <FaStar className="text-[#FFB800] text-sm" />
              <span className="font-bold text-[#1A1A1A]">{item.rating}</span>
              <span className="text-gray-400 font-normal">({item.reviews})</span>
            </div>
            <div className="flex items-center gap-1.5 truncate max-w-[140px]">
              <FiMapPin className="text-gray-400" size={16} />
              <span className="truncate font-normal">{item.location}</span>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="border-t border-gray-100 mb-4 mt-auto"></div>

          {/* PRICE */}
          <div className="flex items-baseline gap-1">
            <span className="text-[26px] font-bold text-[#1A1A1A]">৳{item.price}</span>
            <span className="text-gray-400 text-sm font-medium">/day</span>
          </div>
        </div>

      </div>
    </Link>
  );
};

export default RentalCard;