/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum Genders {
  F = "F",
  M = "M",
}

export interface CartItem {
  menuId: number;
  qty: number;
}

export interface CreateAccountInput {
  name: string;
  birth: string;
  gender: Genders;
  email: string;
  password: string;
}

export interface CreateCartItemInput {
  menuId: number;
  qty: number;
}

export interface CreateCartItemsInput {
  items: CartItem[];
}

export interface GetMenuInput {
  menuId: number;
}

export interface GetStoresInput {
  sidoId?: number | null;
  gugunId?: number | null;
}

export interface ItemInputType {
  menuId: number;
  productName: string;
  img: string;
  qty: number;
  price: number;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface UpdateCartItemsInput {
  items: ItemInputType[];
}

export interface UpdatePasswordInput {
  password: string;
  newPassword: string;
}

export interface UpdateUserInput {
  name: string;
  birth: string;
  gender: Genders;
  email: string;
  phone?: string | null;
  zonecode?: string | null;
  address?: string | null;
  addressDetail?: string | null;
  cart?: cartInputType | null;
}

export interface UserInputType {
  name: string;
  birth: string;
  gender: Genders;
  email: string;
  password: string;
  phone?: string | null;
  zonecode?: string | null;
  address?: string | null;
  addressDetail?: string | null;
  cart?: cartInputType | null;
}

export interface cartInputType {
  user: UserInputType;
  userId: number;
  items: ItemInputType[];
}

//==============================================================
// END Enums and Input Objects
//==============================================================
