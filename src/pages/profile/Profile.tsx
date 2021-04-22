import React, { useState, useEffect } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import DaumPostcode from 'react-daum-postcode';
import { useForm } from 'react-hook-form';
import { InputWrap } from '../../components/InputWrap';
import { ModalChangePassword } from './components/ModalChangePassword';
import { Button } from '../../components/Button';
import { AddressForm } from '../../components/AddressForm';
import { ExitToApp } from '@material-ui/icons';
import { isLoggedInVar, tokenVar, userInfoVar } from '../../apollo';
import { useHistory } from 'react-router';

import { LOCALSTORAGE_TOKEN } from '../../constants';
import { SelectWrap } from '../../components/SelectWrap';
import { Genders } from '../../__generated__/globalTypes';
// import { getProfile } from '../../__generated__/getProfile';
import { updateProfile, updateProfileVariables } from '../../__generated__/updateProfile';
import { useToasts } from 'react-toast-notifications';
import { checkError, initLoginInfo } from '../../commonJs';

// export const GET_PROFILE = gql`
//   query getProfile {
//     getProfile {
//       id
//       name
//       birth
//       gender
//       email
//       phone
//       address
//       addressDetail
//       zonecode, 
//       cart {
//         id
//       }
//     }
//   }
// `;

export const UPDATE_PROFILE = gql`
  mutation updateProfile($input: UpdateUserInput!) {
    updateProfile(input: $input) {
      success
      error
    }
  }
`;

declare global {
  interface Window {
    daum: any;
  }
}

interface IAddressData {
  zonecode: string | null;
  address: string | null;
  addressDetail: string | null;
}

interface IProfile {
  name: string;
  birth: string;
  gender: Genders;
  email: string;
  phone?: string;
  address?: string | null;
  addressDetail?: string | null;
  zonecode?: string | null;
}

export const Profile = () => {
  useEffect(() => {
    const userInfoValue = userInfoVar();

    setUserInfo({
      ...userInfo,
      ...userInfoValue
    });

    const obj: IAddressData = {
      zonecode: userInfoValue.zonecode,
      address: userInfoValue.address,
      addressDetail: userInfoValue.addressDetail,
    }

    setAddData(obj);
  }, []);

  const history = useHistory();
  const { addToast } = useToasts();
  const [showModal, setShoModal] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<IProfile>();
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
  } = useForm<IProfile>({ mode: 'onChange', defaultValues: {} });

  const [ updateProfile, { loading: updateLoading, data: updateData }] = useMutation<updateProfile, updateProfileVariables>(
    UPDATE_PROFILE, {
      onCompleted() {
        addToast('정보가 수정되었습니다.', { appearance: 'success' });
      },
      onError(error: any) {
        checkError(error, history, 'profile');
      }
    });

  const setAddData = (data: IAddressData) => {
    setaddressData({
      ...addressData,
      ...data
    });
  }

  const onSubmit = () => {
    const { name, birth, gender, email, phone } = getValues();

    const data: IProfile = {
      name,
      birth,
      gender,
      email,
      phone,
      address: addressData.address,
      addressDetail: addressData.addressDetail,
      zonecode: addressData.zonecode,
    }
    
    updateProfile({
      variables: {
        input: data
      }
    });
  }

  const logout = () => {
    // 로그인, 유저 정보 초기화
    initLoginInfo();
    history.push('/menus');
  }

  return (
    <div>
      <div className="container profile">
        <div className="flex justify-between items-top">
          <h2>내 정보</h2>
          <button
            type="button"
            className="btn btn_logout btn_auto"
            onClick={logout}
          >
            <ExitToApp className="ico ico_logout" />
            로그 아웃
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            <InputWrap
              name={'name'}
              labelName={'이름'}
              register={register}
              errors={errors}
              value={userInfo?.name}
            />
            <InputWrap
              name={'birth'}
              labelName={'생년월일'}
              register={register}
              errors={errors}
              value={userInfo?.birth}
            />
            <SelectWrap
              name={'gender'}
              labelName={'성별'}
              register={register}
              errors={errors}
              options={Genders}
              value={userInfo?.gender}
            />
            <InputWrap
              type={'email'}
              name={'email'}
              labelName={'이메일'}
              register={register}
              pattern={/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/}
              errors={errors}
              errorMsg={'잘못된 이메일 형식입니다.'}
              value={userInfo?.email}
            />
            <InputWrap
              name={'phone'}
              labelName={'휴대전화'}
              required={false}
              register={register}
              errors={errors}
              value={userInfo?.phone}
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
            </div>     */}
            <div className="password">
              <label htmlFor="currentPassword">비밀번호</label>
              <button type="button" className="btn able btn_change_password btn_mint m-0-import" onClick={() => setShoModal(true)}>비밀번호 변경</button>
            </div>
          </div>
          <div className="address_wrap input_wrap grid lg:grid-cols-2">
            <AddressForm setAddData={setAddData} addressInfoProps={addressData}/>
          </div>
          <Button
            loading={updateLoading}
            actionText={"회원 정보 수정"}
          />
        </form>
      </div>

      <ModalChangePassword show={showModal} setShoModal={setShoModal}/>
    </div>
  )
}
