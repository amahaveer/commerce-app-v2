"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderPermissionLabels = exports.eOrderPermissions = void 0;
var eOrderPermissions;
(function (eOrderPermissions) {
    eOrderPermissions["VIEW_GENERAL_TAB"] = "view_general_info";
    eOrderPermissions["VIEW_CUSTOM_FIELDS_TAB"] = "view_custom_fields_info";
    eOrderPermissions["VIEW_RETURNS_TAB"] = "view_returns_info";
    eOrderPermissions["VIEW_PAYMENTS_TAB"] = "view_payments_info";
    eOrderPermissions["VIEW_SHIPPING_DELIVERY_TAB"] = "view_shipping_and_delivery_info";
    eOrderPermissions["VIEW_DELIVERIES_TABLE"] = "view_deliveries_table";
    eOrderPermissions["EDIT_GENERAL_INFO"] = "edit_general_info";
    eOrderPermissions["EDIT_CUSTOM_FIELDS"] = "edit_custom_fields";
    eOrderPermissions["EDIT_DELIVERIES_TABLE"] = "edit_deliveries_table";
    eOrderPermissions["EDIT_RETURN"] = "edit_return";
    eOrderPermissions["CREATE_ORDER"] = "add_order";
    eOrderPermissions["ADD_DISCOUNT_CODE"] = "add_discount_code";
    eOrderPermissions["CREATE_RETURN"] = "create_return";
    eOrderPermissions["CREATE_PAYMENTS"] = "create_payments";
    eOrderPermissions["CREATE_CUSTOM_FIELDS"] = "create_custom_fields";
    eOrderPermissions["CREATE_DELIVERY"] = "create_delivery";
})(eOrderPermissions || (exports.eOrderPermissions = eOrderPermissions = {}));
exports.orderPermissionLabels = {
    [eOrderPermissions.VIEW_GENERAL_TAB]: "View general info",
    [eOrderPermissions.VIEW_CUSTOM_FIELDS_TAB]: "View custom fields info",
    [eOrderPermissions.VIEW_RETURNS_TAB]: "View returns info",
    [eOrderPermissions.VIEW_PAYMENTS_TAB]: "View payments info",
    [eOrderPermissions.VIEW_SHIPPING_DELIVERY_TAB]: "View shipping and delivery info",
    [eOrderPermissions.EDIT_GENERAL_INFO]: "Edit general info",
    [eOrderPermissions.CREATE_ORDER]: "Create order",
    [eOrderPermissions.ADD_DISCOUNT_CODE]: "Add discount code",
    [eOrderPermissions.CREATE_RETURN]: "Create return",
    [eOrderPermissions.CREATE_PAYMENTS]: "Create payments",
    [eOrderPermissions.CREATE_CUSTOM_FIELDS]: "Create custom fields",
    [eOrderPermissions.CREATE_DELIVERY]: "Create delivery"
};
