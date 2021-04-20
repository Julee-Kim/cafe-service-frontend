import React, { useState, useEffect } from 'react';
import DaumPostcode from 'react-daum-postcode';

declare global {
  interface Window {
    daum: any;
  }
}

interface IAddressFormProps {
  addressInfoProps?: object;
  setAddData: Function;
}

interface IAddressData {
  zonecode: string;
  address: string;
  addressDetail: string;
}

export const AddressForm: React.FC<IAddressFormProps> = ({
  addressInfoProps,
  setAddData,
}) => {
  const [addressData, setAddressData] = useState<IAddressData>({
    zonecode: '',
    address: '',
    addressDetail: '',
  });

  useEffect(() => {
    // 주소 데이터가 있으면 set
    if(addressInfoProps) {
      setAddressData({
        ...addressData,
        ...addressInfoProps,
      })
    }
  }, [addressInfoProps])

  const execPostCode = () => {
    new window.daum.Postcode({
      // 팝업에서 검색결과 항목을 클릭했을때 실행
      oncomplete(data: any) {
        // 주소 타입(지번: J, 도로명: R) 체크
        switch(data.userSelectedType) {
          case 'R':
            setAddressData({
              ...addressData,
              zonecode: data.zonecode,
              address: data.roadAddress
            });
            console.log('adddetail: ' ,addressData.addressDetail)
            if(!setAddData) return;
            setAddData({
              zonecode: data.zonecode,
              address: data.roadAddress,
              addressDetail: addressData.addressDetail
            });
            break;
          case 'J':
            setAddressData({
              ...addressData,
              zonecode: data.zonecode,
              address: data.roadAddress
            });
            if(!setAddData) return;
            setAddData(addressData);
            break;
        }
      }
    }).open();
  };

  const changeState = (value: string) => {
    setAddressData({
      ...addressData,
      addressDetail: value
    });

    if(!setAddData) return;
    // 부모 컴포넌트 setAddData 데이터 전달
    setAddData({
      ...addressData,
      addressDetail: value
    });
  }

  return (
    <div className="address_form_wrap">
      <label htmlFor="zonecode">주소</label>
      <div className="zonecode_wrap">
        <input
          type="text"
          name="zonecode"
          id="zonecode"
          className="zonecode"
          placeholder="우편번호"
          value={addressData.zonecode}
          readOnly
        />
        <button type="button" className="btn btn_search_addr" onClick={execPostCode}>주소 검색</button>
      </div>
      <div>
        <input
          type="text"
          name="address"
          id="address"
          className="address"
          placeholder="도로명 주소"
          value={addressData.address}
          readOnly
        />
      </div>
      <div>
        <input
          type="text"
          name="addressDetail"
          id="addressDetail"
          className="address_detail"
          placeholder="상세주소 입력"
          value={addressData.addressDetail}
          onChange={(e) => changeState(e.target.value)}
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
