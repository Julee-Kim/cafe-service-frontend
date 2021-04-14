import React, { useState, useEffect } from 'react'
import { CartListTable } from './components/CartListTable'
import { CartListUl } from './components/CartListUl'
import { OrderStep } from './components/OrderStep'

export const Cart = () => {
  useEffect(() => {
    setWindowWidth(window.innerWidth);

    window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth);
    });
  }, []);

  const [windowWidth, setWindowWidth] = useState<number>(0);

  return (
    <div className="container order">
      <h2>장바구니</h2>

      <OrderStep />
      
      <div className="table_wrap">
        {windowWidth < 768 ? <CartListUl /> : <CartListTable />}
      </div>
    </div>
  )
}
