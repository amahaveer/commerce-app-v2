'use client';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { FormattedDate } from 'react-intl';
import { formatCurrency, formatDateTime } from 'utils';

const locale = 'en';

interface OrderRow {
  totalPrice: {
    centAmount: number;
    currencyCode: string;
    fractionDigits: number;
  };
}

export const orderColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'Order number',
    width: 160,
    flex: 1
  },
  {
    field: 'orderState',
    headerName: 'Order Status',
    flex: 1
  },
  {
    field: 'key',
    headerName: 'Payment Status',
    flex: 1
  },
  {
    field: 'shipmentState',
    headerName: 'Shipment Status',
    flex: 1
  },
  {
    field: 'pricing_from',
    headerName: 'Order Total',
    flex: 1,
    renderCell: (params: GridRenderCellParams<OrderRow, any>) => {
      const { centAmount, currencyCode, fractionDigits } =
        params.row.totalPrice;
      return formatCurrency({
        centAmount,
        currencyCode,
        fractionDigits
      });
    }
  },
  {
    field: 'createdAt',
    headerName: 'Date Created',
    flex: 1,
    renderCell: ({ row }) => {
      return formatDateTime(row?.createdAt);
    }
  }
];
