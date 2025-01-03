import { TaxRate } from "./TaxRate";

export interface TaxCategory {
    id?: string;
    version?: number;
    createdAt?: string;
    lastModifiedAt?: string;
    name?: string;
    description?: string;
    rates?: TaxRate[];
    key?: string;
}