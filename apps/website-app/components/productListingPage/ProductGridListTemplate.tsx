'use client';

import React, { useState } from 'react';
import GridIcon from '@/app/icons/ProductIcon/GridIcon';
import ListIcon from '@/app/icons/ProductIcon/ListIcon';
// import ProductGrid from '@/components/productListingPage/ProductGridTemplate';
// import ProductList from '@/components/productListingPage/ProductListingTemplate';

const ProductGridListTemplate: React.FC = () => {
  // State to track the selected view (grid or list)
  const [view, setView] = useState<'grid' | 'list'>('grid');

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

          {/* Rendering the grid or list view based on the selected view */}
          {/* <div>{view === 'grid' ? <ProductGrid /> : <ProductList />}</div> */}
          <div>{view === 'grid' ? '' : ''}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductGridListTemplate;