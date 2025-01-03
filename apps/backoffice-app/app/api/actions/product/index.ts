import { eProductActions } from "./action";

export const getProductAction = (data: any) => ({
    productName: {
        action: eProductActions.CHANGE_NAME,
        name: data
    },
    productDescription: {
        action: eProductActions.SET_DESCRIPTION,
        description: data,
    },
    productKey: {
        action: eProductActions.SET_KEY,
        key: data,
    },
    addImage: {
        action: eProductActions.ADD_EXTERNAL_IMAGE,
        variantId: data.variantId,
        image: data.image
    }
    // productPriceMode: {
    //     action: eProductActions.SET_PRICE_MODE,
    //     priceMode: data,
    // },
    // taxCategory: {
    //     action: eProductActions.SET_TAX_CATEGORY,
    //     typeId: "tax-category",
    //     id: data,
    // },
    // categories: {
    //     action: eProductActions.CHANGE_NAME
    // }
})