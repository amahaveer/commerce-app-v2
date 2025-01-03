'use client';
import { GridColDef } from '@mui/x-data-grid';

export const CategoryColumns: GridColDef[] = [
  {
    field: 'category.name',
    headerName: 'Category Name',
    width: 160,
    flex: 1,
    renderCell: ({ row }) => {
      return row.category.name;
    }
  },
  {
    field: 'category.externalId',
    headerName: 'External Id',
    flex: 1,
    renderCell: ({row}) => {
      return row.category.externalId;
    }
  },
  {
    field: 'category.categoryPath',
    headerName: 'Category Path',
    flex: 1,
    renderCell: ({ row }) => {
      return row.category.categoryPath;
    }
  },
  {
    field: 'category.categoryLevel',
    headerName: 'Category Level',
    flex: 1,
    renderCell: ({ row }) => {
      return row.category.categoryLevel;
    }
  },
  {
    field: 'category.subcategory',
    headerName: 'Number of SubCategory',
    flex: 1,
    renderCell: ({ row }) => {
      return row.category.subcategory;
    }
  },
  {
    field: 'category.products',
    headerName: 'Number of Products',
    flex: 1,
    renderCell: ({ row }) => {
      return row.category.products?.length;
    }
  },
  {
    field: 'category.createdAt',
    headerName: 'Date Created',
    sortable: false,
    flex: 1,
    renderCell: ({ row }) => {
      return row.category.createdAt;
    }
  },
  {
    field: 'category.modified',
    headerName: 'Date Modified',
    sortable: false,
    flex: 1,
    renderCell: ({ row }) => {
      return row.category.createdAt;
    }
  }
];

export const categoryMainColumns: GridColDef[] = [
  {
    field: 'category.name',
    headerName: (
      <span style={{ fontWeight: 800 }}>Category Name</span>
    ) as unknown as string,
    width: 160,
    flex: 1,
    renderCell: ({ row }) => {
      return row.category.name;
    }
  },
  {
    field: 'category.externalId',
    headerName: (
      <span style={{ fontWeight: 800 }}>External Id</span>
    ) as unknown as string,
    flex: 1,
    renderCell: ({row}) => {
      return row.category.externalId;
    }
  },
  {
    field: 'category.products',
    headerName: (
      <span style={{ fontWeight: 800 }}>Products</span>
    ) as unknown as string,
    flex: 1,
    renderCell: ({ row }) => {
      return row.category.products?.length;
    }
  },
  {
    field: 'category.subcategory',
    headerName: (
      <span style={{ fontWeight: 800 }}>SubCategories</span>
    ) as unknown as string,
    flex: 1,
    renderCell: ({ row }) => {
      return row.category.subcategory;
    }
  }
];
