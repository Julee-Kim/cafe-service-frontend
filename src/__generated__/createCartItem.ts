/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateCartItemInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createCartItem
// ====================================================

export interface createCartItem_createCartItem {
  __typename: "CreateCartItemOutput";
  success: boolean;
  error: string | null;
}

export interface createCartItem {
  createCartItem: createCartItem_createCartItem;
}

export interface createCartItemVariables {
  input: CreateCartItemInput;
}
