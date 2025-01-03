'use client';
import React, { useEffect, useState } from 'react';
import ProductDetail from '@/components/productDetailsPage/ProductDetails';
import { sdk } from '@royalcyber/unified-sdk';
import { IncomingMessage } from 'http';
import { ServerOptions } from '@royalcyber/unified-commerce';
import { getCookie } from '@/utils/cookieManager';
import { cookieName } from '@/context/OktaTokenContext';

interface PageProps {
  params: {
    slug: string[];
    locale: string;
  };
}

const Page = ({ params }: PageProps) => {
  const slug = params.slug.join('/');
  const [product, setProduct] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const oktaToken = getCookie(cookieName)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response: any = await sdk.composableCommerce.product.getProduct({ id: slug }, {
          serverOptions: {
            req: {
              headers: {
                'client-type': 'web',
                locale: 'en',
                Authorization:
                  `Bearer ${oktaToken}`,
              },
            } as unknown as IncomingMessage,
          } as ServerOptions,
        });
        if (response?.isError) {
          setError('Error loading product.');
        } else {
          const result = response?.data?.data;
          setProduct(result);
        }
      } catch (err: any) {
        console.log('Error loading product:', err);
        setError('Error loading product.');
      }
    };

    fetchProduct();
  }, [slug]);

  if (error) {
    return <div>{error}</div>;
  }
  if (!product) {
    return <div>Loading...</div>;
  }

  const { name, description, variants = [], categories = [] } = product;
  const [category] = categories;
  const { categoryId } = category || {};
  const [masterVariant] = variants;
  return (
    <>
      <ProductDetail
        name={name}
        id={product.productId}
        description={description}
        masterVariant={masterVariant}
        variants={variants}
        categories={categories}
        categoryId={categoryId}
      />
    </>
  );
};

export default Page;
