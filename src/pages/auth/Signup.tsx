import { useMutation } from '@apollo/client';
import gql from 'graphql-tag'
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom'
import { InputWrap } from '../../components/InputWrap';
import { SelectWrap } from '../../components/SelectWrap';
import { Genders } from '../../__generated__/globalTypes';
import { useToasts } from 'react-toast-notifications';
import { signup, signupVariables } from '../../__generated__/signup';
import { Button } from '../../components/Button';

export const SIGNUP = gql`
  mutation signup($createAccountInput: CreateAccountInput!) {
    createAccount (input: $createAccountInput) {
      success
      error
    }
  }
`;

interface ISignupForm {
  name: string;
  birth: string;
  gender: Genders;
  email: string;
  password: string;
  passwordCheck: string;
}

export const Signup = () => {
  const history = useHistory();
  const { addToast } = useToasts();
  const { register, getValues, errors, handleSubmit, formState } = useForm<ISignupForm>({mode: 'onChange'});

  const [ createAccount, { loading } ] = useMutation<signup, signupVariables>(
    SIGNUP,
    {
      onCompleted(data: signup) {
        const { createAccount: { success } } = data;
        if (success) {
          alert('로그인해 주세요.');
          history.push('/login');
        }
      }
    }
  );

  const signup = () => {
    const { name, birth, gender, email, password, passwordCheck } = getValues();

    // 비밀번호와 비밀번호 확인이 일치하는지 체크
    if(password !== passwordCheck) {
      addToast('비밀번호를 확인해주세요.', { appearance: 'warning' });
      return false;
    }

    if(!loading) {
      createAccount({
        variables: {
          createAccountInput: { name, birth, gender, email, password }
        }
      });
    }
  }

  return (
    <div className="container">
      <div className="flex justify-center items-center">
        <div className="w-full max-w-screen-sm auth_wrap">
          <h2>Sign in</h2>
            <form onSubmit={handleSubmit(signup)}>
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
                type={'password'}
                name={'password'}
                labelName={'비밀번호'}
                register={register}
                errors={errors}
              />
              <InputWrap
                type={'password'}
                name={'passwordCheck'}
                labelName={'비밀번호 확인'}
                register={register}
                errors={errors}
              />
              <Button
                canClick={formState.isValid}
                loading={loading}
                actionText={"회원가입"}
              />
            </form>
          <div className="text-center p-4 text-sm">
            <span className="text-gray">계정이 있으세요?</span>
            <Link to="/login" className="text-purple p-1">로그인</Link>
          </div>
        </div>
      </div>
    </div>  
  )
}
