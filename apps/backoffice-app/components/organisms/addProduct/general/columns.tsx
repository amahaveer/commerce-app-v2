"use client"
import { GridColDef } from "@mui/x-data-grid";

const locale = "en-US"
export const categoryColumns: GridColDef[] = [
    {
        field: 'name',
		headerName: 'Category name',
        width: 160,
        flex: 1,
        renderCell: (params) => {
			return params.row.name[locale];
        },
    },
    {
        field: "externalId",
        headerName: "External Id",
        flex: 1,
        renderCell: (params) => {
			return params.row.externalId
        },
    },
    {
        field: "category_path",
        headerName: "Category Path",
        flex: 1,
        renderCell: (params) => {
			return params.row.externalId
        },
    },
    {
        field: "category_level",
        headerName: "Category Level",
        flex: 1,
        renderCell: (params) => {
			return params.row.externalId
        },
    },
    {
        field: "no_of_subcategories",
        headerName: "Number of subcategories",
        flex: 1,
        renderCell: (params) => {
			return params.row.externalId
        },
    },
    {
        field: "no_of_products",
        headerName: "Number of products",
        flex: 1,
        renderCell: (params) => {
			return params.row.externalId
        },
    },
    {
        field: "createdAt",
        headerName: "Date created",
        flex: 1,
        renderCell: (params) => {
			return params.row.externalId
        },
    },
    {
        field: "lastModifiedAt",
        headerName: "Date modified",
        flex: 1,
        renderCell: (params) => {
			return params.row.externalId
        },
    },
]