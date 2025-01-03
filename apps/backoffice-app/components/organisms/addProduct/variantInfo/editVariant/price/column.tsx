'use client';
import { GridColDef } from '@mui/x-data-grid';
import { formatCurrency, formatDateTime } from 'utils';

export const variantPriceColumns: GridColDef[] = [
  {
    field: 'no',
    headerName: 'No.',
    width: 160,
    flex: 1
  },
  {
    field: 'currencyCode',
    headerName: 'Currency',
    flex: 1
  },
  {
    field: 'centAmount',
    headerName: 'Price',
    flex: 1,
    renderCell: ({ row, field }) => {
      return formatCurrency({
        centAmount: row?.centAmount,
        currencyCode: row?.currencyCode,
        fractionDigits: row?.fractionDigits || 2
      });
    }
  },
  {
    field: 'pricetiers',
    headerName: 'Price tiers',
    flex: 1,
    renderCell: ({ row }) => {
      return formatCurrency({
        centAmount: row?.pricetiers,
        currencyCode: row?.currencyCode,
        fractionDigits: row?.fractionDigits || 2
      });
    }
  },
  {
    field: 'Country',
    headerName: 'Country',
    flex: 1
  },
  {
    field: 'customerGroup',
    headerName: 'Customer group',
    flex: 1
  },
  {
    field: 'channel',
    headerName: 'Channel',
    flex: 1
  },
  {
    field: 'Discounted',
    headerName: 'Discounted',
    flex: 1
  },
  {
    field: 'validFrom',
    headerName: 'Valid from',
    flex: 1,
    renderCell: ({ row, field }) => {
      return formatDateTime(row.validFrom);
    }
  },
  {
    field: 'validUntil',
    headerName: 'Valid until',
    flex: 1,
    renderCell: ({ row, field }) => {
      return formatDateTime(row.validUntil);
    }
  }
];
