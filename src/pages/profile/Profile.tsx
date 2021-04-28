import { useState, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { InputWrap } from '../../components/InputWrap';
import { ModalChangePassword } from './components/ModalChangePassword';
import { Button } from '../../components/Button';
import { AddressForm } from '../../components/AddressForm';
import { ExitToApp } from '@material-ui/icons';
import { userInfoVar } from '../../apollo';
import { useHistory } from 'react-router';
import { SelectWrap } from '../../components/SelectWrap';
import { Genders } from '../../__generated__/globalTypes';
import { updateProfile, updateProfileVariables } from '../../__generated__/updateProfile';
import { useToasts } from 'react-toast-notifications';
import { checkError, initLoginInfo } from '../../commonJs';
import { LOCALSTORAGE_USERINFO } from '../../constants';

export const UPDATE_PROFILE = gql`
  mutation updateProfile($input: UpdateUserInput!) {
    updateProfile(input: $input) {
      success
      error
      user {
        name
        birth
        gender
        email
        phone
        zonecode
        address
        addressDetail
        cart {
          id
          items {
            menuId
            productName
            qty
            price
            img
          }
        }
      }
    }
  }
`;

declare global {
  interface Window {
    daum: any;
  }
}

interface IAddr { 
  address: string;
  addressDetail: string;
  zonecode: string;
}

interface IProfile {
  name: string;
  birth: string;
  gender: Genders;
  email: string;
  phone?: string | '';
  address?: string | '';
  addressDetail?: string | '';
  zonecode?: string | '';
}

export const Profile = () => {
  const history = useHistory();

  useEffect(() => {
    const userInfoValue = userInfoVar();

    if(userInfoValue) {
      setUserInfo({
        ...userInfo,
        ...userInfoValue
      });
    }
  }, []);

  const { addToast } = useToasts();
  const [showModal, setShoModal] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<IProfile>();
  const {
    register,
    getValues,
    handleSubmit,
    errors,
    setValue,
  } = useForm<IProfile>({
    mode: 'onChange',
    defaultValues: {
      name: userInfoVar().name,
      birth: userInfoVar().birth,
      gender: userInfoVar().gender,
      email: userInfoVar().email,
      phone: userInfoVar().phone,
      address: userInfoVar().address,
      addressDetail: userInfoVar().addressDetail,
      zonecode: userInfoVar().zonecode,
  }});

  const [ updateProfile, { loading: updateLoading }] = useMutation<updateProfile, updateProfileVariables>(
    UPDATE_PROFILE, {
      onCompleted(data) {
        const updatedUser = data.updateProfile.user;
        // apollo client 유저 정보 업데이트
        userInfoVar(updatedUser);
        // localStorage 유저 정보 업데이트
        localStorage.setItem(LOCALSTORAGE_USERINFO, JSON.stringify(updatedUser));

        addToast('정보가 수정되었습니다.', { appearance: 'success' });
      },
      onError(error: any) {
        checkError(error, history, 'profile');
      }
    });

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

  const onSubmit = () => {
    const {
      name,
      birth,
      gender,
      email,
      phone,
      address,
      addressDetail,
      zonecode,
    } = getValues();

    const data: IProfile = {
      name,
      birth,
      gender,
      email,
      phone,
      address,
      addressDetail,
      zonecode,
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
            />
            <InputWrap
              name={'birth'}
              labelName={'생년월일'}
              register={register}
              errors={errors}
            />
            <SelectWrap
              name={'gender'}
              labelName={'성별'}
              register={register}
              errors={errors}
              options={Genders}
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
            <InputWrap
              name={'phone'}
              labelName={'휴대전화'}
              required={false}
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
            </div>     */}
            <div className="password">
              <label htmlFor="currentPassword">비밀번호</label>
              <button type="button" className="btn able btn_change_password btn_mint m-0-import" onClick={() => setShoModal(true)}>비밀번호 변경</button>
            </div>
          </div>
          <div className="address_wrap input_wrap grid lg:grid-cols-2">
            <AddressForm
              register={register}
              errors={errors}
              setValue={fromChildSetValue}
            />
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
