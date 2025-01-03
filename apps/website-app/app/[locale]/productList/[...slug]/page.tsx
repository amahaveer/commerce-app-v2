'use client';
import { useEffect, useState } from 'react';
import { productService } from '@/lib/commerceTools/productService';
import GridIcon from '@/app/icons/ProductIcon/GridIcon';
import ListIcon from '@/app/icons/ProductIcon/ListIcon';
import ProductGrid from '@/components/productListingPage/ProductGridTemplate';
import ProductList from '@/components/productListingPage/ProductListingTemplate';

interface PageParams {
  params: {
    slug: string[];
  };
}

const Page = (props: any) => {
  const { params }: PageParams = props;
  console.log('params page product list', params)
  console.log('props page product list', props)
  const { slug } = params;
  let categoryId = slug[slug.length - 1] || '';
  const categorySlug = slug.slice(0, -1).join('/');

  const [products, setProducts] = useState<any[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [view, setView] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
          if(categoryId === 'shopAll') {   // Fetch products by category ID, if categoryId is shopAll then customise logic to fetch all products
            categoryId = '';
          }
        const response = await productService.fetchProductsByCategoriesId(
          categoryId as string,
        );
        setProducts(response.results);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  // Function to toggle the view
  const handleViewChange = (selectedView: 'grid' | 'list') => {
    setView(selectedView);
  };

  return (
    <div className="w-full my-4 mx-auto px-4">
      <div className="flex flex-col xl:flex-row items-center justify-between space-y-4 xl:space-y-0 xl:space-x-4 max-w-screen-xl mx-auto">
        {/* Filter Div */}
        <div className="w-full lg:w-1/3 xl:w-1/4">
          <p>Filter Div</p>
        </div>

        {/* Main Content Div */}
        <div className="w-full lg:w-2/3 xl:w-3/4">
          <div className="tp-shop-top-left flex items-center justify-start mb-6">
            <div className="tp-shop-top-tab flex flex-row space-x-2">
              <ul className="flex" role="tablist">
                <li className="nav-item mr-2" role="presentation">
                  <button
                    className={`nav-link ${view === 'grid' ? 'border-2' : 'border'} border-black p-2`}
                    type="button"
                    role="tab"
                    aria-label="Switch to grid view"
                    onClick={() => handleViewChange('grid')}
                  >
                    <GridIcon />
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${view === 'list' ? 'border-2' : 'border'} border-black p-2`}
                    type="button"
                    role="tab"
                    aria-label="Switch to list view"
                    onClick={() => handleViewChange('list')}
                  >
                    <ListIcon />
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div>
            {loading ? (
              <p>Loading products...</p>
            ) : products &&  (
              view === 'grid' ? (
                <ProductGrid products={products} />
              ) : (
                <ProductList products={products} />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
