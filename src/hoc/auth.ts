import { useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useEffect, useState } from 'react';
import { isLoggedInVar, orderVar } from "../apollo";
import { checkError } from "../commonJs";

export const AUTH_USER = gql`
  query authUser {
    authUser {
      success
      error
    }
  }
`;

export function AuthCheck (ComposedComponent: any, redirectPath: string) {
  const AuthCheck = (props: any) => {
    const [isAuth, setIsAuth] = useState(false);
    const [ callAuthUser ] = useLazyQuery(AUTH_USER, {
      fetchPolicy: "no-cache",
      onCompleted() {
        // 주문결제 페이지(Order) 또는 주문결제 페이지(CompleteOrder)에서 orderVar()가 없다면 장바구니 페이지로 이동
        if(ComposedComponent.type.name === 'Order' || ComposedComponent.type.name === 'CompleteOrder') {
          if(!orderVar()) {
            alert('장바구니에서 메뉴 선택 후 주문해주세요.')
            props.history.push('/cart');
            return;
          }
        }

        setIsAuth(true);
      },
      onError(error) {
        checkError(error, props.history, redirectPath)
      }
    });

    useEffect(() => {
      callAuthUser();
    }, []);

    return isAuth ? ComposedComponent : null;
  }
  return AuthCheck;
}

export function LoggedInCheck (ComposedComponent: any, redirectComponent: any) {
  const LoggedInCheck = (props: any) => {
    if(isLoggedInVar()) props.history.push('/menus');
    return isLoggedInVar() ? redirectComponent : ComposedComponent;
  }
  return LoggedInCheck;
}


