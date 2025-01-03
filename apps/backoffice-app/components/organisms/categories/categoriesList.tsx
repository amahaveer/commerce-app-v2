'use client';
import CustomButton from '@/components/atoms/Button';
import {
  eSwitchIcons,
  ISwitchViewerData
} from '@/components/molecules/viewSwitcher/type';
import { AccountTree as AccountTreeIcon } from '@mui/icons-material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HeightSharpIcon from '@mui/icons-material/HeightSharp';
import { Box, Typography } from '@mui/material';
import { getDummyData } from 'app/api/categories.api';
import useTranslate from 'hooks/useTranslate';
import { useRouter } from 'next/navigation';
import { ICategoryTableProps } from 'types/category.type';
import { getCategorySearchOptions } from 'utils/category';
import ListTemplate from '../ListTemplate';

const switchViewData: ISwitchViewerData[] = [
  { name: 'code', icon: eSwitchIcons.CODE },
  { name: 'search', icon: eSwitchIcons.SEARCH }
];

const CategoriesList = (props: ICategoryTableProps) => {
  const { columns } = props;
  const router = useRouter();
  const { translate } = useTranslate();

  const onClickSwitchIcon = (item: ISwitchViewerData) =>
    router.push('/categories/search');

  const onClickSearchIcon = () => { };

  const onSelectSearchField = () => { };

  const options = getCategorySearchOptions();

  const onClickRow = (row: any) => {
    router.push(`/categories/2342`);
  };

  return (
    <Box>
      <ListTemplate>
        <>
          <ListTemplate.Header
            title={translate('categories.title')}
            switcherIcons={{
              data: switchViewData,
              onSelect: onClickSwitchIcon
            }}
          />
          <Box className="h-[72vh] overflow-y-auto">
            <Box className="flex gap-2 flex-col my-8">
              <Typography className="font-semibold">
                {translate('categories.categoryPath')}
              </Typography>
              <Box className="flex gap-2 items-center">
                <CustomButton
                  icon={<AccountTreeIcon />}
                  title={translate('categories.mainCategories')}
                />
                <ArrowForwardIosIcon sx={{ fontSize: 15 }} />
                <CustomButton.Add
                  title={translate('categories.addCategory')}
                  onClick={() => {
                    router.push(`/categories/new`);
                  }}
                />
              </Box>
            </Box>

            <Box className="flex gap-2 items-baseline mb-3">
              <Typography>{translate('categories.mainCategories')}</Typography>
              <CustomButton
                icon={<HeightSharpIcon />}
                title={translate('categories.reOrder')}
              />
            </Box>

            <ListTemplate.MainContent
              dataTable={{
                columns: columns,
                rows: getDummyData(),
                disableRowSelectionOnClick: true,
                onRowClick: onClickRow
              }}
            />
          </Box>
        </>
      </ListTemplate>
    </Box>
  );
};

export default CategoriesList;
