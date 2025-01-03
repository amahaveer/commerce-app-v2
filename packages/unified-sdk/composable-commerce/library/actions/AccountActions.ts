import {
  rememberMeCookie,
  Event,
  SDK,
  ServerOptions,
} from '@royalcyber/unified-commerce';
import {
  AddAccountAddressPayload,
  ChangeAccountPasswordPayload,
  ConfirmAccountPayload,
  LoginAccountPayload,
  RegisterAccountPayload,
  RemoveAccountAddressPayload,
  RequestAccountConfirmationEmailPayload,
  RequestAccountPasswordResetPayload,
  ResetAccountPasswordPayload,
  SetDefaultAccountBillingAddressPayload,
  SetDefaultAccountShippingAddressPayload,
  UpdateAccountAddressPayload,
  UpdateAccountPayload,
  GetCustomersPayload,
  GetCustomerPayload,
  GetCustomerOrdersPayload,
} from '../../types/payloads/AccountPayloads';
import {
  AddAccountAddressAction,
  ChangeAccountPasswordAction,
  ConfirmAccountAction,
  GetAccountAction,
  GetAccountActionReturn,
  LoginAccountAction,
  LogoutAccountAction,
  RegisterAccountAction,
  RemoveAccountAddressAction,
  RequestAccountConfirmationEmailAction,
  RequestAccountPasswordResetAction,
  ResetAccountPasswordAction,
  SetDefaultAccountBillingAddressAction,
  SetDefaultAccountShippingAddressAction,
  UpdateAccountAction,
  UpdateAccountAddressAction,
  GetCustomersAction,
  GetCustomerAction,
  GetCustomerOrdersAction,
} from '../../types/actions/AccountActions';
import { Account, Address, Order } from '@royalcyber/global-types';
import { ComposableCommerceEvents } from '../../types/events/ComposableCommerceEvents';
import { AcceptedPayloadTypes } from '@royalcyber/unified-commerce/lib/types/Payload';
import { AcceptedQueryTypes } from '@royalcyber/unified-commerce/lib/types/Query';

export type AccountActions = {
  getAccount: GetAccountAction;
  login: LoginAccountAction;
  logout: LogoutAccountAction;
  register: RegisterAccountAction;
  confirm: ConfirmAccountAction;
  requestConfirmationEmail: RequestAccountConfirmationEmailAction;
  changePassword: ChangeAccountPasswordAction;
  requestResetPassword: RequestAccountPasswordResetAction;
  resetPassword: ResetAccountPasswordAction;
  updateAccount: UpdateAccountAction;
  addAddress: AddAccountAddressAction;
  updateAddress: UpdateAccountAddressAction;
  removeAddress: RemoveAccountAddressAction;
  setDefaultBillingAddress: SetDefaultAccountBillingAddressAction;
  setDefaultShippingAddress: SetDefaultAccountShippingAddressAction;
  getCustomers: GetCustomersAction;
  getCustomer: GetCustomerAction;
  getCustomerOrders: GetCustomerOrdersAction;
};

const addressesAreEqual = function (
  firstAddress: Address,
  secondAddress: Address,
  compareIds: boolean,
) {
  return (
    !compareIds ||
    (compareIds &&
      firstAddress.addressId === secondAddress.addressId &&
      firstAddress.streetName === secondAddress.streetName &&
      firstAddress.streetNumber === secondAddress.streetNumber &&
      firstAddress.additionalStreetInfo ===
      secondAddress.additionalStreetInfo &&
      firstAddress.additionalAddressInfo ===
      secondAddress.additionalAddressInfo &&
      firstAddress.city === secondAddress.city &&
      firstAddress.state === secondAddress.state &&
      firstAddress.country === secondAddress.country &&
      firstAddress.postalCode === secondAddress.postalCode &&
      firstAddress.salutation === secondAddress.salutation &&
      firstAddress.firstName === secondAddress.firstName &&
      firstAddress.lastName === secondAddress.lastName &&
      firstAddress.isDefaultBillingAddress ===
      secondAddress.isDefaultBillingAddress &&
      firstAddress.isDefaultShippingAddress ===
      secondAddress.isDefaultShippingAddress &&
      firstAddress.phone === secondAddress.phone)
  );
};

export const getAccountActions = (
  sdk: SDK<ComposableCommerceEvents>,
): AccountActions => {
  return {
    getAccount: async (options: { serverOptions?: ServerOptions } = {}) => {
      const response = await sdk.callAction<GetAccountActionReturn>({
        actionName: 'account/getAccount',
        serverOptions: options.serverOptions,
      });

      if (
        response.isError === false &&
        response.data.loggedIn &&
        response.data.account
      ) {
        // sdk.trigger(
        //   new Event({
        //     eventName: 'accountFetched',
        //     data: {
        //       account: response.data.account,
        //     },
        //   }),
        // );
      }
      return response;
    },
    login: async (
      payload: LoginAccountPayload,
      options: { serverOptions?: ServerOptions } = {},
    ) => {
      const remember = payload.remember;
      payload.remember = undefined;

      const response = await sdk.callAction<Account>({
        actionName: 'account/login',
        payload,
        serverOptions: options.serverOptions,
      });

      if (response.isError === false) {
        if (remember) {
          await rememberMeCookie.set(true, options.serverOptions);
        }
        // sdk.trigger(
        //   new Event({
        //     eventName: 'userLoggedIn',
        //     data: {
        //       account: response.data,
        //     },
        //   }),
        // );
      }

      return response;
    },
    logout: async (options: { serverOptions?: ServerOptions } = {}) => {
      const response = await sdk.callAction<void>({
        actionName: 'account/logout',
        serverOptions: options.serverOptions,
      });

      if (response.isError === false) {
        await rememberMeCookie.remove(options.serverOptions);
        // sdk.trigger(
        //   new Event({
        //     eventName: 'userLoggedOut',
        //     data: {},
        //   }),
        // );
      }
      return response;
    },
    register: async (
      payload: RegisterAccountPayload,
      options: { serverOptions?: ServerOptions } = {},
    ) => {
      const response = await sdk.callAction<Account>({
        actionName: 'account/register',
        payload,
        serverOptions: options.serverOptions,
      });

      if (response.isError === false) {
        // sdk.trigger(
        //   new Event({
        //     eventName: 'userRegistered',
        //     data: {
        //       account: response.data,
        //     },
        //   }),
        // );
      }
      return response;
    },
    confirm: async (
      payload: ConfirmAccountPayload,
      options: { serverOptions?: ServerOptions } = {},
    ) => {
      const response = await sdk.callAction<Account>({
        actionName: 'account/confirm',
        payload,
        serverOptions: options.serverOptions,
      });

      if (response.isError === false) {
        // sdk.trigger(
        //   new Event({
        //     eventName: 'accountConfirmed',
        //     data: {
        //       account: response.data,
        //     },
        //   }),
        // );
      }
      return response;
    },
    requestConfirmationEmail: async (
      payload: RequestAccountConfirmationEmailPayload,
      options: { serverOptions?: ServerOptions } = {},
    ) => {
      const response = await sdk.callAction<void>({
        actionName: 'account/requestConfirmationEmail',
        payload,
        serverOptions: options.serverOptions,
      });

      if (response.isError === false) {
        // sdk.trigger(
        //   new Event({
        //     eventName: 'accountConfirmationEmailRequested',
        //     data: {
        //       email: payload.email,
        //     },
        //   }),
        // );
      }
      return response;
    },
    changePassword: async (
      payload: ChangeAccountPasswordPayload,
      options: { serverOptions?: ServerOptions } = {},
    ) => {
      const response = await sdk.callAction<Account>({
        actionName: 'account/password',
        payload,
        serverOptions: options.serverOptions,
      });

      if (response.isError === false) {
        // sdk.trigger(
        //   new Event({
        //     eventName: 'passwordChanged',
        //     data: {},
        //   }),
        // );
      }
      return response;
    },
    requestResetPassword: async (
      payload: RequestAccountPasswordResetPayload,
      options: { serverOptions?: ServerOptions } = {},
    ) => {
      const response = await sdk.callAction<void>({
        actionName: 'account/requestReset',
        payload,
        serverOptions: options.serverOptions,
      });

      if (response.isError === false) {
        // sdk.trigger(
        //   new Event({
        //     eventName: 'passwordResetRequested',
        //     data: {},
        //   }),
        // );
      }
      return response;
    },
    resetPassword: async (
      payload: ResetAccountPasswordPayload,
      options: { serverOptions?: ServerOptions } = {},
    ) => {
      const response = await sdk.callAction<Account>({
        actionName: 'account/reset',
        payload,
        serverOptions: options.serverOptions,
      });

      if (response.isError === false) {
        // sdk.trigger(
        //   new Event({
        //     eventName: 'passwordReset',
        //     data: {},
        //   }),
        // );
      }
      return response;
    },
    updateAccount: async (
      payload: UpdateAccountPayload,
      options: { serverOptions?: ServerOptions } = {},
    ) => {
      const response = await sdk.callAction<Account>({
        actionName: 'account/update',
        payload,
        serverOptions: options.serverOptions,
      });

      if (response.isError === false) {
        // sdk.trigger(
        //   new Event({
        //     eventName: 'accountUpdated',
        //     data: {
        //       account: response.data,
        //     },
        //   }),
        // );
      }
      return response;
    },
    addAddress: async (
      payload: AddAccountAddressPayload,
      options: { serverOptions?: ServerOptions } = {},
    ) => {
      const response = await sdk.callAction<Account>({
        actionName: 'account/addAddress',
        payload,
        serverOptions: options.serverOptions,
      });

      if (response.isError === false) {
        const newAddress = response.data.addresses?.find((address) =>
          addressesAreEqual(address, payload, false),
        );
        if (newAddress) {
          // sdk.trigger(
          //   new Event({
          //     eventName: 'accountAddressAdded',
          //     data: {
          //       address: newAddress,
          //     },
          //   }),
          // );
        }
      }
      return response;
    },
    updateAddress: async (
      payload: UpdateAccountAddressPayload,
      options: { serverOptions?: ServerOptions } = {},
    ) => {
      const response = await sdk.callAction<Account>({
        actionName: 'account/updateAddress',
        payload: payload as AcceptedPayloadTypes,
        serverOptions: options.serverOptions,
      });

      if (response.isError === false) {
        const newAddress = response.data.addresses?.find((address) =>
          addressesAreEqual(address, payload, true),
        );
        if (newAddress) {
          // sdk.trigger(
          //   new Event({
          //     eventName: 'accountAddressUpdated',
          //     data: {
          //       address: newAddress,
          //     },
          //   }),
          // );
        }
      }
      return response;
    },
    removeAddress: async (
      payload: RemoveAccountAddressPayload,
      options: { serverOptions?: ServerOptions } = {},
    ) => {
      const response = await sdk.callAction<Account>({
        actionName: 'account/removeAddress',
        payload,
        serverOptions: options.serverOptions,
      });

      if (response.isError === false) {
        if (
          !response.data.addresses?.find(
            (address) => address.addressId === payload.addressId,
          )
        ) {
          // sdk.trigger(
          //   new Event({
          //     eventName: 'accountAddressRemoved',
          //     data: {
          //       addressId: payload.addressId,
          //     },
          //   }),
          // );
        }
      }
      return response;
    },
    setDefaultBillingAddress: async (
      payload: SetDefaultAccountBillingAddressPayload,
      options: { serverOptions?: ServerOptions } = {},
    ) => {
      const response = await sdk.callAction<Account>({
        actionName: 'account/setDefaultBillingAddress',
        payload,
        serverOptions: options.serverOptions,
      });

      if (response.isError === false) {
        const address = response.data.addresses?.find(
          (address) => address.addressId === payload.addressId,
        );
        if (address?.isDefaultBillingAddress) {
          // sdk.trigger(
          //   new Event({
          //     eventName: 'defaultBillingAddressSet',
          //     data: {
          //       address: address,
          //     },
          //   }),
          // );
        }
      }
      return response;
    },
    setDefaultShippingAddress: async (
      payload: SetDefaultAccountShippingAddressPayload,
      options: { serverOptions?: ServerOptions } = {},
    ) => {
      const response = await sdk.callAction<Account>({
        actionName: 'account/setDefaultShippingAddress',
        payload,
        serverOptions: options.serverOptions,
      });

      if (response.isError === false) {
        const address = response.data.addresses?.find(
          (address) => address.addressId === payload.addressId,
        );
        if (address?.isDefaultShippingAddress) {
          // sdk.trigger(
          //   new Event({
          //     eventName: 'defaultShippingAddressSet',
          //     data: {
          //       address: address,
          //     },
          //   }),
          // );
        }
      }
      return response;
    },
    getCustomers: async (
      query: GetCustomersPayload,
      options: {
        serverOptions?: ServerOptions;
      } = {}
    ) => {
      const response = await sdk.callAction<Account[]>({
        actionName: 'account/getCustomers',
        query,
        serverOptions: options.serverOptions,
      });
      if (response.isError) {
        throw new Error(`Failed to fetch customer list: ${response.error?.message}`);
      }
      return response;
    },
    getCustomer: async (
      query: GetCustomerPayload,
      options: {
        serverOptions?: ServerOptions;
      } = {}
    ) => {
      const response = await sdk.callAction<Account[]>({
        actionName: 'account/getCustomer',
        query,
        serverOptions: options.serverOptions,
      });
      if (response.isError) {
        throw new Error(`Failed to fetch customer list: ${response.error?.message}`);
      }
      return response;
    },
    getCustomerOrders: async (
      query: GetCustomerOrdersPayload,
      options: {
        serverOptions?: ServerOptions;
      } = {}
    ) => {
      const response = await sdk.callAction<Order[]>({
        actionName: 'account/getCustomerOrders',
        query,
        serverOptions: options.serverOptions,
      });
      if (response.isError) {
        throw new Error(`Failed to fetch customer orders: ${response.error?.message}`);
      }
      return response;
    },
  };
};