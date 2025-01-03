'use client';

import { Key, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '../ui/tooltip';
import Image from 'next/image';
import { Product } from '../types/Product';
import Link from 'next/link';
import { Button } from '../ui/button';
import ProductQuantity from './productQuantity';
import ProductRating from './productRating';
import ProductDetailsActions from './ProductDetailsActions';
import ProductDescription from './ProductDescription';
import ProductReviewTab from './ProductReviewTab';
import BestSeller from '../carousel/BestSheller';
import { Label } from '@radix-ui/react-label';
import PriceDisplay from './ProceDisplay';
import TruncatedDescription from './ProductDescription';
import { ProductBreadcrumb } from './Breadcrum';
import AddToCartButton from '../cart/AddToCartButton';

const ProductDetail: React.FC<any> = ({
  id: productId,
  name,
  description,
  masterVariant,
  variants,
  categories,
  categoryId,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedVariantParam = searchParams.get('variant');
  const selectedVariant = variants?.find((v: any) => v.sku === selectedVariantParam) || masterVariant;
  const [selectedImage, setSelectedImage] = useState<string>(
    masterVariant?.images?.[0],
  );
  const [selectedColor, setSelectedColor] = useState(masterVariant.sku);

  useEffect(() => {
    if (selectedVariant) {
      setSelectedColor(selectedVariant.sku);
      setSelectedImage(selectedVariant.images[0]);
    }
  }, [selectedVariant]);

  const masterColor: string = masterVariant.attributes.colors;

  return (
    <TooltipProvider>
      <div className="container mx-auto py-8 px-4 md:px-6">
        {/* Breadcrumb navigation */}
        <ProductBreadcrumb
          categorySlug={categories[0].slug}
          categoryName={categories[0].name}
          productName={name}
        />
        <div className="mt-4 lg:flex lg:space-x-8 space-y-8 lg:space-y-0">
          {/* Middle Section - Main product image */}
          <div className="lg:w-2/3 flex flex-col items-center bg-gray-100 rounded">
            <Image
              src={selectedImage}
              alt="Selected product"
              width={600}
              height={600}
              className="object-cover rounded mb-4"
            />
            <div className="flex gap-4 overflow-x-auto">
              {variants.map((variant: any, index: Key | null | undefined) => (
                <div key={index} className="flex-shrink-0">
                  {variant.images.map((image: string, imgIndex: any) => (
                    <Image
                      key={imgIndex}
                      src={image}
                      alt={`Variant image ${imgIndex + 1}`}
                      width={400}
                      height={400}
                      className={`w-20 h-20 bg-gray-100 object-cover cursor-pointer border rounded transition-all hover:shadow-md ${
                        selectedImage === image
                          ? 'border-blue-500'
                          : 'border-gray-200'
                      }`}
                      onClick={() => {
                        router.push(`/product/${productId}?variant=${variant.sku}`)
                        setSelectedImage(image);
                        setSelectedColor(variant.sku);
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Right Section - Product details */}
          <div className="lg:w-1/3 space-y-6">
            <h1 className="text-5xl font-semibold text-gray-800">{name}</h1>

            <div className="flex items-center">
              <ProductRating />
            </div>

            <TruncatedDescription description={description} />

            {/* Additional Information */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">SKU:</span>
                <p className="text-sm text-gray-600">{selectedVariant.sku}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Category:</span>
                <p className="text-sm text-gray-600">{categories[0].name}</p>
              </div>
            </div>

            {!!masterColor && (
              <div>
                <h2 className="text-sm font-medium text-gray-700">Variants:</h2>
                <div className="flex items-center gap-2 mt-2">
                  {variants.map((variant: any) => {
                    const colorVariant: string = variant.attributes.colors;
                    const variantName = colorVariant || variant.sku;
                    return (
                      <Tooltip key={variant.id}>
                        <TooltipTrigger asChild>
                          <div
                            className={`w-12 h-12 rounded-full cursor-pointer border transition-shadow ${
                              selectedColor === variant.sku
                                ? 'border-blue-500'
                                : 'border-gray-300'
                            }`}
                            style={{ backgroundImage: `url(${variant?.images?.[0]})`, backgroundSize: "contain" }}
                            onClick={() => {
                              setSelectedColor(variant.sku);
                              setSelectedImage(variant.images[0]);
                              router.push(`/product/${productId}?variant=${variant.sku}`)
                            }}
                          ></div>
                        </TooltipTrigger>
                        <TooltipContent>{variantName}</TooltipContent>
                      </Tooltip>
                    )
                  })}
                </div>
              </div>
            )}
            

            <div className="border-t border-gray-200 pt-4">
              <ProductDetailsActions />
            </div>

            
            <div className="flex items-center gap-4">
              {selectedVariant && <PriceDisplay price={selectedVariant.price} discountedPrice={selectedVariant.discountedPrice} />}
            </div>  
            <div>
              <h2 className="text-sm font-medium text-gray-700">Quantity:</h2>
              <div className="flex items-center gap-4 mt-2">
                <ProductQuantity />
                <AddToCartButton sku={masterVariant.sku} quantity={1} />
              </div>
              <Button className="w-full bg-blue-500 text-white py-2 mt-4 rounded-md hover:bg-blue-600">
                Buy Now
              </Button>
            </div>

            {/* Payment Section */}
            <div className="flex items-center justify-between bg-gray-100 p-4 rounded">
              <p className="text-sm text-gray-600">
                Guaranteed safe and secure checkout
              </p>
              <Image
                alt="payment options"
                src="https://shofy-client.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpayment-option.11519bed.png&w=256&q=75"
                width="236"
                height="34"
                className="w-[236px] h-[34px]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <ProductReviewTab
          description={description}
          attributes={selectedVariant.attributes}
        />
      </div>
      {categoryId && <BestSeller categoryId={categoryId} />}
    </TooltipProvider>
  );
};

export default ProductDetail;
