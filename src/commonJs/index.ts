import { isLoggedInVar, tokenVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../constants";

export const checkError = (error: any, history?: any, returnPath?: string) => {
  localStorage.setItem(LOCALSTORAGE_TOKEN, '');
  tokenVar('');
  isLoggedInVar(false);
  
  if (error.message === 'Forbidden resource' && returnPath) { 
    alert('로그인으로 이동합니다.');
    history.push(`/login?return=${returnPath}`);
  } else {
    alert(error.message);
  }
}