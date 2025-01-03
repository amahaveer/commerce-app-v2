'use client';
import {
  eSwitchIcons,
  ISwitchViewerData
} from '@/components/molecules/viewSwitcher/type';
import { Box } from '@mui/material';
import { useCustomers } from 'context/customers';
import useTranslate from 'hooks/useTranslate';
import { useRouter } from 'next/navigation';
import { IProductTableProps } from 'types/product.type';
import { getProductSearchOptions } from 'utils/product';
import ListTemplate from '../ListTemplate';

const switchViewData: ISwitchViewerData[] = [
  { name: 'search', icon: eSwitchIcons.SEARCH },
  { name: 'code', icon: eSwitchIcons.CODE }
];

function CustomerTable(props: IProductTableProps) {
  const { columns } = props;
  const { customers } = useCustomers();
  const options = getProductSearchOptions();
  const router = useRouter();
  const { translate } = useTranslate();

  const onClickSwitchIcon = (item: ISwitchViewerData) => { };
  const onClickAddCustomer = () => router.push('/customers/new/');
  const onSelectView = () => { };
  const onClickSearchIcon = () => { };
  const onSelectSearchField = () => { };

  const onClickRow = (row: any) => {
    router.push(`/customers/${row.id}`);
  };

  console.log("customers", customers)

  return (
    <ListTemplate>
      <>
        <ListTemplate.Header
          title={translate('customers.customer')}
          totalCount={16}
          switcherIcons={{ data: switchViewData, onSelect: onClickSwitchIcon }}
          addButton={{
            title: translate('common.addNew'),
            onClick: onClickAddCustomer
          }}
          viewsDropdown={{ options: [], onSelect: onSelectView }}
        />
        <Box className="h-[72vh] overflow-y-auto">
          <ListTemplate.SubHeader
            searchBar={{
              placeholder: translate('common.search'),
              onClickSearch: onClickSearchIcon
            }}
            fieldsDropdown={{
              options: options,
              defaultValue: options[0].value,
              onSelect: onSelectSearchField
            }}
            leftFilterPanelBtn={true}
          />
          <ListTemplate.SubContent
            actionDropdown={{
              options: [],
              placeholder: translate('common.actions')
            }}
          />
          <ListTemplate.MainContent
            dataTable={{
              columns: columns,
              rows: customers?.map((customers) => ({
                ...customers,
                id: customers.accountId
              })),
              checkboxSelection: true,
              disableRowSelectionOnClick: true,
              onRowClick: onClickRow
            }}
          />
        </Box>
      </>
    </ListTemplate>
  );
}

export default CustomerTable;
