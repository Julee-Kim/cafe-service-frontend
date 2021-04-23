/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CartParts
// ====================================================

export interface CartParts_items {
  __typename: "Item";
  menuId: number;
  productName: string;
  qty: number;
  price: number;
  img: string;
}

export interface CartParts {
  __typename: "Cart";
  id: number;
  items: CartParts_items[];
}
