import { PaginatedQuery } from "./PaginatedQuery";
export enum SortCustomer {
    ASCENDING = 'ascending',
    DESCENDING = 'descending',
}
export interface SortAttributes {
    [key: string]: any;
}
export interface CustomerQuery extends PaginatedQuery {
    email?: string;
    firstName?: string;
    lastName?: string;
    id?: string;
    key?: string;
    externalId?: string;
    sortAttributes?: SortAttributes;
    offset?: number;
    limit?: number;
    where?: string;
}