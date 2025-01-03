'use client';
import { GridColDef } from '@mui/x-data-grid';

export const productSelectionColumns: GridColDef[] = [
  {
    field: 'product.selection.name',
    headerName: 'Product Selection name',
    width: 160,
    flex: 1,
    renderCell: (params) => {
      return params.row.name;
    }
  },
  {
    field: 'product.selection.key',
    headerName: 'Product Selection key',
    width: 160,
    flex: 1,
    renderCell: (params) => {
      return params.row.key;
    }
  },
  {
    field: 'type',
    headerName: 'Type',
    width: 160,
    flex: 1,
    renderCell: (params) => {
      return params.row.type;
    }
  },
  {
    field: 'createdAt',
    headerName: 'Date created',
    width: 160,
    flex: 1,
    renderCell: (params) => {
      return params.row.createdAt;
    }
  },
  {
    field: 'modifiedAt',
    headerName: 'Date modified',
    width: 160,
    flex: 1,
    renderCell: (params) => {
      return params.row.modifiedAt;
    }
  }
];
