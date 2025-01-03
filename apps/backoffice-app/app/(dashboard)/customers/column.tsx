'use client';
import { GridColDef } from '@mui/x-data-grid';

export const customerColumns: GridColDef[] = [
  {
    field: 'customerNumber',
    headerName: 'Customer Number',
    width: 160,
    flex: 1,
    renderCell: (params) => {
      return params.row.lastname;
    }
  },
  {
    field: 'externalId',
    headerName: 'External Id',
    flex: 1,
    renderCell: (params) => {
      return params.row.lastname;
    }
  },
  {
    field: 'firstName',
    headerName: 'First Name',
    flex: 1,
    renderCell: (params) => {
      return params.row.firstName;
    }
  },
  {
    field: 'key Two',
    headerName: 'Last Name',
    flex: 1,
    renderCell: (params) => {
      return params.row.lastName;
    }
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1
  },
  {
    field: 'masterData.published',
    headerName: 'Customer group (single)',
    flex: 1,
    renderCell: (params: any) => {
      return params.row.firstName;
    }
  },
  {
    field: 'createdAt',
    headerName: 'Created On',
    sortable: false,
    flex: 1
  },
  {
    field: 'lastModifiedAt',
    headerName: 'Modified On',
    sortable: false,
    flex: 1
  }
];
