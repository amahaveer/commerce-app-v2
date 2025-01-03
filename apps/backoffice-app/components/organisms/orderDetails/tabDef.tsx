import { eOrderPermissions } from "@/shared-types/permissions/orderPermissions.type";
import OrderCustomFieldComponent from "./customFields";
import OrderGeneralInfo from "./general";
import OrderReturnsComponent from "./returns";
import OrderShippingAndDelivery from "./shippingAndDelivery";

export const tabConfigurations: Array<any> = [
    {
        label: 'General',
        path: "/general",
        component: OrderGeneralInfo,
        permission: eOrderPermissions.VIEW_GENERAL_TAB,
    },
    {
        label: 'Custom Fields',
        path: "/variants",
        component: OrderCustomFieldComponent,
        permission: eOrderPermissions.VIEW_CUSTOM_FIELDS_TAB,
    },
    {
        label: 'Shipping & Delivery',
        path: "/search",
        component: OrderShippingAndDelivery,
        permission: eOrderPermissions.VIEW_SHIPPING_DELIVERY_TAB,
    },
    {
        label: 'Return',
        path: "/product-selections",
        component: OrderReturnsComponent,
        permission: eOrderPermissions.VIEW_RETURNS_TAB
    },
];