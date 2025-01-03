"use server"

import ProductDetailsComponent from '@/components/organisms/productDetails';
import { PermissionsProvider } from 'context/permissions.context';
import { ProductProvider } from 'context/product';

const ProductDetailsPage = async ({ params }: any) => {

  const { slug } = params;

  return (
    <PermissionsProvider moduleName='products'>
      <ProductProvider productId={slug} >
        <ProductDetailsComponent />
      </ProductProvider>
    </PermissionsProvider>

  );
};

export default ProductDetailsPage;
