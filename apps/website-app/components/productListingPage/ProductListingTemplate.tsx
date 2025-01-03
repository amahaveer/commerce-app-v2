'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import QuickView from '@/app/icons/ProductIcon/QuickView';
import WishList from '@/app/icons/ProductIcon/WishList';
import AddToCompare from '@/app/icons/ProductIcon/AddToCompare';
import { useTranslations } from 'next-intl';

const renderStars = (rating: any) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rating);

  return (
    <div className={'flex items-center'}>
      {[...Array(fullStars)].map((_, i) => (
        <svg
          key={`full-${i}`}
          className={'w-4 h-4 text-yellow-500'}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
        </svg>
      ))}
      {halfStar && (
        <svg
          className={'w-4 h-4 text-yellow-500'}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2v15.27z"></path>
        </svg>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <svg
          key={`empty-${i}`}
          className={'w-4 h-4 text-gray-300'}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
        </svg>
      ))}
    </div>
  );
};

const ProductList = ({ products }: any) => {
  const t = useTranslations('productListButtons');
  return (
    <div className={'flex flex-col space-y-6 py-4'}>
      {products.map((product:any) => {
        const productPriceDenomination = product?.variants[0]?.price?.fractionDigits;
        const productName = product?.name;
        const productDescription = product?.description;
        const productImage = product?.variants[0]?.images[0];
        const productPrice = product?.variants[0]?.price?.centAmount / Math.pow(10, productPriceDenomination);
        const productOldPrice = product?.variants[0]?.price?.centAmount / Math.pow(10, productPriceDenomination);
        return (
          <div
            key={product.productId}
            className='flex flex-row'
          >
            {/* Product Image */}
            <div className={'product-thumb w-full md:w-1/3 bg-gray-100 relative z-[1]'}>
              <Link href={`/product/${product.productId}`}>
                <Image
                  className={'object-contain w-full h-auto max-w-[350px] max-h-[310px] md:max-w-full transition-transform duration-300 ease-out hover:scale-105'}
                  src={productImage}
                  alt={productName}
                  width={350}
                  height={310}
                  layout="contain"
                  priority
                />
              </Link>
              <div className={'product-action absolute top-[57px] left-0 opacity-0 hover:opacity-100 transition-opacity duration-300'}>
                <div className={'flex flex-col space-y-2'}>
                  {/* Quick View Button */}
                  <button
                    type="button"
                    className="product-action-btn product-quick-view-btn group relative mb-[0.375rem] inline-block w-[2.625rem] h-[2.625rem] leading-[2.625rem] text-center text-[1.125rem] text-black bg-white shadow-md rounded-full hover:bg-black hover:text-white"
                  >
                    <QuickView />
                    <span className="product-tooltip product-tooltip-right absolute left-[100%] right-auto top-[50%] translate-y-[-50%] font-medium text-[0.75rem] text-white bg-black inline-block w-max leading-none px-[0.375rem] py-[0.25rem] rounded-[0.25rem] invisible opacity-0 z-[1] transition-opacity transition-visibility transition-transform duration-300 ease-[cubic-bezier(.71,1.7,.77,1.24)] group-hover:visible group-hover:opacity-100 group-hover:translate-y-[-50%] group-hover:translate-x-[0.5rem]">
                      {t('addtoquickView')}
                    </span>
                  </button>
                  {/* Wishlist Button */}
                  <button
                    type="button"
                    className="product-action-btn product-wishlist-btn group relative mb-[0.375rem] inline-block w-[2.625rem] h-[2.625rem] leading-[2.625rem] text-center text-[1.125rem] text-black bg-white shadow-md rounded-full hover:bg-black hover:text-white"
                  >
                    <WishList />
                    <span className="product-tooltip product-tooltip-right absolute left-[100%] right-auto top-[50%] translate-y-[-50%] font-medium text-[0.75rem] text-white bg-black inline-block w-max leading-none px-[0.375rem] py-[0.25rem] rounded-[0.25rem] invisible opacity-0 z-[1] transition-opacity transition-visibility transition-transform duration-300 ease-[cubic-bezier(.71,1.7,.77,1.24)] group-hover:visible group-hover:opacity-100 group-hover:translate-y-[-50%] group-hover:translate-x-[0.5rem]">
                      {t('addtowishlist')}
                    </span>
                  </button>
                  {/* Add to Compare */}
                  <button
                    type="button"
                    className="product-action-btn product-add-to-compare-btn group relative mb-[0.375rem] inline-block w-[2.625rem] h-[2.625rem] leading-[2.625rem] text-center text-[1.125rem] text-black bg-white shadow-md rounded-full hover:bg-black hover:text-white"
                  >
                    <AddToCompare />
                    <span className="product-tooltip product-tooltip-right absolute left-[100%] right-auto top-[50%] translate-y-[-50%] font-medium text-[0.75rem] text-white bg-black inline-block w-max leading-none px-[0.375rem] py-[0.25rem] rounded-[0.25rem] invisible opacity-0 z-[1] transition-opacity transition-visibility transition-transform duration-300 ease-[cubic-bezier(.71,1.7,.77,1.24)] group-hover:visible group-hover:opacity-100 group-hover:translate-y-[-50%] group-hover:translate-x-[0.5rem]">
                      {t('addtocompare')}
                    </span>
                  </button>
                </div>
              </div>
            </div>
            {/* Product Details */}
            <div className={'flex-1'}>
              <div className={'pt-8 pb-8'}>
                <div className={'pl-8 pr-8'}>
                  <h3 className={'text-lg font-semibold mb-2'}>
                    <Link href="#" className={'hover:text-blue-600'}>
                      {productName}
                    </Link>
                  </h3>
                  <div className={'mb-2'}>{renderStars(4.5)}</div>
                  <div className={'mb-4'}>
                    <span className={'text-lg font-bold text-black'}>
                      ${productPrice.toFixed(2)}
                    </span>
                    {productOldPrice && (
                      <span className={'text-sm text-gray-400 line-through ml-2'}>
                        ${productOldPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  {/* <p className={'text-sm text-gray-600 mb-4'}>
                    {productDescription}
                  </p> */}
                  <button
                    type="button"
                    className={
                      'text-sm  hover:underline hover:text-blue-600  bg-black text-white px-4 py-2  hover:bg-blue-600 transition duration-300 rounded-none'
                    }
                  >
                    {t('addtocart')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
