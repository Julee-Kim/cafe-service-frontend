import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import { getMenu, getMenuVariables } from '../../__generated__/getMenu';

const MENU_DETAIL = gql`
  query getMenu($input: GetMenuInput!) {
    getMenu(input: $input) {
      success
      error
      menu {
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
      }
    }
  }
`;

interface IMenuParams {
  id: string;
}

export const MenuDetail = () => {
  const [currentWidth, setcurrentWidth] = useState(window.innerWidth); // device width(<colgroup> show or hide)

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
  console.log(data)

  return (
    <div className="container">
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
        </div>
          </>      
        )}
      </div>
    </div>
  )
}
