'use client';

import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import 'animate.css';
import './styles.css';
import { sdk } from '@royalcyber/unified-sdk';
import { IncomingMessage } from 'http';
import { ServerOptions } from '@royalcyber/unified-commerce';
import { cookieName } from '@/context/OktaTokenContext';
import { getCookie } from '@/utils/cookieManager';

const slides = [
  {
    src: 'https://shofy-fashion.botble.com/storage/fashion/sliders/slider-1.png',
    alt: 'Slide 1',
    heading: 'New Arrivals 2023',
    subheading: 'The Clothing Collection',
    buttonText: 'Shop Collection',
  },
  {
    src: 'https://shofy-fashion.botble.com/storage/fashion/sliders/slider-2.png',
    alt: 'Slide 2',
    heading: 'Best Selling 2023',
    subheading: 'The Summer Collection',
    buttonText: 'Shop Collection',
  },
  {
    src: 'https://shofy-fashion.botble.com/storage/fashion/sliders/slider-3.png',
    alt: 'Slide 3',
    heading: 'Winter Has Arrived',
    subheading: 'Amazing New designs',
    buttonText: 'Shop Collection',
  },
];

const CarouselComponent = () => {
  const swiperRef = useRef(null);
  sdk.defaultConfigure('en');
  const oktaToken = getCookie(cookieName);

  const getCarousalData = async () => {
    const result = await sdk.composableCommerce.product.getProduct(
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
    );
    console.log('result data: ', result);
  };

  useEffect(() => {
    getCarousalData();
  }, []);

  useEffect(() => {
    const plpInfo = async () => {
      const result = await sdk.composableCommerce.product.query(
        { limit: 10, category: 'jewelry' },
        {
          serverOptions: {
            req: {
              headers: {
                'client-type': 'web',
                locale: 'en_US',
                Authorization: 'Bearer ',
              },
            } as unknown as IncomingMessage,
          } as ServerOptions,
        },
      );
      console.log('PLP Data ------->>>>>>>>>>>: ', result);
    };

    plpInfo();
  }, []);

  useEffect(() => {
    const pdpInfo = async () => {
      const result = await sdk.composableCommerce.product.getProduct(
        { sku: 'BAC7SDVX70' },
        {
          serverOptions: {
            req: {
              headers: {
                'client-type': 'web',
                locale: 'en_US',
                Authorization: 'Bearer ',
              },
            } as unknown as IncomingMessage,
          } as ServerOptions,
        },
      );
      console.log('PDP Data ------->>>>>>>>>>>: ', result);
    };

    pdpInfo();
  }, []);

  const resetAnimation = () => {
    const slides = document.querySelectorAll('.animate__animated');

    slides.forEach((slide) => {
      const slideElement = slide as HTMLElement;
      slideElement.style.animation = 'none';

      setTimeout(() => {
        slideElement.style.animation = '';
      }, 10);
    });
  };

  return (
    <div className="relative w-full h-[790px] overflow-hidden bg-[#eff0ed]">
      <Swiper
        ref={swiperRef}
        direction={'vertical'}
        pagination={{
          clickable: true,
          renderBullet: (index, className) =>
            `<span class="${className} !bg-customPurple w-2.5 h-2.5 rounded-full inline-block mx-1 transition-all duration-300 hover:scale-110 !right-[50px]"></span>`,
        }}
        modules={[Pagination]}
        onSlideChange={resetAnimation}
        className="mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[790px] flex justify-center items-center bg-[#eff0ed]">
              <div className="container mx-auto md:flex items-center justify-between">
                <div className="w-1/2 text-center md:text-left">
                  <div className="tp-slider-content-2 text-center md:text-left">
                    <span
                      className="text-[20px] text-black inline-block mb-[15px] animate__animated animate__fadeInUp"
                      style={{ animationDelay: '0.5s' }}
                    >
                      {slide.heading}
                    </span>

                    <h3
                      className="font-normal text-[40px] md:text-[100px] leading-[1.2] mb-[30px] animate__animated animate__fadeInUp"
                      style={{ animationDelay: '1s' }}
                    >
                      {slide.subheading}
                    </h3>

                    <a
                      className="bg-transparent border-[1.5px] border-black text-black px-[29px] py-[8px] hover:bg-customPurple hover:text-white hover:scale-105 transition-transform duration-300 animate__animated animate__fadeInUp"
                      href="/shop"
                      style={{ animationDelay: '1.5s' }}
                    >
                      {slide.buttonText}
                    </a>
                  </div>
                </div>

                <div className="w-full md:w-1/2">
                  <div className="tp-slider-thumb-2-shape relative">
                    <img
                      src="https://shofy-client.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fshape-2.c09b1c50.png&w=48&q=75"
                      alt="shape"
                      loading="lazy"
                      width="43"
                      height="41"
                      decoding="async"
                      data-nimg="1"
                      className="absolute top-[70%] left-[-10px]"
                    />

                    <img
                      src="https://shofy-client.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fshape-3.cbcaeab0.png&w=32&q=75"
                      alt="shape"
                      loading="lazy"
                      width="24"
                      height="24"
                      decoding="async"
                      data-nimg="1"
                      className="absolute bottom-[20%] right-[-8%]"
                    />
                  </div>

                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className="object-contain w-[72%] mt-[7%] mx-auto animate__animated animate__fadeInRight mx-auto object-contain aspect-[3/4]"
                    width={580}
                    height={760}
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarouselComponent;
