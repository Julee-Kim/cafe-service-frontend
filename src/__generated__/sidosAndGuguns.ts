/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: sidosAndGuguns
// ====================================================

export interface sidosAndGuguns_getSidos_results {
  __typename: "Sido";
  id: number;
  name: string;
}

export interface sidosAndGuguns_getSidos {
  __typename: "GetSidosOutput";
  success: boolean;
  error: string | null;
  results: sidosAndGuguns_getSidos_results[] | null;
}

export interface sidosAndGuguns_getGuguns_results {
  __typename: "Gugun";
  id: number;
  name: string;
  sidoId: number;
}

export interface sidosAndGuguns_getGuguns {
  __typename: "GetGugunsOutput";
  success: boolean;
  error: string | null;
  results: sidosAndGuguns_getGuguns_results[] | null;
}

export interface sidosAndGuguns {
  getSidos: sidosAndGuguns_getSidos;
  getGuguns: sidosAndGuguns_getGuguns;
}
