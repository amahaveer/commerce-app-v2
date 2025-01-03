'use client';
import { GridColDef } from '@mui/x-data-grid';
import { formatCurrency, formatDateTime } from 'utils';
import { GridRenderCellParams } from '@mui/x-data-grid';

interface OrderRow {
  lineItems: Array<any>; // Modify this based on the actual type of lineItems, e.g., `Array<LineItem>`
}

interface LineItem {
  count: number; // Define the structure for the lineItem count
}

export const orderColumns: GridColDef[] = [
  {
    field: 'orderNumber',
    headerName: 'Order number',
    width: 160,
    flex: 1
  },
  {
    field: 'totalPrice.centAmount',
    headerName: 'Order final total (gross)',
    flex: 1,
    renderCell: ({ row }) => {
      return formatCurrency({
        centAmount: row?.taxedPrice.grossAmount.centAmount,
        currencyCode: row?.currencyCode,
        fractionDigits: row?.fractionDigits || 2
      });
    }
  },
  {
    field: 'numberOfOrder',
    headerName: 'No. of order items',
    flex: 1,
    renderCell: (params: GridRenderCellParams<OrderRow, any>) => {
      const row = params.row as OrderRow;
      return row?.lineItems ? row.lineItems.length : 0;
    }
  },
  {
    field: 'category_level',
    headerName: 'Total quantity of items',
    flex: 1,
    renderCell: (params: GridRenderCellParams<OrderRow, any>) => {
      const row = params.row as OrderRow;
      const totalCount = row?.lineItems.reduce(
        (sum, item) => sum + item.count,
        0
      );
      return totalCount || 0;
    }
  },
  {
    field: 'orderState',
    headerName: 'Order status',
    flex: 1,
    renderCell: (params) => {
      return params.row.externalId;
    }
  },
  {
    field: 'paymentState',
    headerName: 'Payment status',
    flex: 1,
    renderCell: (params) => {
      return params.row.externalId;
    }
  },
  {
    field: 'customerEmail',
    headerName: 'Email (order)',
    flex: 1,
    renderCell: (params) => {
      return params.row.externalId;
    }
  },
  {
    field: 'createdAt',
    headerName: 'Date created',
    flex: 1,
    renderCell: (params) => {
      return formatDateTime(params.row.createdAt);
    }
  },
  {
    field: 'lastModifiedAt',
    headerName: 'Date modified',
    flex: 1,
    renderCell: (params) => {
      return formatDateTime(params.row.lastModifiedAt);
    }
  }
];
