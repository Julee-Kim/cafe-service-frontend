/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCartItems
// ====================================================

export interface getCartItems_getCartItems_results {
  __typename: "Item";
  menuId: number;
  productName: string;
  qty: number;
  price: number;
  img: string;
}

export interface getCartItems_getCartItems {
  __typename: "GetCartItemsOutput";
  success: boolean;
  error: string | null;
  results: getCartItems_getCartItems_results[] | null;
}

export interface getCartItems {
  getCartItems: getCartItems_getCartItems;
}
