import {
  BaseAddress,
  CartResourceIdentifier,
  CustomerDraft,
  CustomerUpdate,
  CustomerUpdateAction,
  CustomerGroupDraft,
  CustomerGroupUpdateAction,
  CustomerGroupUpdate,
} from '@commercetools/platform-sdk';
import { Account, Cart, Address, ClientType, AccountToken, CustomerQuery, CustomerGroup, Order } from '@royalcyber/global-types';
import { AccountMapper } from '../mappers/AccountMapper';
import { Guid } from '../utils/Guid';
import { AccountEmailDuplicatedError } from '../errors/AccountEmailDuplicatedError';
import { AccountAuthenticationError } from '../errors/AccountAuthenticationError';
import { BaseService } from './BaseService';
import { ExternalError } from '../errors/ExternalError';
import { ValidationError } from '../errors/ValidationError';
import { CustomerGroupMapper } from '../mappers/CustomerGroupMapper';
import { CartMapper } from '../mappers/CartMapper';

export class AccountService extends BaseService {
  create: (account: Account, cart?: Cart | undefined) => Promise<Account> =
    async (account: Account, cart: Cart | undefined) => {

      const {
        commercetoolsAddresses,
        billingAddresses,
        shippingAddresses,
        defaultBillingAddress,
        defaultShippingAddress,
      } = this.extractAddresses(account);

      const customerDraft: CustomerDraft = {
        key: Guid.newGuid(),
        email: account.email,
        password: account.password ?? '',
        salutation: account?.salutation,
        firstName: account?.firstName,
        lastName: account?.lastName,
        middleName: account?.middleName,
        companyName: account?.companyName,
        customerNumber: account?.customerNumber,
        locale: account?.locale,
        vatId: account?.vatId,
        title: account?.title,
        dateOfBirth: account?.birthday
          ? account.birthday.getFullYear() +
          '-' +
          account.birthday.getMonth() +
          '-' +
          account.birthday.getDate()
          : undefined,
        isEmailVerified: account?.confirmed,
        addresses:
          commercetoolsAddresses.length > 0
            ? commercetoolsAddresses
            : undefined,
        defaultBillingAddress: defaultBillingAddress,
        defaultShippingAddress: defaultShippingAddress,
        billingAddresses:
          billingAddresses.length > 0 ? billingAddresses : undefined,
        shippingAddresses:
          shippingAddresses.length > 0 ? shippingAddresses : undefined,
        anonymousCart:
          cart !== undefined
            ? ({
              typeId: 'cart',
              id: cart.cartId,
            } as CartResourceIdentifier)
            : undefined,
      };

      account = await this.requestBuilder()
        .customers()
        .post({
          body: customerDraft,
        })
        .execute()
        .then((response) => {
          return AccountMapper.commercetoolsCustomerToAccount(
            response.body.customer,
          );
        })
        .catch((error) => {
          if (error.code === 400) {
            if (
              error instanceof ExternalError &&
              error?.errorName === ExternalError.DUPLICATED_FIELD_ERROR_NAME
            ) {
              throw new AccountEmailDuplicatedError({
                message: `The account ${account.email} does already exist.`,
              });
            }

            /*
             * The cart might already belong to another user, so we try to create tje account without the cart.
             */
            if (cart) {
              return this.create(account, undefined);
            }
          }

          throw new ExternalError({
            statusCode: error.code,
            message: error.message,
            body: error.body,
          });
        });

      if (!account.confirmed) {
        account.confirmationToken = await this.getConfirmationToken(account);
      }

      return account;
    };

  confirmEmail: (token: string) => Promise<Account> = async (token: string) => {
    return await this.requestBuilder()
      .customers()
      .emailConfirm()
      .post({
        body: {
          tokenValue: token,
        },
      })
      .execute()
      .then((response) => {
        return AccountMapper.commercetoolsCustomerToAccount(response.body);
      })
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });
  };

  fetchCustomer: (identifier: { id?: string; key?: string, clientType: ClientType }) => Promise<Account> =
    async (identifier) => {
      if (!identifier.id && !identifier.key) {
        throw new Error('Either id or key must be provided to fetch the customer.');
      }

      try {
        const customerEndpoint = this.requestBuilder().customers();

        let response;
        if (identifier.id) {
          response = await customerEndpoint
            .withId({ ID: identifier.id })
            .get()
            .execute();
        } else if (identifier.key) {
          response = await customerEndpoint
            .withKey({ key: identifier.key })
            .get()
            .execute();
        } else {
          throw new Error('Invalid identifier provided.');
        }

        return AccountMapper.commercetoolsCustomerToAccount(response.body);
      } catch (error: any) {
        if (error.code === 404) {
          throw new Error('Customer not found.');
        }

        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      }
    };

  login: (account: Account, cart: Cart | undefined) => Promise<Account> =
    async (account: Account, cart: Cart | undefined) => {
      // const locale = await this.getCommercetoolsLocal();

      const accountCredentials: Account = {
        email: account.email,
        password: account.password ?? '',
      };

      account = await this.requestBuilder()
        .login()
        .post({
          body: {
            email: account.email,
            password: account.password ?? '',
            anonymousCart:
              cart !== undefined
                ? ({
                  typeId: 'cart',
                  id: cart.cartId,
                } as CartResourceIdentifier)
                : undefined,
          },
        })
        .execute()
        .then((response) => {
          return AccountMapper.commercetoolsCustomerToAccount(
            response.body.customer,
          );
        })
        .catch((error) => {
          if (error.code && error.code === 400) {
            if (
              error.body &&
              error.body?.errors?.[0]?.code === 'InvalidCredentials'
            ) {
              throw new AccountAuthenticationError({
                message: 'Failed to login account with the given credentials',
              });
            }

            /*
             * The cart might already belong to another user, so we try to log in without the cart.
             */
            if (cart) {
              return this.login(account, undefined);
            }
          }

          throw new ExternalError({
            statusCode: error.code,
            message: error.message,
            body: error.body,
          });
        });

      if (!account.confirmed) {
        account.confirmationToken = await this.getConfirmationToken(account);
      }

      return account;
    };

  updatePassword: (
    account: Account,
    oldPassword: string,
    newPassword: string,
  ) => Promise<Account> = async (
    account: Account,
    oldPassword: string,
    newPassword: string,
  ) => {
      // const locale = await this.getCommercetoolsLocal();

      const accountVersion = await this.fetchAccountVersion(account);

      account = await this.requestBuilder()
        .customers()
        .password()
        .post({
          body: {
            id: account.accountId!,
            version:
              accountVersion !== undefined
                ? accountVersion
                : (() => {
                  throw new Error('Account version is undefined');
                })(),
            currentPassword: oldPassword,
            newPassword: newPassword,
          },
        })
        .execute()
        .then((response) => {
          return AccountMapper.commercetoolsCustomerToAccount(response.body);
        })
        .catch((error) => {
          throw new ExternalError({
            statusCode: error.code,
            message: error.message,
            body: error.body,
          });
        });

      return account;
    };

  generatePasswordResetToken: (email: string) => Promise<AccountToken> = async (
    email: string,
  ) => {
    return await this.requestBuilder()
      .customers()
      .passwordToken()
      .post({
        body: {
          email: email,
          ttlMinutes: 2 * 24 * 60,
        },
      })
      .execute()
      .then((response) => {
        return {
          email: email,
          token: response.body.value,
          tokenValidUntil: new Date(response.body.expiresAt),
        };
      })
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });
  };

  resetPassword: (token: string, newPassword: string) => Promise<Account> =
    async (token: string, newPassword: string) => {
      // const locale = await this.getCommercetoolsLocal();

      return await this.requestBuilder()
        .customers()
        .passwordReset()
        .post({
          body: {
            tokenValue: token,
            newPassword: newPassword,
          },
        })
        .execute()
        .then((response) => {
          return AccountMapper.commercetoolsCustomerToAccount(response.body);
        })
        .catch((error) => {
          throw new ExternalError({
            statusCode: error.code,
            message: error.message,
            body: error.body,
          });
        });
    };

  update: (account: Account) => Promise<Account> = async (account: Account) => {
    const customerUpdateActions: CustomerUpdateAction[] = [];

    if (account.firstName) {
      customerUpdateActions.push({
        action: 'setFirstName',
        firstName: account.firstName,
      });
    }

    if (account.lastName) {
      customerUpdateActions.push({
        action: 'setLastName',
        lastName: account.lastName,
      });
    }

    if (account.email) {
      customerUpdateActions.push({
        action: 'changeEmail',
        email: account.email,
      });
    }

    if (account.salutation) {
      customerUpdateActions.push({
        action: 'setSalutation',
        salutation: account.salutation,
      });
    }

    if (account.birthday) {
      customerUpdateActions.push({
        action: 'setDateOfBirth',
        dateOfBirth:
          account.birthday.getFullYear() +
          '-' +
          account.birthday.getMonth() +
          '-' +
          account.birthday.getDate(),
      });
    }

    if (account.title) {
      customerUpdateActions.push({
        action: 'setTitle',
        title: account.title,
      });
    }

    if (account.middleName) {
      customerUpdateActions.push({
        action: 'setMiddleName',
        middleName: account.middleName,
      });
    }

    if (account.locale) {
      customerUpdateActions.push({
        action: 'setLocale',
        locale: account.locale,
      });
    }

    if (account.customerNumber) {
      customerUpdateActions.push({
        action: 'setCustomerNumber',
        customerNumber: account.customerNumber,
      });
    }

    if (account.externalId) {
      customerUpdateActions.push({
        action: 'setExternalId',
        externalId: account.externalId,
      });
    }

    if (account.companyName) {
      customerUpdateActions.push({
        action: 'setCompanyName',
        companyName: account.companyName,
      });
    }

    if (account.vatId) {
      customerUpdateActions.push({
        action: 'setVatId',
        vatId: account.vatId,
      });
    }

    account = await this.updateAccount(account, customerUpdateActions);

    if (!account.confirmed) {
      account.confirmationToken = await this.getConfirmationToken(account);
    }

    return account;
  };

  addAddress: (account: Account, address: Address) => Promise<Account> = async (
    account: Account,
    address: Address,
  ) => {
    const customerUpdateActions: CustomerUpdateAction[] = [];

    let addressData = AccountMapper.addressToCommercetoolsAddress(address);

    if (addressData.id !== undefined) {
      addressData = {
        ...addressData,
        id: undefined,
      };
    }

    if (address.isDefaultBillingAddress || address.isDefaultShippingAddress) {
      addressData = {
        ...addressData,
        key: Guid.newGuid(),
      };
    }

    customerUpdateActions.push({ action: 'addAddress', address: addressData });

    if (address.isDefaultBillingAddress) {
      customerUpdateActions.push({
        action: 'setDefaultBillingAddress',
        addressKey: addressData.key,
      });
    }

    if (address.isDefaultShippingAddress) {
      customerUpdateActions.push({
        action: 'setDefaultShippingAddress',
        addressKey: addressData.key,
      });
    }

    return await this.updateAccount(account, customerUpdateActions);
  };

  addShippingAddress: (account: Account, address: Address) => Promise<Account> =
    async (account: Account, address: Address) => {
      const customerUpdateActions: CustomerUpdateAction[] = [];

      let addressData = AccountMapper.addressToCommercetoolsAddress(address);

      if (addressData.id !== undefined) {
        addressData = {
          ...addressData,
          id: undefined,
        };
      }

      customerUpdateActions.push({
        action: 'addAddress',
        address: addressData,
      });
      customerUpdateActions.push({
        action: 'addShippingAddressId',
        addressKey: addressData.key,
      });

      if (address.isDefaultShippingAddress) {
        customerUpdateActions.push({
          action: 'setDefaultShippingAddress',
          addressKey: addressData.key,
        });
      }

      return await this.updateAccount(account, customerUpdateActions);
    };

  addBillingAddress: (account: Account, address: Address) => Promise<Account> =
    async (account: Account, address: Address) => {
      const customerUpdateActions: CustomerUpdateAction[] = [];

      let addressData = AccountMapper.addressToCommercetoolsAddress(address);

      if (addressData.id !== undefined) {
        addressData = {
          ...addressData,
          id: undefined,
        };
      }

      customerUpdateActions.push({
        action: 'addAddress',
        address: addressData,
      });
      customerUpdateActions.push({
        action: 'addBillingAddressId',
        addressKey: addressData.key,
      });

      if (address.isDefaultBillingAddress) {
        customerUpdateActions.push({
          action: 'setDefaultBillingAddress',
          addressKey: addressData.key,
        });
      }

      return await this.updateAccount(account, customerUpdateActions);
    };

  updateAddress: (account: Account, address: Address) => Promise<Account> =
    async (account: Account, address: Address) => {
      const customerUpdateActions: CustomerUpdateAction[] = [];

      let addressData = AccountMapper.addressToCommercetoolsAddress(address);

      if (addressData.id !== undefined) {
        addressData = {
          ...addressData,
          id: undefined,
        };
      }

      if (address.isDefaultBillingAddress || address.isDefaultShippingAddress) {
        addressData = {
          ...addressData,
          key: Guid.newGuid(),
        };
      }

      customerUpdateActions.push({
        action: 'changeAddress',
        addressId: address.addressId,
        address: addressData,
      });

      if (address.isDefaultBillingAddress) {
        customerUpdateActions.push({
          action: 'setDefaultBillingAddress',
          addressKey: addressData.key,
        });
      }

      if (address.isDefaultShippingAddress) {
        customerUpdateActions.push({
          action: 'setDefaultShippingAddress',
          addressKey: addressData.key,
        });
      }

      return await this.updateAccount(account, customerUpdateActions);
    };

  removeAddress: (account: Account, address: Address) => Promise<Account> =
    async (account: Account, address: Address) => {
      const customerUpdateActions: CustomerUpdateAction[] = [];

      const addressData = AccountMapper.addressToCommercetoolsAddress(address);

      if (addressData.id === undefined) {
        throw new ValidationError({
          message: `The address passed doesn't contain an id.`,
        });
      }

      customerUpdateActions.push({
        action: 'removeAddress',
        addressId: address.addressId,
      });

      return await this.updateAccount(account, customerUpdateActions);
    };

  setDefaultBillingAddress: (
    account: Account,
    address: Address,
  ) => Promise<Account> = async (account: Account, address: Address) => {
    const customerUpdateActions: CustomerUpdateAction[] = [];

    const addressData = AccountMapper.addressToCommercetoolsAddress(address);

    customerUpdateActions.push({
      action: 'setDefaultBillingAddress',
      addressId: addressData.id,
    });

    return await this.updateAccount(account, customerUpdateActions);
  };

  setDefaultShippingAddress: (
    account: Account,
    address: Address,
  ) => Promise<Account> = async (account: Account, address: Address) => {
    const customerUpdateActions: CustomerUpdateAction[] = [];

    const addressData = AccountMapper.addressToCommercetoolsAddress(address);

    customerUpdateActions.push({
      action: 'setDefaultShippingAddress',
      addressId: addressData.id,
    });

    return await this.updateAccount(account, customerUpdateActions);
  };

  async getAccountByEmail(email: string): Promise<Account | null> {
    return this.requestBuilder()
      .customers()
      .get({
        queryArgs: {
          where: `email="${email}"`,
          limit: 1,
        },
      })
      .execute()
      .then((response) => {
        if (!response.body.results.length) {
          return null;
        }

        return AccountMapper.commercetoolsCustomerToAccount(response.body.results[0]);
      });
  }

  protected extractAddresses(account: Account) {
    const commercetoolsAddresses: BaseAddress[] = [];
    const billingAddresses: number[] = [];
    const shippingAddresses: number[] = [];
    let defaultBillingAddress: number | undefined;
    let defaultShippingAddress: number | undefined;

    account.addresses?.forEach((address, key) => {
      const addressData = AccountMapper.addressToCommercetoolsAddress(address);

      commercetoolsAddresses.push(addressData);

      if (address.isDefaultBillingAddress) {
        billingAddresses.push(key);
        defaultBillingAddress = key;
      }

      if (address.isDefaultShippingAddress) {
        shippingAddresses.push(key);
        defaultShippingAddress = key;
      }
    });

    return {
      commercetoolsAddresses,
      billingAddresses,
      shippingAddresses,
      defaultBillingAddress,
      defaultShippingAddress,
    };
  }

  protected async fetchAccountVersion(
    account: Account,
  ): Promise<number | undefined> {
    const commercetoolsAccount = await this.requestBuilder()
      .customers()
      .withId({ ID: account.accountId! })
      .get()
      .execute()
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });

    return commercetoolsAccount.body?.version;
  }

  protected async updateAccount(
    account: Account,
    customerUpdateActions: CustomerUpdateAction[],
  ) {
    // const locale = await this.getCommercetoolsLocal();

    const accountVersion = await this.fetchAccountVersion(account);

    const customerUpdate: CustomerUpdate = {
      version:
        accountVersion !== undefined
          ? accountVersion
          : (() => {
            throw new Error('Account version is undefined');
          })(),
      actions: customerUpdateActions,
    };

    return await this.requestBuilder()
      .customers()
      .withId({ ID: account.accountId! })
      .post({
        body: customerUpdate,
      })
      .execute()
      .then((response) => {
        return AccountMapper.commercetoolsCustomerToAccount(response.body);
      })
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });
  }

  protected async getConfirmationToken(
    account: Account,
  ): Promise<AccountToken> {
    return await this.requestBuilder()
      .customers()
      .emailToken()
      .post({
        body: {
          id: account.accountId!,
          ttlMinutes: 2 * 7 * 24 * 60,
        },
      })
      .execute()
      .then((response) => {
        const accountToken: AccountToken = {
          email: account.email,
          token: response.body.value,
          tokenValidUntil: new Date(response.body.expiresAt),
        };

        return accountToken;
      })
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });
  }

  protected async fetchCustomerGroupVersion(customerGroup: CustomerGroup): Promise<number> {
    try {
      const commercetoolsCustomerGroup = await this.requestBuilder()
        .customerGroups()
        .withId({ ID: customerGroup.id! }) // Assuming customerGroup has an `id` property
        .get()
        .execute();

      // Return the version from the response
      return commercetoolsCustomerGroup.body?.version!;
    } catch (error: any) {
      throw new ExternalError({
        statusCode: error.code,
        message: error.message,
        body: error.body,
      });
    }
  }

  protected async updateCustomerGroupApi(
    customerGroup: CustomerGroup,
    customerGroupUpdateActions: CustomerGroupUpdateAction[],
  ): Promise<CustomerGroup> {
    // Fetch the current version of the customer group
    const customerGroupVersion = await this.fetchCustomerGroupVersion(customerGroup);

    // Prepare the customer group update request
    const customerGroupUpdate: CustomerGroupUpdate = {
      version: customerGroupVersion !== undefined
        ? customerGroupVersion
        : (() => {
          throw new Error('Customer group version is undefined');
        })(),
      actions: customerGroupUpdateActions,
    };

    return await this.requestBuilder()
      .customerGroups()
      .withId({ ID: customerGroup.id! })
      .post({
        body: customerGroupUpdate,
      })
      .execute()
      .then((response) => {
        return AccountMapper.commercetoolsCustomerGroupToCustomerGroup(response.body);
      })
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });
  }

  async delete(account: Account) {
    return this.requestBuilder()
      .customers()
      .withId({ ID: account.accountId! })
      .delete({
        queryArgs: {
          version:
            account.version !== undefined
              ? Number(account.version)
              : (() => {
                throw new Error('Account version is undefined');
              })(),
          dataErasure: true,
        },
      })
      .execute()
      .then((response) => response.body)
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });
  }

  async getCustomerList(
    customerQuery: CustomerQuery,
    clientType: ClientType
  ): Promise<{ accounts: Account[]; limit: number; offset: number; count: number; total: number } | null> {
    return this.requestBuilder()
      .customers()
      .get({
        queryArgs: {
          limit: customerQuery.limit ?? 20,
          offset: customerQuery.offset ?? 0,
          where: customerQuery.where ?? undefined,
          sort: (customerQuery.sortAttributes as string[]) || [""],
        },
      })
      .execute()
      .then((response) => {
        if (!response.body.results.length) {
          return null;
        }
        return AccountMapper.commercetoolsCustomersToAccounts(response.body);
      });
  }

  async getCustomerGroupList(
    customerGroupQuery: CustomerQuery,
    clientType: ClientType
  ): Promise<{ groups: CustomerGroup[]; limit: number; offset: number; count: number; total: number } | null> {
    if (clientType === ClientType.WEB) {
      return { limit: 0, offset: 0, count: 0, total: 0, groups: [] };
    }

    return this.requestBuilder()
      .customerGroups()
      .get({
        queryArgs: {
          limit: customerGroupQuery.limit ?? 20,
          offset: customerGroupQuery.offset ?? 0,
          where: customerGroupQuery.where ?? undefined,
          sort: (customerGroupQuery.sortAttributes as string[]) || [""],
        },
      })
      .execute()
      .then((response) => {
        if (!response.body.results.length) {
          return null;
        }
        return AccountMapper.commercetoolsCustomerGroupsToGroups(response.body);
      });
  }

  addCustomerGroup: (customerGroup: CustomerGroup) => Promise<CustomerGroup> =
    async (customerGroup: CustomerGroup) => {
      const customerGroupDraft: CustomerGroupDraft = {
        key: customerGroup.key ?? Guid.newGuid(),
        groupName: customerGroup.name as string,
        custom: customerGroup.custom,
      };

      try {
        const createdCustomerGroup = await this.requestBuilder()
          .customerGroups()
          .post({
            body: customerGroupDraft,
          })
          .execute()
          .then((response) => {
            return AccountMapper.commercetoolsCustomerGroupToGroup(response.body);
          });

        return createdCustomerGroup;
      } catch (error: any) {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      }
    };

  updateCustomerGroup = async (customerGroup: CustomerGroup) => {
    const customerGroupUpdateActions: CustomerGroupUpdateAction[] = [];
    if (customerGroup.name) {
      customerGroupUpdateActions.push({
        action: 'changeName',
        name: customerGroup.name,
      });
    }

    if (customerGroup.custom) {
      const { type, value, name, fields } = customerGroup.custom;

      if (value) {
        customerGroupUpdateActions.push({
          action: 'setCustomField',
          name: name,
          value: value,
        });
      }

      if (type) {
        customerGroupUpdateActions.push({
          action: 'setCustomType',
          type: type,
          fields: fields || {},
        });
      }
    }

    if (customerGroup.key) {
      customerGroupUpdateActions.push({
        action: 'setKey',
        key: customerGroup.key,
      });
    }

    customerGroup = await this.updateCustomerGroupApi(customerGroup, customerGroupUpdateActions);

    return customerGroup;
  };

  fetchCustomerGroup: (identifier: { id?: string; key?: string, clientType: ClientType }) => Promise<CustomerGroup> =
    async (identifier) => {
      if (!identifier.id && !identifier.key) {
        throw new Error('Either id or key must be provided to fetch the customer group.');
      }

      try {
        const customerGroupEndpoint = this.requestBuilder().customerGroups();

        let response;
        if (identifier.id) {
          response = await customerGroupEndpoint
            .withId({ ID: identifier.id })
            .get()
            .execute();
        } else if (identifier.key) {
          response = await customerGroupEndpoint
            .withKey({ key: identifier.key })
            .get()
            .execute();
        } else {
          throw new Error('Invalid identifier provided.');
        }

        return AccountMapper.commercetoolsCustomerGroupToGroup(response.body);
      } catch (error: any) {
        if (error.code === 404) {
          throw new Error('Customer group not found.');
        }

        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      }
    };

  async fetchOrdersByCustomerId(
    customerQuery: CustomerQuery,
  ): Promise<{ orders: Order[]; limit: number; offset: number; count: number; total: number } | null> {
    return this.requestBuilder()
      .orders()
      .get({
        queryArgs: {
          where: `customerId="${customerQuery.id}"`,
          limit: customerQuery.limit || 20,
          offset: customerQuery.offset || 0,
          sort: (customerQuery.sortAttributes as string[]) || ["createdAt desc"],
        },
      })
      .execute()
      .then((response) => {
        if (!response.body.results.length) {
          return null;
        }
        return CartMapper.commercetoolsOrdersToOrders(response.body);
      });
  }
}
