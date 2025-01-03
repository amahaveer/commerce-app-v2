import React from 'react';

interface Price {
  fractionDigits: number
  centAmount: number
  currencyCode: string
}

interface PriceDisplayProps {
  price: Price;
  discountedPrice?: Price;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({ price, discountedPrice }) => {

  // Format the original and discounted prices
  const originalPrice = price?.centAmount !== undefined
    ? (price?.centAmount / 100).toFixed(price.fractionDigits)
    : 'N/A';
  const salePrice = discountedPrice?.centAmount !== undefined
    ? (discountedPrice.centAmount / 100).toFixed(discountedPrice.fractionDigits)
    : 'N/A';

  const discountPriceExists = salePrice !== 'N/A';
  return (
    <div className="flex  items-baseline gap-3">
      <span className={` ${discountPriceExists ? 'text-gray-500 line-through text-xl' : 'font-bold text-black text-2xl'} `}>
        ${originalPrice}
      </span>
      {discountPriceExists && <span className="font-bold text-black text-2xl">
        ${salePrice}
      </span>}
    </div>
  );
};
export default PriceDisplay;
