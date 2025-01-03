import { eToolbarButtonActions } from "@/components/molecules/SaveToolBar/type";
import { Dispatch, SetStateAction } from "react";

export interface IExposeOrders {
    orders: Array<any>;
    orderDetails: any;
    mappedOrderData: IMappedOrderData;
    setMappedOrderData: Dispatch<SetStateAction<IMappedOrderData>>;
    onToolbarAction: (action: eToolbarButtonActions) => void;
}

export interface IMappedOrderData {
    generalInfo : {
        selectedStore: string;
        currencyCode: string;
        inventoryTracking:  string;
    };
    customer: {
        selectedCustomer: any;
    }
}