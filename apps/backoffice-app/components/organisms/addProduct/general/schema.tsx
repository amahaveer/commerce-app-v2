import { eProductPermissions } from "@royalcyber/global-types/src/backoffice-types/permissions/productPermissions.type";
import { IFormFieldMapper, ITranslateFunc } from "types/global";
import { getProductPriceModeOptions, getProductTaxCateogoryOptions } from "utils/product";

export const generalformSchema = (translate: ITranslateFunc, params: any={}): IFormFieldMapper[] => [
    {
        title: translate("product.productName"),
        field: `productName`,
        description: { text: translate("product.productDisplayNameToCustomer"), icon: "" },
        multiLocale: true,
        required: true,
        type: "text",
        disabled: !params.hasPermission(eProductPermissions.EDIT_GENERAL_INFO)
    },
    {
        title: translate("product.productDescription"),
        field: `productDescription`,
        description: { text: translate("product.localizedProductDescription"), icon: "" },
        multiLocale: true,
        type: "text",
        disabled: !params.hasPermission(eProductPermissions.EDIT_GENERAL_INFO)
    },
    {
        title: translate("product.productKey"),
        field: "productKey",
        info: translate("common.immediateChangeReflection"),
        description: { text: translate("product.uniqueProductKeyToIdentifyProduct"), icon: "" },
        type: "text",
        disabled: !params.hasPermission(eProductPermissions.EDIT_GENERAL_INFO)
    },
    {
        title: translate("product.productPriceMode"),
        field: "productPriceMode",
        info: translate("common.immediateChangeReflection"),
        type: "select",
        options: getProductPriceModeOptions(translate),
    },
    {
        title: translate("product.taxCategory"),
        field: "taxCategory",
        info: translate("common.immediateChangeReflection"),
        options: getProductTaxCateogoryOptions(),
        type: "select",
    },
]
