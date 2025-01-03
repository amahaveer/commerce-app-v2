'use client';
import { ICategoryTableProps } from 'types/category.type';
import { getProductSearchOptions } from 'utils/product';
import { useRouter } from 'next/navigation';
import {
  eSwitchIcons,
  ISwitchViewerData
} from '@/components/molecules/viewSwitcher/type';
import ListTemplate from '../ListTemplate';
import { Box } from '@mui/material';
import useTranslate from 'hooks/useTranslate';
import { useCustomers } from 'context/customers';
import { getCategorySearchOptions } from 'utils/category';
import { getDummyData } from 'app/api/categories.api';
import CustomButton from '@/components/atoms/Button';
import { AccountTree as AccountTreeIcon } from '@mui/icons-material';

const switchViewData: ISwitchViewerData[] = [
  { name: 'code', icon: eSwitchIcons.CODE },
  { name: 'search', icon: eSwitchIcons.SEARCH }
];

const CategoryTable = (props: ICategoryTableProps) => {
  const { columns } = props;
  const router = useRouter();
  const { translate } = useTranslate();
  const onClickSwitchIcon = (item: ISwitchViewerData) =>
    router.push('/categories');
  const onClickSearchIcon = () => {};
  const onSelectSearchField = () => {};
  const options = getCategorySearchOptions();
  const onClickRow = (row: any) => {
    router.push(`/category/${row.id}`);
  };
  return (
    <ListTemplate>
      <>
        <ListTemplate.Header
          title={translate('categories.title')}
          totalCount={16}
          switcherIcons={{
            data: switchViewData,
            onSelect: onClickSwitchIcon
          }}
        />
        <Box className="h-[72vh] overflow-y-auto">
          <ListTemplate.SubHeader
            leftFilterPanelBtn={true}
            searchBar={{
              placeholder: translate('common.search'),
              onClickSearch: onClickSearchIcon
            }}
          />

          <Box className="flex gap-5 mb-4">
            <ListTemplate.SubContent
              actionDropdown={{
                options: [],
                placeholder: translate('common.importExport')
              }}
            />
            <ListTemplate.SubContent
              title="Sort By"
              actionDropdown={{
                options: [],
                placeholder: translate('common.categoryName')
              }}
            />
          </Box>

          <ListTemplate.MainContent
            dataTable={{
              columns: columns,
              rows: getDummyData(),
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

export default CategoryTable;
