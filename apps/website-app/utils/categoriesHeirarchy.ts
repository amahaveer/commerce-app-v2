import { Category, LocalizedString } from '@royalcyber/global-types';

export interface CategoryNode {
    id: string;
    key: string;
    name: string | LocalizedString;
    slug: string | LocalizedString;
    description: string | LocalizedString;
    children: CategoryNode[];
    orderHint: string;
}
export function categoriesHeirarchy(categories: Category[]): CategoryNode[] {
    // Create a map to store all categories by their ID for quick lookup
    const categoryMap = new Map<string, CategoryNode>();
    
    // First pass: Create category objects and store in map
    categories && categories.length && categories.forEach(category => {
        categoryMap.set(category?.categoryId || '', {
            id: category?.categoryId || '',
            key: category?.categoryId || '',
            name: category?.name || '',
            slug: category?.slug || '',
            description: category?.name || '',
            children: [],
            orderHint: ''
        });
    });
    
    // Second pass: Build parent-child relationships
    const rootCategories: CategoryNode[] = [];
    
    categories && categories.length && categories.forEach(category => {
        const categoryNode = categoryMap.get(category.categoryId || '');
        
        if (!categoryNode) {
            throw new Error(`Category node not found for ID: ${category.categoryId || ''}`);
        }
        
        // If category has parent, add it as child to parent
        if (category.depth) {
            const parentNode = categoryMap.get(category.parentId || '');
            if (parentNode) {
                parentNode.children.push(categoryNode);
            } else {
                throw new Error(`Parent node not found for ID: ${category.parentId}`);
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
    
    // Add "Shop All" category alongside other root categories
    const shopAllCategory: CategoryNode = {
        id: 'shopAll',
        key: 'Shop All',
        name: 'Shop All',
        slug: 'ShopAll',
        description: 'Shop All',
        children: [],
        orderHint: ''
    };
    rootCategories.unshift(shopAllCategory); // Add Shop All as the first category at the root level
    return rootCategories;
}