import React from 'react'
import { Link } from 'react-router-dom'

export const MenuList = () => {
  return (
    <>
      <h2>메뉴</h2>
      <div className="category_wrap">
        <ul>
          <li className="active">All</li>
          <li>Coffee</li>
          <li>Tea</li>
          <li>Cake</li>
        </ul>
      </div>
      
      <div className="menus">
        <div className="menus_area">
          <h3 className="menus_title">Coffee</h3>
          <ul className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <li>
              <Link to="">
                <div className="img_wrap">
                  <img src="https://image.istarbucks.co.kr/upload/store/skuimg/2019/09/[9200000002487]_20190919181354811.jpg" alt="" />
                </div>
                <p className="menu_name">나이트로 바닐라 크림</p>
              </Link>
            </li>
            <li>
              <Link to="">
                <div className="img_wrap">
                  <img src="https://image.istarbucks.co.kr/upload/store/skuimg/2019/09/[9200000002487]_20190919181354811.jpg" alt="" />
                </div>
                <p className="menu_name">나이트로 바닐라 크림</p>
              </Link>
            </li>
            <li>
              <Link to="">
                <div className="img_wrap">
                  <img src="https://image.istarbucks.co.kr/upload/store/skuimg/2019/09/[9200000002487]_20190919181354811.jpg" alt="" />
                </div>
                <p className="menu_name">나이트로 바닐라 크림</p>
              </Link>
            </li>
            <li>
              <Link to="">
                <div className="img_wrap">
                  <img src="https://image.istarbucks.co.kr/upload/store/skuimg/2019/09/[9200000002487]_20190919181354811.jpg" alt="" />
                </div>
                <p className="menu_name">나이트로 바닐라 크림</p>
              </Link>
            </li>
            <li>
              <Link to="">
                <div className="img_wrap">
                  <img src="https://image.istarbucks.co.kr/upload/store/skuimg/2019/09/[9200000002487]_20190919181354811.jpg" alt="" />
                </div>
                <p className="menu_name">나이트로 바닐라 크림</p>
              </Link>
            </li>
            <li>
              <Link to="">
                <div className="img_wrap">
                  <img src="https://image.istarbucks.co.kr/upload/store/skuimg/2019/09/[9200000002487]_20190919181354811.jpg" alt="" />
                </div>
                <p className="menu_name">나이트로 바닐라 크림</p>
              </Link>
            </li>
            <li>
              <Link to="">
                <div className="img_wrap">
                  <img src="https://image.istarbucks.co.kr/upload/store/skuimg/2019/09/[9200000002487]_20190919181354811.jpg" alt="" />
                </div>
                <p className="menu_name">나이트로 바닐라 크림</p>
              </Link>
            </li>
            <li>
              <Link to="">
                <div className="img_wrap">
                  <img src="https://image.istarbucks.co.kr/upload/store/skuimg/2019/09/[9200000002487]_20190919181354811.jpg" alt="" />
                </div>
                <p className="menu_name">나이트로 바닐라 크림</p>
              </Link>
            </li>
            <li>
              <Link to="">
                <div className="img_wrap">
                  <img src="https://image.istarbucks.co.kr/upload/store/skuimg/2019/09/[9200000002487]_20190919181354811.jpg" alt="" />
                </div>
                <p className="menu_name">나이트로 바닐라 크림</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>  
    </>
  )
}
