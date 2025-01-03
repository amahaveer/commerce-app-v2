'use client';
import Link from 'next/link';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';
import {products} from './ProductData'

import Productheading from './Productheading';
import { useTranslations } from 'next-intl';
import ProductCard from './ProductCard';

function TrendingProducts() {

  const t = useTranslations('trendingProducts');
 
  return (
    <section className="trending-area pt-36 pb-36 font-jost">
      <div className="container mx-auto xs:flex xs:flex-col lg:!flex-row justify-center">

        <div className="xl:w-1/2 lg:w-1/2 px-3">
          <div className="trending-wrapper">
            <Productheading 
              title={t("title")}
              subtitle={t("subtitle")}
            />

            {/* Swiper for Trending Products */}
            <Swiper
            slidesPerView={2}
              spaceBetween={30}
              breakpoints={{
                344: {
                  slidesPerView: 1,
                  
                },
                640: {
                  slidesPerView: 2,
                  
                },
                768: {
                  slidesPerView: 2,
                  
                },
                1024: {
                  slidesPerView: 2,
                  
                },
                1280: {
                  slidesPerView: 2,
                  
                },
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {/* Swiper Slides */}
              {products.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product}/>
              </SwiperSlide>
              ))}              
            </Swiper>
          </div>
        </div>

        <div className="xl:w-1/3 lg:w-5/12 md:w-2/3 sm:w-5/6 sm:px-3 flex flex-col sm:self-center lg:h-auto">
            <div className="trending-banner relative h-[26.875rem] lg:ml-[2.1875rem] lg:!h-[39.375rem] xs:h-[26.875rem] mt-[3.125rem] lg:mt-0">
                {/* Background Image */}
                <div
                    className="w-full h-inherit bg-cover sm:bg-top sm:bg-center"
                    style={{
                        backgroundImage: `url('https://shofy-client.vercel.app/_next/static/media/trending-banner.0fa1fee7.jpg')`,
                        height: 'inherit'
                    }}
                ></div>

                {/* Content */}
                <div className="trending-banner-content absolute top-0 bottom-[2.5rem] left-[2.1875rem] flex flex-col justify-end items-start z-[1]">
                    {/* Title */}
                    <h3 className="trending-banner-title text-3xl font-semibold text-white mb-[1.125rem]">
                        <Link href="/shop">
                            {t("slogan")}
                        </Link>
                    </h3>

                    {/* Button */}
                    <div className="">
                        <Link href="/" className="inline-flex items-center px-5 py-2 border border-white text-white hover:bg-black hover:text-white hover:border-black transition-all duration-300">
                            {t("explore")}
                            <svg
                                className="ml-2"
                                width="17"
                                height="14"
                                viewBox="0 0 17 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M16 6.99976L1 6.99976"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>
                                <path
                                    d="M9.9502 0.975414L16.0002 6.99941L9.9502 13.0244"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        
      </div>
    </section>
  );
}
export default TrendingProducts;
