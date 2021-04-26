/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteCartItemsInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deleteCartItems
// ====================================================

export interface deleteCartItems_deleteCartItems_cart_items {
  __typename: "Item";
  menuId: number;
  productName: string;
  qty: number;
  price: number;
  img: string;
}

export interface deleteCartItems_deleteCartItems_cart {
  __typename: "Cart";
  id: number;
  items: deleteCartItems_deleteCartItems_cart_items[];
}

export interface deleteCartItems_deleteCartItems {
  __typename: "DeleteCartItemsOutput";
  success: boolean;
  error: string | null;
  cart: deleteCartItems_deleteCartItems_cart | null;
}

export interface deleteCartItems {
  deleteCartItems: deleteCartItems_deleteCartItems;
}

export interface deleteCartItemsVariables {
  input: DeleteCartItemsInput;
}
