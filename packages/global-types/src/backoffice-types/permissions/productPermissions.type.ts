export enum eProductPermissions {
    
    VIEW_GENERAL_TAB = 'view_general_info',
    VIEW_VARIANTS_TAB = 'view_variants_info',
    VIEW_INTERNAL_EXTERNAL_TAB = 'view_internal_external_info',
    VIEW_PRODUCT_SELECTIONS_TAB = 'view_product_selections_info',
    VIEW_VARIANT_ATTRIBUTES = "view_variant_attributes",
    VIEW_VARIANT_IMAGES = "view_variant_images",
    VIEW_VARiANT_PRICES = "view_variant_prices",
    VIEW_VARIANT_INVENTORIES = "view_variant_inventories",
    VIEW_ANALYTICS = "view_analytics",

    EDIT_GENERAL_INFO = 'edit_general_info',
    EDIT_VARIANTS = 'edit_variants',
    EDIT_INTENAL_EXTERNAL_SEARCH = 'edit_internal_external_search',
    EDIT_PRODUCT_SELCTIONS = 'edit_product_selections',
    EDIT_PRODUCT_CATEGORIES = 'edit_product_categories',
    EDIT_VARIANT_ATTRIBUTES = "edit_variant_attributes",
    EDIT_VARIANT_PRICES = "edit_variant_prices",
    EDIT_VARIANT_INVENTORIES = "edit_variant_inventories",
    EDIT_VARIANT_IMAGES = "edit_variant_images",

    ADD_VARIANTS_TO_PRODUCT_SELECTION = 'assign_variants_to_product_selection',
    ADD_CATEGORIES = 'add_categories',
    ADD_VARIANTS = 'add_variants',
    CREATE_PRODUCT = "create_product",
    ADD_VARIANT_IMAGE = "add_variant_image",
    ADD_VARIANT_INVENTORIES = "add_variant_inventories",
    ADD_VARIANT_PRICES = "add_variant_prices",

    DELETE_PRODUCT = 'delete_product',
    REMOVE_CATEGORIES = 'remove_categories',
}

export const productPermissionLabels = {
    [eProductPermissions.VIEW_GENERAL_TAB]: "View general info",
    [eProductPermissions.VIEW_VARIANTS_TAB]: "View variants info",
    [eProductPermissions.VIEW_INTERNAL_EXTERNAL_TAB]: "View internal/external info",
    [eProductPermissions.VIEW_PRODUCT_SELECTIONS_TAB]: "View product selections info",

    [eProductPermissions.EDIT_GENERAL_INFO]: "Edit general info",
    [eProductPermissions.EDIT_VARIANTS]: "Edit variants",
    [eProductPermissions.EDIT_INTENAL_EXTERNAL_SEARCH]: "Edit internal/external search",
    [eProductPermissions.EDIT_PRODUCT_SELCTIONS]: "Edit product selections",

    [eProductPermissions.ADD_VARIANTS_TO_PRODUCT_SELECTION]: "Assign variants to product selection",
    [eProductPermissions.ADD_CATEGORIES]: "Add categories",
    [eProductPermissions.ADD_VARIANTS]: "Add variants",
    [eProductPermissions.CREATE_PRODUCT]: "Create product",

    [eProductPermissions.DELETE_PRODUCT]: "Delete product",
    [eProductPermissions.REMOVE_CATEGORIES]: "Remove categories"
};

