'use client'
import { IProductTableProps } from "types/product.type";
import { useProducts } from "context/product";
import { getProductSearchOptions } from "utils/product";
import { useRouter } from 'next/navigation';
import { eSwitchIcons, ISwitchViewerData } from "@/components/molecules/viewSwitcher/type";
import ListTemplate from "../ListTemplate";
import { Box } from '@mui/material';
import useTranslate from "hooks/useTranslate";
import { productTableColumns } from "./column";
import { useLanguage } from "context/language.context";
import { usePermissions } from "context/permissions.context";
import { eProductPermissions } from "@royalcyber/global-types/src/backoffice-types/permissions/productPermissions.type"

const switchViewData: ISwitchViewerData[] = [
	{ name: "search", icon: eSwitchIcons.SEARCH },
	{ name: "code", icon: eSwitchIcons.CODE },	
]

function ProductTable() {

	const { products, productPagination } = useProducts();
	const { locale } = useLanguage();
	const { hasPermission } = usePermissions();
	const options = getProductSearchOptions();
	const router = useRouter();
	const { translate } = useTranslate();

	const columns = productTableColumns(translate, { locale }) 

	const onClickSwitchIcon = (item: ISwitchViewerData) => {}
	const onClickAddProduct = () => router.push("/products/new")
	const onSelectView = () => { }
	const onClickSearchIcon = () => { }
	const onSelectSearchField = () => { }

	const onClickRow = (row: any) => {
		router.push(`/products/${row.id}`)
	}

	return (
		<ListTemplate>
			<>
			<ListTemplate.Header
				title={translate("product.addProduct")}
				totalCount={16}
				switcherIcons={{ data: switchViewData, onSelect: onClickSwitchIcon }}
				addButton={ hasPermission(eProductPermissions.CREATE_PRODUCT) ? 
					{ title: translate("product.addProduct"), onClick: onClickAddProduct } :
					undefined
				}
				viewsDropdown={{ options: [], onSelect: onSelectView }}
			/>
			<Box className="h-[72vh] overflow-y-auto">
				<ListTemplate.SubHeader
					searchBar={{ placeholder: translate("common.search"), onClickSearch: onClickSearchIcon }}
					fieldsDropdown={{ options: options, defaultValue: options[0].value, onSelect: onSelectSearchField }}
					filterPanelBtn={true}
				/>
				<ListTemplate.SubContent
					actionDropdown={{ options: [], placeholder: translate("common.actions") }}
				/>
				<ListTemplate.MainContent
					dataTable={{ 
						columns: columns, 
						rows: products, 
						checkboxSelection: true, 
						disableRowSelectionOnClick: true,
						onRowClick: onClickRow,
						getRowId: (row) => row.productId 
					}}
				/>
			</Box>
			</>
		</ListTemplate>
	)
}

export default ProductTable;