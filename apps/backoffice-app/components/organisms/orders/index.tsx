'use client';
import { useProducts } from 'context/product';
import { getProductSearchOptions } from 'utils/product';
import { useRouter } from 'next/navigation';
import {
  eSwitchIcons,
  ISwitchViewerData
} from '@/components/molecules/viewSwitcher/type';
import ListTemplate from '../ListTemplate';
import { Box } from '@mui/material';
import useTranslate from 'hooks/useTranslate';
import { orderColumns } from './columns';
import { useOrders } from 'context/orders';
import { usePermissions } from 'context/permissions.context';
import { eOrderPermissions } from "@royalcyber/global-types/src/backoffice-types/permissions/orderPermissions.type"

const switchViewData: ISwitchViewerData[] = [
  { name: 'search', icon: eSwitchIcons.SEARCH },
  { name: 'code', icon: eSwitchIcons.CODE }
];

function OrdersComponent() {
  const { orders } = useOrders();
  const { hasPermission } = usePermissions();
  const options = getProductSearchOptions();
  const router = useRouter();
  const { translate } = useTranslate();

  const onClickSwitchIcon = (item: ISwitchViewerData) => {};
  const onClickAddProduct = () => router.push('/products/new');
  const onSelectView = () => {};
  const onClickSearchIcon = () => {};
  const onSelectSearchField = () => {};

  const onClickRow = (row: any) => {
    router.push(`/orders/${row.id}`);
  };

  return (
    <ListTemplate>
      <>
        <ListTemplate.Header
          title={translate('orders.orders')}
          totalCount={orders.length}
          switcherIcons={{ data: switchViewData, onSelect: onClickSwitchIcon }}
          addButton={
            hasPermission(eOrderPermissions.CREATE_ORDER)
              ? {
                  title: translate('orders.addOrder'),
                  onClick: onClickAddProduct
                }
              : undefined
          }
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
            filterPanelBtn={true}
          />
          <ListTemplate.SubContent
            actionDropdown={{
              options: [],
              placeholder: translate('common.actions')
            }}
          />
          <ListTemplate.MainContent
            dataTable={{
              columns: orderColumns,
              rows: orders.map((order) => ({
                ...order,
                id: order.orderId // Using orderId as the unique identifier
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

export default OrdersComponent;
