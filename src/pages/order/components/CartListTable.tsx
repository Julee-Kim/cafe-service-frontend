import React, { useState, useEffect } from 'react'
import { useToasts } from 'react-toast-notifications';

const cartListData = [
  {
    id: 1,
    menu_name: '자몽 셔벗 블렌디드',
    menu_img: 'https://image.istarbucks.co.kr/upload/store/skuimg/2019/04/[9200000002153]_20190423145048072.jpg',
    qty: 1,
    price: 6500,
  },
  {
    id: 2,
    menu_name: '화이트 타이거 프라푸치노',
    menu_img: 'https://image.istarbucks.co.kr/upload/store/skuimg/2019/07/[9200000002403]_20190711125729602.jpg',
    qty: 1,
    price: 6000,
  }
];

interface ICartItem {
  id: number;
  menu_name: string;
  menu_img: string;
  qty: number;
  price: number;
}

export const CartListTable = () => {
  const { addToast } = useToasts();
  const [cartList, setCartList] = useState<ICartItem[] | []>([]);
  const [checkItems, setCheckItems] = useState<number[]>([1, 2]); // checked menuItems

  useEffect(() => {
    setCartList(cartListData);
  }, [checkItems])

  // 개별 체크박스
  const checkHandler = (checked: boolean, itemId: number) => {
    if(checked) {
      setCheckItems([...checkItems, itemId]);
    } else {
      // 체크해제
      setCheckItems(checkItems.filter(id => id !== itemId));
    }
  }

  // 전체 체크박스
  const checkAllHandler = (checked: boolean) => {
    if(checked) {
      const ids = cartList.map((item: ICartItem)  => item.id);
      setCheckItems(ids);
    } else {
      setCheckItems([]);
    }
  }

  // 수량 핸들러
  const inputHandler = (value: string, itemId: number) => {}

  // 선택 상품 삭제
  const deleteSelectedMenu = () => {
    // 선택한 상품이 없는 경우 warning toast
    if (!checkItems.length) {
      addToast('선택된 메뉴가 없습니다', { appearance: 'warning' });
      return false;
    }

    if(window.confirm('메뉴를 삭제하시겠습니까?')) {
      console.log('delete!')
      // 삭제 api처리 후, res => cartList받아서 setCartList()
    }
  }

  return (
    <div className="cart_list_table_wrap">
      <table>
        <colgroup>
          <col width="10%"/>
          <col width="10%"/>
          <col width="auto;"/>
          <col width="20%"/>
          <col width="20%"/>
        </colgroup>
        <thead>
          <tr>
            <th scope="col">번호</th>
            <th scope="col">
              <input
              type="checkbox"
              name="checkAll"
              id="checkAll"
              checked={
                checkItems.length === cartList.length
                  ? true
                : false
              }
              onChange={(e) => checkAllHandler(e.target.checked)}
            />
            </th>
            <th scope="col">메뉴 정보</th>
            <th scope="col">수량</th>
            <th scope="col">금액</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <td colSpan={4} className="text-right">주문 금액 합계</td>
            <td>6,000</td>
          </tr>
        </tfoot>
        <tbody>
          {cartList.map((item: ICartItem, index: number) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>
                <input
                  type="checkbox"
                  name={`selectMenu${index}`}
                  id={`selectMenu${index}`}
                  value={''}
                  checked={checkItems.indexOf(item.id) >= 0 ? true : false}
                  onChange={(e) => checkHandler(e.target.checked, item.id)}
                />
              </td>
              <td>
                <img src={item.menu_img} className="product_img" alt={item.menu_name}/>
                <span className="product_name">{item.menu_name}</span>
              </td>
              <td>
                <div className="inline-block">
                  <button type="button" className="btn_change_qty btn_decrease">감소</button>
                  <input type="text" className="input_qty" value={item.qty} onChange={(e) => inputHandler(e.target.value, item.id)}/>
                  <button type="button" className="btn_change_qty btn_increase">증가</button>
                </div>
              </td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="btn_delete_products">
        <button type="button" className="btn_delete_products" onClick={deleteSelectedMenu}>선택 메뉴 삭제</button>
      </div>
      <div className="btn_order_wrap text-center">
        <button className="btn active btn_order">주문하기</button>
      </div>
    </div>
  )
}
