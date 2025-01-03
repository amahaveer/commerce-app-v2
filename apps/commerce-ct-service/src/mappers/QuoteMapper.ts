import {
  Quote as CommercetoolsQuote,
  QuoteRequest as CommercetoolsQuoteRequest,
  QuoteRequestState as CommercetoolsQuoteRequestState,
  QuoteState as CommercetoolsQuoteState,
} from '@commercetools/platform-sdk';
import {
  QuoteRequest,
  QuoteRequestState,
  Quote,
  QuoteState,
  ClientType,
} from '@royalcyber/global-types';
import { CartMapper } from './CartMapper';
import { Locale } from '../Locale';
import { AccountMapper } from './AccountMapper';
import { ProductMapper } from './ProductMapper';

export default class QuoteMapper {
  static commercetoolsQuoteToQuote(
    commercetoolsQuote: CommercetoolsQuote,
    locale: Locale,
    clientType: ClientType,
  ): Quote {
    const quoteRequest = commercetoolsQuote.quoteRequest?.obj
      ? this.commercetoolsQuoteRequestToQuoteRequest(
          commercetoolsQuote.quoteRequest.obj,
          locale,
          clientType,
        )
      : undefined;

    return {
      quoteId: commercetoolsQuote.id,
      key: commercetoolsQuote.key,
      quoteState: this.commercetoolsQuoteStateToQuoteState(
        commercetoolsQuote.quoteState,
      ),
      createdAt: new Date(commercetoolsQuote.createdAt),
      lastModifiedAt: new Date(commercetoolsQuote.lastModifiedAt),
      account: {
        accountId: commercetoolsQuote?.customer?.id,
        firstName: commercetoolsQuote?.customer?.obj?.firstName,
        lastName: commercetoolsQuote?.customer?.obj?.lastName,
        email: '',
      },
      lineItems: CartMapper.commercetoolsLineItemsToLineItems(
        commercetoolsQuote.lineItems,
        clientType,
        locale,
        '',
      ),
      sum: ProductMapper.commercetoolsMoneyToMoney(
        commercetoolsQuote.totalPrice,
      ),
      tax: CartMapper.commercetoolsTaxedPriceToTaxed(
        commercetoolsQuote.taxedPrice,
        locale,
      ),
      taxed: CartMapper.commercetoolsTaxedPriceToTaxed(
        commercetoolsQuote.taxedPrice,
        locale,
      ),
      buyerComment: commercetoolsQuote.buyerComment,
      sellerComment: commercetoolsQuote.sellerComment,
      purchaseOrderNumber: commercetoolsQuote.purchaseOrderNumber,
      expirationDate: new Date(commercetoolsQuote.validTo || ''),
      quoteRequest: quoteRequest,
      quoteVersion: commercetoolsQuote.version,
      quotationCart: commercetoolsQuote.stagedQuote?.obj?.quotationCart?.obj
        ? CartMapper.commercetoolsCartToCart(
            commercetoolsQuote.stagedQuote?.obj.quotationCart.obj,
            locale,
            '',
            clientType,
          )
        : undefined,
    };
  }

  static commercetoolsQuoteRequestToQuoteRequest(
    commercetoolsQuoteRequest: CommercetoolsQuoteRequest,
    locale: Locale,
    clientType: ClientType,
  ): QuoteRequest {
    return {
      quoteRequestId: commercetoolsQuoteRequest.id,
      key: commercetoolsQuoteRequest.key,
      createdAt: new Date(commercetoolsQuoteRequest.createdAt),
      lastModifiedAt: new Date(commercetoolsQuoteRequest.lastModifiedAt),
      account: {
        accountId: commercetoolsQuoteRequest.customer.id,
        firstName: commercetoolsQuoteRequest.customer.obj?.firstName,
        lastName: commercetoolsQuoteRequest.customer.obj?.lastName,
        email: '',
      },
      buyerComment: commercetoolsQuoteRequest.comment,
      purchaseOrderNumber: commercetoolsQuoteRequest.purchaseOrderNumber,
      store: { key: commercetoolsQuoteRequest?.store?.key },
      businessUnit: { key: commercetoolsQuoteRequest?.businessUnit?.key },
      lineItems: CartMapper.commercetoolsLineItemsToLineItems(
        commercetoolsQuoteRequest.lineItems,
        clientType,
        locale,
        '',
      ),
      sum: ProductMapper.commercetoolsMoneyToMoney(
        commercetoolsQuoteRequest.totalPrice,
      ),
      tax: CartMapper.commercetoolsTaxedPriceToTaxed(
        commercetoolsQuoteRequest.taxedPrice,
        locale,
      ),
      taxed: CartMapper.commercetoolsTaxedPriceToTaxed(
        commercetoolsQuoteRequest.taxedPrice,
        locale,
      ),
      shippingAddress: commercetoolsQuoteRequest?.shippingAddress
        ? AccountMapper.commercetoolsAddressToAddress(
            commercetoolsQuoteRequest.shippingAddress,
          )
        : undefined,
      billingAddress: commercetoolsQuoteRequest?.billingAddress
        ? AccountMapper.commercetoolsAddressToAddress(
            commercetoolsQuoteRequest.billingAddress,
          )
        : undefined,
      quoteRequestState: this.commercetoolsQuoteStateToQuoteDraftState(
        commercetoolsQuoteRequest.quoteRequestState,
      ),
      itemShippingAddresses:
        commercetoolsQuoteRequest.itemShippingAddresses?.map(
          (itemShippingAddress) =>
            AccountMapper.commercetoolsAddressToAddress(itemShippingAddress),
        ),
      quoteRequestVersion: commercetoolsQuoteRequest.version,
    };
  }

  static commercetoolsQuoteStateToQuoteDraftState(
    commercetoolsQuoteState: CommercetoolsQuoteRequestState,
  ): QuoteRequestState {
    let quoteDraftState: QuoteRequestState = QuoteRequestState.Default;

    switch (true) {
      case commercetoolsQuoteState === 'Accepted':
        quoteDraftState = QuoteRequestState.Accepted;
        break;
      case commercetoolsQuoteState === 'Cancelled':
        quoteDraftState = QuoteRequestState.Cancelled;
        break;
      case commercetoolsQuoteState === 'Closed':
        quoteDraftState = QuoteRequestState.Closed;
        break;
      case commercetoolsQuoteState === 'Rejected':
        quoteDraftState = QuoteRequestState.Rejected;
        break;
      default:
        break;
    }

    return quoteDraftState;
  }

  static commercetoolsQuoteStateToQuoteState(
    commercetoolsQuoteState: CommercetoolsQuoteState,
  ): QuoteState {
    let quoteState: QuoteState = QuoteState.Default;

    switch (true) {
      case commercetoolsQuoteState === 'Accepted':
        quoteState = QuoteState.Accepted;
        break;
      case commercetoolsQuoteState === 'Declined':
        quoteState = QuoteState.Declined;
        break;
      case commercetoolsQuoteState === 'DeclinedForRenegotiation':
        quoteState = QuoteState.DeclinedForRenegotiation;
        break;
      case commercetoolsQuoteState === 'RenegotiationAddressed':
        quoteState = QuoteState.RenegotiationAddressed;
        break;
      case commercetoolsQuoteState === 'Failed':
        quoteState = QuoteState.Failed;
        break;
      case commercetoolsQuoteState === 'Pending':
        quoteState = QuoteState.Pending;
        break;
      case commercetoolsQuoteState === 'Withdrawn':
        quoteState = QuoteState.Withdrawn;
        break;
      default:
        break;
    }

    return quoteState;
  }
}
