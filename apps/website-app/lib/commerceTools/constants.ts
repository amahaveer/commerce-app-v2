
export const API_ENDPOINTS = {
    PRODUCT_BY_SLUG: '/products/id/',
    CATEGORIES: 'categories',
    CATEGORIES_BY_ID: (id: string) => `/products?where=masterData(current(categories(id="${id}")))`,
    AUTH:'/auth/login',
    CART_BY_ID: '/me/carts/id', // Fetch cart by ID
    CREATE_CART: '/carts/create', // Create a new cart
    UPDATE_CART: '/carts/update', // Update the cart
    DELETE_CART: '/carts/delete/', // Delete cart by ID
    CLEAR_CART: '/carts/clear', // Clear cart items
    ALL_CARTS: '/me/carts', // Endpoint to get all carts
};
