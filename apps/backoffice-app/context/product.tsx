'use client';
import {
  createProduct,
  getProductDetail,
  getProducts
} from 'app/api/product.api';
import { initialAddProductValues } from 'constants/product.constant';
import { createContext, useContext, useEffect, useState } from 'react';
import { IExposeProduct, IMappedProductForm } from 'types/product.type';
import { useLanguage } from './language.context';
import { eToolbarButtonActions } from '@/components/molecules/SaveToolBar/type';
import { useStepper } from './stepper';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { initialPaginationValue } from 'constants/common';

export const ProductContext = createContext<IExposeProduct>({
  products: [],
  openDrawer: false,
  isEditMode: false,
  product: {},
  mappedProductData: initialAddProductValues,
  slug: '',
  productPagination: initialPaginationValue,
  revertProductChanges: () => {},
  setMappedProductData: () => {},
  setOpenDrawer: () => {},
  onClickToolbarAction: () => {}
});

export const ProductProvider = ({ children, productId }: any) => {
  const { onBack, onNext } = useStepper();
  const { locale } = useLanguage();
  const router = useRouter();

  const [products, setProducts] = useState<Array<any>>([]);
  const [productInventory, setProductInventory] = useState([]);
  const [product, setProduct] = useState<any>({});
  const [openDrawer, setOpenDrawer] = useState(false);
  const [mappedProductData, setMappedProductData] = useState(
    initialAddProductValues
  );
  const [productPagination, setProductPagination] = useState(
    initialPaginationValue
  );

  useEffect(() => {
    if (productId) {
      getProductDetailHandler();
      getProductInventories();
    } else {
      getProductHandler();
    }
  }, []);

  const getSlug = () => product['current']?.slug?.[locale];

  const productFormMapper = (prodList?: any) => {
    prodList = prodList || product;
    const data = prodList;
    if (!data) return;
    const productForm: IMappedProductForm = {
      generalInfo: {
        productName: data.name || { [locale]: '' },
        productDescription: data.description?.[locale],
        categories:
          data?.categories &&
          data.categories.map((item: any) => ({
            ...item,
            name: item.name?.[locale]
          })),
        productKey: data?.productKey,
        taxCategory: '',
        productPriceMode: ''
      },
      selectedProductType: data.productType?.name,
      productSelections: [],
      masterVariant: data.variants[0],
      variants: data.variants
    };
    setMappedProductData(productForm);
  };

  const getProductDetailHandler = async () => {
    try {
      const data = await getProductDetail({ param: productId });
      productFormMapper(data);
      setProduct(data);
    } catch (error) {
      console.log('ERROR::', error);
      return;
    }
  };

  const getProductInventories = async () => {
    try {
      const data = await getProductDetail({ param: productId });
      setProductInventory(data);
    } catch (error) {
      console.log('ERROR::', error);
      return;
    }
  };

  const getProductHandler = async () => {
    try {
      const data = await getProducts();
      setProductPagination((prev: any) => ({
        ...prev,
        total: data.total
      }));
      setProducts(data?.results || []);
    } catch (error) {
      return;
    }
  };

  const onClickAddProduct = async () => {
    try {
      const data = await createProduct(mappedProductData);
      toast.success('Product Created Successfully!');
      router.push(`/products/${data.id}`);
    } catch (error: any) {
      toast.error(error.statusText);
      console.log('ERROR::onClickAddProduct: ', error);
    }
  };

  const onClickCancel = () => {
    router.push('/products');
  };

  const onClickToolbarAction = (actionType: eToolbarButtonActions) => {
    const actions = {
      cancel: onClickCancel,
      save: onClickAddProduct,
      next: onNext,
      back: onBack
    };
    actions[actionType]?.();
  };

  const expose: IExposeProduct = {
    products: products,
    productInventory: productInventory,
    product,
    openDrawer,
    isEditMode: !!productId,
    mappedProductData,
    slug: getSlug(),
    productPagination,
    revertProductChanges: productFormMapper,
    setMappedProductData,
    setOpenDrawer,
    onClickToolbarAction
  };

  return (
    <ProductContext.Provider value={expose}>{children}</ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);

  if (context === undefined) {
    throw new Error('Component Must be used within a Product Provider');
  }

  return context;
};
