import React from 'react'
import Invoice from '@/components/Invoice/Invoice';
import { OrderData } from '@/components/types/orderData';
import { useCheckout } from '@/app/Context/CheckoutContext';



// Sample Order Data (You can replace this with real props)
// const orderData = {
//     invoiceId: '1214',
//     orderDate: 'October 7, 2024',
//     customerName: 'TEST TEST',
//     customerAddress: 'TEST',
//     customerPhone: '22222222222',
//     items: [
//       {
//         id: 1,
//         name: 'Galaxy Android Tablet',
//         quantity: 1,
//         price: 320
//       }
//     ],
//     paymentMethod: 'CARD',
//     shippingCost: 60,
//     discount: 0,
//     totalAmount: 380
//   };



const page = ({slug} : any) => {
  return (
    <div>
   <Invoice />; 
    </div>
  )
}

export default page
