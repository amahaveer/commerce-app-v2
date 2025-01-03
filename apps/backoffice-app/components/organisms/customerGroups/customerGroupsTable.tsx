'use client';
import { Box } from '@mui/material';
import useTranslate from 'hooks/useTranslate';
import { useRouter } from 'next/navigation';
import { IProductTableProps } from 'types/product.type';
import ListTemplate from '../ListTemplate';

function CustomerGroupsTable(props: IProductTableProps) {
  const { columns } = props;
  const router = useRouter();
  const { translate } = useTranslate();

  const onClickAddCustomer = () => router.push('/customers/customer-groups/new/');

  const onClickRow = (row: any) => {
    // router.push(`/customers/${row.id}`);
  };

  const dummyData = [
    {
      id: 1,
      name: 'Group Name',
      key: 'Group Key',
      createdAt: new Date().toLocaleString(),
      lastModifiedAt: new Date().toLocaleString()
    }
  ]

  return (
    <ListTemplate>
      <>
        <ListTemplate.Header
          title={translate('customers.customerGroups')}
          totalCount={1}
          addButton={{
            title: translate('customers.addcustomerGroups'),
            onClick: onClickAddCustomer
          }}
        />
        <Box className="h-[72vh] overflow-y-auto mt-10">
          <ListTemplate.MainContent
            dataTable={{
              columns: columns,
              rows: dummyData,
              checkboxSelection: false,
              disableRowSelectionOnClick: true,
              onRowClick: onClickRow
            }}
          />
        </Box>
      </>
    </ListTemplate>
  );
}

export default CustomerGroupsTable;
