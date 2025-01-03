// Input types matching the API response
interface CategoryResponse {
  id: string;
  key: string;
  name: {
    'en-US': string;
  };
  slug: {
    'en-US': string;
  };
  description: {
    'en-US': string;
  };
  parent?: {
    typeId: string;
    id: string;
  };
  ancestors: Array<{
    typeId: string;
    id: string;
  }>;
  orderHint: string;
}
// Output types for the hierarchical structure
export interface CategoryNode {
  id: string;
  key: string;
  name: string;
  slug: string;
  description: string;
  children: CategoryNode[];
  orderHint: string;
}
export function convertToHierarchy(
  categories: CategoryResponse[],
): CategoryNode[] {
  // Create a map to store all categories by their ID for quick lookup
  const categoryMap = new Map<string, CategoryNode>();

  // First pass: Create category objects and store in map
  categories.forEach((category) => {
    categoryMap.set(category.id, {
      id: category.id,
      key: category.key,
      name: category.name['en-US'],
      slug: category.slug['en-US'],
      description: category.description['en-US'],
      children: [],
      orderHint: category.orderHint,
    });
  });

  // Second pass: Build parent-child relationships
  const rootCategories: CategoryNode[] = [];

  categories.forEach((category) => {
    const categoryNode = categoryMap.get(category.id);

    if (!categoryNode) {
      throw new Error(`Category node not found for ID: ${category.id}`);
    }

    // If category has parent, add it as child to parent
    if (category.parent) {
      const parentNode = categoryMap.get(category.parent.id);
      if (parentNode) {
        parentNode.children.push(categoryNode);
      } else {
        throw new Error(`Parent node not found for ID: ${category.parent.id}`);
      }
    } else {
      // If no parent, it's a root category
      rootCategories.push(categoryNode);
    }
  });

  // Sort function using orderHint
  const sortByOrderHint = (a: CategoryNode, b: CategoryNode): number => {
    return parseFloat(b.orderHint) - parseFloat(a.orderHint);
  };

  // Recursive function to sort children
  const sortChildren = (category: CategoryNode): void => {
    if (category.children.length > 0) {
      category.children.sort(sortByOrderHint);
      category.children.forEach(sortChildren);
    }
  };

  // Sort root categories and their children
  rootCategories.sort(sortByOrderHint);
  rootCategories.forEach(sortChildren);

  return rootCategories;
}
// Optional: Type for the complete API response
interface ApiResponse {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: CategoryResponse[];
}
// Example usage:
// const hierarchicalCategories = convertToHierarchy(data.results);
