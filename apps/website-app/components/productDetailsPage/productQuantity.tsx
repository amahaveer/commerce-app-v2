import { useState } from "react";
import { Button } from "../ui/button";

const ProductQuantity=()=> {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((prevQty) => prevQty + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQty) => prevQty - 1);
    }
  };

  return (
    <div className="flex items-center ">
      <div className="w-[140px] flex items-center justify-center bg-[#f3f5f6]">
        <button
          onClick={handleDecrement}
          className="tp-cart-minus flex items-center justify-center  hover:bg-[#fff] hover:text-[var(--tp-customBlue-primary)] transition w-[24px] h-[24px] leading-[24px] text-center rounded-full ml-[15px] "
        >
          <i
            className="fa-solid fa-minus   b-customPurple"
            aria-hidden="true"
          ></i>
        </button>

        <input
          type="text"
          value={quantity}
          readOnly
          className="tp-cart-input w-12 text-center  mx-2 bg-[#f3f5f6] h-[47px] "
        />

        <button
          onClick={handleIncrement}
          className="tp-cart-plus flex items-center justify-center   hover:bg-[#fff] hover:text-[var(--tp-customBlue-primary)] transition w-[24px] h-[24px] leading-[24px] text-center rounded-full mr-[15px] "
        >
          <i className="fa-solid fa-plus " aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
}

export default ProductQuantity;
