'use client'
import CartPage from '@/components/cart/CartPage';
import { useCart } from '@/context/CartContext';
import React from 'react';


const Page = () => {
  const { lineItems, loading, error } = useCart();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!lineItems.length) {
    return <div>No cart found.</div>;
  }
  // console.log(`cart`,cart);
  
  // Destructure the cart response
  // const { lineItems } = cart;

  return (
    <div>
      <CartPage />
    </div>
  );
};

export default Page;
