"use client";

import { sdk } from '@royalcyber/unified-sdk';
import { AddCartItemPayload } from '@/sdk/composable-commerce/types/payloads/CartPayloads';
import { mapCTAddressToFormFields, mapToCTAdress } from '@/utils/address';
import { getFormattedPrice } from '@/utils/prices';
import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { LineItem } from '@royalcyber/global-types';
import Cookies from 'js-cookie';
import { Cart } from '@royalcyber/global-types';


type CartContextType = {
  cart: Cart | null;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  removeItem: (id: string) => void;
  loading: boolean;
  error: any
  cartCount: number
  setCart: (cart: Cart) => void
  subTotal?: number
  total?: number
  lineItems: LineItem[]
  shippingDetails: ShippingDetails | null;
  billingDetails: BillingDetails | null;
  setShippingDetails: (details: ShippingDetails) => void;
  setBillingDetails: (details: BillingDetails) => void;
  updateCart: (data: { billing?: any, shipping?: any, email?: string }) => any;
  orderCart:() => any;
  handleAddToCart:(data: AddCartItemPayload) => void
  getOrders: () => any;
};

interface ShippingDetails {
  firstName: string;
  lastName: string;
  streetAddress: string;
  city: string;
  zipCode: string;
  phone: string;
  email: string;
  orderNotes?: string;

}

interface BillingDetails {
  paymentMethod: 'credit' | 'cash';
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [sumPrice, setSumPrice] = useState<Cart['sum']>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails | null>(null);
  const [billingDetails, setBillingDetails] = useState<BillingDetails | null>(null);


  const subTotal = useMemo(() => {
    if (!sumPrice) {
      return 0;
    }
    if(sumPrice.centAmount){
      return getFormattedPrice(sumPrice.centAmount, sumPrice.fractionDigits)
    }
  }, [sumPrice])

  const total = useMemo(() => {
    if (!sumPrice) {
      return 0;
    }
    if(sumPrice.centAmount){
    return getFormattedPrice(sumPrice.centAmount, sumPrice.fractionDigits)
    }
  }, [sumPrice])

  const lineItems: LineItem[] = cart?.lineItems || [];

useEffect(() => {
    setLoading(true);
    const fetchCart = async () => {
      try {
        const cartData = await sdk.composableCommerce.cart.getCart()
        if(!cartData.isError){
          setCart(cartData.data);
          setSumPrice(cartData.data.sum);
          const shippingAddress = cartData.data.shippingAddress;
          if (shippingAddress) {
            setShippingDetails(mapCTAddressToFormFields(shippingAddress));
          }
        }
      } catch (err:any) {
        setLoading(false);
        setError(err.message || 'Error fetching cart');
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);


 const handleAddToCart = async (data: AddCartItemPayload) => {
    try {
      setLoading(true);
      // const isLoggedIn = await userService.isLoggedIn();
      // if (!isLoggedIn) {
      //   saveProductForLater();
      //   router.push('en/login');
      //   return;
      // }
      const cartId = Cookies.get('cartId');
      if (!cartId) {
        const cartData = await sdk.composableCommerce.cart.addItem(data)
        if(!cartData.isError){
        setCart(cartData.data)
        setSumPrice(cartData.data.sum);
        }
      }
      // await cartService.addLineItem(sku, quantity);
      // toast({
      //   title: "Success",
      //   description: `Product has been added to your cart`,
      //   variant: "default",
      // });
      // router.refresh();
    } catch (error) {
      // console.error('Error adding to cart:', error);
      // toast({
      //   title: "Error",
      //   description: "Failed to add item to cart. Please try again.",
      //   variant: "destructive",
      // });
    } finally {
      setLoading(false);
    }
  };

  // Function to handle incrementing or decrementing quantity
  const incrementQuantity = async (id: string) => {
    setLoading(true);
    const cartItem = (cart?.lineItems || []).filter((item) => item.lineItemId === id)
    setCart((prevCart: any) =>
      prevCart.lineItems.map((item: LineItem) =>
        item.lineItemId === id && item.count
          ? { ...item, count: Math.min(item.count + 1, 10) } // Limit to a maximum of 10
          : item
      )
    );
    if (cartItem.length && cartItem[0] && cartItem[0].count) {
      const cartData = await sdk.composableCommerce.cart.updateItem({ lineItem: { id, count: cartItem[0].count + 1 } })
      if(!cartData.isError){
    setCart(cartData.data);
    setSumPrice(cartData.data.sum)
      }
    setLoading(false);
    }

  };


  const decrementQuantity = async (id: string) => {
    setLoading(true);
    const cartItem = (cart?.lineItems || []).filter((item) => item.lineItemId === id)
    setCart((prevCart: any) =>
      prevCart.lineItems.map((item: LineItem) =>
        item.lineItemId === id && item?.count && item?.count > 1
          ? { ...item, count: item.count - 1 }
          : item
      )
    );

    if (cartItem.length && cartItem[0] && cartItem[0].count) {
      const cartData = await sdk.composableCommerce.cart.updateItem({ lineItem: { id, count: cartItem?.[0]?.count - 1 } })
      if(!cartData.isError){

      setCart(cartData.data);
      setSumPrice(cartData.data.sum)
      }
    }
  };

  // Remove item from Cart
  const removeItem = async (id: string) => {
    const updatedLineItems = cart?.lineItems?.filter((item) => item.lineItemId !== id)
    setCart((prevCart) => (prevCart && {...prevCart, lineItems: updatedLineItems}));
    const cartData = await sdk.composableCommerce.cart.removeItem({ lineItem: { id } })
    if(!cartData.isError){
    setCart(cartData.data);
    setSumPrice(cartData.data.sum)
    }
  };

  const updateCart = async({ billing, shipping, email }: { billing?: any, shipping?: any, email?: string }) => {
    const billingAddress = billing ? mapToCTAdress(billing) : undefined;
    const shippingAddress = shipping ? mapToCTAdress(shipping) : undefined;
    const payload: Record<string, any> = { billing: billingAddress, shipping: shippingAddress };
    if (email) {
      payload.account = { email };
    }
    await sdk.composableCommerce.cart.updateCart(payload)
  };

  const orderCart = async () => {
    const data = await sdk.composableCommerce.cart.checkout();
    return data;
  };

  const getOrders = async () => {
    const payload: Record<string, any> = { limit: 10 };
    return sdk.composableCommerce.cart.queryOrders(payload)
  };



  return (
    <CartContext.Provider
      value={{
        cart,
        lineItems,
        incrementQuantity,
        decrementQuantity,
        removeItem,
        loading,
        error,
        cartCount: lineItems.length,
        setCart,
        subTotal,
        total,
        shippingDetails,
        billingDetails,
        setBillingDetails,
        setShippingDetails,
        updateCart,
        orderCart,
        handleAddToCart,
        getOrders
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
