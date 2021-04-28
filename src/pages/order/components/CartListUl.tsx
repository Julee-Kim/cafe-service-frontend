import React from 'react'

interface ICartListProps {
  cartList: ICartItem[] | [];
  checkItems: number[] | [];
  totalPrice: number;
  checkAllHandler: Function;
  checkHandler: Function;
  changeQty: Function;
  deleteSelectedMenu: Function;
  orderHandler: Function;
}

interface ICartItem {
  menuId: number;
  productName: string;
  img: string;
  qty: number;
  price: number;
}

export const CartListUl:React.FC<ICartListProps> = ({
  cartList,
  checkItems,
  totalPrice,
  checkAllHandler,
  checkHandler,
  changeQty,
  deleteSelectedMenu,
  orderHandler
}) => {
  return (
    <div className="cart_list_ul_wrap">
      <div className="cart_list_ul_header check_and_delete_wrap">
        <div className="check_all_wrap select_wrap">
          <input
            type="checkbox"
            name="checkAll"
            id="checkAll"
            checked={
              checkItems.length === cartList.length ? true : false
            }
            onChange={(e) => checkAllHandler(e.target.checked)}
          />
          <label htmlFor="checkAll">전체 선택</label>
        </div>
        <button type="button" className="btn_delete_products" onClick={() => deleteSelectedMenu()}>선택 메뉴 삭제</button>
      </div>

      <ul className="cart_list_ul">
        {cartList.length && cartList?.map((item: ICartItem, index: number) => (
          <li key={item.menuId}>
            <div className="menu_info_wrap">
              <div className="check_and_delete_wrap">
                <div className="select_wrap">
                  <input
                    type="checkbox"
                    name={`selectMenu${index}`}
                    id={`selectMenu${index}`}
                    value={''}
                    checked={checkItems.some(id => id === item.menuId) ? true : false}
                    onChange={(e) => checkHandler(e.target.checked, item.menuId)}
                  />
                  <label htmlFor={`selectMenu${index}`}>선택</label>
                </div>
                <button className="btn_delete_menu">삭제</button>
              </div>

              <div className="menu_info">
                <div>
                  <img src={item.img} className="product_img" alt={item.productName}/>
                </div>

                <div className="w-full pl-5 py-1 flex justify-between flex-col">
                  <div className="flex justify-between">
                    <span className="menu_name">{item.productName}</span>
                    <span className="menu_price">{(item.price * item.qty).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                  </div>
                  <div className="btn_change_qty_wrap inline-block">
                    <button type="button" className="btn_change_qty btn_decrease" onClick={() => changeQty('decrease', item)}>감소</button>
                    <input type="text" className="input_qty" value={item.qty} readOnly/>
                    <button type="button" className="btn_change_qty btn_increase" onClick={() => changeQty('increase', item)}>증가</button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}  
      </ul>

      <div className="btn_order_wrap btn_order_wrap--fixed text-center">
        <button type="button" className="btn btn_order block" onClick={() => orderHandler()}>
          {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원 결제하기
        </button>
      </div>
    </div>
  )
}
