import React from 'react'

interface IOrderStepProps {
  step: number;
}

export const OrderStep: React.FC<IOrderStepProps> = ({step}) => {
  return (
    <div className="order_step">
      <span className={`step ${(step === 1) && 'active'}`}><strong>01 장바구니</strong></span>
      <span className={`step ${(step === 2) && 'active'}`}><strong>02 주문결제</strong></span>
      <span className={`step ${(step === 3) && 'active'}`}><strong>03 주문완료</strong></span>
    </div>
  )
}
