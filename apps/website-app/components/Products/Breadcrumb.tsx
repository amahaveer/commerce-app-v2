// import Link from 'next/link'
// import React from 'react'

// function Breadcrumb() {
//   return (
//     <section className="pt-24 pb-12 font-jost">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-col space-y-2">
//             <h3 className="text-[44px] font-medium leading-none mb-1 text-gray-900">Wishlist</h3>
//             <div className="flex items-center space-x-2 text-sm">
//                 <Link href="/" className=" text-[1rem] text-footerSecondary hover:text-blue-600 ">
//                     Home
//                 </Link>
//                 <span className="text-footerSecondary">/</span>
//                 <span className="text-footerSecondary text-[1rem]">Wishlist</span>
//             </div>
//           </div>
//         </div>
//       </section>
//   )
// }

// export default Breadcrumb

import Link from 'next/link';
import React from 'react';

// Define the type for each breadcrumb item
interface BreadcrumbItem {
  label: string;
  href?: string;
}

// Define the props for the Breadcrumb component
interface BreadcrumbProps {
  title: string;
  items: BreadcrumbItem[];
  wrapperClass?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ title, items, wrapperClass = '' }) => {
  return (
    <section className={`pt-24 pb-12 ${wrapperClass ? wrapperClass : ""} font-jost`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col space-y-2">
          <h3 className="text-4xl font-medium leading-none mb-1 text-gray-900">{title}</h3>
          <nav className="flex items-center space-x-2 text-sm">
            {items.map((item, index) => (
              < >
                {item.href ? (
                  <Link href={item.href} className="text-base text-footerSecondary hover:text-blue-600">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-base text-footerSecondary">{item.label}</span>
                )}
                {index < items.length - 1 && <span className="text-footerSecondary">/</span>}
              </>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
};

export default Breadcrumb;
