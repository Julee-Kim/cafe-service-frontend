import React from 'react';

interface IButtonProps {
  loading?: boolean;
  actionText: string;
  customClass?: string;
}

export const Button: React.FC<IButtonProps> = ({loading, actionText, customClass = ''}) => (
  <button
    role="button"
    type="submit"
    className={`btn
      ${customClass}
    `}
  >{loading ? "Loading" : actionText}</button>
);