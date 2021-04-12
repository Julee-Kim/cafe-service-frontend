import React from 'react'

export const MenuDetail = () => {
  return (
    <>
      <div className="grid grid-cols-8 xs:gap-0 md:gap-8 lg:gap-12">
        <div className="menu_img xs:col-span-8 lg:col-span-3 md:col-span-4">
          <img src="https://image.istarbucks.co.kr/upload/store/skuimg/2019/09/[9200000002487]_20190919181354811.jpg" alt="" />
        </div>
        <div className="menu_info xs:col-span-8 lg:col-span-5 md:col-span-4">
          <div className="menu_title_wrap">
            <h2>자바 칩 프라푸치노</h2>
            <small>Java Chip Frappuccino</small>
            <p>
              신선한 에스프레소 샷에 풍부한 휘핑크림을 얹은 커피 음료로서, 뜨거운 커피의 맛과 차갑고 달콤한 생크림의 맛을 같이 즐길 수 있는 커피 음료
            </p>
          </div>

          <div className="nutrition">
            <div className="nutrition_title_wrap">
              <h4>제품 영양 정보</h4>
              <span className="size">355ml</span>
            </div>
            <div className="nutrition_table_wrap">
              <ul>
                <li>
                  <label>1회 제공량(kcal)</label><span>240</span></li>
                <li>
                  <label>포화지방(g)</label><span>10</span></li>
                <li>
                  <label>단백질(g)</label><span>4</span></li>
              </ul>
              <ul>
                <li>
                  <label>나트륨(mg)</label><span>70</span></li>
                <li>
                  <label>당류(g)</label><span>18</span></li>
                <li>
                  <label>카페인(mg)</label><span>150</span></li>
              </ul>
            </div>
            <p className="desc">
              최고의 에스프레소 머신에서 추출한 리저브의 에스프레소 샷의 깊은 풍미와
              뉴질랜드산 프리미엄 바닐라 아이스크림이 어우러진 리저브 클래식 아포가토입니다.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
