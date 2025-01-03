import {
  ActionContext,
  Request,
  Response,
  CategoryQuery,
  CategoryQueryFormat,
  ProductQuery,
  InventoryQuery,
  Channel,
  ClientType,
} from '@royalcyber/global-types';
import { ProductService } from '../services/ProductService';
import { ProductQueryFactory } from '../utils/ProductQueryFactory';
import { getClientType, getCurrency, getLocale } from '../utils/Request';
import handleError from '../utils/handleError';
import { InventoryEntry } from '@commercetools/platform-sdk';

type ActionHook = (
  request: Request,
  actionContext: ActionContext,
) => Promise<Response>;

export type InventoryRegisterBody = {
  version?: number;
  actions?: { action: string; quantity?: number; [key: string]: any }[];
  key?: string;
  sku?: string;
  supplyChannel?: Channel | undefined;
  quantityOnStock?: number;
  availableQuantity?: number;
  restockableInDays?: number;
  expectedDelivery?: string;
  custom?: any;
  createdAt?: string;
  lastModifiedAt?: string;
};

function getProductService(request: Request, actionContext: ActionContext) {
  if (!actionContext.globalContext) {
    throw new Error('Global context is undefined');
  }
  return new ProductService(
    actionContext.globalContext,
    getLocale(request),
    getCurrency(request),
    request,
  );
}

export const getProduct: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    const clientType = getClientType(request);
    const productApi = getProductService(request, actionContext);
    let productQuery: ProductQuery = {};

    if ('id' in request.query) {
      productQuery = {
        productIds: [request.query['id']],
      };
    }

    if ('key' in request.query) {
      productQuery = {
        productKeys: [request.query['key']],
      };
    }

    if ('ref' in request.query) {
      productQuery = {
        productRefs: [request.query['ref']],
      };
    }

    if ('sku' in request.query) {
      productQuery = {
        skus: [request.query['sku']],
      };
    }

    const product = await productApi.getProduct(productQuery, clientType);

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(product),
      sessionData: {
        ...productApi.getSessionData(),
      },
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const query: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    const clientType = getClientType(request);
    const productApi = getProductService(request, actionContext);

    const productQuery = ProductQueryFactory.queryFromParams(request);

    const queryResult = await productApi.query(productQuery, clientType);

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(queryResult),
      sessionData: {
        ...productApi.getSessionData(),
      },
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const queryCategories: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    const clientType = getClientType(request);
    const productApi = getProductService(request, actionContext);

    const categoryQuery: CategoryQuery = {
      limit: request.query?.limit ?? undefined,
      cursor: request.query?.cursor ?? undefined,
      slug: request.query?.slug ?? undefined,
      parentId: request.query?.parentId ?? undefined,
      format: request.query?.format ?? CategoryQueryFormat.FLAT,
    };

    const queryResult = await productApi.queryCategories(
      categoryQuery,
      clientType,
    );

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(queryResult),
      sessionData: {
        ...productApi.getSessionData(),
      },
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const searchableAttributes: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    const clientType = getClientType(request);
    const productApi = getProductService(request, actionContext);

    const result = await productApi.getSearchableAttributes(clientType);

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(result),
      sessionData: {
        ...productApi.getSessionData(),
      },
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const getProductTypes: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    const productApi = getProductService(request, actionContext);

    const result = await productApi.queryProductTypes();

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(result),
      sessionData: {
        ...productApi.getSessionData(),
      },
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const getProductType: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    const productTypeId = request.query['id'];
    const productApi = getProductService(request, actionContext);

    const result = await productApi.getProductType(productTypeId);

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(result),
      sessionData: {
        ...productApi.getSessionData(),
      },
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const createProduct: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    const productDraft = JSON.parse(request.body ?? '{}');
    const productApi = getProductService(request, actionContext);

    const result = await productApi.create(productDraft);

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(result),
      sessionData: {
        ...productApi.getSessionData(),
      },
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const updateProduct: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    const productId = request.query['id'];
    const productUpdate = JSON.parse(request.body ?? '{}');
    const productApi = getProductService(request, actionContext);

    const result = await productApi.update(productId, productUpdate);

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(result),
      sessionData: {
        ...productApi.getSessionData(),
      },
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const getProject: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    const productApi = getProductService(request, actionContext);

    const result = await productApi.getProjectSeetings();

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(result),
      sessionData: {
        ...productApi.getSessionData(),
      },
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const getInventories: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    const clientType = getClientType(request);

    if (clientType !== ClientType.BO) {
      throw new Error('Invalid client type.');
    }

    const productApi = getProductService(request, actionContext);

    const inventoryQuery: InventoryQuery = {
      sku: request.query?.sku ?? undefined,
      limit: request.query?.limit ?? undefined,
      cursor: request.query?.cursor ?? undefined,
    };

    const result = await productApi.queryInventories(
      inventoryQuery,
      clientType,
    );

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(result),
      sessionData: {
        ...productApi.getSessionData(),
      },
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const createInventories: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    const clientType = getClientType(request);

    if (clientType !== ClientType.BO) {
      throw new Error('Invalid client type.');
    }

    const inventoryDraft = JSON.parse(request.body ?? '{}');
    const productApi = getProductService(request, actionContext);
    const result = await productApi.createInventory(inventoryDraft);

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(result),
      sessionData: {
        ...productApi.getSessionData(),
      },
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};

export function mapRequestToInventory(request: Request): InventoryEntry {
  const inventoryRegisterBody: InventoryRegisterBody = JSON.parse(
    request.body ?? '{}',
  );

  // Extract quantity from the actions array if `changeQuantity` exists
  const changeQuantityAction = inventoryRegisterBody.actions?.find(
    (action) =>
      action.action === 'changeQuantity' || action.action === 'addQuantity',
  );
  const restockAction = inventoryRegisterBody.actions?.find(
    (action) => action.action === 'setRestockableInDays',
  );
  const expectedDateAction = inventoryRegisterBody.actions?.find(
    (action) => action.action === 'setExpectedDelivery',
  );
  const keyAction = inventoryRegisterBody.actions?.find(
    (action) => action.action === 'setKey',
  );
  const inventory: InventoryEntry = {
    quantityOnStock: changeQuantityAction?.quantity ?? 0,
    availableQuantity: changeQuantityAction?.quantity ?? 0,
    restockableInDays: restockAction?.restockableInDays ?? 0,
    expectedDelivery: expectedDateAction?.expectedDelivery ?? undefined,
    key: keyAction?.key,
    id: '',
    version: inventoryRegisterBody?.version ?? 0,
    createdAt: inventoryRegisterBody?.createdAt ?? '',
    lastModifiedAt: inventoryRegisterBody?.lastModifiedAt ?? '',
    sku: inventoryRegisterBody?.sku ?? '',
  };
  return inventory;
}

export const updateInventory: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    const clientType = getClientType(request);

    if (clientType !== ClientType.BO) {
      throw new Error('Invalid client type.');
    }

    // Parse the inventory update data from the request body
    const inventoryId = request.query['id'];
    const productApi = getProductService(request, actionContext);

    let inventory = {
      ...mapRequestToInventory(request),
    };
    // Call the service to update the inventory
    const result = await productApi.updateInventory(inventoryId, inventory);

    // Prepare the response
    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(result),
      sessionData: {
        ...productApi.getSessionData(),
      },
    };

    return response;
  } catch (error) {
    // Handle errors and return appropriate error response
    return handleError(error, request);
  }
};

export const deleteInvetry: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    const clientType = getClientType(request);

    if (clientType !== ClientType.BO) {
      throw new Error('Invalid client type.');
    }

    const productApi = getProductService(request, actionContext);
    const inventoryId = request.query?.id;
    if (!inventoryId) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'Inventory ID is required',
        }),
      };
    }
    const category = await productApi.deleteInventry(inventoryId, clientType);
    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(category),
      sessionData: {
        ...productApi.getSessionData(),
      },
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};
