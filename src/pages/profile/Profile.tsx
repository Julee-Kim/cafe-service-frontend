import React, { useState } from 'react'
import DaumPostcode from 'react-daum-postcode';
import { useForm } from 'react-hook-form';
import { InputWrap } from '../../components/InputWrap';
import { ModalChangePassword } from './components/ModalChangePassword';
import { Button } from '../../components/Button';
import { AddressForm } from '../../components/AddressForm';

declare global {
  interface Window {
    daum: any;
  }
}

interface IAddressData {
  zonecode: string;
  address: string;
  addressDetail: string;
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
  const [addressData, setaddressData] = useState<IAddressData>({
    zonecode: '',
    address: '',
    addressDetail: '',
  });
  const {
    register,
    getValues,
    handleSubmit,
    errors,
    formState,
  } = useForm<IProfile>({ mode: 'onChange' });

  const setAddData = (data: IAddressData) => {
    console.log('-- setAddData')
    console.log(data)
  }

  const onSubmit = () => {
    const { name, birth, gender, email } = getValues();
    const data = {
      name, birth, gender, email,
    };
    console.log(data)
  }

  return (
    <div>
      <div className="container profile">
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
              <button type="button" className="btn able btn_change_password btn_mint m-0-import" onClick={() => setShoModal(true)}>비밀번호 변경</button>
            </div>
          </div>
          <div className="address_wrap input_wrap">
            <AddressForm setAddData={setAddData}/>
          </div>
          <Button
            canClick={formState.isValid}
            loading={false}
            actionText={"회원 정보 수정"}
          />
        </form>
      </div>

      <ModalChangePassword show={showModal} setShoModal={setShoModal}/>
    </div>
  )
}
