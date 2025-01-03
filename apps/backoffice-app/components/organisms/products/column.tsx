"use client"
import { GridColDef } from "@mui/x-data-grid";
import { Chip } from "@mui/material";
import React from "react";
import { ITranslateFunc } from "types/global";
import { formatDateTime } from "utils";


export const productTableColumns = (translate: ITranslateFunc, params:any={}): GridColDef[] =>  [
	{
		field: `name?.${[params.locale]}`,
		headerName: 'Product Name',
		width: 160,
		flex: 1,
		renderCell: ({ row }) => {
			return row.name[params.locale]
		}
	},
	{
		field: 'productType',
		headerName: 'Product Type',
		flex: 1,
		renderCell: ({row, field}) => {
			return row[field]?.name
		}
	},
	{
		field: 'productKey',
		headerName: 'Product Key',
		flex: 1,
	},
	{
		field: 'status',
		headerName: 'Status',
		flex: 1,
		renderCell: (params: any) => {
			const { row, field } = params;
			const value = row[field];
			return (
				<Chip
					className="p-0"
					label={value ? 'Published' : 'Unpublished'}
					style={{
						backgroundColor: value ? "#dbfae6" : "#f0f1f5",
						color: value ? '#067446' : '#545978',
						border: 'none',
						fontWeight: 500,
						borderRadius: 2
					}}
				/>
			)
		}
	},
	{
		field: 'createdAt',
		headerName: 'Date Created',
		sortable: false,
		flex: 1,
		renderCell: ({row, field}) => {
			return formatDateTime(row[field])
		}
	},
	{
		field: 'lastModifiedAt',
		headerName: 'Date Modified',
		sortable: false,
		flex: 1,
		renderCell: ({row, field}) => {
			return formatDateTime(row[field])
		}
	},
];


