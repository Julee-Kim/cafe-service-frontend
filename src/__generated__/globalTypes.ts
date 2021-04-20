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

export interface CreateAccountInput {
  name: string;
  birth: string;
  gender: Genders;
  email: string;
  password: string;
}

export interface GetMenuInput {
  menuId: number;
}

export interface GetStoresInput {
  sidoId?: number | null;
  gugunId?: number | null;
}

export interface LoginInput {
  email: string;
  password: string;
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
}

//==============================================================
// END Enums and Input Objects
//==============================================================
