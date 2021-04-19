import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AddressForm } from "../../components/AddressForm";
import { InputWrap } from "../../components/InputWrap";
import { SelectWrap } from "../../components/SelectWrap";
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

interface IAddressData {
  zonecode: string;
  address: string;
  addressDetail: string;
}

// interface IOrderForm {
//   name: string;

// }

export const Order = () => {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [addressData, setaddressData] = useState<IAddressData>({
    zonecode: '',
    address: '',
    addressDetail: '',
  });
  const [cartList, setCartList] = useState<ICartItem[] | []>(cartListData);
  const {
    register,
    getValues,
    handleSubmit,
    errors,
    formState,
  } = useForm({ mode: 'onChange' });

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });
  }, []);

  const setAddData = (data: IAddressData) => {
    console.log('-- setAddData')
    console.log(data)
  }

  return (
    <div className="container order payment">
      <h2>주문결제</h2>

      <OrderStep />

      <form>
        <div className="lg:flex lg:items-start">
          <div className="order_info_wrap">
            {/* menu_info */}
            <div className="menu_info">
              <h3>메뉴 정보</h3>
              <table>
                <thead className="xs:hidden sm:table-header-group">
                  <tr>
                    <th scope="col">메뉴정보</th>
                    <th scope="col" className="xs:hidden sm:table-cell">주문금액</th>
                  </tr>
                </thead>
                <tfoot className="xs:hidden lg:table-footer-group">
                  <tr>
                    <td className="text-right">주문 금액 합계</td>
                    <td>12,000원</td>
                  </tr>
                </tfoot>
                <tbody>
                  {cartList.map((item: ICartItem, index: number) => (
                    <tr key={item.id}>
                      <td className="menu_img_wrap">
                        <img src={item.menu_img} className="menu_img" alt={item.menu_name}/>
                        <div className="menu_name_wrap">
                          <p className="menu_name">{item.menu_name}</p>
                          <span className="menu_qty">수량: {item.qty}</span>
                          <p className="menu_price xs:block sm:hidden">
                            <strong>{(item.price * item.qty).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong>
                          </p>
                        </div>
                      </td>
                      <td className="xs:hidden sm:table-cell">
                        {(item.price * item.qty).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* receiver_info */}
            <div className="receiver_info">
              <h3>받으시는 분</h3>
              <div className="flex items-center orderer_wrap">
                <input type="radio" name="orderer" id="orderer" checked/>
                <label htmlFor="orderer" className="label_radio">주문자 정보와 동일</label>
                <input type="radio" name="newOrderer" id="newOrderer"/>
                <label htmlFor="newOrderer" className="label_radio">새로 입력</label>
              </div>      
              <div className="receiver_input_wrap">
                <InputWrap
                  name={'name'}
                  labelName={'이름'}
                  register={register}
                  errors={errors}
                />
                <div>
                  <label htmlFor='phoneF'>휴대전화</label>
                  <div className="phone_wrap">
                    <SelectWrap 
                      name={'phoneF'}
                      noLabel={true}
                      register={register}
                      errors={errors}
                      options={[{'010': '010'}, {'011': '011'}]}
                    />
                    <InputWrap
                      name={'phoneM'}
                      labelName={''}
                      register={register}
                      errors={errors}
                    />
                    <InputWrap
                      name={'phoneL'}
                      labelName={''}
                      register={register}
                      errors={errors}
                    />
                  </div>
                </div>  
              </div>

              <div className="address_wrap">
                <AddressForm setAddData={setAddData}/>
              </div>
            </div>
          
            {/* payment_kind_info */}
            <div className="payment_kind_info">
              <h3>결제 정보</h3>
              <div className="flex items-center paypal_wrap">
                <input type="radio" name="creditCard" id="creditCard" checked/>
                <label htmlFor="creditCard" className="label_radio">PayPal</label>
              </div>

              <div className="agree_wrap">
                <ul className="agree xs:block lg:hidden">
                  <li>
                    <input
                      type="checkbox"
                      name="agree1"
                      id="agree1"
                    />
                    <label htmlFor="agree1">주문 상품 정보에 동의(필수)</label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      name="agree2"
                      id="agree2"
                    />
                    <label htmlFor="agree2">개인정보 제 3자 제공 동의 (필수)</label>
                  </li>
                </ul>
              </div>
            </div>
          </div>      

          {/* payment_info */}
          <div className="payment_info">
            <h3>결제 금액 정보</h3>
            <ul className="summary inline-block">
              <li>
                <span className="summary_label">주문 금액</span>
                <span className="summary_value order_price">9,000</span>
              </li>
              <li>
                <span className="summary_label">배송비</span>
                <span className="summary_value delivery_price">3,000</span>
              </li>
              <li>
                <span className="summary_label ">총 결제금액</span>
                <span className="summary_value total_price">12,000</span>
              </li>
            </ul>
            <div className="agree_wrap">
              <ul className="agree">
                <li>
                  <input
                    type="checkbox"
                    name="agree1"
                    id="agree1"
                  />
                  <label htmlFor="agree1">주문 상품 정보에 동의(필수)</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    name="agree2"
                    id="agree2"
                  />
                  <label htmlFor="agree2">개인정보 제 3자 제공 동의 (필수)</label>
                </li>
              </ul>
            </div>

            <div className="btn_order_wrap text-center">
              <button className="btn active btn_order">주문하기</button>
            </div>
          </div> 
        
          <div className="btn_order_wrap btn_order_wrap--fixed text-center md:block lg:hidden">
            <Link to="/order" className="btn active btn_order block">12,000원 결제하기</Link>
          </div>
        </div>     
      </form>    
    </div>
  )
}
