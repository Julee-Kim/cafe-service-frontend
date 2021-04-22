/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Genders } from "./globalTypes";

// ====================================================
// GraphQL query operation: getProfile
// ====================================================

export interface getProfile_getProfile_cart_items {
  __typename: "Item";
  menuId: number;
  productName: string;
  img: string;
  qty: number;
  price: number;
}

export interface getProfile_getProfile_cart {
  __typename: "Cart";
  id: number;
  items: getProfile_getProfile_cart_items[];
}

export interface getProfile_getProfile {
  __typename: "User";
  id: number;
  name: string;
  birth: string;
  gender: Genders;
  email: string;
  phone: string | null;
  address: string | null;
  addressDetail: string | null;
  zonecode: string | null;
  cart: getProfile_getProfile_cart | null;
}

export interface getProfile {
  getProfile: getProfile_getProfile;
}
