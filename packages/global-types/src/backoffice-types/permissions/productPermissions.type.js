"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productPermissionLabels = exports.eProductPermissions = void 0;
var eProductPermissions;
(function (eProductPermissions) {
    eProductPermissions["VIEW_GENERAL_TAB"] = "view_general_info";
    eProductPermissions["VIEW_VARIANTS_TAB"] = "view_variants_info";
    eProductPermissions["VIEW_INTERNAL_EXTERNAL_TAB"] = "view_internal_external_info";
    eProductPermissions["VIEW_PRODUCT_SELECTIONS_TAB"] = "view_product_selections_info";
    eProductPermissions["VIEW_VARIANT_ATTRIBUTES"] = "view_variant_attributes";
    eProductPermissions["VIEW_VARIANT_IMAGES"] = "view_variant_images";
    eProductPermissions["VIEW_VARiANT_PRICES"] = "view_variant_prices";
    eProductPermissions["VIEW_VARIANT_INVENTORIES"] = "view_variant_inventories";
    eProductPermissions["EDIT_GENERAL_INFO"] = "edit_general_info";
    eProductPermissions["EDIT_VARIANTS"] = "edit_variants";
    eProductPermissions["EDIT_INTENAL_EXTERNAL_SEARCH"] = "edit_internal_external_search";
    eProductPermissions["EDIT_PRODUCT_SELCTIONS"] = "edit_product_selections";
    eProductPermissions["EDIT_PRODUCT_CATEGORIES"] = "edit_product_categories";
    eProductPermissions["EDIT_VARIANT_ATTRIBUTES"] = "edit_variant_attributes";
    eProductPermissions["EDIT_VARIANT_PRICES"] = "edit_variant_prices";
    eProductPermissions["EDIT_VARIANT_INVENTORIES"] = "edit_variant_inventories";
    eProductPermissions["EDIT_VARIANT_IMAGES"] = "edit_variant_images";
    eProductPermissions["ADD_VARIANTS_TO_PRODUCT_SELECTION"] = "assign_variants_to_product_selection";
    eProductPermissions["ADD_CATEGORIES"] = "add_categories";
    eProductPermissions["ADD_VARIANTS"] = "add_variants";
    eProductPermissions["CREATE_PRODUCT"] = "create_product";
    eProductPermissions["ADD_VARIANT_IMAGE"] = "add_variant_image";
    eProductPermissions["ADD_VARIANT_INVENTORIES"] = "add_variant_inventories";
    eProductPermissions["ADD_VARIANT_PRICES"] = "add_variant_prices";
    eProductPermissions["DELETE_PRODUCT"] = "delete_product";
    eProductPermissions["REMOVE_CATEGORIES"] = "remove_categories";
})(eProductPermissions || (exports.eProductPermissions = eProductPermissions = {}));
exports.productPermissionLabels = {
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
