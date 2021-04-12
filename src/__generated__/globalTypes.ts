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

export interface LoginInput {
  email: string;
  password: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
