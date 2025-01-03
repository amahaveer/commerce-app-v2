import OrderCartItems from "@/components/organisms/addOrder/cartItems";
import OrderCustomerInfo from "@/components/organisms/addOrder/customers";
import GeneralOrderDetails from "@/components/organisms/addOrder/generalOrderDetails";
import ReviewOrder from "@/components/organisms/addOrder/review";
import OrderShippingMethod from "@/components/organisms/addOrder/shipping";


export const getStepList = () => [
    {
      path: '',
      label: 'Order details',
      component: GeneralOrderDetails
    },
    {
      path: '',
      label: 'Customer',
      component: OrderCustomerInfo
    },
    {
      path: '',
      label: 'Items',
      component: OrderCartItems
    },
    {
      path: '',
      label: 'Shipping',
      component: OrderShippingMethod
    },
    {
      path: '',
      label: 'Review',
      component: ReviewOrder
    },
  ];