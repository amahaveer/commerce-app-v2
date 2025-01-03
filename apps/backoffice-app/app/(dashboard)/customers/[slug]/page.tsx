'use server'
import { CustomerProvider } from 'context/customers';
import CustomerDetails from '@/components/organisms/customerDetails';

const CustomerDetailsPage: React.FC = ({ params }: any) => {
  const { slug } = params;
  return (
    <CustomerProvider customerId={slug}>
      <CustomerDetails />
    </CustomerProvider>
  );
};

export default CustomerDetailsPage;
