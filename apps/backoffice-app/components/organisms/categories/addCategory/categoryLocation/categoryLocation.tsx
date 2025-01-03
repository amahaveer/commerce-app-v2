import React, { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import useTranslate from 'hooks/useTranslate';
import SearchBar from '@/components/atoms/SearchBar';
import DataTable from '@/components/atoms/DataTable';
import {
  getCategoryLocationColumns,
  getCategoryLocationRows,
  SubCategoryRow
} from './column';
import SubCategory from './subCategory';
import SaveToolbar from '@/components/molecules/SaveToolBar';
import { GridRowSelectionModel } from '@mui/x-data-grid';
import { useCategories } from 'context/categories';

const CategoryLocation = () => {
  const { translate } = useTranslate();
  const { onToolbarAction } = useCategories();
  const [selectedCategory, setSelectedCategory] =
    useState<SubCategoryRow | null>(null);

  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);

  const columns = getCategoryLocationColumns({
    onSubcategoryClick: (category) => {
      setSelectedCategory(category);
    },
    selectedCategory,
    selectedRowId
  });
  const handleBackToMainCategories = () => {
    setSelectedCategory(null);
  };

  const handleRowSelection = (selectionModel: GridRowSelectionModel) => {
    const selectedId = selectionModel[0] as number;
    setSelectedRowId(selectedId);
    setSelectedRowId(null);
  };

  return (
    <Box className="mt-10 flex flex-col">
      <Box className="flex items-center gap-2 mb-4">
        <Typography className="font-semibold text-base">
          {translate('categories.categoryLocationPath')}
        </Typography>
      </Box>

      <Box className="flex gap-2 items-center mt-2">
        <Typography>
          {translate('categories.categoryLocationMainCategory')}
        </Typography>
        <ArrowForwardIosIcon sx={{ fontSize: 15 }} />
        <Typography className="font-semibold">
          {selectedCategory
            ? selectedCategory.name
            : translate('categories.categoryLocationCurrent')}
        </Typography>
      </Box>

      <Box className="flex gap-2 flex-col my-6">
        <Typography>
          {translate('categories.categoryLocationSelectParent')}
        </Typography>
        <SearchBar
          className="w-[46.375rem]"
          placeholder={translate(
            'categories.categoryLocationSearchPlaceholder'
          )}
          onClickSearch={() => {}}
        />
      </Box>

      <Box className="flex items-center">
        {selectedCategory && (
          <IconButton onClick={handleBackToMainCategories}>
            <ArrowBackIcon sx={{ fontSize: 18 }} />
          </IconButton>
        )}

        <Typography>
          {translate('categories.categoryLocationMainCategory')}
        </Typography>
      </Box>

      <Box className="mt-4  flex flex-row  w-[100%]">
        <Box className={selectedCategory ? 'w-[50%]' : 'w-[100%]'}>
          <DataTable
            rows={getCategoryLocationRows}
            columns={columns}
            autoHeight
            disableColumnMenu
            disableColumnSelector
            disableRowSelectionOnClick
            onRowSelectionModelChange={handleRowSelection}
            rowSelectionModel={selectedRowId ? [selectedRowId] : []}
          />
        </Box>
        {selectedCategory && (
          <Box className="w-[50%] ">
            <SubCategory
              category={selectedCategory}
              onBack={handleBackToMainCategories}
            />
          </Box>
        )}
      </Box>

      <SaveToolbar
        isVisible={true}
        showNext
        showBack
        onClickAction={onToolbarAction}
      />
    </Box>
  );
};

export default CategoryLocation;
