import ProductsSelection from '@/components/organisms/products-selection/products-selection';
import { productSelectionColumns } from './column';

const ProductSelectionPage = () => {
  return <ProductsSelection columns={productSelectionColumns} />;
};

export default ProductSelectionPage;
