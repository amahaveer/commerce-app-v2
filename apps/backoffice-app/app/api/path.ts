
export const BASE_URL = "http://localhost:3004/backoffice";
export const COMMERCETOOL_BASE_URL = "https://mc-api.us-central1.gcp.commercetools.com"

/* PRODUCTS */
export const GET_PRODUCT_URL = `${BASE_URL}/products?expand=productType`;
export const GET_PRODUCT_DETAIL_URL = `${BASE_URL}/products/id`;
export const UPDATE_PRODUCT_URL = `${BASE_URL}/products/update`;
export const CREATE_PRODUCT_URL = `${BASE_URL}/products/create`;    

/* PRODUCT TYPE */
export const GET_PRODUCT_TYPE_URL = `${BASE_URL}/product-types`;
export const GET_PRODUCT_TYPE_BY_ID = `${BASE_URL}/product-types/id`

/* CUSTOMER TYPE */
export const GET_CUSTOMER_TYPE_URL = `${BASE_URL}/customers?offset=1&limit=10`;
export const GET_CUSTOMER_BY_ID_URL = `${BASE_URL}/customers`;

/* CATEGORIES */
export const GET_CATEGORIES_URL = `${BASE_URL}/categories`

/* Project Settings */
export const GET_PROJECT_SETTINGS_URL = `${BASE_URL}/project-settings`

/* Inventory */
export const GET_INVENTORIES = `${BASE_URL}/inventories`;

/* Orders */
export const GET_ORDER_URL = `${BASE_URL}/orders`;

/* PRODUCT SELECTIONS */
export const GET_PRODUCT_SELECTIONS = `${BASE_URL}/product-selections`;


/* PERMISSIONS */
export const GET_ORDER_PERMISSIONS = `${BASE_URL}/permissions`


/* COMMERCETOOL MERCHANT CENTER */
export const MC_TOKEN_URL = `${COMMERCETOOL_BASE_URL}/tokens`
