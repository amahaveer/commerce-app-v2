"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import "./styles.css";
import { Button } from "../ui/button";
import { sdk } from '@royalcyber/unified-sdk';
import { IncomingMessage } from 'http';
import { ServerOptions } from '@royalcyber/unified-commerce';
import { getCookie } from '@/utils/cookieManager';
import { cookieName } from '@/context/OktaTokenContext';

function formatProduct(product: any) {
  const {
    variants = [],
    categories = [],
    productId,
    name,
  } = product;
  const [masterVariant = {}] = variants;
  const price = masterVariant.price;
  const formattedPrice = `$${(price.centAmount / 100).toFixed(2)}`;
  const imageUrl = masterVariant.images?.[0] || "";
  const tags = categories.map((category: any) => ({ name: category.name }));

  return {
    id: productId,
    title: name,
    price: formattedPrice,
    oldPrice: "",
    imageUrl,
    link: `/product/${productId}`,
    tag: tags,
    rating: 4, //Hardcoding for now
  };
}

interface IProps {
  categoryId?: string;
}

const BestSeller = ({ categoryId }: IProps) => {
  const [products, setProducts] = useState<any[]>([]);
  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);

    return (
      <div className="flex items-center">
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
    );
  };

  const oktaToken = getCookie(cookieName)

  useEffect(() => {
    if (!categoryId) {
      return;
    }
    const fetchProduct = async () => {
      try {
        sdk.defaultConfigure('en');
        const response = await sdk.composableCommerce.product.query({
          category: categoryId
        }, {
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
          console.error('Error loading product.', response);
        } else {
          const result = (response?.data?.data?.items || []).map((p: any) => formatProduct(p));
          setProducts(result);
        }
      } catch (err: any) {
        console.log('Error loading product:', err);
      }
    };

    fetchProduct();
  }, [categoryId]);

  return (
    <section className="best-seller-area pt-36 pb-36 font-jost">
      <div className="container mx-auto">
        <div className="title-wrapper-2 mb-12 text-left">
          <span className="title font-normal text-[18px] text-customPurple relative z-10 inline-block">
            Best Seller This Week’s
            <svg
              className="absolute bottom-[-8px] left-[26px] z-[-1]"
              width="82"
              height="22"
              viewBox="0 0 82 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M81 14.5798C0.890564 -8.05914 -5.81154 0.0503902 5.00322 21"
                stroke="currentColor"
                strokeOpacity="0.3"
                strokeWidth="2"
                strokeMiterlimit="3.8637"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <h3 className="heading-title text-[35px] sm:text-[44px] font-bold mt-0 leading-tight transition-colors duration-300 ease-out">
            This Week's Featured
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card p-4 border border-gray-200 rounded-lg"
            >
              <div className="product-thumb bg-[#f2f3f5] p-2">
                <Link href={product.link}>
                  <Image
                    className="w-full"
                    src={product.imageUrl}
                    alt={product.title}
                    width={284}
                    height={302}
                  />
                </Link>
              </div>

              <div className="product-content pt-4">
                <div className="product-tag">
                  {product.tag.map((tag: any, index: number) => (
                    <Link
                      href="#"
                      key={index}
                      className="tag-name text-sm text-[#55585B] hover:text-gray-800 inline-block"
                    >
                      {tag.name}
                      {index < product.tag.length - 1 && ", "}
                    </Link>
                  ))}
                </div>

                <h3 className="product-title font-normal text-[20px] mb-[2px]">
                  <Link
                    href={product.link}
                    className="text hover:text-customPurple"
                  >
                    {product.title}
                  </Link>
                </h3>

                <div className="product-rating-icon flex items-center mb-[4px]">
                  {renderStars(product.rating)}
                </div>

                <div className="product-price-wrapper">
                  <span className="product-price-new text-[1rem] font-medium text-black">
                    {product.price}
                  </span>
                  {product.oldPrice && (
                    <span className="product-price-old text-sm text-[#767a7d] line-through ml-1">
                      {product.oldPrice}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
      <div className="mt-[73px] flex justify-center">
        <Link href="#">
          <Button className="bg-transparent border-[1.5px] border-black text-black px-[29px] py-[8px] hover:bg-customPurple hover:text-white hover:scale-105 transition-transform duration-300 animate__animated animate__fadeInUp rounded-none">
            Shop All Products
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default BestSeller;
