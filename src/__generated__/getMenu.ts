/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetMenuInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getMenu
// ====================================================

export interface getMenu_getMenu_menu {
  __typename: "Menu";
  productName: string;
  productName_en: string;
  content: string;
  recommend: string;
  standard: number;
  kcal: number;
  satFAT: number;
  protein: number;
  sodium: number;
  sugars: number;
  caffeine: number;
  img: string;
}

export interface getMenu_getMenu {
  __typename: "GetMenuOutput";
  success: boolean;
  error: string | null;
  menu: getMenu_getMenu_menu | null;
}

export interface getMenu {
  getMenu: getMenu_getMenu;
}

export interface getMenuVariables {
  input: GetMenuInput;
}
