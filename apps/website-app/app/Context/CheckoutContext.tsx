'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

interface CheckoutContextProps {
  shippingDetails: ShippingDetails | null;
  billingDetails: BillingDetails | null;
  shippingCost: number;
  subtotal: number;
  total: number;
  discount: number | null;
  shippingMethod: string; // New state for shipping method
  setShippingDetails: (details: ShippingDetails) => void;
  setBillingDetails: (details: BillingDetails) => void;
  setShippingMethod: (method: string, cost: number) => void; // New setter
  setShippingCost: (cost: number) => void;
  setSubtotal: (amount: number) => void;
  setDiscount: (amount: number | null) => void;
  calculateTotal: (amount: number | null) => void;
}

  

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

const CheckoutContext = createContext<CheckoutContextProps | undefined>(undefined);

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
};

export const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails | null>(null);
  const [billingDetails, setBillingDetails] = useState<BillingDetails | null>(null);
  const [shippingCost, setShippingCost] = useState<number>(60);
  const [shippingMethod, setShippingMethod] = useState<string>('Delivery Today'); // Default shipping method
  const [subtotal, setSubtotal] = useState<number>(320);
  const [total, setTotal] = useState<number>(subtotal + shippingCost);
  const [discount, setDiscount] = useState<number | null>(null);

  // Automatically recalculate total whenever subtotal, shippingCost, or discount changes
  useEffect(() => {
    const discountValue = discount || 0;
    const newTotal = subtotal + shippingCost - discountValue;
    setTotal(newTotal < 0 ? 0 : newTotal);
  }, [subtotal, shippingCost, discount]);

  const handleShippingMethodChange = (method: string, cost: number) => {
    setShippingMethod(method);
    setShippingCost(cost);
  };
  const calculateTotal = () => {
    const discountValue = discount || 0;
    const newTotal = subtotal + shippingCost - discountValue;
    setTotal(newTotal < 0 ? 0 : newTotal);
  };

  return (
    <CheckoutContext.Provider
      value={{
        shippingDetails,
        billingDetails,
        shippingCost,
        subtotal,
        total,
        discount,
        shippingMethod,
        setShippingDetails,
        setBillingDetails,
        setShippingMethod: handleShippingMethodChange,
        setShippingCost,
        setSubtotal,
        setDiscount,
        calculateTotal,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};
