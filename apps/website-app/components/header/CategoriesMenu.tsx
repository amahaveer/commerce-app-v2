import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { NavigationMenuContent } from '@/components/ui/navigation-menu';
// import { convertToHierarchy } from '@/utils/convertToHierarchy';
import { categoriesHeirarchy } from '@/utils/categoriesHeirarchy';
import { getLocale } from '@/utils/locale';
import Cookies from 'js-cookie';
import { Category } from '@royalcyber/global-types';

type CategoryMenuProps = {
  results: Category[]
}

const CategoryMenu = ({ results }: CategoryMenuProps) => {
  // const hierarchicalCategories = convertToHierarchy(results);
  const hierarchicalCategories = categoriesHeirarchy(results);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const currentLocale =
    typeof window !== 'undefined' ? Cookies.get('NEXT_LOCALE') : 'en';
  const locale = getLocale(currentLocale as string);
  const createCategoryUrl = (categorySlug: any, categoryId: string) => {
    const slug = typeof categorySlug === 'object' 
      ? categorySlug[locale as keyof typeof categorySlug] 
      : categorySlug;
    return `/${currentLocale}/productList/${slug}/${categoryId}`;
  };
  return (
    <NavigationMenuContent>
      <div className="flex min-h-[400px] w-[800px]">
        <ul className="w-[200px] border-r border-gray-200 p-2">
          {hierarchicalCategories.map((category) => (
            <li key={category.id} className="relative group">
              <div
                className="flex items-center justify-between rounded-md p-2 hover:bg-gray-100"
                onMouseEnter={() => setHoveredCategory(category.id)}
              >
                <a 
                  href={createCategoryUrl(category.slug, category.id)}
                  className="text-sm font-medium"
                >
                  {category.name as string}
                </a>
                {category.children && category.children.length > 0 && (
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                )}
              </div>
              {hoveredCategory === category.id && category.children && (
                <div
                  className="absolute left-[200px] top-0 min-h-full w-[580px] border-l border-gray-200 bg-white p-4"
                  onMouseEnter={() => setHoveredCategory(category.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <div className="grid grid-cols-2 gap-4">
                    {category.children.map((subCategory) => (
                      <div key={subCategory.id} className="space-y-2 group/sub">
                        <div className="flex items-center space-x-2 border-b border-gray-100 pb-2">
                          <a
                            href={createCategoryUrl(subCategory.slug, subCategory.id)}
                            className="text-sm font-medium hover:text-blue-600"
                          >
                            {subCategory.name as string}
                          </a>
                          {subCategory.children &&
                            subCategory.children.length > 0 && (
                              <ChevronRight className="h-4 w-4 text-gray-400" />
                            )}
                        </div>
                        {subCategory.children &&
                          subCategory.children.length > 0 && (
                            <ul className="space-y-1 pl-4">
                              {subCategory.children.map((child) => (
                                <li key={child.id} className="group/item">
                                  <a
                                    href={createCategoryUrl(child.slug, child.id)}
                                    className="block text-xs text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded px-2 py-1"
                                  >
                                    {child.name as string}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </NavigationMenuContent>
  );
};
export default CategoryMenu;