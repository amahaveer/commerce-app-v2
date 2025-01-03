'use client';

import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Productheading from './Productheading';
import { useTranslations } from 'next-intl';
import ProductCard from './ProductCard';
import { cookieName } from '@/context/OktaTokenContext';
import { getCookie } from '@/utils/cookieManager';
import { IncomingMessage } from 'http';
import { ServerOptions } from '@royalcyber/unified-commerce';
import { sdk } from '@royalcyber/unified-sdk';
import { Category } from '@royalcyber/global-types';

interface Product {
  id: string;
  category: string;
  [key: string]: any;
}

function FavoriteProduct() {
  const t = useTranslations('favoriteProduct');
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState([] as Product[]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const oktaToken = getCookie(cookieName);

  const fetchCategories = async () => {
    const result = (await sdk.composableCommerce.product.queryCategories(
      {},
      {
        serverOptions: {
          req: {
            headers: {
              'client-type': 'web',
              locale: 'en_US',
              Authorization: `Bearer ${oktaToken}`,
            },
          } as unknown as IncomingMessage,
        } as ServerOptions,
      },
    )) as any;
    if (result && result?.data?.data?.items?.length) {
      setCategories(result.data.data.items);
    }
  };

  const fetchProductsByCategory = async (categoryId: string) => {
    const result = (await sdk.composableCommerce.product.query(
      categoryId === 'all' ? {} : { category: categoryId },
      {
        serverOptions: {
          req: {
            headers: {
              'client-type': 'web',
              locale: 'en_US',
              Authorization: `Bearer ${oktaToken}`,
            },
          } as unknown as IncomingMessage,
        } as ServerOptions,
      },
    )) as any;
    if (result && result?.data?.data?.items) {
      setProducts(result.data.data.items);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch products when the selected category changes
  useEffect(() => {
    fetchProductsByCategory(selectedCategory);
  }, [selectedCategory]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const ProductGrid: React.FC<{ products: Product[] }> = ({ products }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {products?.map((product: Product) => (
        <ProductCard key={product.productId} product={product} />
      ))}
    </div>
  );

  console.log(products, categories);
  return (
    <section className="customer-favorite-product">
      <div className="container">
        <div className="grid grid-cols-1 headings text-center">
          <Productheading title={t('title')} subtitle={t('subtitle')} />
        </div>

        <Tabs
          defaultValue="all"
          value={selectedCategory}
          onValueChange={handleCategoryChange}
          className="font-jost"
        >
          <TabsList className="flex bg-transparent mb-12 text-[#a0a2a4]">
            <TabsTrigger
              key="all"
              value="all"
              className="text-[1rem] lg:text-[1.25rem] relative"
            >
              All Collection
            </TabsTrigger>
            {categories.length &&
              categories?.map(({ name, categoryId }) => (
                <TabsTrigger
                  key={categoryId}
                  value={categoryId || ''}
                  className="text-[1rem] lg:text-[1.25rem] relative"
                  name={name as string}
                  />
              ))}
          </TabsList>

          <TabsContent value={selectedCategory}>
            <ProductGrid products={products} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

export default FavoriteProduct;
