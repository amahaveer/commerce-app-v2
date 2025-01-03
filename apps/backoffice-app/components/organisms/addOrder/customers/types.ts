import { Dispatch, SetStateAction } from "react";


export interface ICustomerSelectionProps {
    onSelectCustomer: (row: any) => void;
}

export interface IOrderAddressSelectionProps {
    onSelectCustomer: (row: any) => void;
}

export interface IAddressFormLayoutProps {
    address: Array<any>; 
    editAddressId: string | null; 
    setEditAddressId: Dispatch<SetStateAction<string | null>>;
    onSaveAddress: () => void;
}