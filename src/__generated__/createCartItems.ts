/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateCartItemsInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createCartItems
// ====================================================

export interface createCartItems_createCartItems_cart_items {
  __typename: "Item";
  menuId: number;
  productName: string;
  qty: number;
  price: number;
  img: string;
}

export interface createCartItems_createCartItems_cart {
  __typename: "Cart";
  id: number;
  items: createCartItems_createCartItems_cart_items[];
}

export interface createCartItems_createCartItems {
  __typename: "CreateCartItemsOutput";
  success: boolean;
  error: string | null;
  cart: createCartItems_createCartItems_cart;
}

export interface createCartItems {
  createCartItems: createCartItems_createCartItems;
}

export interface createCartItemsVariables {
  input: CreateCartItemsInput;
}
