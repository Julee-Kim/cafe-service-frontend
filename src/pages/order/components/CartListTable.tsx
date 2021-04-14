import React from 'react'

export const CartListTable = () => {
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
            <th scope="col">체크</th>
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
          <tr>
            <td>1</td>
            <td>
              <input type="checkbox" name="selectMenu" id="selectMenu" checked/>
            </td>
            <td>
              <img src="https://image.istarbucks.co.kr/upload/store/skuimg/2019/07/[9200000002403]_20190711125729602.jpg" className="product_img" alt=""/>
              <span className="product_name">화이트 타이거 프라푸치노</span>
            </td>
            <td>
              <div className="inline-block">
                <button type="button" className="btn_change_qty btn_decrease"></button>
                <input type="text" className="input_qty"/>
                <button type="button" className="btn_change_qty btn_increase"></button>
              </div>
            </td>
            <td>6,000</td>
          </tr>
          <tr>
            <td>2</td>
            <td>
              <input type="checkbox" name="selectMenu" id="selectMenu" checked/>
            </td>
            <td>
              <img src="https://image.istarbucks.co.kr/upload/store/skuimg/2019/07/[9200000002403]_20190711125729602.jpg" className="product_img" alt=""/>
              <span className="product_name">화이트 타이거 프라푸치노</span>
            </td>
            <td>
              <div className="inline-block">
                <button type="button" className="btn_change_qty btn_decrease"></button>
                <input type="text" className="input_qty"/>
                <button type="button" className="btn_change_qty btn_increase"></button>
              </div>
            </td>
            <td>6,000</td>
          </tr>
        </tbody>
      </table>
      <div className="btn_delete_products">
        <button type="button" className="btn_delete_products">선택 상품 삭제</button>
      </div>
      <div className="btn_order_wrap text-center">
        <button className="btn active btn_order">주문하기</button>
      </div>
    </div>
  )
}
