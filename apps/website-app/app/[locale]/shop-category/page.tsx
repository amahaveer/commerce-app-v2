import Link from 'next/link';
import React from 'react';

function page() {
  return (
    <div>
      <section className="pt-[6rem] pb-[3rem] font-jost">
        <div className="container mx-auto px-4">
          <div className="flex flex-col space-y-2">
            <h3 className="text-[44px] font-medium leading-none mb-1 text-gray-900">
              Only Categories
            </h3>
            <div className="flex items-center space-x-2 text-sm">
              <Link
                href="/"
                className=" text-[1rem] text-footerSecondary hover:text-blue-600 "
              >
                Home
              </Link>
              <span className="text-footerSecondary">/</span>
              <span className="text-footerSecondary text-[1rem]">
                Only Categories
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className='pb-[7.5rem]'>
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="relative bg-gray-200">
              <div className="pb-1 h-[8.75rem] flex flex-col items-center justify-center">
                <h3 className="text-lg font-semibold hover:text-blue-600">
                  <Link
                    href=""
                    className="cursor-pointer text-[1.5rem] font-semibold"
                  >
                    Headphones
                  </Link>
                </h3>
                <span className="text-sm text-gray-600 text-[0.87rem]">
                  2 Products
                </span>
              </div>
            </div>

            <div className="relative bg-gray-200">
              <div className="pb-1 h-[8.75rem] flex flex-col items-center justify-center">
                <h3 className="text-lg font-semibold hover:text-blue-600">
                  <Link
                    href=""
                    className="cursor-pointer text-[1.5rem] font-semibold"
                  >
                    Shoes
                  </Link>
                </h3>
                <span className="text-sm text-gray-600 text-[0.87rem]">
                  3 Products
                </span>
              </div>
            </div>
            
            <div className="relative bg-gray-200">
              <div className="pb-1 h-[8.75rem] flex flex-col items-center justify-center">
                <h3 className="text-lg font-semibold hover:text-blue-600">
                  <Link
                    href=""
                    className="cursor-pointer text-[1.5rem] font-semibold"
                  >
                    Bags
                  </Link>
                </h3>
                <span className="text-sm text-gray-600 text-[0.87rem]">
                  4 Products
                </span>
              </div>
            </div>

            <div className="relative bg-gray-200">
              <div className="pb-1 h-[8.75rem] flex flex-col items-center justify-center">
                <h3 className="text-lg font-semibold hover:text-blue-600">
                  <Link
                    href=""
                    className="cursor-pointer text-[1.5rem] font-semibold"
                  >
                    Bluetooth
                  </Link>
                </h3>
                <span className="text-sm text-gray-600 text-[0.87rem]">
                  1 Products
                </span>
              </div>
            </div>

            <div className="relative bg-gray-200">
              <div className="pb-1 h-[8.75rem] flex flex-col items-center justify-center">
                <h3 className="text-lg font-semibold hover:text-blue-600">
                  <Link
                    href=""
                    className="cursor-pointer text-[1.5rem] font-semibold"
                  >
                    Smart Watches
                  </Link>
                </h3>
                <span className="text-sm text-gray-600 text-[0.87rem]">
                  5 Products
                </span>
              </div>
            </div>

            <div className="relative bg-gray-200">
              <div className="pb-1 h-[8.75rem] flex flex-col items-center justify-center">
                <h3 className="text-lg font-semibold hover:text-blue-600">
                  <Link
                    href=""
                    className="cursor-pointer text-[1.5rem] font-semibold"
                  >
                    Mobile Tablets
                  </Link>
                </h3>
                <span className="text-sm text-gray-600 text-[0.87rem]">
                  9 Products
                </span>
              </div>
            </div>

            <div className="relative bg-gray-200">
              <div className="pb-1 h-[8.75rem] flex flex-col items-center justify-center">
                <h3 className="text-lg font-semibold hover:text-blue-600">
                  <Link
                    href=""
                    className="cursor-pointer text-[1.5rem] font-semibold"
                  >
                    Clothing
                  </Link>
                </h3>
                <span className="text-sm text-gray-600 text-[0.87rem]">
                  4 Products
                </span>
              </div>
            </div>

            <div className="relative bg-gray-200">
              <div className="pb-1 h-[8.75rem] flex flex-col items-center justify-center">
                <h3 className="text-lg font-semibold hover:text-blue-600">
                  <Link
                    href=""
                    className="cursor-pointer text-[1.5rem] font-semibold"
                  >
                    CPU Heat Pipes
                  </Link>
                </h3>
                <span className="text-sm text-gray-600 text-[0.87rem]">
                  2 Products
                </span>
              </div>
            </div>

            <div className="relative bg-gray-200">
              <div className="pb-1 h-[8.75rem] flex flex-col items-center justify-center">
                <h3 className="text-lg font-semibold hover:text-blue-600">
                  <Link
                    href=""
                    className="cursor-pointer text-[1.5rem] font-semibold"
                  >
                    Braceletes
                  </Link>
                </h3>
                <span className="text-sm text-gray-600 text-[0.87rem]">
                  2 Products
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default page;
