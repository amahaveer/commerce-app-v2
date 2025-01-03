'use client';
import { GridColDef } from '@mui/x-data-grid';

const locale = 'en';

export const addressColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'id',
    width: 160,
    flex: 1
  },
  {
    field: 'contact_name',
    headerName: 'Contact name',
    width: 160,
    flex: 1
  },
  {
    field: 'company_name',
    headerName: 'Company name',
    flex: 1
  },
  {
    field: 'address',
    headerName: 'Address',
    flex: 1
  },
  {
    field: 'city',
    headerName: 'City',
    flex: 1
  },
  {
    field: 'postal_code',
    headerName: 'Postal Code',
    flex: 1
  },
  {
    field: 'state',
    headerName: 'State / Province',
    flex: 1
  },
  {
    field: 'region',
    headerName: 'Region',
    flex: 1
  },
  {
    field: 'country',
    headerName: 'Country',
    flex: 1
  },
  {
    field: 'addressType',
    headerName: 'Address type',
    flex: 1
  }
];
