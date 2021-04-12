/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateAccountInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: signup
// ====================================================

export interface signup_createAccount {
  __typename: "CreateAccountOutput";
  success: boolean;
  error: string | null;
}

export interface signup {
  createAccount: signup_createAccount;
}

export interface signupVariables {
  createAccountInput: CreateAccountInput;
}
