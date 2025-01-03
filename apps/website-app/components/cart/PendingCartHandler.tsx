'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cartService } from '@/lib/commerceTools/cartService';


const PendingCartHandler = () => {
  const router = useRouter();

  useEffect(() => {
    const handlePendingCartItem = async () => {
      const pendingItem = localStorage.getItem('pendingCartItem');
      
      if (!pendingItem) return;

      try {
        const { sku, quantity, productData, returnUrl } = JSON.parse(pendingItem);

        // Check if cart exists
        const cartExists = await cartService.checkCartExists();
        
        if (!cartExists) {
          await cartService.createCart();
        }

        // Add item to cart
        await cartService.addLineItem(sku, quantity);

        // toast({
        //   title: "Success",
        //   description: `${productData.name} has been added to your cart`,
        //   variant: "default",
        // });

        // Clear pending item
        localStorage.removeItem('pendingCartItem');
        
        // Navigate back to the product page or to cart
        if (returnUrl) {
          router.push(returnUrl);
        } else {
          router.push('/cart');
        }

      } catch (error) {
        console.error('Error handling pending cart item:', error);
        // toast({
        //   title: "Error",
        //   description: "Failed to add pending item to cart. Please try again.",
        //   variant: "destructive",
        // });
      }
    };

    handlePendingCartItem();
  }, [router]);

  return null;
};

export default PendingCartHandler;