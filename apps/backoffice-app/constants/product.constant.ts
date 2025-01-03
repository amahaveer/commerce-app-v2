import { IMappedProductForm, IProductSelectionVariants } from "types/product.type";

export enum eProductSearchFields {
    All_Fields = "all",
    Product_Names = "product_name",
    Descriptions = "descriptions",
    Slugs = "slugs",
    SKUs = "skus",
    Product_Keys = "product_keys",
    Variant_Keys = "variant_keys",
}


export const initialAddProductValues: IMappedProductForm = {
    selectedProductType: "",
    generalInfo: {
        productName: "",
        productDescription: "",
        productKey: "",
        productPriceMode: "",
        taxCategory: "",
        categories: []
    }, 
    productSelections: [],
    masterVariant: null,
    variants: []
}

export const initialProductSelectionValues: IProductSelectionVariants = {
    selection: { type: "", key: "", label: "" },
    variantOption: "all",
    skus: []
};