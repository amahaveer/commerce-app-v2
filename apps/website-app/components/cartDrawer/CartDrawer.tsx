// "use client";
 
// import React from 'react';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { Progress } from '@/components/ui/progress';
// // import { useCart } from '@/app/Context/CartContext';
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetClose,
// } from '@/components/ui/sheet';
// import Image from 'next/image';
 
// type CartDrawerProps = {
//   isOpen: boolean;
//   onClose: () => void;
// };
 
// const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
//   const { cart, subtotal, removeItem } = useCart();
//   const FREE_SHIPPING_THRESHOLD = 200;
//   const amountNeededForFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);
//   const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
 
//   return (
//     <Sheet open={isOpen} onOpenChange={onClose}>
//       <SheetContent side="right" className="w-80">
//         <SheetHeader>
//           <SheetTitle>Shopping Cart</SheetTitle>
//         </SheetHeader>
 
//         <div className="mt-4 mb-4">
//           <p className={`text-sm ${amountNeededForFreeShipping > 0 ? 'text-gray-600' : 'text-green-600'}`}>
//             {amountNeededForFreeShipping > 0
//               ? `Add $${amountNeededForFreeShipping.toFixed(2)} more to qualify for free shipping`
//               : "You have qualified for free shipping!"}
//           </p>
//           {/* Progress Bar */}
//           <Progress value={progress} className="mt-2" />
//         </div>
 
//         {cart.length > 0 ? (
//           <div className="mt-4">
//             {cart.map((item) => (
//               <div key={item.id} className="flex items-center justify-between mb-4">
//                 <div className="w-16 h-16">
//                   <Link href={`/product-details/${item.id}`}>
//                     <Image
//                       src={item.img}
//                       alt={item.name}
//                       width={64}
//                       height={64}
//                       className="object-cover rounded"
//                     />
//                   </Link>
//                 </div>
//                 <div className="flex-1 ml-4">
//                   <h5 className="text-sm font-semibold">
//                     <Link href={`/product-details/${item.id}`}>{item.name}</Link>
//                   </h5>
//                   <div className="text-sm">
//                     <span>${item.price.toFixed(2)}</span>
//                     <span className="ml-2">x{item.quantity}</span>
//                   </div>
//                 </div>
//                 <button
//                   className="text-red-500 hover:text-red-600 ml-2"
//                   onClick={() => removeItem(item.id)}
//                 >
//                   &times;
//                 </button>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center mt-8">
//             <Image
//               src="https://shofy-client.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fempty-cart.373610ed.png&w=384&q=75"
//               alt="empty-cart-img"
//               width={200}
//               height={150}
//               className="mx-auto"
//             />
//             <p className="mt-4">Your Cart is empty</p>
//             <Link href="/shop">
//               <Button className="mt-4 border border-black bg-gray-50 text-black hover:bg-black hover:text-white rounded-none">Go To Shop</Button>
//             </Link>
//             <hr />
//           </div>
//         )}
 
//         <div className="mt-6">
//           <div className="flex justify-between items-center mb-4">
//             <h4 className="text-md font-medium">Subtotal:</h4>
//             <span>${subtotal.toFixed(2)}</span>
//           </div>
//           <div className="flex flex-col">
//             <Link href="/cart">
//               <Button className="mb-2 w-full hover:bg-blue-600 rounded-none">View Cart</Button>
//             </Link>
//             <Link href="/checkout">
//               <Button variant="outline" className="w-full border-black hover:bg-blue-600 hover:text-white rounded-none">
//                 Checkout
//               </Button>
//             </Link>
//           </div>
//         </div>
 
//         <SheetClose asChild>
//           <button
//             onClick={onClose}
//             className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 focus:outline-none"
//           >
//             <span className="sr-only">Close</span>
//             &times;
//           </button>
//         </SheetClose>
//       </SheetContent>
//     </Sheet>
//   );
// };
 
// export default CartDrawer;
 
