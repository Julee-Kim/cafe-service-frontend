import React from 'react'
import { InputWrap } from '../../../components/InputWrap';

interface IModalChangePasswordProps {
  show: boolean;
  setShoModal: Function;
}

export const ModalChangePassword: React.FC<IModalChangePasswordProps> = ({ show, setShoModal }) => {
  const toggleModal = () => {
    setShoModal(!show);
  }

  return (
    <div className={show ? 'block' : 'hidden'}>
      <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:mx-4 sm:text-left w-full">
                  <h3 className="mt-3 mb-10 font-bold text-2xl leading-6" id="modal-title">
                    비밀번호 변경
                  </h3>
                  <div className="mt-2">
                    <form>
                      <div className="input_wrap">
                        {/* <InputWrap
                          name={'gender'}
                          labelName={'성별'}
                          register={register}
                          errors={errors}
                        /> */}
                        <label htmlFor="currentPassword">현재 비밀번호</label>
                          <input
                            type="password"
                            name="currentPassword"
                            id="currentPassword"
                          />
                        </div>
                        <div className="input_wrap">
                          <label htmlFor="newPassword">새 비밀번호</label>
                          <input
                            type="password"
                            name="newPassword"
                            id="newPassword"
                          />
                        </div>
                        <div className="input_wrap">
                          <label htmlFor="newPasswordCheck">새 비밀번호 확인</label>
                          <input
                            type="password"
                            name="newPasswordCheck"
                            id="newPasswordCheck"
                          />
                        </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                변경
              </button>
              <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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
