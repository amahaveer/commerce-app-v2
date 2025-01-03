import { Address } from "../account";

export interface Delivery {
    id?: string;
    key?: string;
    createdAt?: string;
    items?: DeliveryItem[];
    parcels?: Parcel[];
    address?: Address;
    custom?: any;
}

export interface Parcel {
    id?: string;
    key?: string;
    createdAt?: string;
    measurements?: ParcelMeasurements;
    trackingData?: TrackingData;
    items?: DeliveryItem[];
    custom?: any;
}

export interface DeliveryItem {
    id?: string;
    quantity?: number;
}

export interface ParcelMeasurements {
    heightInMillimeter?: number;
    lengthInMillimeter?: number;
    widthInMillimeter?: number;
    weightInGram?: number;
}

export interface TrackingData {
    trackingId?: string;
    carrier?: string;
    provider?: string;
    providerTransaction?: string;
    isReturn?: boolean;
}