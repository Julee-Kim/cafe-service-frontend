/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateCartItemInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createCartItem
// ====================================================

export interface createCartItem_createCartItem_cart_items {
  __typename: "Item";
  menuId: number;
  productName: string;
  img: string;
  qty: number;
  price: number;
}

export interface createCartItem_createCartItem_cart {
  __typename: "Cart";
  id: number;
  items: createCartItem_createCartItem_cart_items[];
}

export interface createCartItem_createCartItem {
  __typename: "CreateCartItemOutput";
  success: boolean;
  error: string | null;
  cart: createCartItem_createCartItem_cart;
}

export interface createCartItem {
  createCartItem: createCartItem_createCartItem;
}

export interface createCartItemVariables {
  input: CreateCartItemInput;
}
