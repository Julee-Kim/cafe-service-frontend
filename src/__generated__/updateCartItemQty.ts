/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateCartItemQtyInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updateCartItemQty
// ====================================================

export interface updateCartItemQty_updateCartItemQty_cart_items {
  __typename: "Item";
  menuId: number;
  productName: string;
  qty: number;
  price: number;
  img: string;
}

export interface updateCartItemQty_updateCartItemQty_cart {
  __typename: "Cart";
  id: number;
  items: updateCartItemQty_updateCartItemQty_cart_items[];
}

export interface updateCartItemQty_updateCartItemQty {
  __typename: "UpdateCartItemQtyOutput";
  success: boolean;
  error: string | null;
  cart: updateCartItemQty_updateCartItemQty_cart;
}

export interface updateCartItemQty {
  updateCartItemQty: updateCartItemQty_updateCartItemQty;
}

export interface updateCartItemQtyVariables {
  input: UpdateCartItemQtyInput;
}
