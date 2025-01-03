import FilterDrawer from '@/components/atoms/FilterDrawer';
import { Box } from '@mui/material';
import ProductFilters from '@/components/organisms/products/filters';
import CustomerTable from '@/components/organisms/customers/customerTable';
import { customerColumns } from './column';

export default async function CustomerPage() {
  return (
    <Box className="flex ">
      <CustomerTable columns={customerColumns} />
    </Box>
  );
}
