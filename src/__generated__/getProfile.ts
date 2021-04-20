/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Genders } from "./globalTypes";

// ====================================================
// GraphQL query operation: getProfile
// ====================================================

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
}

export interface getProfile {
  getProfile: getProfile_getProfile;
}
