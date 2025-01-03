'use client';

import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import Link from 'next/link';
import { useCheckout } from '@/app/Context/CheckoutContext';
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext';


// Zod Schema for validation
const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  streetAddress: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  zipCode: z.string().min(5, 'ZIP code must be 5 digits'),
  shippingMethod: z.enum(['today', '7days']),
  discount: z.number().min(0, 'Discount cannot be negative').optional(),
  paymentMethod: z.enum(['credit', 'cash']),
  orderNotes: z.string(),
  country: z.enum(['DE', 'US']),
});

type FormSchema = z.infer<typeof formSchema>;

const Checkout: React.FC = () => {
const router = useRouter();
  const {
    setBillingDetails,
    setShippingCost,
    setShippingMethod,
    shippingCost,
    discount,
    
  } = useCheckout();

  const { cart, lineItems, subTotal, total, shippingDetails, setShippingDetails, updateCart, orderCart } = useCart();
 

  const [selectedShippingMethod, setSelectedShippingMethod] =
    useState<string>('today');
    const {
      register,
      handleSubmit,
      setValue,
      watch,
      formState: { errors },
    } = useForm<FormSchema>({
      resolver: zodResolver(formSchema),
    });
  
    // Populate form fields when shippingDetails changes
    useEffect(() => {
      if (shippingDetails) {
        Object.entries(shippingDetails).forEach(([key, value]) => {
          setValue(key as keyof FormSchema, value);
        });
      }
      if (cart?.email) {
        setValue('email', cart.email);
      }
    }, [shippingDetails, setValue, cart?.email]);

  // Watching for form field changes
  const watchedShippingMethod = watch('shippingMethod');
  const watchedDiscount = watch('discount', 0);

  // Adjust total based on shipping, discount, and subTotal
  useEffect(() => {
    const cost = watchedShippingMethod === 'today' ? 60 : 20;

    setShippingCost(cost);
    // calculateTotal(newTotal);
  }, [watchedShippingMethod, subTotal, watchedDiscount]);


// const handleShippingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedValue = event.target.value;
    
//     if (selectedValue === 'today') {
//       setShippingMethod('Delivery Today', 60);
//     } else if (selectedValue === '7days') {
//       setShippingMethod('Delivery in 7 Days', 20);
//     }
//     setSelectedShippingMethod(selectedValue);
//   };

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    const shippingDetails = {
      firstName: data.firstName,
      lastName: data.lastName,
      streetAddress: data.streetAddress,
      city: data.city,
      zipCode: data.zipCode,
      phone: data.phone,
      email: data.email,
      orderNotes: data.orderNotes || '',
      country: data.country,
    };

    const billingDetails = {
      paymentMethod: data.paymentMethod,
    };

    // Store data in context
    setShippingDetails(shippingDetails);
    setBillingDetails(billingDetails);
    console.log('Shipping Details: ', shippingDetails);
    console.log('Billing Details: ', billingDetails);
    await updateCart({ shipping: shippingDetails, email: data.email });

    const orderData = await orderCart();
    console.log('----------orderData::', orderData);
    router.push('../invoice/invoice'); //Navigate to completion page.
  };

  const handleRedirect = () => {
    // router.push('../invoice/invoice'); 
  };

  return (
    <div className="container mx-auto py-10 bg-[var(--tp-common-grey-background)]">
      <section className="pt-6 pb-12">
        <div className="container mx-auto px-4">
          {' '}
          {/* Added container and padding */}
          <div className="flex flex-col space-y-2">
            <h3 className="text-4xl font-medium leading-none mb-1 text-gray-900">
              Checkout
            </h3>
            <div className="flex items-center space-x-2 text-sm">
              <Link
                href="/"
                className="text-[16px] text-[var(--tp-text-body)] leading-[1.4] font-normal"
              >
                Home
              </Link>
              <span className="text-[16px] text-[var(--tp-text-body)] leading-[1.4] font-normal">
                /
              </span>
              <span className="text-[16px] text-[var(--tp-text-body)] leading-[1.4] font-normal">
                Checkout
              </span>
            </div>
          </div>
        </div>
      </section>
   

      {/* Billing Details */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-2 gap-10"
      >
  
        {/* Billing Form */}
        <div className="bg-white p-6 shadow-md  pt-[45px] pr-[40px] pb-[24px] pl-[40px]">
          <h2 className="font-semibold text-[26px] mb-[35px] text-[var(--tp-common-black)]">
            Billing Details
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-col mb-[25]">
              <Label
                htmlFor="firstName"
                className="font-medium text-[var(--tp-common-black)] mb-[7px]"
              >
                First Name <span className="text-[#ff0000]">*</span>
              </Label>
              <Input
                {...register('firstName')}
                placeholder="First Name"
                className="w-full bg-white border border-[#d5d8db] h-[50px]  text-[14px] text-[var(--tp-common-black)] leading-[1.4] pl-[26px] pr-[26px] rounded-none "
              />
              {errors.firstName && (
                <p className="text-red-500">{errors.firstName.message}</p>
              )}
            </div>

            <div className="flex flex-col mb-[25]">
              <Label
                htmlFor="lastName"
                className="font-medium text-[var(--tp-common-black)] mb-[7px]"
              >
                Last Name <span className="text-[#ff0000]">*</span>
              </Label>
              <Input
                {...register('lastName')}
                placeholder="Last Name"
                className="w-full bg-white border border-[#d5d8db] h-[50px]  text-[14px] text-[var(--tp-common-black)] leading-[1.4] pl-[26px] pr-[26px] rounded-none "
              />
              {errors.lastName && (
                <p className="text-red-500">{errors.lastName.message}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col mb-[25]">
            <Label
              htmlFor="streetAddress"
              className="font-medium text-[var(--tp-common-black)] mb-[7px]"
            >
              Country <span className="text-[#ff0000]">*</span>
            </Label>
            <Input
              {...register('country')}
              placeholder="United States (US)"
              className="w-full bg-white border border-[#d5d8db] h-[50px]  text-[14px] text-[var(--tp-common-black)] leading-[1.4] pl-[26px] pr-[26px] rounded-none  "
            />
            {errors.streetAddress && (
              <p className="text-red-500">{errors.streetAddress.message}</p>
            )}
          </div>
          <div className="flex flex-col mb-[25]">
            <Label
              htmlFor="streetAddress"
              className="font-medium text-[var(--tp-common-black)] mb-[7px]"
            >
              Street Address <span className="text-[#ff0000]">*</span>
            </Label>
            <Input
              {...register('streetAddress')}
              placeholder="House number and street name"
              className="w-full bg-white border border-[#d5d8db] h-[50px]  text-[14px] text-[var(--tp-common-black)] leading-[1.4] pl-[26px] pr-[26px] rounded-none  "
            />
            {errors.streetAddress && (
              <p className="text-red-500">{errors.streetAddress.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-col mb-[25]">
              <Label
                htmlFor="city"
                className="font-medium text-[var(--tp-common-black)] mb-[7px]"
              >
                Town / City <span className="text-[#ff0000]">*</span>
              </Label>
              <Input
                {...register('city')}
                placeholder="City"
                className="w-full bg-white border border-[#d5d8db] h-[50px]  text-[14px] text-[var(--tp-common-black)] leading-[1.4] pl-[26px] pr-[26px] rounded-none  "
              />
              {errors.city && (
                <p className="text-red-500">{errors.city.message}</p>
              )}
            </div>

            <div className="flex flex-col mb-[25]">
              <Label
                htmlFor="zipCode"
                className="font-medium text-[var(--tp-common-black)] mb-[7px]"
              >
                ZIP Code <span className="text-[#ff0000]">*</span>
              </Label>
              <Input
                {...register('zipCode')}
                placeholder="ZIP Code"
                className="w-full bg-white border border-[#d5d8db] h-[50px]  text-[14px] text-[var(--tp-common-black)] leading-[1.4] pl-[26px] pr-[26px] rounded-none  "
              />
              {errors.zipCode && (
                <p className="text-red-500">{errors.zipCode.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col mb-[25]">
            <Label
              htmlFor="phone"
              className="font-medium text-[var(--tp-common-black)] mb-[7px]"
            >
              Phone <span className="text-[#ff0000]">*</span>
            </Label>
            <Input
              {...register('phone')}
              placeholder="Phone"
              className="w-full bg-white border border-[#d5d8db] h-[50px]  text-[14px] text-[var(--tp-common-black)] leading-[1.4] pl-[26px] pr-[26px] rounded-none  "
            />
            {errors.phone && (
              <p className="text-red-500">{errors.phone.message}</p>
            )}
          </div>
          <div className="flex flex-col mb-[25]">
            <Label
              htmlFor="email"
              className="font-medium text-[var(--tp-common-black)] mb-[7px]"
            >
              Email <span className="text-[#ff0000]">*</span>
            </Label>
            <Input
              {...register('email')}
              placeholder="Email"
              className="w-full bg-white border border-[#d5d8db] h-[50px]  text-[14px] text-[var(--tp-common-black)] leading-[1.4] pl-[26px] pr-[26px] rounded-none  "
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col mb-[25]">
            <Label
              htmlFor="zipCode"
              className="font-medium text-[var(--tp-common-black)] mb-[7px]"
            >
              Order notes (optional)
            </Label>
            <Input
              {...register('orderNotes')}
              placeholder="Notes about your order, e.g., special notes for delivery."
              className="w-full bg-white border border-[#d5d8db] h-[50px]  text-[14px] text-[var(--tp-common-black)] leading-[1.4] pl-[26px] pr-[26px] rounded-none h-40"
            />
            {errors.orderNotes && (
              <p className="text-red-500">{errors.orderNotes.message}</p>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 shadow-md  pt-[45px] pr-[40px] pb-[24px] pl-[40px] lg:h-[75%]">
          <h2 className="font-semibold text-[26px]  text-[var(--tp-common-black)]">
            Your Order
          </h2>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold text-[16px]  text-[var(--tp-common-black)]">
                  Product
                </TableHead>
                <TableHead className="font-semibold text-[16px]  text-[var(--tp-common-black)]">
                  Total
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lineItems.map((lineItem) => {
                return <TableRow>
                <TableCell className="font-normal text-[15px]  text-[var(--tp-common-black)]">
                  {`${lineItem.name}`}
                </TableCell>
                <TableCell className="font-normal text-[15px]  text-[var(--tp-common-black)]">
                  {`$${((lineItem.totalPrice?.centAmount || 0) / 100).toFixed(2)}`}
                </TableCell>
              </TableRow>
              })}
              <TableRow>
                <TableCell className="font-semibold text-[16px]  text-[var(--tp-common-black)]">
                  Sub Total
                </TableCell>
                <TableCell className="font-normal text-[16px]  text-[var(--tp-common-black)]">
                  ${subTotal?.toFixed(2)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-normal text-[15px]  text-[var(--tp-common-black)]">
                  Shipping
                </TableCell>
                <TableCell>
                  <RadioGroup
                    defaultValue="today"
                    onChange={(event) => {
                      const selectedValue = (event.target as HTMLInputElement).value; 
                      if (selectedValue === 'today') {
                        setShippingMethod('Delivery Today', 60); 
                      } else if (selectedValue === '7days') {
                        setShippingMethod('Delivery in 7 Days', 20); 
                      }
                    }}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <RadioGroupItem
                        {...register('shippingMethod')}
                        value="today"
                        id="today"
                      />
                      <Label
                        htmlFor="today"
                        className="font-normal text-[15px] text-[var(--tp-common-black)]"
                      >
                        Delivery Today: $60.00
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        {...register('shippingMethod')}
                        value="7days"
                        id="7days"
                      />
                      <Label
                        htmlFor="7days"
                        className="font-normal text-[15px] text-[var(--tp-common-black)]"
                      >
                        Delivery in 7 Days: $20.00
                      </Label>
                    </div>
                  </RadioGroup>
                  {errors.shippingMethod && (
                    <p className="text-red-500">
                      {errors.shippingMethod.message}
                    </p>
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-normal text-[15px]  text-[var(--tp-common-black)]">
                  Subtotal
                </TableCell>
                <TableCell className="font-normal text-[15px]  text-[var(--tp-common-black)]">
                  ${subTotal?.toFixed(2)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-normal text-[15px]  text-[var(--tp-common-black)]">
                  Shipping
                </TableCell>
                <TableCell className="font-normal text-[15px]  text-[var(--tp-common-black)]">
                  ${shippingCost.toFixed(2)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-normal text-[15px]  text-[var(--tp-common-black)]">
                  Discount
                </TableCell>
                <TableCell>
                  {/* <Input
                    type="number"
                    placeholder="Enter Discount"
                    {...register('discount')}
                  />
                  {errors.discount && (
                    <p className="text-red-500">{errors.discount.message}</p>
                  )} */}
                  {/* {watchedDiscount > 0 && (
                    <div className="flex justify-between mb-2">
                      <span>Discount</span>
                      <span>-${watchedDiscount.toFixed(2)}</span>
                    </div>
                  )} */}
                  {discount ? `-$${discount.toFixed(2)}` : '$0.00'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-[16px]  text-[var(--tp-common-black)]">
                  Total
                </TableCell>
                <TableCell className="font-semibold text-[16px]  text-[var(--tp-common-black)]">
                  ${total?.toFixed(2)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>


          <RadioGroup>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  {...register('paymentMethod')}
                  value="credit"
                  id="credit"
                />
                <Label htmlFor="credit">Credit Card</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  {...register('paymentMethod')}
                  value="cash"
                  id="cash"
                />
                <Label htmlFor="cash">Cash on Delivery</Label>
              </div>
            </div>
          </RadioGroup>
          {errors.paymentMethod && (
            <p className="text-red-500">{errors.paymentMethod.message}</p>
          )}

          <Button
            type="submit"
            onClick={handleRedirect}
            className="w-full px-6 py-2 bg-[var(--tp-customBlue-primary)] text-white border-[var(--tp-common-black)] hover:bg-[var(--tp-common-black)] transition inline-block text-base font-medium px-8 py-2 h-[46] !mt-[5%] rounded-none"
          >
            Buy Now
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
function updateBillingDetails(arg0: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  zipCode: string;
}) {
  throw new Error('Function not implemented.');
}
