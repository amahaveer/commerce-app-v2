import { Address } from "@royalcyber/global-types";

export const mapToCTAdress = (address: any): Address => {
    return {
        firstName: address.firstName,
        lastName: address.lastName,
        streetName: address.streetAddress,
        postalCode: address.zipCode,
        city: address.city,
        country: address.country,
    }
};


export const mapCTAddressToFormFields = (address: Address): any => {
    return {
        firstName: address.firstName,
        lastName: address.lastName,
        streetAddress: address.streetName,
        zipCode: address.postalCode,
        city: address.city,
        country: address.country,
    }
};
