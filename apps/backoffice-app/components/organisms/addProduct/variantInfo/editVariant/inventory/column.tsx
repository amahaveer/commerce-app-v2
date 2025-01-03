'use client';
import { GridColDef } from '@mui/x-data-grid';
import { formatDateTime } from 'utils';

export const variantInventoryColumns: GridColDef[] = [
  {
    headerName: 'Channel Name',
    field: 'channelName', // Should match the key in your mappedObj
    renderCell: ({ row, field }) => {
      return row?.supplyChannel?.name['en-US'];
    }
  },
  {
    headerName: 'Channel Key',
    field: 'channelKey', // Should match the key in your mappedObj
    renderCell: ({ row, field }) => {
      const key = row.supplyChannel.key;
      return row?.supplyChannel?.key;
    } // Ensuring it only renders a primitive value
  },
  {
    headerName: 'Quantity',
    field: 'availableQuantity',
    renderCell: (params: any) => params.value // Ensure it's a number or string
  },
  {
    headerName: 'Available Quantity',
    field: 'quantityOnStock',
    renderCell: (params: any) => params.value
  },
  {
    headerName: 'Available Quantity',
    field: 'restockableInDays',
    renderCell: (params: any) => params.value // Ensure it's a number or string
  },
  {
    headerName: 'Expected Delivery',
    field: 'expectedDelivery',
    renderCell: ({ row, field }) => {
      return formatDateTime(row.expectedDelivery);
    }
  }
];
