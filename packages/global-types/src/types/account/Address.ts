export interface Address {
  addressId?: string;
  key?: string;
  title?: string;
  salutation?: string;
  firstName?: string;
  lastName?: string;
  streetName?: string;
  streetNumber?: string;
  additionalStreetInfo?: string;
  additionalAddressInfo?: string;
  postalCode?: string;
  city?: string;
  region?: string;
  state?: string;
  country?: string; // 2 letter ISO code (https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
  phone?: string;
  mobile?: string;
  email?: string;
  fax?: string;
  pOBox?: string;
  company?: string;
  department?: string;
  building?: string;
  apartment?: string;
  isDefaultBillingAddress?: boolean;
  isDefaultShippingAddress?: boolean;
  isShippingAddress?: boolean;
  isBillingAddress?: boolean;
}
