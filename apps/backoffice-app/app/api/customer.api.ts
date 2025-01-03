import sdk, { sdkServerOptions } from './sdkClient';

export const getCustomers = async () => {
  const response: any =  { results: [], total: 0 };
  const data = await sdk.composableCommerce.account.getCustomers(
    {},
    {
      serverOptions: sdkServerOptions
    }
  );
  if (data.isError) return response;
  response.results = data.data
  return response;
};

export const getCustomerOrders = async (payload: any = {}) => {
  try {
    const response: any =  { results: [], total: 0 };
    const { param } = payload;
    const result = await sdk.composableCommerce.account.getCustomerOrders(
      { id: param },
      {
        serverOptions: sdkServerOptions
      }
    );
    if (result.isError) return response;
    response.results = result.data
    return response;
  } catch (error) {
    return [];
  }
};

export const getCustomerDetail = async (payload: any = {}) => {
  try {
    const response: any =  { results: [], total: 0 };
    const { param } = payload;
    const result = await sdk.composableCommerce.account.getCustomer(
      { id: param },
      {
        serverOptions: sdkServerOptions
      }
    );
    if (result.isError) return response;
    response.results = result.data[0]
    return response
  } catch (error) {
    return [];
  }
};

export const fetchCustomerAddressesById = async (customerId: string) => {
  try {
    return {
      shippingAddress: [
        {
          id: 1,
          firstName: 'William',
          lastName: 'mark',
          email: 'mark@gmail.com',
          streetName: 'APT547',
          houseNumber: '44',
          apartment: 'suit4',
          city: 'Khi',
          postalCode: '555',
          region: 'Newyork',
          country: 'Canada'
        },
        {
          id: 2,
          firstName: 'William',
          lastName: 'mark',
          email: 'mark@gmail.com',
          streetName: 'APT547',
          houseNumber: '44',
          apartment: 'suit4',
          city: 'Khi',
          postalCode: '555',
          region: 'Newyork',
          country: 'Canada'
        }
      ],
      billingAddress: [
        {
          id: 3,
          firstName: 'William',
          lastName: 'mark',
          email: 'mark@gmail.com',
          streetName: 'APT547',
          houseNumber: '44',
          apartment: 'suit4',
          city: 'Khi',
          postalCode: '555',
          region: 'Newyork',
          country: 'Canada'
        },
        {
          id: 4,
          firstName: 'William',
          lastName: 'mark',
          email: 'mark@gmail.com',
          streetName: 'APT547',
          houseNumber: '44',
          apartment: 'suit4',
          city: 'Khi',
          postalCode: '555',
          region: 'Newyork',
          country: 'Canada'
        }
      ]
    };
  } catch (error) {}
};
