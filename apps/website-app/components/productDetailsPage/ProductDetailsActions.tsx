import React from "react";
import CompareIcon from "../../app/icons/CompareIcon";
import WishlistIcon from "../../app/icons/WishlistIcon";
import AskQuestion from "../../app/icons/AskQuestion";
const ProductDetailsActions = () => {
  return (
    <div className="flex">
      <button
        type="button"
        className="flex items-center justify-center  text-sm font-normal text-[var(--tp-text-body)] hover:text-[var(--tp-customBlue-primary)]  focus:outline-none focus:ring focus:ring-gray-300 mr-[10px]"
      >
        <CompareIcon />
        Compare
      </button>

      <button
        type="button"
        className="flex items-center justify-center  text-sm font-normal text-[var(--tp-text-body)] hover:text-[var(--tp-customBlue-primary)]  focus:outline-none focus:ring focus:ring-gray-300 mr-[10px]"
      >
        <WishlistIcon />
        Add to Wishlist
      </button>
      <button
        type="button"
        className="flex items-center justify-center  text-sm font-normal text-[var(--tp-text-body)] hover:text-[var(--tp-customBlue-primary)]  focus:outline-none focus:ring focus:ring-gray-300 mr-[10px]"
      >
        <AskQuestion />
        Ask a question
      </button>
    </div>
  );
};

export default ProductDetailsActions;
