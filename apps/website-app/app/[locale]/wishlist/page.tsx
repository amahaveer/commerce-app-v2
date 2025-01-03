"use client";
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import Image from 'next/image';
import { useWishList } from '@/context/WishListContext';
import Breadcrumb from '@/components/Products/Breadcrumb';
import Buttons from '@/components/Products/Buttons';
import { getFormattedPrice } from '@/utils/prices';
import { useCart } from '@/context/CartContext';
// import { useCart } from '@/context/CartContext';


function WishlistPage() {
  const { wishList, decrementQuantity,incrementQuantity, removeItem, loading, setLoading } = useWishList();
  const {handleAddToCart} = useCart()

  return (
    <>
      {/* Breadcrumb Section */}
      {/* <section className="pt-24 pb-12 font-jost">
        <div className="container mx-auto px-4">
          <div className="flex flex-col space-y-2">
            <h3 className="text-[44px] font-medium leading-none mb-1 text-gray-900">Wishlist</h3>
            <div className="flex items-center space-x-2 text-sm">
                <Link href="/" className=" text-[1rem] text-footerSecondary hover:text-blue-600 ">
                    Home
                </Link>
                <span className="text-footerSecondary">/</span>
                <span className="text-footerSecondary text-[1rem]">Wishlist</span>
            </div>
          </div>
        </div>
      </section> */}

      <Breadcrumb
        title="Wishlist"
        items={[
          { label: 'Home', href: '/' },
          { label: 'Wishlist' }
        ]}
      ></Breadcrumb>

      {/* Conditional Rendering: Show cart or empty message */}
      {wishList.length === 0 && !loading ? (
        <section className="pt-12 pb-28 font-jost">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-[28px] text-[#010f1c] font-bold mb-[0.5rem]">No Wishlist Items Found</h3>
            <Buttons
              href="/" 
              children='Continue Shopping'
              className=" text-[1rem] px-[2rem] py-[0.5rem] mt-6 rounded-none hover:bg-blue-600"
            >
            </Buttons>
          </div>
        </section>
      ) : (

        <section>
          <div className="w-full px-4 mb-6 container pb-[7.5rem]">
            <div className="py-4">
              {/* Cart Table */}
              <Table className="w-full mt-6">
                <TableHeader>
                  <TableRow>
                    <TableHead  className="bg-gray-100 border-b pr-4 py-[9px] pl-[2.75rem]">Product</TableHead>
                    <TableHead className="bg-gray-100 border-b px-[1rem] py-[9px]">Price</TableHead>
                    <TableHead className="bg-gray-100 border-b px-[1rem] py-[9px]">Quantity</TableHead>
                    <TableHead className="bg-gray-100 border-b px-[1rem] py-[9px]">Actions</TableHead>
                    <TableHead className="bg-gray-100 border-b px-[1rem] py-[9px]"></TableHead>

                  </TableRow>
                </TableHeader>
                <TableBody>
                  {wishList.map((item) => (
                    <TableRow key={item.lineItemId} className='hover:bg-white'>
                      <TableCell className="border-b border-gray-200 pt-[1.75rem] pb-[1.25rem] pl-0 pr-4 flex items-center ">
                      
                        <Link href={`/product/${item.productId}`}>
                          <Image
                            alt={item.name as string}
                            src={item.variant?.images?.[0]?.url || ''}
                            width={70}
                            height={100}
                            layout="cover"
                            className="product-image bg-[#f2f3f5] w-[5rem] h-[6.25rem] max-w-[5rem]"
                          />
                        </Link>
                        <Link href={`/product/${item.productId}`} className="text-black text-[16px] ml-[1.25rem] hover:text-blue-600">
                                  {item.name as string}
                              </Link>
                      </TableCell>
                      <TableCell className="border-b border-gray-200 pt-[1.75rem] pb-[1.25rem] px-[1rem] text-[1rem]">${getFormattedPrice(item?.variant?.price?.centAmount, item.variant?.price?.fractionDigits)}</TableCell>
                      <TableCell className="border-b border-gray-200 pt-[1.75rem] pb-[1.25rem] px-[1rem]">
                        <div className="flex items-center justify-between border border-gray-300 rounded-full px-4 py-0 w-[6.5rem]">
                          <Button
                            onClick={() => decrementQuantity(item.lineItemId as string)}
                            className="px-2 text-lg font-semibold text-gray-600 py-0"
                            variant="ghost"
                            disabled={item.count === 1}
                          >
                            -
                          </Button>
                          <span className="text-gray-700 font-medium">{item.count}</span>
                          <Button
                            onClick={() => incrementQuantity(item.lineItemId as string)}
                            className="px-2 text-lg font-semibold text-gray-600 py-0"
                            variant="ghost"
                          >
                            +
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="border-b border-gray-200 pt-[1.75rem] pb-[1.25rem] px-[1rem]">
                          <Button
                            children={loading ? 'Adding to Cart' :'Add To Cart'}
                            className=" text-white bg-blue-600 hover:bg-black hover:text-white rounded-none"
                            onClick={async() => {
                              setLoading(true)
                              await handleAddToCart({variant: {sku: item.variant?.sku as string, count: item.count as number}})
                              setLoading(false)
                            }}
                          >
                          </Button>
                      </TableCell>
                      
                      <TableCell className="border-b border-gray-200 pt-[1.75rem] pb-[1.25rem] px-[1rem]">
                        <Button
                          onClick={() => removeItem(item.lineItemId as string)}
                          className="text-gray-600 hover:text-red-600 hover:bg-white items-center gap-1"
                          variant="ghost"
                        >
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M9.53033 1.53033C9.82322 1.23744 9.82322 0.762563 9.53033 0.46967C9.23744 0.176777 8.76256 0.176777 8.46967 0.46967L5 3.93934L1.53033 0.46967C1.23744 0.176777 0.762563 0.176777 0.46967 0.46967C0.176777 0.762563 0.176777 1.23744 0.46967 1.53033L3.93934 5L0.46967 8.46967C0.176777 8.76256 0.176777 9.23744 0.46967 9.53033C0.762563 9.82322 1.23744 9.82322 1.53033 9.53033L5 6.06066L8.46967 9.53033C8.76256 9.82322 9.23744 9.82322 9.53033 9.53033C9.82322 9.23744 9.82322 8.76256 9.53033 8.46967L6.06066 5L9.53033 1.53033Z" fill="currentColor"></path></svg>
                          <span>Remove</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

              <div className="flex justify-start mt-6">
                <Buttons
                  href="/cart" 
                  children='Go To Cart'
                  className="border border-black text-black bg-white hover:bg-blue-600 hover:text-white hover:border-blue-600 rounded-none"
                >
                </Buttons>
              </div>
          </div> 
        </section>

      )}
    </>
  );
}
export default WishlistPage;
