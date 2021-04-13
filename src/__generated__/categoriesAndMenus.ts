/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: categoriesAndMenus
// ====================================================

export interface categoriesAndMenus_getCategories_categories {
  __typename: "Category";
  id: number;
  name: string;
}

export interface categoriesAndMenus_getCategories {
  __typename: "GetCategoriesOutput";
  success: boolean;
  error: string | null;
  categories: categoriesAndMenus_getCategories_categories[] | null;
}

export interface categoriesAndMenus_getMenus_results_category {
  __typename: "Category";
  id: number;
}

export interface categoriesAndMenus_getMenus_results {
  __typename: "Menu";
  id: number;
  productName: string;
  img: string;
  category: categoriesAndMenus_getMenus_results_category;
}

export interface categoriesAndMenus_getMenus {
  __typename: "GetMenusOutput";
  success: boolean;
  error: string | null;
  results: categoriesAndMenus_getMenus_results[] | null;
}

export interface categoriesAndMenus {
  getCategories: categoriesAndMenus_getCategories;
  getMenus: categoriesAndMenus_getMenus;
}
