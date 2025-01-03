import ProductTable from '@/components/organisms/products/productTable';
import FilterDrawer from '@/components/atoms/FilterDrawer';
import { Box } from '@mui/material';
import ProductFilters from '@/components/organisms/products/filters';
import { ProductProvider } from 'context/product';
import { PermissionsProvider } from 'context/permissions.context';

export default async function ProductsPage() {

	return (
		<PermissionsProvider moduleName='products'>
			<ProductProvider>
				<Box className="flex ">
					<ProductTable />
					<FilterDrawer >
						<ProductFilters />
					</FilterDrawer>
				</Box>
			</ProductProvider>
		</PermissionsProvider>
	);
}
