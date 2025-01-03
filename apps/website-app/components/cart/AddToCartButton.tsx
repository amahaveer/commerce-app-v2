'use client';
import React from 'react';
import { Button } from '../ui/button';
// import { cartService } from '@/lib/commerceTools/cartService';
// import { userService } from '@/lib/commerceTools/userService';
import { useCart } from '@/context/CartContext';



interface AddToCartButtonProps {
  sku: string;
  quantity: number;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  sku,
  quantity = 1,
}) => {
  const {handleAddToCart, loading: isLoading} =useCart()
  // const saveProductForLater = () => {
  //   localStorage.setItem('pendingCartItem', JSON.stringify({
  //     sku,
  //     quantity,
  //     returnUrl: window.location.pathname
  //   }));
  // };

  return (
    <Button 
      onClick={() => handleAddToCart({variant: {sku, count: quantity}})}
      disabled={isLoading}
      className="w-full bg-transparent text-[16px] text-[var(--tp-common-black)] text-center px-[30px] py-[9px] border border-[var(--tp-common-black)] hover:bg-[var(--tp-common-black)] hover:text-white font-medium h-[46] rounded-none"
    >
      {isLoading ? 'Adding to Cart...' : 'Add to Cart'}
    </Button>
  );
};

export default AddToCartButton;