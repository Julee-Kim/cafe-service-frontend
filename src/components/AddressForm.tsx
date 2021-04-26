import React, { useState, useEffect } from 'react';
import DaumPostcode from 'react-daum-postcode';

declare global {
  interface Window {
    daum: any;
  }
}

interface IAddressFormProps {
  isRequired?: boolean;
  register?: any | null;
  errors?: any | null;
  setValue?: any | null;
}

export const AddressForm: React.FC<IAddressFormProps> = ({
  isRequired = false,
  register,
  errors,
  setValue,
}) => {
  const execPostCode = () => {
    new window.daum.Postcode({
      // 팝업에서 검색결과 항목을 클릭했을때 실행
      oncomplete(data: any) {
        // 주소 타입(지번: J, 도로명: R) 체크
        switch(data.userSelectedType) {
          case 'R':
            setValue({
              address: data.roadAddress,
              addressDetail: data.addressDetail ? data.addressDetail : '',
              zonecode: data.zonecode,
            });
            break;
          case 'J':
            setValue({
              address: data.jibunAddress,
              addressDetail: data.addressDetail ? data.addressDetail : '',
              zonecode: data.zonecode,
            });
            break;
        }
      }
    }).open();
  };

  return (
    <div className="address_form_wrap">
      {<label htmlFor="zonecode" className={isRequired ? 'required' : ''}>주소</label>}
      <div className="zonecode_wrap">
        <input
          ref={register({
            required: isRequired ? true : false
          })}
          type="text"
          name="zonecode"
          id="zonecode"
          className={`zonecode ${errors?.zonecode ? 'error' : ''}`}
          placeholder="우편번호"
          readOnly
        />
        <button type="button" className="btn btn_search_addr" onClick={execPostCode}>주소 검색</button>
      </div>
      <div>
        <input
          ref={register({
            required: isRequired ? true : false
          })}
          type="text"
          name="address"
          id="address"
          className={`address ${errors?.address ? 'error' : ''}`}
          placeholder="도로명 주소"
          readOnly
        />
      </div>
      <div>
        <input
          ref={register}
          type="text"
          name="addressDetail"
          id="addressDetail"
          className="address_detail"
          placeholder="상세주소 입력"
        />
      </div>

      <div>
        <DaumPostcode
          onComplete={execPostCode}
          style={{height: 0}}
        />
      </div>
    </div>
  )
}
