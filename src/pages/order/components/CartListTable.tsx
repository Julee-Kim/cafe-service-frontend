import React from 'react'
import { Link } from 'react-router-dom'

interface ICartListProps {
  cartList: ICartItem[] | [];
  checkItems: number[] | [];
  totalPrice: number;
  checkAllHandler: Function;
  checkHandler: Function;
  changeQty: Function;
  deleteSelectedMenu: Function;
}

interface ICartItem {
  menuId: number;
  productName: string;
  img: string;
  qty: number;
  price: number;
}

export const CartListTable: React.FC<ICartListProps> = ({ cartList, checkItems, totalPrice, checkAllHandler, checkHandler, changeQty, deleteSelectedMenu }) => {
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
                  checkItems.length === cartList.length ? true : false
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
            <td>{totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
          </tr>
        </tfoot>
        <tbody>
          {cartList.length && cartList?.map((item: ICartItem, index: number) => (
            <tr key={item.menuId}>
              <td>{index + 1}</td>
              <td>
                <input
                  type="checkbox"
                  name={`selectMenu${index}`}
                  id={`selectMenu${index}`}
                  value={''}
                  checked={checkItems.some(id => id === item.menuId) ? true : false}
                  onChange={(e) => checkHandler(e.target.checked, item.menuId)}
                />
              </td>
              <td className="menu_img_wrap">
                <div className="product_img_area">
                  <img src={item.img} className="product_img" alt={item.productName}/>
                  <span className="product_name">{item.productName}</span>
                </div>
              </td>
              <td>
                <div className="inline-block">
                  <button type="button" className="btn_change_qty btn_decrease" onClick={() => changeQty('decrease', item)}>감소</button>
                  <input type="text" className="input_qty" value={item.qty} readOnly/>
                  <button type="button" className="btn_change_qty btn_increase" onClick={() => changeQty('increase', item)}>증가</button>
                </div>
              </td>
              <td>{(item.price * item.qty).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="btn_delete_products_wrap">
        <button type="button" className="btn_delete_products" onClick={() => deleteSelectedMenu()}>선택 메뉴 삭제</button>
      </div>
      <div className="btn_order_wrap text-center">
        <Link to="/order" className="btn btn_order inline-block">주문하기</Link>
      </div>
    </div>
  )
}
