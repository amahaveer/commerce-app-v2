import CategoriesList from '@/components/organisms/categories/categoriesList';
import React from 'react';
import { categoryMainColumns } from './search/column';
import { Box } from '@mui/material';

const page = () => {
  return (
    <Box>
      <CategoriesList columns={categoryMainColumns} />
    </Box>
  );
};

export default page;
