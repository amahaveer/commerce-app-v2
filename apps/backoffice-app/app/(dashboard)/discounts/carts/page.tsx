import CartDiscountListPage from '@/components/organisms/cartDiscount/cartDiscountList';
import React from 'react';
import { discountCartColumns } from './column';

const CartDiscountList = () => {
  return <CartDiscountListPage columns={discountCartColumns} />;
};

export default CartDiscountList;
