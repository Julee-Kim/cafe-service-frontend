/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateCartItemsInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updateCartItems
// ====================================================

export interface updateCartItems_updateCartItems_cart_items {
  __typename: "Item";
  menuId: number;
  productName: string;
  qty: number;
  price: number;
  img: string;
}

export interface updateCartItems_updateCartItems_cart {
  __typename: "Cart";
  items: updateCartItems_updateCartItems_cart_items[];
}

export interface updateCartItems_updateCartItems {
  __typename: "UpdateCartItemsOutput";
  success: boolean;
  error: string | null;
  cart: updateCartItems_updateCartItems_cart;
}

export interface updateCartItems {
  updateCartItems: updateCartItems_updateCartItems;
}

export interface updateCartItemsVariables {
  input: UpdateCartItemsInput;
}
