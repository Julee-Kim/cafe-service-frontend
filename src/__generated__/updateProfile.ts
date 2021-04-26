/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateUserInput, Genders } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updateProfile
// ====================================================

export interface updateProfile_updateProfile_user_cart_items {
  __typename: "Item";
  menuId: number;
  productName: string;
  qty: number;
  price: number;
  img: string;
}

export interface updateProfile_updateProfile_user_cart {
  __typename: "Cart";
  id: number;
  items: updateProfile_updateProfile_user_cart_items[];
}

export interface updateProfile_updateProfile_user {
  __typename: "User";
  name: string;
  birth: string;
  gender: Genders;
  email: string;
  phone: string | null;
  zonecode: string | null;
  address: string | null;
  addressDetail: string | null;
  cart: updateProfile_updateProfile_user_cart | null;
}

export interface updateProfile_updateProfile {
  __typename: "UpdateUserOutput";
  success: boolean;
  error: string | null;
  user: updateProfile_updateProfile_user | null;
}

export interface updateProfile {
  updateProfile: updateProfile_updateProfile;
}

export interface updateProfileVariables {
  input: UpdateUserInput;
}
