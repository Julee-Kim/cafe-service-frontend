import { isLoggedInVar, tokenVar, userInfoVar } from "../apollo";
import { LOCALSTORAGE_TOKEN, LOCALSTORAGE_USERINFO } from "../constants";

export const checkError = (error: any, history?: any, returnPath?: string) => {
  // 로그인, 유저 정보 초기화
  initLoginInfo();
  
  if (error.message === 'Forbidden resource' && returnPath) { 
    alert('로그인으로 이동합니다.');
    history.push(`/login?return=${returnPath}`);
  } else {
    console.log(error.message);
  }
}

// 로그인, 유저 정보 초기화
export const initLoginInfo = () => {
  localStorage.removeItem(LOCALSTORAGE_TOKEN);
  localStorage.removeItem(LOCALSTORAGE_USERINFO);
  tokenVar('');
  isLoggedInVar(false);
  userInfoVar('');
}