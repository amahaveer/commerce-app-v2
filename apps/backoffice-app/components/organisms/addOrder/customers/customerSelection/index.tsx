import { Box, Typography } from '@mui/material';
import ListTemplate from '../../../ListTemplate';
import useTranslate from 'hooks/useTranslate';
import { useOrders } from 'context/orders';
import { getCustomerColumns } from './columns';
import { useLanguage } from 'context/language.context';
import { getCustomerSearchOptions } from 'utils/order';
import {  useState } from 'react';
import { ICustomerSelectionProps } from '../types';

const data = [
  { id: 1, number: "030000", firstName: "William", lastName: "John", email: "william@gmail.com" }
]
const CustomerSelection = (props: ICustomerSelectionProps) => {

  const { onSelectCustomer } = props;
  const { translate } = useTranslate();
  const { locale } = useLanguage()
  const { setMappedOrderData } = useOrders();
  const searchOptions = getCustomerSearchOptions(translate);
  const columns = getCustomerColumns(translate, locale)
  
  const [selectedSearchOption, setSelectedSearchOption] = useState(searchOptions[0].value)

  const onClickSearchIcon = () => {}

  return (
    <ListTemplate>
      <>
        <ListTemplate.Header
          title={translate('customers.customer')}
        />
        <Box>
          <Typography>{translate("orders.selectCustomerFromTheTableBelowThatMatchesChosenCurrency")}</Typography>
        </Box>
        <Box className="h-[72vh] overflow-y-auto flex flex-col gap-2">
          <ListTemplate.SubHeader
            searchBar={{
              placeholder: translate('orders.searchByCustomerEmailAddress'),
              onClickSearch: onClickSearchIcon
            }}
            fieldsDropdown={{
              options: searchOptions,
              defaultValue: selectedSearchOption,
              onSelect: (value) => setSelectedSearchOption(value),
            }}
          />
          <ListTemplate.MainContent
            dataTable={{
              columns: columns,
              rows: data,
              checkboxSelection: true,
              disableRowSelectionOnClick: true,
              onRowClick: (params) => onSelectCustomer({row: params.row})
            }}
          />
        </Box>
      </>
    </ListTemplate>
  );
}

export default CustomerSelection;