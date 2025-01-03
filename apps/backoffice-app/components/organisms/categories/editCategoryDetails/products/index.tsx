import DateInfo from './products-DateInfo';
import ProductsTableFilter from './products-ProductsTableFilter';
import { Box, Typography, IconButton } from '@mui/material';

const CategoryProductsComponent = () => {
  return (
    <Box className="mx-10">
      <DateInfo />
      <ProductsTableFilter />;
    </Box>
  );
};

export default CategoryProductsComponent;
