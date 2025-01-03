import ProductDetail from "./ProductDetails";
import { Product } from '../types/Product';



interface ProductPageProps {
  product: Product;
}

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
    
  // const product = {
  //   category:"Clothing",
  //   name: "Baby Cotton Bodysuits",
  //   price: 50.44,
  //   description: "PLENTY OF STORAGE: There are two chest pockets on this women's hooded flannel, making it easy to bring all your favorite things with you. VERSATILE: The Lumber Jane Hooded Flannel is a heavyweight shirt that you can wear open or snapped, depending on your mood. With it's jersey lined hood, it's as warm and comfortable as your favorite hoodie! RELAXED FIT: The women's hooded flannel was made with a relaxed fit for the days you want some room for layering or just want that extra bit of comfort. 100% SATISFACTION GUARANTEE: Designed in the USA, Legendary Whitetails is an American small business. We take pride in all our products. Love it or send it back!",
  //   images: [
  //     "https://shofy-client.vercel.app/_next/image?url=https%3A%2F%2Fi.ibb.co%2FThxGY6N%2Fclothing-13.png&w=640&q=75",
  //     "https://shofy-client.vercel.app/_next/image?url=https%3A%2F%2Fi.ibb.co%2FdJfjNcJ%2Fclothing-14.png&w=640&q=75",
  //     "https://shofy-client.vercel.app/_next/image?url=https%3A%2F%2Fi.ibb.co%2F2Yf7bqs%2Fclothing-15.png&w=640&q=75"
  //   ],
  //   colors: [
  //     { name: 'Green', hex: '#A3D9A5', image: "https://shofy-client.vercel.app/_next/image?url=https%3A%2F%2Fi.ibb.co%2FThxGY6N%2Fclothing-13.png&w=640&q=75" },
  //     { name: 'Gray', hex: '#C4C4C4', image: "https://shofy-client.vercel.app/_next/image?url=https%3A%2F%2Fi.ibb.co%2FdJfjNcJ%2Fclothing-14.png&w=640&q=75" },
  //     { name: 'Blue', hex: '#5D5DFF', image: "https://shofy-client.vercel.app/_next/image?url=https%3A%2F%2Fi.ibb.co%2F2Yf7bqs%2Fclothing-15.png&w=640&q=75" }
  //   ]
  // };

  // return <ProductDetail product={product} />;
  return <section>
    {JSON.stringify(product)}
  </section>
};

export default ProductPage;
