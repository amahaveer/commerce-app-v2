import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DataTable from '@/components/atoms/DataTable';
import {
  SubCategoryRow,
  getCategoryLocationColumns,
  getCategoryLocationRows
} from './column';

interface SubCategoryProps {
  category: SubCategoryRow;
  onBack: () => void;
}

const SubCategory: React.FC<SubCategoryProps> = ({ category }) => {
  const filteredRows = getCategoryLocationRows.filter(
    (row) => row.name !== category.name
  );

  return (
    <Box className="mt-4">
      <Box className="flex items-center gap-2 mb-4">
        {/* <IconButton onClick={onBack}>
          <ArrowBackIcon />
        </IconButton> */}
        {/* <Typography variant="h6">{category.name} - Subcategories</Typography> */}
      </Box>
      <DataTable
        rows={filteredRows}
        columns={getCategoryLocationColumns()}
        autoHeight
        disableColumnMenu
        disableColumnSelector
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default SubCategory;
