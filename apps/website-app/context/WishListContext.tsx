"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';
import { sdk } from '@royalcyber/unified-sdk';
import { LineItem } from '@royalcyber/global-types';

type WishListContextType = {
  wishList: LineItem[];
  
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  removeItem: (id: string) => void;
  setLoading: Dispatch<SetStateAction<boolean>>
  loading: boolean
  wishListCount: number
};

const WishListContext = createContext<WishListContextType | undefined>(undefined);

export const WishListProvider = ({ children }: { children: ReactNode }) => {
  const [wishList, setWishList] = useState<LineItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);


  // Fetch initial wishlist items from JSON
  useEffect(() => {
    setLoading(true)
    const fetchWishListItems = async () => {
      try {
        const response = await sdk.composableCommerce.wishlist.getWishlist()
        if (response.isError) {
          throw new Error('Failed to fetch wishlist items');
        }
        setWishList(response.data.lineItems || []);
        setLoading(false)
      } catch (error) {
        console.error(error);
        setLoading(false)
      }
    };

    fetchWishListItems();
  }, []);

  // Function to handle incrementing or decrementing quantity
  const incrementQuantity = async(id: string) => {
    const wishListItem = wishList.filter((item) => item.lineItemId === id)
    setWishList((prevWishList) =>
      prevWishList.map((item) =>
        item.count && item.lineItemId === id 
          ? { ...item, count: Math.min(item.count + 1, 10) } // Limit to a maximum of 10
          : item
      )
    );
    if(wishListItem.length && wishListItem[0] && wishListItem[0].count){
     const response =  await sdk.composableCommerce.wishlist.updateItem({lineItem:{id }, count: wishListItem[0].count + 1})
  if(!response.isError){
    setWishList(response.data.lineItems || []);
  }
}
  };
  

  const decrementQuantity = async (id: string) => {
    const wishListItem = wishList.filter((item) => item.lineItemId === id) || []
    setWishList((prevWishList) =>
      prevWishList.map((item) =>
        item.count && item.lineItemId === id && item.count > 1 
          ? { ...item, count: item.count - 1 } 
          : item
      )
    );
    if(wishListItem.length && wishListItem[0] && wishListItem[0].count){
    const response = await sdk.composableCommerce.wishlist.updateItem({lineItem:{id }, count: wishListItem[0].count - 1})
  if(!response.isError){
    setWishList(response.data.lineItems || []);
  }
  }
  };

  // Remove item from wishlist
  const removeItem = async (id: string) => {
    setWishList((prevWishList) => prevWishList.filter((item) => item.lineItemId !== id));
    const response = await sdk.composableCommerce.wishlist.removeItem({lineItem:{id }})
    if(!response.isError){
      setWishList(response.data.lineItems || []);
    }
  };

  

  return (
    <WishListContext.Provider
      value={{
        wishList,
        incrementQuantity,
        decrementQuantity,
        removeItem,
        loading,
        wishListCount: wishList.length,
        setLoading
      }}
    >
      {children}
    </WishListContext.Provider>
  );
};

export const useWishList = () => {
  const context = useContext(WishListContext);
  if (!context) {
    throw new Error('useWishList must be used within a WishListProvider');
  }
  return context;
};
