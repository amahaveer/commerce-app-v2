import Image from "next/image";
import styles from "./page.module.css";
import { Button } from "@/components/ui/button";
import { client } from "@/lib/contentful/client";
import ContentfulImage from "@/components/contentful/ContentfulImage";
import CarouselComponent from "@/components/carousel/carouselComponent";
import ProductCardComponent from "@/components/carousel/productCardComponent";
import ReviewCarousel from "@/components/review/reviewCarousel";
import Blogs from "@/components/blogNews/Blogs";
import Feature from "@/components/blogNews/Delivery";
import InstagramSection from "@/components/instagramSection/InstagramSection";

import BestSheller from "@/components/carousel/BestSheller";
import TrendingProducts from "@/components/Products/TrendingProducts";
import PopularProductCarousel from "@/components/Products/PopularProductCarousel";
import FavoriteProduct from "@/components/Products/FavoriteProduct";


export default async function Home() {
  let data = await client.getEntry("2cayfg7wVF5WezADCHgSgL");
  const { heroBannerImage, title } = data.fields;

  return (
    <div>
      {/* <ContentfulImage
        alt="title"
        src={heroBannerImage.fields.file.url}
        width={heroBannerImage.fields.file.details.image.width}
        height={heroBannerImage.fields.file.details.image.height}
      /> */}
      <div className="flex justify-center item-center ">
        <CarouselComponent />
      </div>
      <ProductCardComponent />
      <PopularProductCarousel/>
      <FavoriteProduct/>
      <TrendingProducts/>
      <BestSheller />
      <ReviewCarousel />
      <Blogs />
      <Feature />
      <InstagramSection />
     
    </div>
  );
}
