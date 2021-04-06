import React from 'react'
import { Link } from 'react-router-dom'

export const Login = () => {
  return (
    <div className="h-full flex justify-center items-center">
      <div className="w-full max-w-screen-sm auth_wrap">
        <h2>Sign in</h2>
        <form>
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
          <button className="btn">로그인</button>
        </form>
        <div className="text-center p-4 text-sm">
          <span className="text-black">계정이 없으세요?</span>
          <Link to="/signup" className="text-purple p-1">회원 가입</Link>
        </div>
      </div>
    </div>
  )
}
