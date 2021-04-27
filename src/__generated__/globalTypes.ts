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

export interface CartItem {
  menuId: number;
  qty: number;
}

export interface CreateAccountInput {
  name: string;
  birth: string;
  gender: Genders;
  email: string;
  password: string;
}

export interface CreateCartItemInput {
  menuId: number;
  qty: number;
}

export interface CreateCartItemsInput {
  items: CartItem[];
}

export interface CreatePaymentInput {
  menuIds: number[];
  data: OrderInputType;
  receiverName: string;
  receiverPhone: string;
  receiverAddress: string;
  receiverAddressDetail: string;
  receiverZonecode: string;
  totalPrice: number;
  orderPrice: number;
  deliveryPrice: number;
}

export interface DeleteCartItemsInput {
  menuIds: number[];
}

export interface GetMenuInput {
  menuId: number;
}

export interface GetStoresInput {
  sidoId?: number | null;
  gugunId?: number | null;
}

export interface ItemInputType {
  menuId: number;
  productName: string;
  img: string;
  qty: number;
  price: number;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface OrderInputType {
  billingToken?: string | null;
  facilitatorAccessToken: string;
  orderID: string;
  payerID: string;
  paymentID?: string | null;
}

export interface PaymentInputType {
  user: UserInputType;
  menuIds: number[];
  data: OrderInputType;
  receiverName: string;
  receiverPhone: string;
  receiverAddress: string;
  receiverAddressDetail: string;
  receiverZonecode: string;
  totalPrice: number;
  orderPrice: number;
  deliveryPrice: number;
}

export interface UpdateCartItemQtyInput {
  menuId: number;
  qty: number;
}

export interface UpdateCartItemsInput {
  items: ItemInputType[];
}

export interface UpdatePasswordInput {
  password: string;
  newPassword: string;
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
  cart?: cartInputType | null;
  payment?: PaymentInputType | null;
}

export interface UserInputType {
  name: string;
  birth: string;
  gender: Genders;
  email: string;
  password: string;
  phone?: string | null;
  zonecode?: string | null;
  address?: string | null;
  addressDetail?: string | null;
  cart?: cartInputType | null;
  payment?: PaymentInputType | null;
}

export interface cartInputType {
  user: UserInputType;
  userId: number;
  items: ItemInputType[];
}

//==============================================================
// END Enums and Input Objects
//==============================================================
