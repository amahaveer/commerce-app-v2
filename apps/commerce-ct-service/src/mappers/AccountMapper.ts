import {
  Address as CommercetoolsAddress,
  BaseAddress,
  Customer as commercetoolsCustomer,
  CustomerGroup as CommercetoolsCustomerGroup,
} from '@commercetools/platform-sdk';
import { Account, Address, CustomerGroup } from '@royalcyber/global-types';
import { Locale } from '../Locale';
import { Guid } from '../utils/Guid';

export class AccountMapper {
  static commercetoolsCustomerToAccount(
    commercetoolsCustomer: commercetoolsCustomer,
  ): Account {
    return {
      accountId: commercetoolsCustomer.id,
      key: commercetoolsCustomer?.key,
      customerNumber: commercetoolsCustomer?.customerNumber,
      email: commercetoolsCustomer.email,
      salutation: commercetoolsCustomer?.salutation,
      title: commercetoolsCustomer?.title,
      firstName: commercetoolsCustomer?.firstName,
      lastName: commercetoolsCustomer?.lastName,
      middleName: commercetoolsCustomer?.middleName,
      birthday: commercetoolsCustomer?.dateOfBirth
        ? new Date(commercetoolsCustomer.dateOfBirth)
        : undefined,
      companyName: commercetoolsCustomer?.companyName,
      vatId: commercetoolsCustomer?.vatId,
      confirmed: commercetoolsCustomer.isEmailVerified,
      version: commercetoolsCustomer.version.toString(),
      addresses: this.commercetoolsAddressesToAddresses(
        commercetoolsCustomer.addresses,
        commercetoolsCustomer.defaultBillingAddressId,
        commercetoolsCustomer.defaultShippingAddressId,
        commercetoolsCustomer.billingAddressIds,
        commercetoolsCustomer.shippingAddressIds,
      ),
      customerGroup: commercetoolsCustomer.customerGroup?.obj
        ? AccountMapper.commercetoolsCustomerGroupToCustomerGroup(
          commercetoolsCustomer.customerGroup?.obj,
        )
        : undefined,
      locale: commercetoolsCustomer?.locale,
      stores: commercetoolsCustomer?.stores.map((store) => store.key),
      authenticationMode: commercetoolsCustomer?.authenticationMode,
      custom: commercetoolsCustomer?.custom,
      createdAt: commercetoolsCustomer?.createdAt,
      lastModifiedAt: commercetoolsCustomer?.lastModifiedAt,
    } as Account;
  }

  static commercetoolsCustomerGroupToCustomerGroup(
    commercetoolsCustomerGroup: CommercetoolsCustomerGroup,
  ): CustomerGroup {
    return {
      id: commercetoolsCustomerGroup.id,
      version: commercetoolsCustomerGroup.version.toString(),
      key: commercetoolsCustomerGroup?.key,
      name: commercetoolsCustomerGroup.name,
      custom: commercetoolsCustomerGroup?.custom,
      createdAt: commercetoolsCustomerGroup?.createdAt,
      lastModifiedAt: commercetoolsCustomerGroup?.lastModifiedAt,
    } as unknown as CustomerGroup;
  }

  static commercetoolsAddressesToAddresses(
    commercetoolsAddresses: CommercetoolsAddress[],
    defaultBillingAddressId?: string,
    defaultShippingAddressId?: string,
    billingAddressIds?: string[],
    shippingAddressIds?: string[],
  ): Address[] {
    const addresses: Address[] = [];

    commercetoolsAddresses.forEach((commercetoolsAddress) => {
      addresses.push({
        ...this.commercetoolsAddressToAddress(commercetoolsAddress),
        isDefaultBillingAddress:
          commercetoolsAddress.id === defaultBillingAddressId,
        isDefaultShippingAddress:
          commercetoolsAddress.id === defaultShippingAddressId,
        isBillingAddress:
          billingAddressIds?.includes(commercetoolsAddress.id || '') ?? false,
        isShippingAddress:
          shippingAddressIds?.includes(commercetoolsAddress.id || '') ?? false,
      } as Address);
    });

    return addresses;
  }

  static commercetoolsAddressToAddress(
    commercetoolsAddress: CommercetoolsAddress,
  ): Address {
    return {
      addressId: commercetoolsAddress.id,
      key: commercetoolsAddress?.key ?? undefined,
      title: commercetoolsAddress?.title ?? undefined,
      salutation: commercetoolsAddress.salutation ?? undefined,
      firstName: commercetoolsAddress.firstName ?? undefined,
      lastName: commercetoolsAddress.lastName ?? undefined,
      streetName: commercetoolsAddress.streetName ?? undefined,
      streetNumber: commercetoolsAddress.streetNumber ?? undefined,
      additionalStreetInfo:
        commercetoolsAddress.additionalStreetInfo ?? undefined,
      additionalAddressInfo:
        commercetoolsAddress.additionalAddressInfo ?? undefined,
      postalCode: commercetoolsAddress.postalCode ?? undefined,
      city: commercetoolsAddress.city ?? undefined,
      region: commercetoolsAddress.region ?? undefined,
      state: commercetoolsAddress.state ?? undefined,
      country: commercetoolsAddress.country ?? undefined,
      mobile: commercetoolsAddress.mobile ?? undefined,
      email: commercetoolsAddress.email ?? undefined,
      fax: commercetoolsAddress.fax ?? undefined,
      pOBox: commercetoolsAddress.pOBox ?? undefined,
      company: commercetoolsAddress.company ?? undefined,
      department: commercetoolsAddress.department ?? undefined,
      building: commercetoolsAddress.building ?? undefined,
      apartment: commercetoolsAddress.apartment ?? undefined,
    };
  }

  static commercetoolsCustomerToAddresses: (
    commercetoolsCustomer: commercetoolsCustomer,
    locale: Locale,
  ) => Address[] = (
    commercetoolsCustomer: commercetoolsCustomer,
    locale: Locale,
  ) => {
      const addresses: Address[] = [];

      commercetoolsCustomer.addresses.forEach((commercetoolsAddress) => {
        addresses.push({
          isDefaultBillingAddress:
            commercetoolsAddress.id ===
            commercetoolsCustomer.defaultBillingAddressId,
          isBillingAddress: (
            commercetoolsCustomer.billingAddressIds ?? []
          ).includes(commercetoolsAddress.id || ''),
          isDefaultShippingAddress:
            commercetoolsAddress.id ===
            commercetoolsCustomer.defaultShippingAddressId,
          isShippingAddress: (
            commercetoolsCustomer.shippingAddressIds ?? []
          ).includes(commercetoolsAddress.id || ''),
        } as Address);
      });

      return addresses;
    };

  static addressToCommercetoolsAddress: (address: Address) => BaseAddress = (
    address: Address,
  ) => {
    return {
      id: address.addressId,
      key: Guid.newGuid(),
      salutation: address.salutation,
      firstName: address.firstName,
      lastName: address.lastName,
      streetName: address.streetName,
      streetNumber: address.streetNumber,
      additionalStreetInfo: address.additionalStreetInfo,
      additionalAddressInfo: address.additionalAddressInfo,
      postalCode: address.postalCode,
      city: address.city,
      country: address.country,
      state: address.state,
      phone: address.phone,
    } as BaseAddress;
  };

  static commercetoolsCustomersToAccounts(responseBody: any): {
    limit: number; offset: number; count: number; total: number;
    accounts: Account[];
  } {
    const accounts = responseBody.results.map((commercetoolsCustomer: any) => ({
      accountId: commercetoolsCustomer.id,
      key: commercetoolsCustomer?.key,
      customerNumber: commercetoolsCustomer?.customerNumber,
      email: commercetoolsCustomer.email,
      firstName: commercetoolsCustomer?.firstName,
      lastName: commercetoolsCustomer?.lastName,
      middleName: commercetoolsCustomer?.middleName,
      version: commercetoolsCustomer.version.toString(),
      customerGroup: commercetoolsCustomer.customerGroup?.id || undefined,
      createdAt: commercetoolsCustomer?.createdAt,
      lastModifiedAt: commercetoolsCustomer?.lastModifiedAt,
      companyName: commercetoolsCustomer?.companyName,
      stores: commercetoolsCustomer?.stores.map((store: any) => store.key),
      birthday: commercetoolsCustomer?.dateOfBirth
        ? new Date(commercetoolsCustomer.dateOfBirth)
        : undefined,
      vatId: commercetoolsCustomer?.vatId,
      externalId: commercetoolsCustomer?.externalId,
    }));

    return {
      limit: responseBody.limit ?? 0,
      offset: responseBody.offset ?? 0,
      count: responseBody.count ?? 0,
      total: responseBody.total ?? 0,
      accounts,
    };
  }

  static commercetoolsCustomerGroupsToGroups(responseBody: any): {
    limit: number; offset: number; count: number; total: number;
    groups: CustomerGroup[];
  } {
    const groups = responseBody.results.map((commercetoolsCustomerGroup: any) => ({
      id: commercetoolsCustomerGroup.id,
      version: commercetoolsCustomerGroup?.version,
      key: commercetoolsCustomerGroup?.key,
      name: commercetoolsCustomerGroup.name,
      createdAt: commercetoolsCustomerGroup?.createdAt,
      lastModifiedAt: commercetoolsCustomerGroup?.lastModifiedAt,
    }));

    return {
      limit: responseBody.limit ?? 0,
      offset: responseBody.offset ?? 0,
      count: responseBody.count ?? 0,
      total: responseBody.total ?? 0,
      groups,
    };
  }

  static commercetoolsCustomerGroupToGroup(commercetoolsCustomerGroup: any): CustomerGroup {
    return {
      id: commercetoolsCustomerGroup.id,
      version: commercetoolsCustomerGroup?.version,
      key: commercetoolsCustomerGroup?.key,
      name: commercetoolsCustomerGroup.name,
      createdAt: commercetoolsCustomerGroup?.createdAt,
      lastModifiedAt: commercetoolsCustomerGroup?.lastModifiedAt,
      custom: commercetoolsCustomerGroup?.custom,
    };
  }
}
