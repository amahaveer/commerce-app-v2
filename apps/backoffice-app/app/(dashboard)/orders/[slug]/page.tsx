"use server"

import OrderDetailsComponent from '@/components/organisms/orderDetails';
import { OrdersProvider } from 'context/orders';
import { PermissionsProvider } from 'context/permissions.context';

const OrderDetailsPage = async ({ params }: any) => {

  const { slug } = params;

  return (
    <PermissionsProvider moduleName='orders'>
      <OrdersProvider orderId={slug} >
        <OrderDetailsComponent />
      </OrdersProvider>
    </PermissionsProvider>
  );
};

export default OrderDetailsPage;
