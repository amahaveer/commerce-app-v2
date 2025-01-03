import React from 'react';
import Star from '../../app/icons/Star';

const productRating = () => {
  return (
    <div className="flex items-center ">
      <div className=" mr-[12px]">
        <span className='inline-block text-sm bg-customLightBlue text-customBlue bg-opacity-25 leading-none px-3 py-1'>In Stock</span>
      </div>
      <div className="flex items-center ">
        <div className="relative flex items-center">
          <div className="flex space-x-.8 mr-[11]">
            {/* Empty stars */}
            {[...Array(5)].map((_, index) => (
              <div className='w-4 h-4 text-[12px] text-[#cccccc]'>
             <Star  key={`empty-${index}`}/>
             </div>
            ))}
            {/* Filled stars */}
            {/* <span className="absolute left-0 flex overflow-hidden">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={`filled-${index}`}
                  className="w-4 h-4 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </span> */}
          </div>
        </div>
        <div className="ml-2 font-jost text-[14px] font-normal text-[var(--tp-text-body)] leading-[26px]">
          <span>(0 Reviews)</span>
        </div>
      </div>
    </div>
  );
};

export default productRating;
