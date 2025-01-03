import * as AccountActions from './AccountController';
import * as CartActions from './CartController';
import * as ProductAction from './ProductController';
import * as ProjectActions from './ProjectController';
import * as WishlistAction from './WishlistController';
import * as BusinessUnitActions from './BusinessUnitController';
import * as CategoryController from './CategoryController';
import * as QuoteAction from './QuoteController';
import { ActionRegistry } from '@royalcyber/global-types';

export const actions = {
  account: AccountActions,
  cart: CartActions,
  product: ProductAction,
  project: ProjectActions,
  wishlist: WishlistAction,
  businessUnit: BusinessUnitActions,
  quote: QuoteAction,
  category: CategoryController,
} as unknown as ActionRegistry;

export type ActionNamespaces = keyof typeof actions;
