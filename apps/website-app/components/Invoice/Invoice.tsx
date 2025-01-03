

'use client';

import React from 'react';
import { useCheckout } from '@/app/Context/CheckoutContext'; // Adjust the import path as per your file structure
import { OrderData } from '../types/orderData'; // Adjust the import path as per your file structure

const Invoice: React.FC = () => {
  // Use the checkout context
  const {
    shippingDetails,
    billingDetails,
    shippingCost,
    total,
    discount,
  } = useCheckout();

  // Prepare the order data
  const order: OrderData = {
      invoiceId: '12345', // Replace with a dynamic ID if necessary
      orderDate: new Date().toLocaleDateString(), // Set the current date
      customerName: `${shippingDetails?.firstName} ${shippingDetails?.lastName}`,
      customerAddress: `${shippingDetails?.streetAddress}, ${shippingDetails?.city}, ${shippingDetails?.zipCode}`,
      //   customerPhone: shippingDetails?.phone,
      items: [], // Populate this with the actual items data
      paymentMethod: billingDetails?.paymentMethod || 'Credit', // Use billing details if available
      shippingCost,
      discount: discount || 0, // Ensure discount is a number
      totalAmount: total,
      customerPhone: ''
  };

  console.log("invoiceData",order);

  return (
    <div className="invoice-container max-w-[70rem] mx-auto my-10 p-8 bg-[#ecf2f7]">
      {/* Invoice Header */}
      <div className="invoice-header mt-[20] mb-[20] text-left border-b border-b-[#fff] ">
        <div className="logo text-3xl font-bold mb-2">
          <img
            src="https://www.royalcyber.com/wp-content/uploads/2018/04/Royal-Cyber-Logo.svg"
            alt="logo"
            className="w-[190px] mx-auto md:mx-0"
          />
        </div>
        <div className='invoice-info flex justify-between  mt-4 mb-[20]'>
          <div className="font-normal text-[15px] text-[var(--tp-common-black)] text-center md:text-left">
            2879 Elk Creek Road, <br /> Stone Mountain, Georgia
          </div>
          <div className="font-bold text-[30px] text-[var(--tp-common-black)] text-center md:text-left">
            INVOICE
          </div>
        </div>
      </div>

      {/* Customer Information */}
      <div className="customer-info mb-8 ">
        <h2 className="font-bold text-lg">Customer Information</h2>
        <div className='invoice-info flex justify-between text-gray-600 mt-4'>
          <div className="customer-details text-gray-700">
            <p>{order.customerName}</p>
            <p>{order.customerAddress}</p>
            <p>{order.customerPhone}</p>
          </div>
          <div>
            <span>Invoice ID: <strong>#{order.invoiceId}</strong></span> <br />
            <span>Date: {order.orderDate}</span>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="order-items pr-10 pl-10 pb-8 pt-8 mb-8 bg-[#fff]">
        <table className="w-full text-left ">
          <thead className="bg-gray-100 border-b border-b-[#c6c7c8]">
            <tr>
              <th className="p-3 ">SL</th>
              <th className="p-3 ">Product Name</th>
              <th className="p-3 ">Quantity</th>
              <th className="p-3 ">Item Price</th>
              <th className="p-3 ">Amount</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr key={item.id} className="border-b border-b-[#c6c7c8]">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.quantity}</td>
                <td className="p-3">${item.price.toFixed(2)}</td>
                <td className="p-3">${(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payment Details */}
      <div className="payment-details grid grid-cols-1 md:grid-cols-4 gap-4 text-gray-700 pr-10 pl-10 pt-5 mb-8">
        <div>
          <p className="font-bold">Payment Method</p>
          <p>{order.paymentMethod}</p>
        </div>
        <div>
          <p className="font-bold">Shipping Cost</p>
          <p>${shippingCost.toFixed(2)}</p>
        </div>
        <div>
          <p className="font-bold">Discount</p>
          {/* <p>${discount.toFixed(2)}</p> */}
        </div>
        <div className="text-right">
          <p className="font-bold text-[var( --tp-common-black0]">Total Amount</p>
          <p className="font-bold text-xl text-red-600">${total.toFixed(2)}</p>
        </div>
      </div>

      {/* Print Button */}
      <div className="mt-8 text-right">
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200"
          onClick={() => window.print()}
        >
          Print
        </button>
      </div>
    </div>
  );
};

export default Invoice;


