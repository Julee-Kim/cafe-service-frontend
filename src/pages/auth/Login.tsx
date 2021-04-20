import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import { isLoggedInVar, tokenVar } from '../../apollo'
import { Button } from '../../components/Button'
import { InputWrap } from '../../components/InputWrap'
import { LOCALSTORAGE_TOKEN } from '../../constants'
import { login, loginVariables } from '../../__generated__/login'

export const LOGIN = gql`
  mutation login($loginInput: LoginInput!) {
    login(input: $loginInput) {
      success
      error
      token
    }
  }
`;

interface ILoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const history = useHistory();
  const { addToast } = useToasts();
  const { register, getValues, errors, handleSubmit } = useForm<ILoginForm>({mode: 'onChange'});

  const [ login, { loading }] = useMutation<login, loginVariables>(
    LOGIN, {
      onCompleted(data: login) {
        const { login: { success, token, error } } = data;
        if(success && token) {
          localStorage.setItem(LOCALSTORAGE_TOKEN, token);
          tokenVar(token);
          isLoggedInVar(true);

          const returnPath = window.location.search.split('=')[1];
          if (returnPath) {
            history.push(returnPath);
          } else {
            history.push('/menus');
          }
        } else {
          addToast(error, { appearance: 'error' });
        }
      }
    }
  );

  const onSubmitLogin = () => {
    if(!loading) {
      const { email, password } = getValues();

      login({
        variables: {
          loginInput: { email, password }
        }
      });
    }
  }

  return (
    <div className="container">
      <div className="flex justify-center items-center">
        <div className="w-full max-w-screen-sm auth_wrap login_wrap">
          <h2>로그인</h2>
          <form onSubmit={handleSubmit(onSubmitLogin)}>
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
            <Button
              loading={loading}
              actionText={"로그인"}
            />
          </form>
          <div className="text-center p-4 text-sm">
            <span className="text-black">계정이 없으세요?</span>
            <Link to="/signup" className="text-purple p-1">회원 가입</Link>
          </div>
        </div>
      </div> 
    </div> 
  )
}
