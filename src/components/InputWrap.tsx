import React from 'react'

interface IInputWrapProps {
  required?: boolean;
  type?: string;
  name: string;
  labelName: string;
  register: any;
  errors: any;
  pattern?: any;
  errorMsg?: string;
}

export const InputWrap: React.FC<IInputWrapProps> = ({
  required = true,
  type = 'text',
  name,
  labelName,
  register,
  pattern,
  errors,
  errorMsg,
}) => {
  const refRegister = register({
    required,
    ...(pattern && ({ pattern })),
  });
  const errorsObj = errors[name];

  return (
    <div className="input_wrap">
      <label htmlFor={name} className={required ? 'required' : ''}>{labelName}</label>
      <input
        ref={refRegister}
        type={type}
        name={name}
        id={name}
        className={errorsObj ? 'error' : ''}
      />
      {errorsObj?.type === 'pattern' && (
        <span className="error_msg">{ errorMsg }</span>
      )}
    </div>
  )
}
