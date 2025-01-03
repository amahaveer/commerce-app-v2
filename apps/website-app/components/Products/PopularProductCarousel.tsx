'use client';

import React, { useEffect, useState } from 'react';

// import React from 'react';
import Image from 'next/image';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import { cookieName } from '@/context/OktaTokenContext';
import { getCookie } from '@/utils/cookieManager';
// import './styles.css'
// import required modules
import { Scrollbar } from 'swiper/modules';
import Link from 'next/link';
// import { products } from './ProductData';
import Productheading from './Productheading';
import { useTranslations } from 'next-intl';
import { IncomingMessage } from 'http';
import { ServerOptions } from '@royalcyber/unified-commerce';
import { sdk } from '@royalcyber/unified-sdk';

function PopularProductCarousel() {
  const [products, setProducts] = useState([] as any);
  const t = useTranslations('popularProductCarousel');
  const oktaToken = getCookie(cookieName);

  const getCarousalData = async () => {
    const result = (await sdk.composableCommerce.product.query(
      { category: 'fashion' },
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
    if (result && result?.data) {
      setProducts(result.data.data.items);
    }
  };

  useEffect(() => {
    getCarousalData();
  }, []);

  return (
    <div className="popular-product-carousel container m-auto px-4 pt-24 pb-24 font-jost">
      <div className="grid grid-cols-1 headings text-center">
        <Productheading title={t('title')} subtitle={t('subtitle')} />
      </div>
      <Swiper
        slidesPerView={5}
        spaceBetween={20}
        breakpoints={{
          344: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
        scrollbar={{
          hide: false,
          draggable: true,
        }}
        modules={[Scrollbar]}
        className="mySwiper "
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 font-jost">
          {products &&
            products?.map((product: any) => (
              <SwiperSlide key={product.id}>
                <div className="pop-products relative group mb-24 w-full">
                  <div className="bg-productBg pop-products-image">
                    <Link href="/">
                      <Image
                        className="w-[100%]"
                        src={product?.variants[0]?.images[0]}
                        alt={product.name}
                        layout="contain"
                        width={224}
                        height={260}
                      />
                    </Link>
                  </div>

                  <div
                    className="pop-products-content absolute top-[0.9rem] left-[0.9rem] bottom-[0.9rem] right-[0.9rem] flex flex-col justify-center items-center z-10 bg-white
                        opacity-0 transition duration-1000 ease-in-out 
                        group-hover:opacity-100 
                        "
                  >
                    <span
                      className="mb-[0.2rem] text-productText
                        opacity-0 transform translate-y-[0.6rem] transition-all duration-500 delay-300
                        group-hover:opacity-100 group-hover:translate-y-0      "
                    >
                      {product.variants[0]?.price.centAmount}
                    </span>

                    <h3
                      className="mb-[1rem] text-[1.25rem] font-normal text-black
                        opacity-0 transform translate-y-[0.62rem] transition-all duration-500 delay-500
                        group-hover:opacity-100 group-hover:translate-y-0"
                    >
                      <Link href="/">{product.name}</Link>
                    </h3>

                    <div className="add-cart-btn text-[0.87rem] w-[60%]">
                      <Link
                        href="/"
                        className="bg-transparent inline-block text-[0.87rem] border-[1.5px] border-solid border-[#010f1c] inline-block py-[0.0625rem] px-[0.93rem] 
                            hover:bg-customPurple hover:text-white hover:border-solid hover:border-white
                            opacity-0 transform translate-y-[0.62rem] transition-all duration-700 delay-500 
                            group-hover:opacity-100 group-hover:translate-y-0"
                      >
                        {t('addToCart')}
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </div>
      </Swiper>
    </div>
  );
}

export default PopularProductCarousel;
