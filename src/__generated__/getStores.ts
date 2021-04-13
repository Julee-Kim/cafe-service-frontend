/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetStoresInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getStores
// ====================================================

export interface getStores_getStores_results {
  __typename: "Store";
  id: number;
  name: string;
  tel: string;
  address: string;
  jibunAddress: string | null;
  addressDetail: string | null;
  lat: string;
  lot: string;
  sidoId: number;
  gugunId: number;
}

export interface getStores_getStores {
  __typename: "GetStoresOutput";
  success: boolean;
  error: string | null;
  results: getStores_getStores_results[] | null;
}

export interface getStores {
  getStores: getStores_getStores;
}

export interface getStoresVariables {
  getStoresInput: GetStoresInput;
}
