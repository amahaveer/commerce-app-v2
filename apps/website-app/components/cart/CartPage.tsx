'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { getFormattedPrice } from '@/utils/prices';

const CartPage: React.FC = () => {
  const router = useRouter();
  const { lineItems, incrementQuantity, decrementQuantity, removeItem, subTotal, total } = useCart();
  // const FREE_SHIPPING_THRESHOLD = 200;
  // const [shippingCost, setShippingCost] = useState(20);
  // const [selectedShipping, setSelectedShipping] = useState("flat_rate");

  // const handleShippingChange = (value: string) => {
  //   setSelectedShipping(value);
  //   setShippingCost(value === 'flat_rate' ? 20 : value === 'local_pickup' ? 25 : 0);
  // };

  // const total = subtotal + shippingCost;
  // const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  // const amountNeededForFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);

  const handleRedirect = () => {
    router.push('../checkout');
  };

  return (
    <>
      <section className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col space-y-2">
            <h3 className="text-4xl font-medium leading-none mb-1 text-gray-900">
              Shopping Cart
            </h3>
            <div className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-gray-500">
                Home
              </Link>
              <span className="text-gray-500">/</span>
              <span className="text-gray-500">Shopping Cart</span>
            </div>
          </div>
        </div>
      </section>
      <section>
   
        <section className="pb-28">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap -mx-4">
              {/* Cart Items Section */}
              <div className="w-full lg:w-2/3 px-4 mb-6">
                <div className="py-4">
                  {/* <p>
                    {amountNeededForFreeShipping > 0
                      ? `Add $${amountNeededForFreeShipping.toFixed(2)} more to qualify for free shipping`
                      : "You have qualified for free shipping!"}
                  </p> */}

                  {/* Progress Bar */}
                  {/* <Progress value={progress} className="mt-4" /> */}

                  {/* Cart Table */}
                  <Table className="w-full mt-6">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="bg-gray-100 border-b">
                          Product
                        </TableHead>
                        <TableHead className="bg-gray-100 border-b">
                          Name
                        </TableHead>
                        <TableHead className="bg-gray-100 border-b">
                          Price
                        </TableHead>
                        <TableHead className="bg-gray-100 border-b">
                          Quantity
                        </TableHead>
                        <TableHead className="bg-gray-100 border-b">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {lineItems.map((item: any) => (
                        <TableRow key={item.lineItemId}>
                          <TableCell className="border-b border-gray-200">
                            <Link href={`/product/${item.productId}`}>
                              <Image
                                alt={item.name}
                                src={item?.variant.images?.[0]}
                                width={70}
                                height={100}
                                className="object-cover"
                              />
                            </Link>
                          </TableCell>
                          <TableCell className="border-b border-gray-200">
                            {item.name}
                          </TableCell>
                          <TableCell className="border-b border-gray-200">
                            ${getFormattedPrice(item.totalPrice.centAmount, item.totalPrice.fractionDigits).toFixed(2)}
                          </TableCell>
                          <TableCell className="border-b border-gray-200">
                            <div className="flex items-center justify-between border border-gray-300 rounded-full px-4 py-1">
                              <Button
                                onClick={() => decrementQuantity(item.lineItemId)}
                                className="px-2 text-lg font-semibold text-gray-600"
                                variant="ghost"
                                disabled={item.count === 1}
                              >
                                -
                              </Button>
                              <span className="text-gray-700 font-medium">
                                {item.count}
                              </span>
                              <Button
                                onClick={() => incrementQuantity(item.lineItemId)}
                                className="px-2 text-lg font-semibold text-gray-600"
                                variant="ghost"
                              >
                                +
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell className="border-b border-gray-200">
                            <Button
                              onClick={() => removeItem(item.lineItemId)}
                              className="text-gray-600 hover:text-red-600"
                              variant="ghost"
                            >
                              Remove
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Cart Bottom */}
                {/* <div className="flex justify-start lg:justify-end mt-6">
                  <Button className="border border-black text-black bg-white hover:bg-blue-600 hover:text-white hover:border-blue-600 rounded-none">
                    Clear Cart
                  </Button>
                </div> */}
              </div>

              {/* Checkout Section */}
              <div className="w-full lg:w-1/3 px-4">
                <div className="relative bg-white shadow-lg p-9 mb-8 z-10">
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-200">
                    <span className="text-xl font-medium text-gray-900">
                      Subtotal
                    </span>
                    <span className="text-xl font-medium text-gray-900">${subTotal?.toFixed(2)}</span>
                  </div>

                  {/* Shipping Options */}
                  <div className="pb-4 mb-4 border-b border-gray-200">
                    <h4 className="text-base font-medium mb-2">Shipping</h4>
                    <RadioGroup>
                      <div className="flex items-center space-x-2 mb-1">
                        <RadioGroupItem value="flat_rate" id="flat_rate" />
                        <Label htmlFor="flat_rate">
                          Flat rate:{' '}
                          <span className="text-blue-500">$20.00</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 mb-1">
                        <RadioGroupItem
                          value="local_pickup"
                          id="local_pickup"
                        />
                        <Label htmlFor="local_pickup">
                          Local pickup:{' '}
                          <span className="text-blue-500">$25.00</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="free_shipping"
                          id="free_shipping"
                        />
                        <Label htmlFor="free_shipping">Free shipping</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <span className="text-lg font-medium">Total</span>
                    <span className="text-lg font-medium">${total?.toFixed(2)}</span>
                  </div>

                  <div>
                    {/* <Link> */}
                    <Button
                      onClick={handleRedirect}
                      className="bg-gray-900 text-white hover:bg-blue-600 w-full rounded-none"
                    >
                      Proceed to Checkout
                    </Button>
                    {/* </Link> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
   
      </section>
    </>
  );
};

export default CartPage;
