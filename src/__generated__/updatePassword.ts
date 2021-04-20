/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdatePasswordInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updatePassword
// ====================================================

export interface updatePassword_updatePassword {
  __typename: "UpdatePasswordOutput";
  success: boolean;
  error: string | null;
}

export interface updatePassword {
  updatePassword: updatePassword_updatePassword;
}

export interface updatePasswordVariables {
  input: UpdatePasswordInput;
}
