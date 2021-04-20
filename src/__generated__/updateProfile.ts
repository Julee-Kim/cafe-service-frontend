/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateUserInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updateProfile
// ====================================================

export interface updateProfile_updateProfile {
  __typename: "UpdateUserOutput";
  success: boolean;
  error: string | null;
}

export interface updateProfile {
  updateProfile: updateProfile_updateProfile;
}

export interface updateProfileVariables {
  input: UpdateUserInput;
}
