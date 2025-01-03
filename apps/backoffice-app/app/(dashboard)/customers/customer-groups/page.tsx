import CustomerGroupsTable from '@/components/organisms/customerGroups/customerGroupsTable';
import { Box } from '@mui/material';
import { customerGroupColumns } from './column';

export default async function CustomerPage() {
  return (
    <Box className="flex ">
      <CustomerGroupsTable columns={customerGroupColumns} />
    </Box>
  );
}
