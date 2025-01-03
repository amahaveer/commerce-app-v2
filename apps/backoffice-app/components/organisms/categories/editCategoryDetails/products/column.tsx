'use client';
import { GridColDef } from '@mui/x-data-grid';
import { Chip, Typography } from '@mui/material';
import React from 'react';
import { ITranslateFunc } from 'types/global';

export const productDetailsTableColumns: GridColDef[] = [
  {
    field: 'category.name',
    headerName: 'Category Name',
    width: 160,
    flex: 1,
    renderCell: ({ row }) => {
      const name = row.category.name;

      return (
        <Typography className="text-[#4242B3] underline">{name}</Typography>
      );
    }
  },
  {
    field: 'category.categories',
    headerName: 'Categories',
    flex: 1,
    renderCell: ({ row }) => {
      return row.category.categories;
    }
  },
  {
    field: 'category.productType',
    headerName: 'Product Type',
    flex: 1,
    renderCell: ({ row }) => {
      return row.category.productType;
    }
  },
  {
    field: 'category.status',
    headerName: 'Status',
    flex: 1,
    renderCell: ({ row }) => {
      const status = row.category.status; // Extract SKU value
      const isPublished = status && status.length > 0; // For example, check if SKU is non-empty to determine if it is published

      return (
        <Chip
          className="p-0"
          label={isPublished ? 'Published' : 'Unpublished'}
          style={{
            backgroundColor: isPublished ? '#F1F0FF' : '#f0f1f5',
            color: isPublished ? '#4242B3' : '#545978',
            border: 'small',
            fontWeight: 500,
            borderRadius: 2,
            textDecoration: 'underline'
          }}
        />
      );
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
      return row.category.modified;
    }
  },
  {
    field: 'category.variants',
    headerName: 'Variants',
    sortable: false,
    flex: 1,
    renderCell: ({ row }) => {
      return (
        <Typography className="text-[#4242B3] underline">
          {row.category.variants}
        </Typography>
      );
    }
  },
  {
    field: 'category.Prices',
    headerName: 'Prices',
    sortable: false,
    flex: 1,
    renderCell: ({ row }) => {
      return (
        <Typography className="text-[#4242B3] underline">
          {row.category.Prices}
        </Typography>
      );
    }
  },
  {
    field: 'category.sku',
    headerName: 'SKU',
    sortable: false,
    flex: 1,
    renderCell: ({ row }) => {
      return row.category.sku;
    }
  }
];

export const productDetailsRows = [
  {
    id: 1,
    category: {
      name: 'Electronics',
      categories: 1,
      productType: 'Smartphone',
      status: 'Active',
      createdAt: '2024-01-01',
      modified: '2024-05-15',
      variants: '6',
      Prices: '$699, $799, $899',
      sku: 'FASH-98765,ELEC-12345'
    }
  },
  {
    id: 2,
    category: {
      name: 'Fashion',
      categories: 1,
      productType: 'Jacket',
      status: 'Out of Stock',
      createdAt: '2023-11-15',
      modified: '2024-06-10',
      variants: '3',
      Prices: '$129, $149, $169',
      sku: 'FASH-98765,HOME-56789'
    }
  },
  {
    id: 3,
    category: {
      name: 'Home Appliances',
      categories: 3,
      productType: 'Refrigerator',
      status: 'Active',
      createdAt: '2023-09-25',
      modified: '2024-07-18',
      variants: '1',
      Prices: '$499, $699',
      sku: 'HOME-56789,SPORT-11122'
    }
  },
  {
    id: 4,
    category: {
      name: 'Sports',
      categories: 3,
      productType: 'Tennis Racket',
      status: 'Active',
      createdAt: '2024-02-10',
      modified: '2024-04-22',
      variants: '0',
      Prices: '$79, $99',
      sku: 'SPORT-11122,BEAU-44567'
    }
  },
  {
    id: 5,
    category: {
      name: 'Beauty',
      categories: 1,
      productType: 'Shampoo',
      status: 'Active',
      createdAt: '2024-03-01',
      modified: '2024-08-05',
      variants: '3',
      Prices: '$15, $25',
      sku: 'BEAU-44567'
    }
  }
];

export const manageStoreFrontColumns: GridColDef[] = [
  {
    field: 'category.name',
    headerName: 'Product Name',
    width: 160,
    flex: 1,
    renderCell: ({ row }) => {
      return row.category.name;
    }
  },
  {
    field: 'category.categories',
    headerName: 'Product Type',
    flex: 1,
    renderCell: ({ row }) => {
      return row.category.categories;
    }
  },
  {
    field: 'category.productType',
    headerName: 'Product Key',
    flex: 1,
    renderCell: ({ row }) => {
      return row.category.productType;
    }
  },
  {
    field: 'category.status',
    headerName: 'Status',
    flex: 1,
    renderCell: ({ row }) => {
      const status = row.category.status; // Extract SKU value
      const isPublished = status && status.length > 0; // For example, check if SKU is non-empty to determine if it is published

      return (
        <Chip
          className="p-0"
          label={isPublished ? 'Published' : 'Unpublished'}
          style={{
            backgroundColor: isPublished ? '#F1F0FF' : '#f0f1f5',
            color: isPublished ? '#4242B3' : '#545978',
            border: 'small',
            fontWeight: 500,
            borderRadius: 2,
            textDecoration: 'underline'
          }}
        />
      );
    }
  }
];

export const manageStoreFrontRows = [
  {
    id: 1,
    category: {
      name: 'Shirt',
      categories: 'Men Top',
      productType: '- -',
      status: 'Active',
      createdAt: '2024-01-01',
      modified: '2024-05-15',
      variants: '6',
      Prices: '$699, $799, $899',
      sku: 'FASH-98765,ELEC-12345'
    }
  },
  {
    id: 2,
    category: {
      name: 'T-Shirt',
      categories: 'Men Top',
      productType: 'Linen',
      status: 'Out of Stock',
      createdAt: '2023-11-15',
      modified: '2024-06-10',
      variants: '3',
      Prices: '$129, $149, $169',
      sku: 'FASH-98765,HOME-56789'
    }
  },
  {
    id: 3,
    category: {
      name: 'Kurta',
      categories: 'Women',
      productType: 'Top',
      status: 'Active',
      createdAt: '2023-09-25',
      modified: '2024-07-18',
      variants: '1',
      Prices: '$499, $699',
      sku: 'HOME-56789,SPORT-11122'
    }
  },
  {
    id: 4,
    category: {
      name: 'Liberty Coolers',
      categories: 'Shoe',
      productType: 'Slides',
      status: 'Active',
      createdAt: '2024-02-10',
      modified: '2024-04-22',
      variants: '0',
      Prices: '$79, $99',
      sku: 'SPORT-11122,BEAU-44567'
    }
  }
];
