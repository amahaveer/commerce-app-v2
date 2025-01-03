'use client';
import { GridColDef } from '@mui/x-data-grid';

export const discountCartColumns: GridColDef[] = [
  {
    field: 'discount.name',
    headerName: 'Discount name',
    width: 160,
    flex: 1,
    renderCell: (params) => {
      return params.row.name;
    }
  },
  {
    field: 'discount.key',
    headerName: 'Discount key',
    width: 160,
    flex: 1,
    renderCell: (params) => {
      return params.row.key;
    }
  },
  {
    field: 'active',
    headerName: 'Active',
    width: 160,
    flex: 1,
    renderCell: (params) => {
      return params.row.active;
    }
  },
  {
    field: 'amount',
    headerName: 'Amount',
    width: 160,
    flex: 1,
    renderCell: (params) => {
      return params.row.amount;
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
    field: 'target',
    headerName: 'Target',
    width: 160,
    flex: 1,
    renderCell: (params) => {
      return params.row.target;
    }
  },
  {
    field: 'stores',
    headerName: 'Stores',
    width: 160,
    flex: 1,
    renderCell: (params) => {
      return params.row.stores;
    }
  },
  {
    field: 'validFrom',
    headerName: 'Valid from',
    width: 160,
    flex: 1,
    renderCell: (params) => {
      return params.row.validFrom;
    }
  },
  {
    field: 'validUntil',
    headerName: 'Valid until',
    width: 160,
    flex: 1,
    renderCell: (params) => {
      return params.row.validUntil;
    }
  }
];
