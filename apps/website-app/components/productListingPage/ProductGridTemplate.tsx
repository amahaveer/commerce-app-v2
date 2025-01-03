'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AddToCart from '@/app/icons/ProductIcon/AddToCart';
import QuickView from '@/app/icons/ProductIcon/QuickView';
import WishList from '@/app/icons/ProductIcon/WishList';
import AddToCompare from '@/app/icons/ProductIcon/AddToCompare';
import './styles.css';
import { useTranslations } from 'next-intl';

const renderStars = (rating: any) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);
    return (
      <div className="flex items-center">
      <div className={'flex items-center'}>
        {[...Array(fullStars)].map((_, i) => (
          <svg
            key={`full-${i}`}
            className="w-4 h-4 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
          </svg>
        ))}
        {halfStar && (
          <svg
            className="w-4 h-4 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2v15.27z"></path>
          </svg>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <svg
            key={`empty-${i}`}
            className="w-4 h-4 text-gray-300"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
          </svg>
        ))}
      </div>
      </div>
    );
  };

const ProductGrid = ({products}:any) => {
  const t = useTranslations('productListButtons');
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 py-4">
    {products.map((product: any) => {
        const productPriceDenomination = product?.variants[0]?.price?.fractionDigits;
        const productName = product?.name;
        const productDescription = product?.description;
        const productImage = product?.variants[0]?.images[0];
        const productPrice = product?.variants[0]?.price?.centAmount / Math.pow(10, productPriceDenomination);
        const productOldPrice = product?.variants[0]?.price?.centAmount / Math.pow(10, productPriceDenomination);
        return (
          <div className="product-wrapper mb-10" key={product.productId}>
            <div className="product-items">
              <div className="product-thumb bg-[#f2f3f5] relative z-[1]">
                <Link href={`/product/${product.productId}`}>
                  <Image
                    className="w-full transition-transform duration-300 ease-out images group-hover:scale-105"
                    src={productImage}
                    alt={productName}
                    width={284}
                    height={302}
                    layout="responsive"
                  />
                </Link>
                <div className="product-action product-action-blackStyle absolute left-0 right-auto bottom-auto top-[57px] z-[1] opacity-0 transition-all duration-500">
                  <div className="product-action-item flex flex-col">
                    <button
                      type="button"
                      className="product-action-btn product-add-cart-btn group relative mb-[0.375rem] inline-block w-[2.625rem] h-[2.625rem] leading-[2.625rem] text-center text-[1.125rem] text-black bg-white shadow-md rounded-full hover:bg-black hover:text-white"
                    >
                      <AddToCart />
                      <span className="product-tooltip product-tooltip-right absolute left-[100%] right-auto top-[50%] translate-y-[-50%] font-medium text-[0.75rem] text-white bg-black inline-block w-max leading-none px-[0.375rem] py-[0.25rem] rounded-[0.25rem] invisible opacity-0 z-[1] transition-opacity transition-visibility transition-transform duration-300 ease-[cubic-bezier(.71,1.7,.77,1.24)] group-hover:visible group-hover:opacity-100 group-hover:translate-y-[-50%] group-hover:translate-x-[0.5rem]">
                        {t('addtocart')}
                      </span>
                    </button>
                    <button
                      type="button"
                      className="product-action-btn product-add-cart-btn group relative mb-[0.375rem] inline-block w-[2.625rem] h-[2.625rem] leading-[2.625rem] text-center text-[1.125rem] text-black bg-white shadow-md rounded-full hover:bg-black hover:text-white"
                    >
                      <QuickView />
                      <span className="product-tooltip product-tooltip-right absolute left-[100%] right-auto top-[50%] translate-y-[-50%] font-medium text-[0.75rem] text-white bg-black inline-block w-max leading-none px-[0.375rem] py-[0.25rem] rounded-[0.25rem] invisible opacity-0 z-[1] transition-opacity transition-visibility transition-transform duration-300 ease-[cubic-bezier(.71,1.7,.77,1.24)] group-hover:visible group-hover:opacity-100 group-hover:translate-y-[-50%] group-hover:translate-x-[0.5rem]">
                        {t('addtoquickView')}
                      </span>
                    </button>
                    <button
                      type="button"
                      className="product-action-btn product-wishlist-btn group relative mb-[0.375rem] inline-block w-[2.625rem] h-[2.625rem] leading-[2.625rem] text-center text-[1.125rem] text-black bg-white shadow-md rounded-full hover:bg-black hover:text-white"
                    >
                      <WishList />
                      <span className="product-tooltip product-tooltip-right absolute left-[100%] right-auto top-[50%] translate-y-[-50%] font-medium text-[0.75rem] text-white bg-black inline-block w-max leading-none px-[0.375rem] py-[0.25rem] rounded-[0.25rem] invisible opacity-0 z-[1] transition-opacity transition-visibility transition-transform duration-300 ease-[cubic-bezier(.71,1.7,.77,1.24)] group-hover:visible group-hover:opacity-100 group-hover:translate-y-[-50%] group-hover:translate-x-[0.5rem]">
                        {t('addtowishlist')}
                      </span>
                    </button>
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
              <div className="product-content pt-4">
                <h3 className="product-title font-normal text-[20px] mb-[2px]">
                  <Link href="#" className="text hover:text-customPurple">
                    {productName}
                  </Link>
                </h3>
                <div className="product-rating-icon mb-[0.25rem]">
                  {renderStars(4.5)}
                </div>
                <div className="product-price-wrapper">
                  <span className="product-price-new text-[1rem] font-medium text-black">
                    ${productPrice.toFixed(2)}
                  </span>
                  {productOldPrice && (
                    <span className="product-price-old text-sm text-[#767a7d] line-through ml-1">
                      ${productOldPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                {/* <p className="text-sm text-gray-600 mb-4">
                  {productDescription}
                </p> */}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductGrid;
