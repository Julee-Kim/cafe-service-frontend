import { useEffect } from 'react'
import { LOCALSTORAGE_ORDER, LOCALSTORAGE_USERINFO } from "../../constants";
import { orderVar, userInfoVar } from "../../apollo";
import { OrderStep } from "./components/OrderStep";
import { useHistory } from 'react-router';
import { CheckCircleOutline } from '@material-ui/icons';

export const CompleteOrder = () => {
  useEffect(() => {
    // 주문완료 페이지를 나갔을 때 실행
    return () => {
      initOrderData();
    };
  }, []);

  const initOrderData = () => {
    // localstorage mycafe-user > cart 중 주문한 메뉴 삭제
    const localStorageUser = localStorage.getItem(LOCALSTORAGE_USERINFO);
    const localUser = localStorageUser ? JSON.parse(localStorageUser) : [];
    const localStorageOrder = localStorage.getItem(LOCALSTORAGE_ORDER);
    const localOrder = localStorageOrder ? JSON.parse(localStorageOrder) : [];

    let updatedCart = [];

    for(let i = 0; i < localUser.cart.items.length; i++) {
      const localCartItem = localUser.cart.items[i];
      let find = false;

      for(let j = 0; j < localOrder.length; j++) {
        const localOrderItem = localOrder[j];
        if(localCartItem.menuId === localOrderItem.menuId) {
          find = true;
          break;
        }
      }
      if(!find) {
        updatedCart.push(localCartItem)
      }
    }
    localUser.cart.items = updatedCart

    // Update localstorage mycafe-user
    localStorage.setItem(LOCALSTORAGE_USERINFO, JSON.stringify(localUser));


    // apollo client order init data
    orderVar(null);

    // apollo client userInfo > cart 중 주문한 메뉴 삭제
    userInfoVar().cart.items = updatedCart
    
    // localstorage mycafe-order 삭제
    localStorage.removeItem(LOCALSTORAGE_ORDER);
  }

  return (
    <div className="container order complete">
      <h2>주문완료</h2>

      <OrderStep step={3} />

      <div className="flex justify-center items-center complete_text_wrap">
        <CheckCircleOutline className="ico_check"/>
        <span className="complete_text">주문이 완료되었습니다.</span>
      </div>
    </div>
  )
}
