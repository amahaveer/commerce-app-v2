import React from 'react';
import { Box } from '@mui/material';
import { CategoryProvider } from 'context/categories';
import EditCategoryComponent from '@/components/organisms/categories/editCategoryDetails';

const EditCategoryDetails: React.FC = ({}) => {
  // const { id } = params;
  return (
    <Box>
      <CategoryProvider>
        <EditCategoryComponent />
      </CategoryProvider>
    </Box>
  );
};

export default EditCategoryDetails;
