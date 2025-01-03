import TitleSvg from '@/app/icons/ProductIcon/TitleSvg';
import React from 'react';

  interface ProductheadingProps {
    title: string;
    subtitle: string;
  }
  
  const Productheading: React.FC<ProductheadingProps> = ({ title, subtitle }) => (
    <div className="title-wrapper mb-8 font-jost">
      <span className="font-normal text-[1.1rem] text-customPurple z-[1] inline-block relative">
        {title}
        <TitleSvg />
      </span>
      <h3 className="text-[2.2rem] text-black sm:text-[2.7rem] font-medium leading-[1.2]">
        {subtitle}
      </h3>
    </div>
  );

export default Productheading;
