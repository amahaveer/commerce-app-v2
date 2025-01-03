'use client';
import { getDiscountCartData } from 'app/api/discount.api';
import React from 'react';
import { IDiscountTableProps } from 'types/discount.type';
import { Box } from '@mui/material';
import ListTemplate from '../ListTemplate';
import useTranslate from 'hooks/useTranslate';
import { getCartDiscountSearchOptions } from 'utils/discount';
import { useRouter } from 'next/navigation';

const CartDiscountListPage = (props: IDiscountTableProps) => {
  const { columns } = props;
  const cartDiscount = getDiscountCartData();
  const options = getCartDiscountSearchOptions();
  const { translate } = useTranslate();
  const router = useRouter();

  const onSelectView = () => {};
  const onClickCartDiscount = () => router.push('/discounts/carts/new');
  const onClickRow = (row: any) => {};
  const onClickSearchIcon = () => {};
  const onSelectSearchField = () => {};

  return (
    <ListTemplate>
      <>
        <div className="mb-10">
          <ListTemplate.Header
            title={translate('common.cartDiscount')}
            totalCount={3}
            addButton={{
              title: translate('common.addCartDiscount'),
              onClick: onClickCartDiscount
            }}
            viewsDropdown={{ options: [], onSelect: onSelectView }}
          />
        </div>
        <Box className="h-[72vh]">
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
          <Box className="pt-6">
            <ListTemplate.SubContent
              actionDropdown={{
                options: [],
                placeholder: translate('common.actions')
              }}
            />
          </Box>
          <ListTemplate.MainContent
            dataTable={{
              columns: columns,
              rows: cartDiscount,
              checkboxSelection: true,
              disableRowSelectionOnClick: true,
              onRowClick: onClickRow
            }}
          />
        </Box>
      </>
    </ListTemplate>
  );
};

export default CartDiscountListPage;
