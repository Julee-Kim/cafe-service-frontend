import React from 'react';

interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

export const Button: React.FC<IButtonProps> = ({canClick, loading, actionText}) => (
  <button
    role="button"
    className={`btn
      ${
        canClick
          ? "able"
          : "disable"
      }
    `}
    disabled={canClick ? false : true}
  >{loading ? "Loading" : actionText}</button>
);