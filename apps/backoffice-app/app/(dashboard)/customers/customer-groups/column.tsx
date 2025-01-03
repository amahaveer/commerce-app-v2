'use client';
import { GridColDef } from '@mui/x-data-grid';

export const customerGroupColumns: GridColDef[] = [
  {
    field: 'masterData.current.name.en',
    headerName: 'Group Name',
    width: 160,
    flex: 1,
    renderCell: (params) => {
      console.log(params);
      return params.row.name;
    }
  },
  {
    field: 'productType.obj.name',
    headerName: 'Group Key',
    flex: 1,
    renderCell: (params) => {
      return params.row.key;
    }
  },
  {
    field: 'createdAt',
    headerName: 'Date Created',
    sortable: true,
    flex: 1
  },
  {
    field: 'lastModifiedAt',
    headerName: 'Date Modified',
    sortable: false,
    flex: 1
  }
];
