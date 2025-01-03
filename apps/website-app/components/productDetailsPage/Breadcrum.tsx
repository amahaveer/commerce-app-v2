import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { useTranslations } from 'next-intl';


// Dot separator component
const DotSeparator: React.FC = () => (
  <span className="mx-2 text-gray-500">•</span>
);

interface BreadcrumbProps {
  categoryName: string;
  categorySlug: string;
  productName: string;
}

export const ProductBreadcrumb: React.FC<BreadcrumbProps> = ({ categoryName, categorySlug, productName }) => {
    const t = useTranslations('header');
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">{t("home")}</BreadcrumbLink>
        </BreadcrumbItem>
        <DotSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={`/categories/${categorySlug.toLowerCase()}`}>
            {categoryName}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <DotSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{productName}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
