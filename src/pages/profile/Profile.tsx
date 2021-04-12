import React, { useState } from 'react'
import DaumPostcode from 'react-daum-postcode';
import { useForm } from 'react-hook-form';
import { InputWrap } from '../../components/InputWrap';
import { ModalChangePassword } from './components/ModalChangePassword';
import { Button } from '../../components/Button';

declare global {
  interface Window {
    daum: any;
  }
}

interface IProfile {
  name: string;
  birth: string;
  gender: string;
  email: string;
  address?: string;
  addressDetail?: string;
  zonecode?: string;
}

export const Profile = () => {
  const [showModal, setShoModal] = useState(false);
  const [zonecode, setZonecode] = useState('');
  const [address, setAddress] = useState('');
  const [addressDetail, setAddressDetail] = useState('')
  const {
    register,
    getValues,
    handleSubmit,
    errors,
    formState,
  } = useForm<IProfile>({ mode: 'onChange' });

  const execPostCode = () => {
    new window.daum.Postcode({
      // 팝업에서 검색결과 항목을 클릭했을때 실행
      oncomplete(data: any) {
        // 우편번호와 주소 정보를 해당 필드에 넣는다.
        setZonecode(data.zonecode);

        // 주소 타입(지번: J, 도로명: R) 체크
        switch(data.userSelectedType) {
          case 'R':
            setAddress(data.roadAddress);
            break;

          case 'J':
            setAddress(data.jibunAddress);
            break;
        }
      }
    }).open();
  };

  const onSubmit = () => {
    const { name, birth, gender, email } = getValues();
    const data = {
      name, birth, gender, email, zonecode, address, addressDetail
    };
    console.log(data)
  }

  return (
    <div>
      <div className="container">
        <h2>내 정보</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            <InputWrap
              name={'name'}
              labelName={'이름'}
              register={register}
              errors={errors}
            />
            <InputWrap
              name={'birth'}
              labelName={'생년월일'}
              register={register}
              errors={errors}
            />
            <InputWrap
              name={'gender'}
              labelName={'성별'}
              register={register}
              errors={errors}
            />
            <InputWrap
              type={'email'}
              name={'email'}
              labelName={'이메일'}
              register={register}
              pattern={/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/}
              errors={errors}
              errorMsg={'잘못된 이메일 형식입니다.'}
            />
            <div className="password">
              <label htmlFor="currentPassword">비밀번호</label>
              <button type="button" className="btn able btn_change_password btn_mint" onClick={() => setShoModal(true)}>비밀번호 변경</button>
            </div>
          </div>
          <div className="address_wrap input_wrap">
            <label htmlFor="zonecode">주소</label>
            <div className="zonecode_wrap">
              <input
                name="zonecode"
                id="zonecode"
                className="zonecode"
                placeholder="우편번호"
                value={zonecode}
                readOnly
              />
              <button type="button" className="btn btn_search_addr" onClick={execPostCode}>주소 검색</button>
            </div>
            <div className="grid lg:grid-cols-2 lg:gap-2">
              <input
                name="address"
                id="address"
                className="address"
                placeholder="도로명 주소"
                value={address}
                readOnly
              />
              <input
                name="addressDetail"
                id="addressDetail"
                className="address_detail"
                placeholder="상세주소 입력"
                value={addressDetail}
                onChange={(e) => setAddressDetail(e.target.value)}
              />
            </div>  
          </div>
          <Button
            canClick={formState.isValid}
            loading={false}
            actionText={"회원 정보 수정"}
          />
        </form>
      </div>

      {/* Daum postcode */}
      <DaumPostcode
        onComplete={execPostCode}
        style={{height: 0}}
      />
      <ModalChangePassword show={showModal} setShoModal={setShoModal}/>
    </div>
  )
}
