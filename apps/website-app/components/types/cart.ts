

export type CartItem = {
    id: number;
    name: string;
    price: {
      amount: number; 
    };
    quantity: number;
    images: {
      url: string;
    }[];
  };
  
//   export type Cart = {
//     id: string;
//     lineItems: CartItem[];
//   };
  export interface Cart {
    id: string;
    lineItems: {
      id: number;
      name: string;
      price: { amount: number; currency: string };
      quantity: number;
      images: { url: string }[]; // Assuming images are an array of objects with url
    }[];
    // Add other cart-related fields as needed
  }
  
  export type ShippingOption = {
    label: string;
    value: string;
    cost: number;
  };
