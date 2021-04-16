import React, { useState, useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import { CartListTable } from "./components/CartListTable";
import { CartListUl } from "./components/CartListUl";
import { OrderStep } from "./components/OrderStep";

const cartListData: ICartItem[] = [
  {
    id: 1,
    menu_name: "자몽 셔벗 블렌디드",
    menu_img:
      "https://image.istarbucks.co.kr/upload/store/skuimg/2019/04/[9200000002153]_20190423145048072.jpg",
    qty: 3,
    price: 6500,
  },
  {
    id: 2,
    menu_name: "화이트 타이거 프라푸치노",
    menu_img:
      "https://image.istarbucks.co.kr/upload/store/skuimg/2019/07/[9200000002403]_20190711125729602.jpg",
    qty: 1,
    price: 6000,
  },
];

interface ICartItem {
  id: number;
  menu_name: string;
  menu_img: string;
  qty: number;
  price: number;
}

export const Cart = () => {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  const { addToast } = useToasts();
  const [cartList, setCartList] = useState<ICartItem[] | []>(cartListData);
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkItems, setCheckItems] = useState<number[]>([1, 2]); // checked menuItems

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });

    calcTotalPrice();
  }, [checkItems]);

  // 주문 금액 합계 계산
  const calcTotalPrice = () => {
    let totalPriceAll: number = 0;

    cartList.forEach(item => {
      if (checkItems.includes(item.id)) {
        totalPriceAll += (item.price * item.qty);
      }
    })

    setTotalPrice(totalPriceAll)
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
      const ids = cartList.map((item: ICartItem) => item.id);
      setCheckItems(ids);
      calcTotalPrice();
    } else {
      setCheckItems([]);
      calcTotalPrice();
    }
  };

  // 수량 핸들러
  const inputHandler = (value: string, itemId: number) => {
    let updateValue = +value;

    if (updateValue <= 0) updateValue = 1;

    cartList.map((menu: ICartItem) => (
      menu.id === itemId ? menu.qty = updateValue : menu
    ));

    setCartList([...cartList]);
    calcTotalPrice();
  };

  // 선택 상품 삭제
  const deleteSelectedMenu = () => {
    console.log(checkItems);
    // 선택한 상품이 없는 경우 warning toast
    if (!checkItems.length) {
      addToast("선택된 메뉴가 없습니다", { appearance: "warning" });
      return false;
    }

    if (window.confirm("메뉴를 삭제하시겠습니까?")) {
      console.log("delete!");
      // 삭제 api처리 후, res => cartList받아서 setCartList()
    }
  };

  // 수량 변경(api 요청 이후 실행)
  const changeQty = (type: string, item: ICartItem) => {
    if (type === "decrease" && item.qty <= 1) return;

    const updatedQty = type === "decrease" ? { qty: item.qty - 1 } : { qty: item.qty + 1 };

    const arr = cartList?.map((menu: ICartItem) => {
      if (item.id === menu.id) {
        menu.qty = updatedQty.qty;
      }
      return menu;
    });

    setCartList(arr);
    calcTotalPrice();
  };

  return (
    <div className="container order">
      <h2>장바구니</h2>

      <OrderStep />

      <div className="table_wrap">
        {windowWidth < 768 ? (
          <CartListUl
            cartList={cartListData}
            checkItems={checkItems}
            totalPrice={totalPrice}
            checkAllHandler={checkAllHandler}
            checkHandler={checkHandler}
            changeQty={changeQty}
            inputHandler={inputHandler}
            deleteSelectedMenu={deleteSelectedMenu}
          />
        ) : (
          <CartListTable
            cartList={cartListData}
            checkItems={checkItems}
            totalPrice={totalPrice}
            checkAllHandler={checkAllHandler}
            checkHandler={checkHandler}
            changeQty={changeQty}
            inputHandler={inputHandler}
            deleteSelectedMenu={deleteSelectedMenu}
          />
        )}
      </div>
    </div>
  );
};
