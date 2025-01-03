'use client';
import CustomButton from '@/components/atoms/Button';
import { GridColDef } from '@mui/x-data-grid';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Typography } from '@mui/material';

export interface SubCategoryRow {
  id: number;
  name: string;
  subcategories: string;
}

interface ColumnProps {
  onSubcategoryClick?: (category: SubCategoryRow) => void;
  selectedCategory?: SubCategoryRow | null;
  selectedRowId?: number | null;
}

export const getCategoryLocationColumns = ({
  onSubcategoryClick,
  selectedCategory,
  selectedRowId
}: ColumnProps = {}): GridColDef[] => [
  {
    field: 'action',
    headerName: '',
    flex: 1,
    renderCell: (params) => {
      return (
        <CustomButton
          className="bg-white-moderate w-[4.713rem] px-4 py-2 rounded-md"
          title="Select"
        />
      );
    }
  },
  {
    field: 'name',
    headerName: 'Category name',
    width: 160,
    flex: 1,
    cellClassName: (params) => {
      if (
        (selectedRowId && selectedRowId === params.row.id) ||
        (selectedCategory && selectedCategory.id === params.row.id)
      ) {
        return 'bg-[--color-primary-100]';
      }
      return '';
    },
    renderCell: (params) => {
      return params.row.name;
    }
  },
  {
    field: 'subcategories',
    headerName: 'Subcategories',
    flex: 1,
    renderCell: (params) => {
      return (
        <Box className="flex items-center justify-between cursor-pointer">
          <Typography>{params.row.subcategories}</Typography>
          <ArrowForwardIosIcon
            className="text-[#4f4fd8]"
            sx={{ fontSize: 15 }}
            onClick={() => onSubcategoryClick && onSubcategoryClick(params.row)}
          />
        </Box>
      );
    }
  }
];

export const getCategoryLocationRows = [
  {
    id: 1,
    name: 'Bergbaukipper',
    subcategories: '3 subcategories'
  },
  {
    id: 2,
    name: 'Bergbau-Bohrgeräte',
    subcategories: '3 subcategories'
  },
  {
    id: 3,
    name: 'Bagger',
    subcategories: '2 subcategories'
  },
  {
    id: 4,
    name: 'Ersatzteile',
    subcategories: '0 subcategories'
  }
];
