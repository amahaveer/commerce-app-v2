
// "use client";
// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { fetchCartById, updateCart, deleteCart, createCart } from '@/lib/commerceTools/cartService';
// import { Cart } from '@/components/types/cart';

// type CartItem = {
//   id: string; // Adjusted to match your API response
//   name: string;
//   price: number;
//   quantity: number;
//   images: string | any;
// };

// type CartContextType = {
//   cart: CartItem[];
//   setCart: React.Dispatch<React.SetStateAction<CartItem[]>>
//   subtotal: number;
//   shippingCost: number;
//   incrementQuantity: (id: string) => void; // Changed id type to string
//   decrementQuantity: (id: string) => void;
//   removeItem: (id: string) => void;
//   clearCart: () => void;
//   setShippingCost: (cost: number) => void;
//   createNewCart: (cartData: any) => Promise<void>;
//   updateExistingCart: (cartId: string, cartData: any) => Promise<void>;
//   deleteExistingCart: (cartId: string) => Promise<void>;
//   loading: boolean;
//   error: string | null;
//   token: string | null;
// };

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [shippingCost, setShippingCost] = useState<number>(20); 
//   const [cartId, setCartId] = useState<string>(process.env.NEXT_PUBLIC_CART_ID || '');
//   const [token, setToken] = useState<string>(process.env.NEXT_PUBLIC_API_TOKEN || '');
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     // Load initial data from the API
//     const fetchCartItems = async () => {
//       try {
//         const data = await fetchCartById(cartId, token);
//         console.log("Cart Data:", data);

//         // Adjusting the cart structure to match your API response
//         if (data?.lineItems) {
//           const cartItems = data.lineItems.map((item: any) => ({
//             id: item.id,
//             name: item.name,
//             price: item.price.amount,
//             quantity: item.quantity,
//             images: item.images[0]?.url || '', 
//           }));

//           setCart(cartItems);
//         } else {
//           throw new Error("Cart data not found");
//         }
//       } catch (error) {
//         console.error("Error loading cart:", error);
//       }
//     };

//     fetchCartItems();
//   }, [cartId, token]);

//   console.log("Cart Data context:", cart);
  
//   const incrementQuantity = (id: string) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//       )
//     );
//   };

//   const decrementQuantity = (id: string) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.id === id && item.quantity > 1
//           ? { ...item, quantity: item.quantity - 1 }
//           : item
//       )
//     );
//   };

//   const removeItem = (id: string) => {
//     setCart((prevCart) => prevCart.filter((item) => item.id !== id));
//   };

//   const clearCart = () => setCart([]);

//   const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

//   // Create a new cart
//   const createNewCart = async (cartData: any) => {
//     try {
//       const newCart = await createCart(cartData, token);
//       setCartId(newCart.id);
//       console.log("New cart created:", newCart);
//     } catch (error) {
//       console.error("Error creating new cart:", error);
//     }
//   };

//   // Update an existing cart
//   const updateExistingCart = async (cartId: string, cartData: any) => {
//     try {
//       const updatedCart = await updateCart(cartId, cartData, token);
//       console.log("Cart updated:", updatedCart);
//     } catch (error) {
//       console.error("Error updating cart:", error);
//     }
//   };

//   // Delete an existing cart
//   const deleteExistingCart = async (cartId: string) => {
//     try {
//       await deleteCart(cartId, token);
//       setCart([]); // Clear cart on deletion
//       console.log(`Deleted cart with ID: ${cartId}`);
//     } catch (error) {
//       console.error("Error deleting cart:", error);
//     }
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         setCart,
//         subtotal,
//         shippingCost,
//         incrementQuantity,
//         decrementQuantity,
//         removeItem,
//         clearCart,
//         setShippingCost,
//         createNewCart,
//         updateExistingCart,
//         deleteExistingCart,
//         loading,
//         error,
//         token
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// };

