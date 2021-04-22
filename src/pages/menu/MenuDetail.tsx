import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import { getMenu, getMenuVariables } from '../../__generated__/getMenu';
import { createCartItem, createCartItemVariables } from '../../__generated__/createCartItem';
import { isLoggedInVar } from '../../apollo';
import { useToasts } from 'react-toast-notifications';
import { LOCALSTORAGE_CART } from '../../constants'

const MENU_DETAIL = gql`
  query getMenu($input: GetMenuInput!) {
    getMenu(input: $input) {
      success
      error
      menu {
        id
        productName
        productName_en
        content
        recommend
        standard
        kcal
        satFAT
        protein
        sodium
        sugars
        caffeine
        img
        price
      }
    }
  }
`;

const ADD_CART_ITEM = gql`
  mutation createCartItem($input: CreateCartItemInput!) {
    createCartItem(input: $input) {
      success
      error
    }
  }
`;

interface IMenuParams {
  id: string;
}

export const MenuDetail = () => {
  const { addToast } = useToasts();
  const [currentWidth, setcurrentWidth] = useState<number>(window.innerWidth); // device width(<colgroup> show or hide)

  useEffect(() => {
    window.addEventListener('resize', () => {
      setcurrentWidth(window.innerWidth)
    });
  }, [currentWidth]);

  const params = useParams<IMenuParams>();
  const { data, loading } = useQuery<getMenu, getMenuVariables>(MENU_DETAIL, {
    variables: {
      input: {
        menuId: +params.id
      }
    }
  });

  const [ callAddCart ] = useMutation<createCartItem, createCartItemVariables>(ADD_CART_ITEM, {
    onCompleted(data) {
      const { createCartItem: { success } } = data;
      if(success) {
        addToast('장바구니에 추가되었습니다.', { appearance: 'success' });
      }
    },
    onError(error) {
      console.log(error);
      addToast('장바구니에 추가되지 않았습니다.', { appearance: 'error' });
    }
  });

  const addCart = () => {
    // 로그인 여부 확인 
    if(isLoggedInVar()) {
      // 로그인 했다면 callAddCart()
      if(!data?.getMenu.menu?.id) return;
      callAddCart({
        variables: {
          input: {
            menuId: data?.getMenu.menu?.id,
            qty: 1
          }
        }
      });
    } else {
      // 로그인 안했으면 로컬 스토리지에 저장
      // 로컬스토리지에 카트가 있는지 확인
      const detailMenu = data?.getMenu.menu;
      if(!localStorage.getItem(LOCALSTORAGE_CART)) {
        const cart = [{
          menuId: detailMenu?.id,
          productName: detailMenu?.productName,
          img: detailMenu?.img,
          qty: 1,
          price: detailMenu?.price,
        }]
        localStorage.setItem(LOCALSTORAGE_CART, JSON.stringify(cart));
        addToast('장바구니에 추가되었습니다.', { appearance: 'success' });
      } else {
        const localStorageCart = localStorage.getItem(LOCALSTORAGE_CART);
        const cart = localStorageCart ? JSON.parse(localStorageCart) : [];
        let isNewItem = true; // 새로 추가되는 메뉴인지 여부

        cart?.forEach((item:any) => {
          // 카트에 이미 메뉴가 담겨있으면 수량만 증가
          if(item.id === detailMenu?.id) {
            item.qty++;
            isNewItem = false;
          }
        });

        // 카트에 담겨있지 않은 메뉴면 메뉴아이디와 수량 추가
        if(isNewItem) {
          cart.push({
            menuId: detailMenu?.id,
            productName: detailMenu?.productName,
            img: detailMenu?.img,
            qty: 1,
            price: detailMenu?.price,
          });
        }

        localStorage.setItem(LOCALSTORAGE_CART, JSON.stringify(cart));
        addToast('장바구니에 추가되었습니다.', { appearance: 'success' });
      }
    }
  }

  return (
    <div className="container relative">
      <div className="grid grid-cols-8 xs:gap-0 md:gap-8 lg:gap-12">
        {!loading && (
          <>
            <div className="menu_img xs:col-span-8 lg:col-span-3 md:col-span-4">
              <img src={data?.getMenu.menu?.img} alt={data?.getMenu.menu?.productName} />
            </div>
            <div className="menu_info xs:col-span-8 lg:col-span-5 md:col-span-4">
              <div className="menu_title_wrap">
                <h2>{data?.getMenu.menu?.productName}</h2>
                <small>{data?.getMenu.menu?.productName_en}</small>
                <p>{data?.getMenu.menu?.recommend}</p>
              </div>

              <div className="nutrition">
                <div className="nutrition_title_wrap">
                  <h4>제품 영양 정보</h4>
                  <span className="size">{data?.getMenu.menu?.standard}ml</span>
                </div>
                <div className="nutrition_table_wrap">
                  <table className="nutrition_table">
                    {currentWidth >= 768 && (
                      <colgroup>
                        <col width='25%;'/>
                        <col width='25%;'/>
                        <col width='25%;'/>
                        <col width='25%;'/>
                      </colgroup>
                    )}
                    <tbody>
                      <tr>
                        <th>1회 제공량(kcal)</th>
                        <td>{data?.getMenu.menu?.kcal}</td>
                        <th>나트륨(mg)</th>
                        <td>{data?.getMenu.menu?.sodium}</td>
                      </tr>
                      <tr>
                        <th>포화지방(g)</th>
                        <td>{data?.getMenu.menu?.satFAT}</td>
                        <th>당류(g)</th>
                        <td>{data?.getMenu.menu?.sugars}</td>
                      </tr>
                      <tr>
                        <th>단백질(g)</th>
                        <td>{data?.getMenu.menu?.protein}</td>
                        <th>카페인(mg)</th>
                        <td>{data?.getMenu.menu?.caffeine}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="desc">{data?.getMenu.menu?.content}</p>
              </div>
              <div className="btn_wrap text-right">
                <button
                  type="button"
                  className="btn btn_purple btn_add_cart inline-block"
                  onClick={addCart}
                >장바구니 담기</button>
              </div>    
            </div>
          </>      
        )}
      </div>
    </div>
  )
}
