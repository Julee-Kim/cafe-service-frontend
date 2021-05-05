import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { userInfoVar } from "../../apollo";
import { checkError } from "../../commonJs";
import { AddressForm } from "../../components/AddressForm";
import { InputWrap } from "../../components/InputWrap";
import { LOCALSTORAGE_ORDER } from "../../constants";
import { createPayment, createPaymentVariables } from "../../__generated__/createPayment";
import { OrderInputType } from "../../__generated__/globalTypes";
import { BtnPaypal } from "./components/BtnPaypal";
import { OrderStep } from "./components/OrderStep";

const CREATE_PAYMENT = gql`
  mutation createPayment($input: CreatePaymentInput!) {
    createPayment(input: $input) {
      success
      error
    }
  }
`;

interface ICartItem {
  menuId: number;
  productName: string;
  img: string;
  qty: number;
  price: number;
}

export const Order = () => {
  const history = useHistory();
  const { addToast } = useToasts();
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [receiverType, setReceiverType] = useState<string>('orderer')
  const [orderList, setOrderList] = useState<ICartItem[] | []>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0); // 총 결제금액
  const [orderPrice, setOrderPrice] = useState<number>(0); // 주문금액
  const [deliveryPrice, setDeliveryPrice] = useState<number>(3000); // 배송비

  const {
    register,
    getValues,
    errors,
    setValue,
    formState
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: userInfoVar().name,
      phone: userInfoVar().phone,
      address: userInfoVar().address,
      addressDetail: userInfoVar().addressDetail,
      zonecode: userInfoVar().zonecode,
  }});

  const [ callCreatePayment ] = useMutation<createPayment, createPaymentVariables>(CREATE_PAYMENT, {
    onCompleted() {
      // 주문 완료 페이지로 이동
      history.push('/order/complete');
    },
    onError(error: any) {
      checkError(error);
    }
  });

  useEffect(() => {
    if(isFirstLoading) {
      // - 로그인한 사용자
      setIsFirstLoading(false);
      setInit();
    }

    // 주문금액, 총 결제금액 계산
    calcPrice();
  }, [orderList]);

  // init setting
  const setInit = () => {
    // 로컬스토리지에 있는 주문 정보 set
    const localOrderItems = localStorage.getItem(LOCALSTORAGE_ORDER);
    const orderItems = localOrderItems ? JSON.parse(localOrderItems) : [];
    setOrderList([
      ...orderList,
      ...orderItems
    ]);
  }

  // 받으시는분 정보 셋팅
  const changeReceiver = (type: string) => {
    switch (type) {
      case 'orderer': // 주문자 정보와 동일
        setValue('name', userInfoVar().name);
        setValue('phone', userInfoVar().phone);
        setValue('address', userInfoVar().address);
        setValue('addressDetail', userInfoVar().addressDetail);
        setValue('zonecode', userInfoVar().zonecode);
        break;
      case 'other': // 새로 입력
        setValue('name', '');
        setValue('phone', '');
        setValue('address', '');
        setValue('addressDetail', '');
        setValue('zonecode', '');
        break;
    }
  }

  // 주문금액, 총 결제금액 계산
  const calcPrice = () => {
    // 주문금액 계산
    let orderPrice: number = 0;
    orderList.forEach(item => {
      orderPrice += item.price;
    });
    setOrderPrice(orderPrice);
    
    // 총 결제금액 계산
    const totalPrice = orderPrice + deliveryPrice;
    setTotalPrice(totalPrice);
  }

  // AddressForm으로부터 받은 주소 데이터 셋팅
  const fromChildSetValue = (addrObj: any) => {
    for(let key in addrObj) {
      switch (key) {
        case 'address':
          setValue('address', addrObj[key]);
          break;
        case 'addressDetail':
          setValue('addressDetail', addrObj[key]);
          break;
        case 'zonecode':
          setValue('zonecode', addrObj[key]);
          break;    
      }
    }
  }

  const checkValid = () => {
    if(!formState.isValid) {
      addToast('받으시는 분 정보는 필수입니다.', { appearance: 'error' });
    }
  }

  const transactionSuccess = (orderData: OrderInputType) => {
    const { 
      name,
      phone,
      address,
      addressDetail,
      zonecode,
    } = getValues();
    
    const menuIdsArr = orderList.map((item: ICartItem) => {
      return item.menuId;
    });

    callCreatePayment({
      variables: {
        input: {
          menuIds: menuIdsArr,
          data: {...orderData},
          receiverName: name,
          receiverPhone: phone,
          receiverAddress: address,
          receiverAddressDetail: addressDetail,
          receiverZonecode: zonecode,
          totalPrice: totalPrice,
          orderPrice: orderPrice,
          deliveryPrice: deliveryPrice,
        }
      }
    })
  }

  const transactionError = () => {
    console.log('-- Paypal error')
  }

  return (
    <div className="container order payment">
      <h2>주문결제</h2>

      <OrderStep step={2} />

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
                    <td>{orderPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</td>
                  </tr>
                </tfoot>
                <tbody>
                  {orderList.map((item: ICartItem, index: number) => (
                    <tr key={item.menuId}>
                      <td className="menu_img_wrap">
                        <img src={item.img} className="menu_img" alt={item.productName}/>
                        <div className="menu_name_wrap">
                          <p className="menu_name">{item.productName}</p>
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
                <input
                  type="radio"
                  name="receiver"
                  id="orderer"
                  value="orderer"
                  defaultChecked={receiverType === 'orderer'}
                  onChange={() => changeReceiver('orderer')}
                />
                <label htmlFor="orderer" className="label_radio">주문자 정보와 동일</label>
                <input
                  type="radio"
                  name="receiver"
                  id="other"
                  value="other"
                  defaultChecked={receiverType === 'other' }
                  onChange={() => changeReceiver('other')}
                />
                <label htmlFor="other" className="label_radio">새로 입력</label>
              </div> 
              <div className="receiver_input_wrap">
                <InputWrap
                  name={'name'}
                  labelName={'이름'}
                  register={register}
                  errors={errors}
                />
                <InputWrap
                  name={'phone'}
                  labelName={'휴대전화'}
                  register={register}
                  errors={errors}
                />
                {/* <div>
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
                </div>   */}
              </div>

              <div className="address_wrap">
                <AddressForm
                  isRequired={true}
                  register={register}
                  errors={errors}
                  setValue={fromChildSetValue}
                />
              </div>
            </div>
          
            {/* payment_kind_info */}
            <div className="payment_kind_info">
              <h3>결제 정보</h3>
              <div className="flex items-center paypal_wrap">
                <input type="radio" name="creditCard" id="creditCard" defaultChecked/>
                <label htmlFor="creditCard" className="label_radio">PayPal</label>
              </div>
            </div>
          </div>      

          {/* payment_info */}
          <div className="payment_info">
            <h3>결제 금액 정보</h3>
            <ul className="summary inline-block">
              <li>
                <span className="summary_label">주문 금액</span>
                <span className="summary_value order_price">{orderPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
              </li>
              <li>
                <span className="summary_label">배송비</span>
                <span className="summary_value delivery_price">{deliveryPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
              </li>
              <li>
                <span className="summary_label ">총 결제금액</span>
                <span className="summary_value total_price">{totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
              </li>
            </ul>

            <div className={`${!formState.isValid ? 'disable' : ''}`} onClick={checkValid}>
              <div className="paypal_guard"></div>
              <BtnPaypal
                total={totalPrice}
                transactionSuccess={transactionSuccess}
                transactionError={transactionError}
              />
            </div>
          </div>
        </div>     
      </form>    
    </div>
  )
}
