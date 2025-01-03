'use client';

import React, { useEffect, useState } from 'react';
import { sdk } from '@royalcyber/unified-sdk';
import { IncomingMessage } from 'http';
import { ServerOptions } from '@royalcyber/unified-commerce';
import { cookieName } from '@/context/OktaTokenContext';
import { getCookie } from '@/utils/cookieManager';

const productCardComponent = () => {
  const [items, setItems] = useState([] as any);

  const getCarousalData = async () => {
    const oktaToken = getCookie(cookieName);
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
    if (result && result?.data) {
      if (result.data.data.items && result.data.data.items?.length) {
        const resultFinal = result.data.data.items.filter(
          (item: { parentId: string }) => item.parentId === 'fashion',
        );
        setItems(resultFinal);
      }
    }
  };

  useEffect(() => {
    getCarousalData();
  }, []);

  return (
    <section className="mt-5">
      <div className=" px-2">
        <div className="flex flex-wrap ">
          {items &&
            items?.map(
              (
                item: {
                  image: any;
                  link: string | undefined;
                  name:
                    | string
                    | number
                    | bigint
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | Promise<React.AwaitedReactNode>
                    | null
                    | undefined;
                },
                index: React.Key | null | undefined,
              ) => (
                <div
                  key={index}
                  className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/3 px-2.5 mb-6 "
                >
                  <div className="relative bg-gray-200 min-h-[280px] z-[1] px-[48px] pt-[65px] pb-[55px] overflow-hidden">
                    <div
                      className="absolute w-[100%] h-[100%] top-0 left-0 mb-4 bg-cover bg-center z-[-1]  transition-transform duration-300 ease-in-out hover:scale-110"
                      style={{
                        backgroundImage: `url(${item.image || 'https://i.ibb.co/ZWfqMXs/fashion-cat-1.jpg'})`,
                      }}
                    ></div>
                    <h3 className="font-normal text-[36px] leading-[1.17] mb-5">
                      <a
                        href={item.link}
                        className="cursor-pointer hover:text-customPurple"
                      >
                        {item.name}
                      </a>
                    </h3>
                    <div>
                      <a
                        href={item.link}
                        className="inline-flex items-center  border border-black text-black hover:bg-customPurple hover:text-white transition-colors duration-200
                    px-[25px] py-[5px] text-[16px] cursor-pointer"
                      >
                        Shop Now
                        <svg
                          width="17"
                          height="14"
                          viewBox="0 0 17 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="ml-2"
                        >
                          <path
                            d="M16 7H1"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M9.95 0.975L16 7L9.95 13.025"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ),
            )}
        </div>
      </div>
    </section>
  );
};

export default productCardComponent;
