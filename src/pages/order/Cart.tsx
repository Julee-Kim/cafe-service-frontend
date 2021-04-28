import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { isLoggedInVar, orderVar, userInfoVar } from "../../apollo";
import { checkError } from "../../commonJs";
import { LOCALSTORAGE_CART, LOCALSTORAGE_USERINFO, LOCALSTORAGE_ORDER } from "../../constants";
import { createCartItems, createCartItemsVariables, createCartItems_createCartItems_cart } from "../../__generated__/createCartItems";
import { deleteCartItems, deleteCartItemsVariables } from "../../__generated__/deleteCartItems";
import { updateCartItemQty, updateCartItemQtyVariables } from "../../__generated__/updateCartItemQty";
import { updateCartItems, updateCartItemsVariables } from "../../__generated__/updateCartItems";
import { CartListTable } from "./components/CartListTable";
import { CartListUl } from "./components/CartListUl";
import { OrderStep } from "./components/OrderStep";

const CART_FRAGMENT = gql`
  fragment CartParts on Cart {
    id
    items {
      menuId
      productName
      qty
      price
      img
    }
  }
`;

const UPDATE_CART_ITEMS = gql`
  mutation updateCartItems($input: UpdateCartItemsInput!) {
    updateCartItems(input: $input) {
      success
      error,
      cart {
        id
        items {
          menuId
          productName
          qty
          price
          img
        }
      }
    }
  }
`;

const CREATE_CART_ITEMS = gql`
  mutation createCartItems($input: CreateCartItemsInput!) {
    createCartItems(input: $input) {
      success
      error
      cart {
        ...CartParts
      }
    }
  }
  ${CART_FRAGMENT}
`;

const UPDATE_CART_ITEM_QTY = gql`
  mutation updateCartItemQty($input: UpdateCartItemQtyInput!) {
    updateCartItemQty(input: $input) {
      success
      error
      cart {
        ...CartParts
      }
    }
  }
  ${CART_FRAGMENT}
`;

const DELETE_CART_ITEMS = gql`
  mutation deleteCartItems($input: DeleteCartItemsInput!) {
    deleteCartItems(input: $input) {
      success
      error
      cart {
        ...CartParts
      }
    }
  }
  ${CART_FRAGMENT}
`;

interface ICartItem {
  menuId: number;
  productName: string;
  img: string;
  qty: number;
  price: number;
}

export const Cart = () => {
  const history = useHistory();
  const [windowWidth, setWindowWidth] = useState<number>(0);

  const { addToast } = useToasts();
  const [cartList, setCartList] = useState<ICartItem[] | []>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [checkItems, setCheckItems] = useState<number[]>([]); // checked menuItems
  const [isFirstLoading, setIsFirstLoading] = useState(true);

  const [ callUpdateCartItems ] = useMutation<updateCartItems, updateCartItemsVariables>(
    UPDATE_CART_ITEMS, {
      onCompleted(data) {
        // 로컬스토리지 장바구니 삭제
        localStorage.removeItem(LOCALSTORAGE_CART);

        // apollo client, localStorage의 유저 카트 업데이트
        updateUserCart(data.updateCartItems.cart);
      },
      onError(error: any) {
        checkError(error);
      }
    });

  const [ callCreateCartItems ] = useMutation<createCartItems, createCartItemsVariables>(
    CREATE_CART_ITEMS, {
      onCompleted(data) {
        // 로컬스토리지 장바구니 삭제
        localStorage.removeItem(LOCALSTORAGE_CART);

        // apollo client, localStorage의 유저 카트 업데이트
        updateUserCart(data.createCartItems.cart);
      },
      onError(error: any) {
        checkError(error);
      }
    });  

  const [ callUpdateCartItemQty ] = useMutation<updateCartItemQty, updateCartItemQtyVariables>(
    UPDATE_CART_ITEM_QTY, {
      onCompleted(data) {
        // apollo client, localStorage의 유저 카트 업데이트
        updateUserCart(data.updateCartItemQty.cart);
      },
      onError(error: any) {
        checkError(error);
      }
    });

  const [ callDeleteCartItems ] = useMutation<deleteCartItems, deleteCartItemsVariables>(
    DELETE_CART_ITEMS, {
      onCompleted(data) {
        // apollo client, localStorage의 유저 카트 업데이트
        updateUserCart(data.deleteCartItems.cart);
      },
      onError(error: any) {
        checkError(error);
      }
    });

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });

    // 로그인 여부 확인 
    if(isFirstLoading && isLoggedInVar()) {
      // - 로그인한 사용자
      setIsFirstLoading(false);
      setLoggedIn(); 
    } else if(isFirstLoading && !isLoggedInVar()) {
      // - 로그인 안한 사용자
      setIsFirstLoading(false);
      setNotLoggedIn();
    }

    // 목록과 체크박스를 체크할 때마다 주문 금액 합계 계산
    calcTotalPrice();
  }, [checkItems, cartList]);

  // 로그인한 사용자 data set
  const setLoggedIn = () => {
    // 로컬스토리지에서 장바구니 정보 가져오기
    const localStorageCart = localStorage.getItem(LOCALSTORAGE_CART);
    const localCart = localStorageCart ? JSON.parse(localStorageCart) : []; // 로컬 카트
    // apollo client에서 유저 > 카트 정보 가져오기
    const userCart = userInfoVar().cart ? JSON.parse(JSON.stringify(userInfoVar()?.cart?.items)) : []

    // 유저 카트 아이템이 있는지 확인
    if(userCart.length) {
      // -- 1. 로그인 유저 카트 있는 경우 -- //
      // 로컬카트가 있는지 확인
      if(localCart.length) {
        // 유저카트 + 로컬카트 = cartList
        // userCart를 기준으로 localCart의 아이템과 중복되는 메뉴는 수량만 증가시키고,
        // userCart에 없는 아이템은 추가 시킨다
        let newItemTemp = [];

        let i, j;
        for(i = 0; i < localCart.length; i++) {
          // search userCart
          let find = false;
          for (j = 0; j < userCart.length; j++) {
            if (localCart[i].menuId === userCart[j].menuId) {
              // update userCart[j]
              userCart[j].qty = userCart[j].qty + localCart[i].qty;
              find = true;
              break;
            }
          }
          if (!find) {
            // add localCart[i] to newItemTemp
            newItemTemp.push(localCart[i]);
          }
        }

        // add newItemTemp to userCart
        const concatCartItems = userCart.concat(newItemTemp);

        // set cartList
        setCartList([
          ...cartList,
          ...concatCartItems
        ]);

        // 모든 아이템 체크상태로 만들기
        setCheckedAll(concatCartItems);

        concatCartItems.forEach((item: any) => {
          if(item.hasOwnProperty('__typename')) {
            delete item.__typename;
          }
        });

        // db 장바구니 업데이트
        callUpdateCartItems({
          variables: {
            input: {
              items: concatCartItems
            }
          }
        });
      } else {
        // 유저 카트 = cartList
        setCartList([
          ...cartList,
          ...userInfoVar().cart.items
        ]);

        // 모든 아이템 체크상태로 만들기
        setCheckedAll(userInfoVar().cart.items);
      }
    } else {
      // -- 2. 로그인 유저 카트 없는 경우 -- //
      // 로컬카트가 있는지 확인
      if(localCart) {
        // 로컬 카트 = cartList
        setCartList([
          ...cartList,
          ...localCart
        ]);

        // 모든 아이템 체크상태로 만들기
        setCheckedAll(localCart);

        const arr = localCart.map((item: any) => {
          return {
            menuId: item.menuId,
            qty: item.qty
          }
        })

        // db 장바구니 업데이트
        callCreateCartItems({
          variables: {
            input: {
              items: arr
            }
          }
        });
      }
    }
  }

  // 로그인 안한 사용자 data set
  const setNotLoggedIn = () => {    
    // 로컬스토리지에서 장바구니 정보 가져오기
    const localStorageCart = localStorage.getItem(LOCALSTORAGE_CART);
    const localCart = localStorageCart ? JSON.parse(localStorageCart) : []; // 로컬 카트

    // 로컬카트가 있는지 확인
    if(localCart) {
      // cartList = localCart
      setCartList([
        ...cartList,
        ...localCart
      ]);
    }

    // 모든 아이템 체크상태로 만들기
    setCheckedAll(localCart);
  }

  // 처음 로딩했을 때 장바구니의 모든 아이템 checked 상태로 만들기
  const setCheckedAll = (cartItems: any) => {
    // 메뉴 모두 선택된 상태를 만들어주기 위해 아이디 추출
    let ids: number[] = [];
    cartItems.forEach((item: ICartItem) => {
      ids.push(item.menuId);
    });

    // set checked menuItems
    setCheckItems([
      ...checkItems,
      ...ids,
    ]);
  }

  // 주문 금액 합계 계산
  const calcTotalPrice = () => {
    let totalPriceAll: number = 0;

    cartList.forEach(item => {
      if (checkItems.includes(item.menuId)) {
        totalPriceAll += (item.price * item.qty);
      }
    })

    setTotalPrice(totalPriceAll);
  }

  // 개별 체크박스
  const checkHandler = (checked: boolean, itemId: number) => {
    if (checked) {
      setCheckItems([...checkItems, itemId]);
    } else {
      // 체크 해제
      setCheckItems(checkItems.filter((id) => id !== itemId));
    }
  };

  // 전체 체크박스
  const checkAllHandler = (checked: boolean) => {
    if (checked) {
      const ids = cartList.map((item: ICartItem) => item.menuId);
      setCheckItems(ids);
      calcTotalPrice();
    } else {
      setCheckItems([]);
      calcTotalPrice();
    }
  };

  // 선택 상품 삭제
  const deleteSelectedMenu = () => {
    // 선택한 상품이 없는 경우 warning toast
    if (!checkItems.length) {
      addToast("선택된 메뉴가 없습니다", { appearance: "warning" });
      return false;
    }

    if (window.confirm("메뉴를 삭제하시겠습니까?")) {
      // 삭제하는 상품을 제외한 장바구니 목록
      const exceptDeleteItems = cartList?.filter((item: ICartItem) => {
        return checkItems.indexOf(item.menuId) === -1;
      });

      setCartList(exceptDeleteItems);

      // 로그인 했다면 수량 변경 api
      if(isLoggedInVar()) {
        callDeleteCartItems({
          variables: {
            input: {
              menuIds: checkItems
            }
          }
        });
      } else {
        // 로그인 안했으면 로컬스토리지 장바구니 수정
        if(exceptDeleteItems.length) {
          localStorage.setItem(LOCALSTORAGE_CART, JSON.stringify(exceptDeleteItems));
        } else {
          // exceptDeleteItems이 빈 배열이면 로컬스토리지 장바구니 삭제
          localStorage.removeItem(LOCALSTORAGE_CART);
        }
      }

      // 선택된 아이템 초기화
      setCheckItems([]);
    }
  };

  // 수량 변경(버튼 클릭)
  const changeQty = (type: string, item: ICartItem) => {
    if (type === "decrease" && item.qty <= 1) return;

    const updatedQty = type === "decrease" ? { qty: item.qty - 1 } : { qty: item.qty + 1 };

    const arr = cartList?.map((menu: ICartItem) => {
      if (item.menuId === menu.menuId) {
        menu.qty = updatedQty.qty;
      }
      return menu;
    });

    setCartList(arr);
    calcTotalPrice();

    // 로그인 했다면 수량 변경 api
    if(isLoggedInVar()) {
      callUpdateCartItemQty({
        variables: {
          input: {
            menuId: item.menuId,
            qty: item.qty
          }
        }
      });
    } else {
      // 로그인 안했으면 로컬스토리지 장바구니 수정
      updateLocalCart(item.menuId, item.qty);
    }
  };

  // (로그인 X) 수량 변경 후, 로컬스토리지 장바구니 업데이트
  const updateLocalCart = (menuId: number, qty: number) => {
    const localStorageCart = localStorage.getItem(LOCALSTORAGE_CART);
    const localCart = localStorageCart ? JSON.parse(localStorageCart) : [];

    let i: number;
    for(i = 0; i < localCart.length; i++) {
      const item = localCart[i];

      if(item.menuId === menuId) {
        item.qty = qty;
      }
      break;
    }

    localStorage.setItem(LOCALSTORAGE_CART, JSON.stringify(localCart));
  }

  // (로그인 O) 장바구니 아이템 수정 후
  // apollo client, localStorage의 유저 카트 업데이트
  const updateUserCart = (updatedCart: createCartItems_createCartItems_cart | null) => {
    // apollo client 유저 카트 업데이트
    userInfoVar().cart = updatedCart;
    // localStorage 유저 카트 업데이트
    const localStorageUser = localStorage.getItem(LOCALSTORAGE_USERINFO);
    const localUser = localStorageUser ? JSON.parse(localStorageUser) : [];
    localUser.cart = updatedCart;
    localStorage.setItem(LOCALSTORAGE_USERINFO, JSON.stringify(localUser));
  }

  const orderHandler = () => {
    // 선택한 상품이 없는 경우 warning toast
    if (!checkItems.length) {
      addToast("선택된 메뉴가 없습니다", { appearance: "warning" });
      return false;
    }

    if(isLoggedInVar()) {
      // apollo client, localStorage에 주문할 아이템 set
      const orderItems = cartList.filter(item => {
        return checkItems.indexOf(item.menuId) !== -1;
      });

      // set localStorage
      localStorage.setItem(LOCALSTORAGE_ORDER, JSON.stringify(orderItems));

      // set apollo client
      orderVar(orderItems);

      history.push('/order');
    } else {
      history.push('/login?return=cart');
    }
  }

  return (
    <div className="container order cart">
      <h2>장바구니</h2>

      {cartList.length ? (
        <>
          <OrderStep step={1}/>
          
          <div className="table_wrap">
            {windowWidth < 768 ? (
              <CartListUl
                cartList={cartList}
                checkItems={checkItems}
                totalPrice={totalPrice}
                checkAllHandler={checkAllHandler}
                checkHandler={checkHandler}
                changeQty={changeQty}
                deleteSelectedMenu={deleteSelectedMenu}
                orderHandler={orderHandler}
              />
            ) : (
              <CartListTable
                cartList={cartList}
                checkItems={checkItems}
                totalPrice={totalPrice}
                checkAllHandler={checkAllHandler}
                checkHandler={checkHandler}
                changeQty={changeQty}
                deleteSelectedMenu={deleteSelectedMenu}
                orderHandler={orderHandler}
              />
            )}
          </div>
        </>  
      ) : (
        <div className="empty_cart">
          <img src="/images/box.png" className="img_empty" alt="empty cart"/>
          <p className="empty_text">장바구니에 담긴 메뉴가 없습니다.</p>
          <Link to="/menus" className="btn btn_go_menus inline-block">메뉴로 이동</Link>
        </div>
      )}
    </div>
  );
};
