import CustomFields from '@/components/organisms/addCustomer/customFields';
import CustomerGeneral from '@/components/organisms/addCustomer/general/customerGeneral';
import CustomerAddressInfo from '@/components/organisms/addCustomer/orders/addresses/customerAddress';
import AddCustomerSecurity from '@/components/organisms/addCustomer/security/addCustomerSecurity';

export const getStepList = () => [
  {
    path: '',
    label: 'Customer details',
    component: CustomerGeneral
  },
  {
    path: '',
    label: 'Security',
    component: AddCustomerSecurity
  },
  {
    path: '',
    label: 'Add custom fields',
    component: CustomFields,
  },
  {
    path: '',
    label: 'Add addresses',
    component: CustomerAddressInfo,
  }
];
