import { QuoteRequestDraft } from '@commercetools/platform-sdk';
import {
  ClientType,
  Context,
  Cart,
  QuoteRequest,
  QuoteRequestState,
  Quote,
  QuoteState,
  QuoteQuery,
  PaginatedResult,
} from '@royalcyber/global-types';
import QuoteMapper from '../mappers/QuoteMapper';
import { BaseService } from './BaseService';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { ProductMapper } from '../mappers/ProductMapper';
import { getOffsetFromCursor } from '../utils/Pagination';
import { ExternalError } from '../errors/ExternalError';
import { CartMapper } from '../mappers/CartMapper';

export default class QuoteService extends BaseService {
  protected accountId: string;
  protected businessUnitKey: string;

  constructor(
    context: Context,
    locale: string | null,
    currency: string | null,
    accountId?: string,
    businessUnitKey?: string | null,
  ) {
    super(context, locale, currency);
    this.accountId = accountId ?? '';
    this.businessUnitKey = businessUnitKey ?? '';
  }

  async createQuoteRequest(
    quoteRequest: QuoteRequest,
    cart: Cart,
    clientType: ClientType,
  ): Promise<QuoteRequest> {
    const cartVersion = parseInt(cart.cartVersion || '', 10);
    const locale = await this.getCommercetoolsLocal(clientType);

    const quoteRequestDraft: QuoteRequestDraft = {
      cart: {
        typeId: 'cart',
        id: cart.cartId,
      },
      cartVersion,
      comment: quoteRequest.buyerComment,
      purchaseOrderNumber: quoteRequest.purchaseOrderNumber,
    };

    return this.associateEndpoints(this.accountId, this.businessUnitKey)
      .quoteRequests()
      .post({
        body: {
          ...quoteRequestDraft,
        },
      })
      .execute()
      .then((response) => {
        return QuoteMapper.commercetoolsQuoteRequestToQuoteRequest(
          response.body,
          locale,
          clientType,
        );
      })
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });
  }

  async getQuoteRequest(
    quoteRequestId: string,
    clientType: ClientType,
  ): Promise<QuoteRequest> {
    const locale = await this.getCommercetoolsLocal(clientType);

    return await this.associateEndpoints(this.accountId, this.businessUnitKey)
      .quoteRequests()
      .withId({ ID: quoteRequestId })
      .get({
        queryArgs: {
          expand: ['customer'],
        },
      })
      .execute()
      .then((response) => {
        return QuoteMapper.commercetoolsQuoteRequestToQuoteRequest(
          response.body,
          locale,
          clientType,
        );
      })
      .catch((error) => {
        if (error.code === 404) {
          throw new ResourceNotFoundError({ message: error.message });
        }

        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });
  }

  async getQuote(quoteId: string, clientType: ClientType): Promise<Quote> {
    const locale = await this.getCommercetoolsLocal(clientType);

    return this.associateEndpoints(this.accountId, this.businessUnitKey)
      .quotes()
      .withId({ ID: quoteId })
      .get({
        queryArgs: {
          expand: [
            'customer',
            'quoteRequest',
            'quoteRequest.customer',
            'stagedQuote.quotationCart',
          ],
        },
      })
      .execute()
      .then((response) => {
        return QuoteMapper.commercetoolsQuoteToQuote(response.body, locale, clientType);
      })
      .catch((error) => {
        if (error.code === 404) {
          throw new ResourceNotFoundError({ message: error.message });
        }

        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });
  }

  async query(
    quoteQuery: QuoteQuery,
    clientType: ClientType,
  ): Promise<PaginatedResult<Quote>> {
    const locale = await this.getCommercetoolsLocal(clientType);
    if (!quoteQuery.limit) {
      quoteQuery.limit = 20;
    }
    const limit = +quoteQuery.limit || undefined;
    const sortAttributes: string[] = [];

    if (
      quoteQuery.sortAttributes &&
      typeof quoteQuery.sortAttributes === 'object'
    ) {
      Object.entries(quoteQuery.sortAttributes).forEach(
        ([field, direction]) => {
          sortAttributes.push(`${field} ${direction}`);
        },
      );
    } else {
      // default sort
      sortAttributes.push(`lastModifiedAt desc`);
    }

    const whereClause = [];
    if (quoteQuery.accountId !== undefined) {
      whereClause.push(`customerId="${quoteQuery.accountId}"`);
    }

    if (quoteQuery.quoteIds !== undefined && quoteQuery.quoteIds.length !== 0) {
      whereClause.push(`id in ("${quoteQuery.quoteIds.join('","')}")`);
    }

    if (
      quoteQuery.quoteStates !== undefined &&
      quoteQuery.quoteStates.length > 0
    ) {
      whereClause.push(
        `quoteState in ("${quoteQuery.quoteStates.join('","')}")`,
      );
    }

    if (quoteQuery.storeKey !== undefined) {
      whereClause.push(`store(key="${quoteQuery.storeKey}")`);
    }

    if (!quoteQuery.cursor) {
      quoteQuery.cursor = '';
    }

    const searchQuery = quoteQuery.query && quoteQuery.query;

    return this.associateEndpoints(this.accountId, this.businessUnitKey)
      .quotes()
      .get({
        queryArgs: {
          where: whereClause,
          expand: ['quoteRequest', 'stagedQuote.quotationCart'],
          limit: limit,
          offset: getOffsetFromCursor(quoteQuery.cursor),
          sort: sortAttributes,
          [`text.${locale.language}`]: searchQuery,
        },
      })
      .execute()
      .then((response) => {
        const quotes = response.body.results.map((commercetoolsQuote) => {
          return QuoteMapper.commercetoolsQuoteToQuote(
            commercetoolsQuote,
            locale,
            clientType,
          );
        });

        if (!response?.body?.total) {
          throw new ResourceNotFoundError({ message: 'Total is undefined.' });
        }

        return {
          total: response.body.total,
          items: quotes,
          count: response.body.count,
          previousCursor: ProductMapper.calculatePreviousCursor(
            response.body.offset,
            response.body.count,
          ),
          nextCursor: ProductMapper.calculateNextCursor(
            response.body.offset,
            response.body.count,
            response.body.total,
          ),
          query: quoteQuery,
        };
      })
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });
  }

  async queryQuoteRequests(
    quoteQuery: QuoteQuery,
    clientType: ClientType,
  ): Promise<PaginatedResult<QuoteRequest>> {
    const locale = await this.getCommercetoolsLocal(clientType);
    if (!quoteQuery.limit) {
      quoteQuery.limit = 20;
    }
    const limit = +quoteQuery.limit || undefined;
    const sortAttributes: string[] = [];

    if (
      quoteQuery.sortAttributes &&
      typeof quoteQuery.sortAttributes === 'object'
    ) {
      Object.entries(quoteQuery.sortAttributes).forEach(
        ([field, direction]) => {
          sortAttributes.push(`${field} ${direction}`);
        },
      );
    } else {
      // default sort
      sortAttributes.push(`lastModifiedAt desc`);
    }

    const whereClause = [];

    if (quoteQuery.accountId !== undefined) {
      whereClause.push(`customerId="${quoteQuery.accountId}"`);
    }

    if (quoteQuery.quoteIds !== undefined && quoteQuery.quoteIds.length !== 0) {
      whereClause.push(`id in ("${quoteQuery.quoteIds.join('","')}")`);
    }

    if (
      quoteQuery.quoteStates !== undefined &&
      quoteQuery.quoteStates.length > 0
    ) {
      whereClause.push(
        `quoteRequestState in ("${quoteQuery.quoteStates.join('","')}")`,
      );
    }

    if (quoteQuery.storeKey !== undefined) {
      whereClause.push(`store(key="${quoteQuery.storeKey}")`);
    }

    if (!quoteQuery.cursor) {
      quoteQuery.cursor = '';
    }

    const searchQuery = quoteQuery.query && quoteQuery.query;

    return await this.associateEndpoints(this.accountId, this.businessUnitKey)
      .quoteRequests()
      .get({
        queryArgs: {
          where: whereClause,
          sort: sortAttributes,
          limit: limit,
          offset: getOffsetFromCursor(quoteQuery.cursor),
          [`text.${locale.language}`]: searchQuery,
          expand: ['customer'],
        },
      })
      .execute()
      .then((response) => {
        const quoteRequests = response.body.results.map(
          (commercetoolsQuoteRequest) => {
            return QuoteMapper.commercetoolsQuoteRequestToQuoteRequest(
              commercetoolsQuoteRequest,
              locale,
              clientType,
            );
          },
        );

        if (!response?.body?.total) {
          throw new ResourceNotFoundError({ message: 'Total is undefined.' });
        }

        const result: PaginatedResult<QuoteRequest> = {
          total: response.body.total,
          items: quoteRequests,
          count: response.body.count,
          previousCursor: ProductMapper.calculatePreviousCursor(
            response.body.offset,
            response.body.count,
          ),
          nextCursor: ProductMapper.calculateNextCursor(
            response.body.offset,
            response.body.count,
            response.body.total,
          ),
          query: quoteQuery,
        };
        return result;
      })
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });
  }

  async declineQuote(quoteId: string, clientType: ClientType): Promise<Quote> {
    const locale = await this.getCommercetoolsLocal(clientType);

    return this.getQuote(quoteId, clientType).then((quote) => {
      if (!quote.quoteVersion) {
        throw new ResourceNotFoundError({
          message: 'Quote version is missing.',
        });
      }

      return this.associateEndpoints(this.accountId, this.businessUnitKey)
        .quotes()
        .withId({ ID: quoteId })
        .post({
          queryArgs: {
            expand: ['quoteRequest', 'quoteRequest.customer'],
          },
          body: {
            actions: [
              {
                action: 'changeQuoteState',
                quoteState: QuoteState.Declined,
              },
            ],
            version: quote.quoteVersion,
          },
        })
        .execute()
        .then((response) => {
          return QuoteMapper.commercetoolsQuoteToQuote(response.body, locale, clientType);
        })
        .catch((error) => {
          throw new ExternalError({
            statusCode: error.code,
            message: error.message,
            body: error.body,
          });
        });
    });
  }

  async renegotiateQuote(
    quoteId: string,
    buyerComment: string,
    clientType: ClientType,
  ): Promise<Quote> {
    const locale = await this.getCommercetoolsLocal(clientType);

    return this.getQuote(quoteId, clientType).then((quote) => {
      if (!quote.quoteVersion) {
        throw new ResourceNotFoundError({
          message: 'Quote version is missing.',
        });
      }

      return this.associateEndpoints(this.accountId, this.businessUnitKey)
        .quotes()
        .withId({ ID: quoteId })
        .post({
          queryArgs: {
            expand: ['quoteRequest', 'quoteRequest.customer'],
          },
          body: {
            actions: [
              {
                action: 'requestQuoteRenegotiation',
                buyerComment: buyerComment,
              },
            ],
            version: quote.quoteVersion,
          },
        })
        .execute()
        .then((response) => {
          return QuoteMapper.commercetoolsQuoteToQuote(response.body, locale, clientType);
        })
        .catch((error) => {
          throw new ExternalError({
            statusCode: error.code,
            message: error.message,
            body: error.body,
          });
        });
    });
  }

  async cancelQuoteRequest(
    quoteRequestId: string,
    clientType: ClientType,
  ): Promise<QuoteRequest> {
    const locale = await this.getCommercetoolsLocal(clientType);

    return this.getQuoteRequest(quoteRequestId, clientType).then(
      (quoteRequest) => {
        if (!quoteRequest.quoteRequestVersion) {
          throw new ResourceNotFoundError({
            message: 'Quote request version is missing.',
          });
        }

        return this.associateEndpoints(this.accountId, this.businessUnitKey)
          .quoteRequests()
          .withId({ ID: quoteRequestId })
          .post({
            body: {
              actions: [
                {
                  action: 'changeQuoteRequestState',
                  quoteRequestState: QuoteRequestState.Cancelled,
                },
              ],
              version: quoteRequest.quoteRequestVersion,
            },
          })
          .execute()
          .then((response) => {
            return QuoteMapper.commercetoolsQuoteRequestToQuoteRequest(
              response.body,
              locale,
              clientType,
            );
          })
          .catch((error) => {
            throw new ExternalError({
              statusCode: error.code,
              message: error.message,
              body: error.body,
            });
          });
      },
    );
  }

  async acceptQuote(quoteId: string, clientType: ClientType) {
    // We are creating an order from the quote as it is the CoCo's intended behavior to accept a quote
    await this.createOrderFromQuote(quoteId, clientType);

    return await this.getQuote(quoteId, clientType);
  }

  async createOrderFromQuote(quoteId: string, clientType: ClientType) {
    const locale = await this.getCommercetoolsLocal(clientType);
    const date = new Date();

    return this.getQuote(quoteId, clientType).then((quote) => {
      if (!quote.quoteVersion || !quote.quoteId) {
        throw new ResourceNotFoundError({
          message: 'Quote version or ID is missing.',
        });
      }

      return this.associateEndpoints(this.accountId, this.businessUnitKey)
        .orders()
        .orderQuote()
        .post({
          body: {
            version: quote.quoteVersion,
            quote: {
              typeId: 'quote',
              id: quote.quoteId,
            },
            quoteStateToAccepted: true,
            orderNumber: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${String(Date.now()).slice(-6, -1)}`,
          },
        })
        .execute()
        .then((response) => {
          return CartMapper.commercetoolsOrderToOrder(
            response.body,
            clientType,
            locale,
          );
        })
        .catch((error) => {
          throw new ExternalError({
            statusCode: error.code,
            message: error.message,
            body: error.body,
          });
        });
    });
  }
}
