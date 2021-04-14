import React from 'react'

export const OrderStep: React.FC = () => {
  return (
    <div className="order_step">
      <span className="step active"><strong>01 장바구니</strong></span>
      <span className="step"><strong>02 주문결제</strong></span>
      <span className="step"><strong>03 주문완료</strong></span>
    </div>
  )
}
