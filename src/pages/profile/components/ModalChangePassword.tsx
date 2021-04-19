import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { InputWrap } from '../../../components/InputWrap';

interface IModalChangePasswordProps {
  show: boolean;
  setShoModal: Function;
}

interface IChangePassword {
  currentPassword: string;
  newPassword: string;
  newPasswordCheck: string;
}

export const ModalChangePassword: React.FC<IModalChangePasswordProps> = ({ show, setShoModal }) => {
  const toggleModal = () => setShoModal(!show);
  const {
    register,
    getValues,
    handleSubmit,
    errors,
    formState,
  } = useForm<IChangePassword>({ mode: 'onChange' });

  const onSubmit = () => {
    console.log('onSubmit')
    const { currentPassword, newPassword, newPasswordCheck } = getValues();
    const data = {
      currentPassword, newPassword, newPasswordCheck
    };

    // 새 비밀번호와 새 비밀번호 확인이 일치하는지 확인
    if (newPassword !== newPasswordCheck) {
      alert('새로운 비밀번호가 일치하지 않습니다.');
      return false;
    }

    console.log(data);
  }

  return (
    <div className={`${show ? 'block' : 'hidden'} modal_change_password`}>
      <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="modal_wrap flex items-end justify-center min-h-screen pt-4 px-4 pb-20 sm:block sm:p-0 text-center">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <div className="modal_inner inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 sm:mt-0 sm:mx-4 sm:text-left w-full">
                  <h3 className="mt-3 mb-10 font-bold text-2xl leading-6" id="modal-title">
                    비밀번호 변경
                  </h3>
                  <div className="mt-2">
                    <form>
                      <InputWrap
                        type={'password'}
                        name={'currentPassword'}
                        labelName={'현재 비밀번호'}
                        register={register}
                        errors={errors}
                      />
                      <InputWrap
                        type={'password'}
                        name={'newPassword'}
                        labelName={'새 비밀번호'}
                        register={register}
                        errors={errors}
                      />
                      <InputWrap
                        type={'password'}
                        name={'newPasswordCheck'}
                        labelName={'새 비밀번호 확인'}
                        register={register}
                        errors={errors}
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="btn_wrap bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className={`btn_change_pw able w-full inline-flex justify-center rounded-md px-4 py-2 sm:ml-3 sm:w-auto sm:text-sm mt-0
                  ${formState.isValid ? '' : 'disable'}
                `}
                style={{marginTop: 0}}
                onClick={handleSubmit(onSubmit)}
              >
                변경
              </button>
              <button type="button"
                className="btn_modal_cancel w-full inline-flex justify-center rounded-md px-4 py-2 sm:ml-3 sm:w-auto sm:text-sm mt-0"
                onClick={toggleModal}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
