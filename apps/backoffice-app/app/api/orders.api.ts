import { GET_ORDER_URL } from './path';
import {
  ICreateVariantExternalImage,
  IMappedProductForm
} from 'types/product.type';
import { getProductAction } from './actions/product';
import { httpClient } from './httpClient';
import {
  GET_PRODUCT_DETAIL_URL,
  GET_PRODUCT_URL,
  UPDATE_PRODUCT_URL,
  CREATE_PRODUCT_URL
} from './path';
import { createSlug } from 'utils/product';
import { IRequestPayload } from 'types/global';
import sdk, { sdkServerOptions } from './sdkClient';

export const getOrders = async () => {
  const result = await sdk.composableCommerce.cart.queryOrders(
    {},
    {
      serverOptions: sdkServerOptions
    }
  );
  if (result.isError) return { results: [], total: 0 };

  const items = result.data.data.items;
  return { results: items, total: result.data.data.total };
};

export const getOrderDetails = async (payload: any = {}) => {
  const { params } = payload;
  const url = `${GET_ORDER_URL}/${params}`;
  const data = await httpClient.get(url);
  return data;
};

export const getLineItemBySkuOrVariant = async (payload: any = {}) => {
  const { param, body } = payload;
  return [
    {
      id: 1,
      item: {
        name: 'R123 TS Surface Mining Excavator',
        sku: 'SKU: r123-ts-2023'
      },
      unitPrice: '12',
      qty: 1,
      subtotal: 12
    }
  ];
};
