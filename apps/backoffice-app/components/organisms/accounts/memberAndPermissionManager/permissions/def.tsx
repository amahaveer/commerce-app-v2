import { eOrderPermissions } from "@/shared-types/permissions/orderPermissions.type";
import { eProductPermissions } from "@/shared-types/permissions/productPermissions.type";
import { eCustomerPermission } from "@/shared-types/permissions/customerPermissions.type";
import { Typography } from '@mui/material';

export const productPermissionFields = [
    { 
        label: "General Tab", 
        permission: [
            { label: "view", value: eProductPermissions.VIEW_GENERAL_TAB },
            { label: "edit", value: eProductPermissions.EDIT_GENERAL_INFO },
        ], 
        tooltip: <Typography>this contains <b>Product key</b>, <b>name</b> and <b>description</b></Typography> 
    },
    { 
        label: "Product Categories", 
        permission: [
            { label: "edit", value: eProductPermissions.EDIT_PRODUCT_CATEGORIES },
            { label: "add", value: eProductPermissions.ADD_CATEGORIES },
        ], 
        tooltip: <Typography>This refers to Categories which is showing on product <b>General tab</b></Typography> 
    },
    { 
        label: "Variants", 
        permission: [
            { label: "view", value: eProductPermissions.VIEW_VARIANTS_TAB },
            { label: "edit", value: eProductPermissions.EDIT_VARIANTS },
            { label: "add", value: eProductPermissions.ADD_VARIANTS },
        ], 
        tooltip: <Typography>This will allow to view Variant Tab and edit the variants by clicking on table row or Add new variant</Typography> 
    },
    { 
        label: "Variant Attributes", 
        permission: [
            { label: "view", value: eProductPermissions.VIEW_VARIANT_ATTRIBUTES },
            { label: "edit", value: eProductPermissions.EDIT_VARIANT_ATTRIBUTES },
        ], 
        tooltip: <Typography>This will allow to view & edit variant attributes on variant detail page</Typography> 
    },
    { 
        label: "Variant Images", 
        permission: [
            { label: "view", value: eProductPermissions.VIEW_VARIANT_IMAGES },
            { label: "edit", value: eProductPermissions.EDIT_VARIANT_IMAGES },
            { label: "add", value: eProductPermissions.ADD_VARIANT_IMAGE },
        ], 
        tooltip: (<Typography>Edit permission will allow user to edit <b>Image label</b> and also delete image </Typography>) 
    },
    { 
        label: "Variant prices", 
        permission: [
            { label: "view", value: eProductPermissions.VIEW_VARiANT_PRICES },
            { label: "edit", value: eProductPermissions.EDIT_VARIANT_PRICES },
            { label: "add", value: eProductPermissions.ADD_VARIANT_PRICES },
        ], 
        tooltip: (<Typography>Edit permission will allow user to edit <b>Image label</b> and also delete image </Typography>) 
    },
    { 
        label: "Variant inventory", 
        permission: [
            { label: "view", value: eProductPermissions.VIEW_VARIANT_INVENTORIES },
            { label: "edit", value: eProductPermissions.EDIT_VARIANT_INVENTORIES },
            { label: "add", value: eProductPermissions.ADD_VARIANT_INVENTORIES },
        ], 
        tooltip: (<Typography>It will allow user to view inventories, edit inventories by clicking on table row and add inventory</Typography>) 
    },
    { 
        label: "Int/Ext search", 
        permission: [
            { label: "view", value: eProductPermissions.VIEW_INTERNAL_EXTERNAL_TAB },
            { label: "edit", value: eProductPermissions.EDIT_INTENAL_EXTERNAL_SEARCH },
        ], 
        tooltip: (<Typography>It will allow user to view and edit Internal/External search</Typography>) 
    },
    { 
        label: "Product selections", 
        permission: [
            { label: "view", value: eProductPermissions.VIEW_PRODUCT_SELECTIONS_TAB },
            { label: "edit", value: eProductPermissions.EDIT_PRODUCT_SELCTIONS },
            { label: "add", value: eProductPermissions.ADD_VARIANTS_TO_PRODUCT_SELECTION },
        ], 
        tooltip: (<Typography>It will allow user to view product selections, edit permission will allow user to delete selection as well</Typography>) 
    },
]


export const orderPermissionFields = [
    { 
        label: "General Tab", 
        permission: [
            { label: "view", value: eOrderPermissions.VIEW_GENERAL_TAB },
            { label: "edit", value: eOrderPermissions.EDIT_GENERAL_INFO },
        ], 
        tooltip: <Typography>this contains <b>Order status</b>, <b>Payment status</b> and <b>Shipment status</b></Typography> 
    },
    { 
        label: "Custom Fields Tab", 
        permission: [
            { label: "view", value: eOrderPermissions.VIEW_CUSTOM_FIELDS_TAB },
            { label: "edit", value: eOrderPermissions.EDIT_CUSTOM_FIELDS },
        ], 
        tooltip: <Typography>this will allow user to view and edit <b>custom fields info</b> given in order details page</Typography> 
    },
    { 
        label: "Shipping & Delivery Tab", 
        permission: [
            { label: "view", value: eOrderPermissions.VIEW_SHIPPING_DELIVERY_TAB },
        ], 
        tooltip: <Typography>this will allow user to view  <b>Shipping & Delivery tab</b> </Typography> 
    },
    {   
        label: "Deliveries", 
        permission: [
            { label: "view", value: eOrderPermissions.VIEW_DELIVERIES_TABLE },
            { label: "edit", value: eOrderPermissions.EDIT_DELIVERIES_TABLE },
            { label: "add", value: eOrderPermissions.CREATE_DELIVERY },
        ], 
        tooltip: <Typography>this will allow user to view, edit and add <b>Deliveries</b> in the shipping & delivery tab</Typography> 
    },
    {   
        label: "Returns", 
        permission: [
            { label: "view", value: eOrderPermissions.VIEW_RETURNS_TAB },
            { label: "edit", value: eOrderPermissions.EDIT_RETURN },
            { label: "add", value: eOrderPermissions.CREATE_RETURN },
        ], 
        tooltip: <Typography>this will allow user to view, edit and create <b>Returns</b></Typography> 
    },
    {   
        label: "Payments", 
        permission: [
            { label: "view", value: eOrderPermissions.VIEW_PAYMENTS_TAB },
            { label: "add", value: eOrderPermissions.CREATE_PAYMENTS },
        ], 
        tooltip: <Typography>this will allow user to view, edit and create <b>Returns</b></Typography> 
    },
]


export const customerPermissionFields = [
    { 
        label: "General Tab", 
        permission: [
            { label: "view", value: eCustomerPermission.VIEW_GENERAL_TAB },
        ], 
        tooltip: <Typography>this is the main general tab permission</Typography> 
    },
    { 
        label: "Customer details", 
        permission: [
            { label: "view", value: eCustomerPermission.VIEW_GENERAL_CUSTOMER_DETAILS },
            { label: "edit", value: eCustomerPermission.EDIT_GENERAL_CUSTOMER_DETAILS },
        ], 
        tooltip: <Typography>This permissions refers to view and edit customer details in general tab</Typography> 
    },
    { 
        label: "Company information", 
        permission: [
            { label: "view", value: eCustomerPermission.VIEW_GENERAL_COMPANY_INFO },
            { label: "edit", value: eCustomerPermission.EDIT_GENERAL_COMPANY_INFO },
        ], 
        tooltip: <Typography>This permissions refers to view and edit company details in general tab</Typography> 
    },
    { 
        label: "Security Tab", 
        permission: [
            { label: "view", value: eCustomerPermission.VIEW_SECURITY_TAB },
        ], 
        tooltip: <Typography>this is the permissions of the security tab</Typography> 
    },
    { 
        label: "Reset password", 
        permission: [
            { label: "view", value: eCustomerPermission.VIEW_SECURITY_TAB },
        ], 
        tooltip: <Typography>this will hide the reset password  of the security tab</Typography> 
    },
]