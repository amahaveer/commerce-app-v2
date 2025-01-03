'use client';
import { GridColDef } from '@mui/x-data-grid';
import { ITranslateFunc } from 'types/global';

export const getCustomerColumns = (translate: ITranslateFunc, locale?: string): GridColDef[] => [
  {
    field: 'masterData.current.name.en',
    headerName: 'Customer Number',
    width: 160,
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
    field: 'lastName',
    headerName: 'Last Name',
    flex: 1,
    renderCell: (params) => {
      return params.row.lastName;
    }
  },
  {
    field: 'company',
    headerName: 'Company',
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
];
