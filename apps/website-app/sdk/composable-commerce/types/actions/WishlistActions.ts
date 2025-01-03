import { Wishlist } from '@royalcyber/global-types';
import { SDKResponse, ServerOptions } from '@royalcyber/unified-commerce';
import {
  AddToWishlistPayload,
  RemoveFromWishlistPayload,
  UpdateWishlistItemPayload,
} from '../payloads/WishlistPayloads';

type GetWishlistAction = (options?: {
  serverOptions?: ServerOptions;
}) => Promise<SDKResponse<Wishlist>>;

type AddToWishlistAction = (
  payload: AddToWishlistPayload,
  options?: { serverOptions?: ServerOptions },
) => Promise<SDKResponse<Wishlist>>;

type RemoveFromWishlistAction = (
  payload: RemoveFromWishlistPayload,
  options?: { serverOptions?: ServerOptions },
) => Promise<SDKResponse<Wishlist>>;

type UpdateWishlistItemAction = (
  payload: UpdateWishlistItemPayload,
  options?: { serverOptions?: ServerOptions },
) => Promise<SDKResponse<Wishlist>>;

export {
  type GetWishlistAction,
  type AddToWishlistAction,
  type RemoveFromWishlistAction,
  type UpdateWishlistItemAction,
};
