import React from 'react'
import { Link } from 'react-router-dom'

export const Signup = () => {
  return (
    <div className="h-full flex justify-center items-center">
      <div className="w-full max-w-screen-sm auth_wrap">
        <h2>Sign in</h2>
        <form>
          <div className="input_wrap">
            <label htmlFor="name">Name</label>
            <input
              name="name"
              id="name"
            />
          </div>
          <div className="input_wrap">
            <label htmlFor="birth">Birth</label>
            <input
              name="birth"
              id="birth"
            />
          </div>
          <div className="input_wrap">
            <label htmlFor="gender">Gender</label>
            <select name="gender" id="gender">
              <option value="">- select option - </option>
              <option value="F">여성</option>
              <option value="M">남성</option>
            </select>
          </div>
          <div className="input_wrap">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
            />
          </div>
          <div className="input_wrap">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
            />
          </div>
          <button className="btn">회원가입</button>
        </form>
        <div className="text-center p-4 text-sm">
          <span className="text-gray">계정이 있으세요?</span>
          <Link to="/login" className="text-purple p-1">로그인</Link>
        </div>
      </div>
    </div>
  )
}
