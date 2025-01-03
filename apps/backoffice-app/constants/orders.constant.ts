import { IMappedOrderData } from "types/orders.type";

export const initialMapOrderValues: IMappedOrderData = {
    generalInfo: {
        selectedStore: "",
        currencyCode: "",
        inventoryTracking: ""
    },
    customer: {
        selectedCustomer: ""
    }
}

