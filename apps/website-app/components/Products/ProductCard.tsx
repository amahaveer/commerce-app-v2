// components/ProductCard.js

import Image from 'next/image';
import Link from 'next/link';
import AddToCart from '@/app/icons/ProductIcon/AddToCart'; // Adjust imports accordingly
import QuickView from '@/app/icons/ProductIcon/QuickView';
import WishList from '@/app/icons/ProductIcon/WishList';
import AddToCompare from '@/app/icons/ProductIcon/AddToCompare';
import renderStar from './renderStar';
import { useTranslations } from 'next-intl';

// interface Product {
//     id: string;
//     title: string;
//     imageUrl: string;
//     price: string;
//     oldPrice: string;
//     tag: { name: string }[];
//     rating: number;
//     available:string;
//     link:string;
//     category:string;
//   }

//   interface ProductCarouselItemProps {
//     product: Product;
//   }

const ProductCard = ({ product }: any) => {
  console.log(product);
  const t = useTranslations('productCard');
  return (
    <div className="product-wrapper w-full mb-10">
      <div className="product-items">
        <div className="product-thumb bg-productBg relative z-[1]">
          <Link href="">
            <Image
              className="w-full transition-transform duration-300 ease-out images"
              src={product?.imageUrl || product?.variants[0]?.images[0] || ''}
              alt={product.title}
              layout="contain"
              width={284}
              height={302}
            />
          </Link>
          {product.available === 'Out-Stock' && (
            <div className="product-badge absolute top-[1rem] right-[1.25rem] z-[1]">
              <span className="product-hot font-medium text-[0.87rem] leading-[1] text-white bg-[#fd2d6c] rounded-[0.25rem] inline-block px-[0.5rem] pt-[0.25rem] pb-[2px] capitalize">
                {product.available}
              </span>
            </div>
          )}
          <div className="product-action product-action-blackStyle absolute left-0 right-auto bottom-auto top-[3.6rem] z-[1] invisible opacity-0 transition-all ease-out duration-500 group-hover:visible group-hover:opacity-100">
            <div className="product-action-item flex flex-col">
              {/* Add to Cart Button */}
              <button
                type="button"
                className="product-action-btn product-add-cart-btn group mb-[0.025rem] 
                            relative inline-block w-[2.625rem] h-[2.625rem] leading-[2.625rem] text-center text-[1.125rem] text-black bg-white shadow-[0_0.0625rem_0.125rem_rgba(1,15,28,0.2)] rounded-full mb-[0.375rem]
                            hover:bg-black hover:text-white
                          "
              >
                <Link href="/">
                  <AddToCart></AddToCart>
                  <span
                    className="product-tooltip product-tooltip-right
                                absolute left-[100%] right-auto top-[50%] translate-y-[-50%] right-[100%] font-medium text-[0.75rem] text-white bg-black inline-block w-max leading-none px-[0.375rem] py-[0.25rem] rounded-[0.25rem] invisible opacity-0 z-[1] transition-opacity transition-visibility transition-transform duration-300 ease-[cubic-bezier(.71,1.7,.77,1.24]
                                group-hover:visible group-hover:opacity-100 group-hover:translate-y-[-50%] group-hover:translate-x-[0.5rem]
                              "
                  >
                    {t('addToCart')}
                  </span>
                </Link>
              </button>

              {/* Quick View Button */}
              <button
                type="button"
                className="product-action-btn product-quick-view-btn group mb-[0.025rem] 
                            relative inline-block w-[2.625rem] h-[2.625rem] leading-[2.625rem] text-center text-[1.125rem] text-black bg-white shadow-[0_0.0625rem_0.125rem_rgba(1,15,28,0.2)] rounded-full mb-[0.375rem]
                            hover:bg-black hover:text-white
                          "
              >
                <Link href="/">
                  <QuickView></QuickView>
                  <span
                    className="product-tooltip product-tooltip-right
                                absolute left-[100%] right-auto top-[50%] translate-y-[-50%] right-[100%] font-medium text-[0.75rem] text-white bg-black inline-block w-max leading-none px-[0.375rem] py-[0.25rem] rounded-[0.25rem] invisible opacity-0 z-[1] transition-opacity transition-visibility transition-transform duration-300 ease-[cubic-bezier(.71,1.7,.77,1.24]
                                group-hover:visible group-hover:opacity-100 group-hover:translate-y-[-50%] group-hover:translate-x-[0.5rem]
                              "
                  >
                    {t('quickView')}
                  </span>
                </Link>
              </button>

              {/* Wishlist Button */}
              <button
                type="button"
                className="product-action-btn product-wishlist-btn group mb-[0.025rem]
                            relative inline-block w-[2.625rem] h-[2.625rem] leading-[2.625rem] text-center text-[1.125rem] text-black bg-white shadow-[0_0.0625rem_0.125rem_rgba(1,15,28,0.2)] rounded-full mb-[0.375rem]
                            hover:bg-black hover:text-white
                          "
              >
                <Link href="/">
                  <WishList></WishList>
                  <span
                    className="product-tooltip product-tooltip-right
                                absolute left-[100%] right-auto top-[50%] translate-y-[-50%] right-[100%] font-medium text-[0.75rem] text-white bg-black inline-block w-max leading-none px-[0.375rem] py-[0.25rem] rounded-[0.25rem] invisible opacity-0 z-[1] transition-opacity transition-visibility transition-transform duration-300 ease-[cubic-bezier(.71,1.7,.77,1.24]
                                group-hover:visible group-hover:opacity-100 group-hover:translate-y-[-50%] group-hover:translate-x-[0.5rem]
                              "
                  >
                    {t('addToWishList')}
                  </span>
                </Link>
              </button>

              {/* Add to Compare */}
              <button
                type="button"
                className="product-action-btn product-add-to-compare-btn mb-[0.025rem] group
                            relative inline-block w-[2.6rem] h-[2.6rem] leading-[2.6rem] text-center text-[1.125rem] text-black bg-white shadow-[0_0.0625rem_0.125rem_rgba(1,15,28,0.2)] rounded-full mb-[0.375rem]
                            hover:bg-black hover:text-white
                          "
              >
                <Link href="/">
                  <AddToCompare></AddToCompare>
                  <span
                    className="product-tooltip product-tooltip-right
                                absolute left-[100%] right-auto top-[50%] translate-y-[-50%] right-[100%] font-medium text-[0.75rem] text-white bg-black inline-block w-max leading-none px-[0.375rem] py-[0.25rem] rounded-[0.25rem] invisible opacity-0 z-[1] transition-opacity transition-visibility transition-transform duration-300 ease-[cubic-bezier(.71,1.7,.77,1.24]
                                group-hover:visible group-hover:opacity-100 group-hover:translate-y-[-50%] group-hover:translate-x-[0.5rem]
                              "
                  >
                    {t('addToCompare')}
                  </span>
                </Link>
              </button>
            </div>
          </div>
        </div>

        <div className="product-content pt-4 text-justify">
          {/* Product Tag */}
          <div className="product-tag">
            {/* {product?.variants?.map((productVariant: any, index: any) => (
              <Link
                href="#"
                key={index}
                className="tag-name text-sm text-productText hover:text-gray-800 text-base relative inline-block leading-none"
              >
                {productVariant.sku.name}
                {index < productVariant.sku?.length - 1 && ', '}
              </Link>
            ))} */}
          </div>

          {/* Product Title */}
          <h3 className="product-title text-black font-normal text-[1.25rem] mb-[2px]">
            <Link href="#" className=" text hover:text-customPurple">
              {product.title}
            </Link>
          </h3>

          {/* Rating Section */}
          <div className="product-rating-icon mr-[0.37rem] flex items-center mb-[0.25rem]">
            {/* {renderStar(product.rating)} */}
          </div>

          {/* Product Price */}
          <div className="product-price-wrapper">
            <span className="product-price-new text-[1rem] font-medium text-black">
              {product.price}
            </span>
            <span className="product-price-old text-sm text-[#767a7d] line-through ml-1">
              {' '}
              {product.oldPrice}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
