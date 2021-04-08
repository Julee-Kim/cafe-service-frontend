import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <div className="header flex justify-center items-center">
      <h1 className="logo_wrap">
        <Link to="/menus" className="logo">
          Mycafe
        </Link>
      </h1>
      <ul className="menus">
        <li>
          <Link to="/menus">Menu</Link>
        </li>
        <li>
          <Link to="/stores">Store</Link>
        </li>
      </ul>
      <ul className="flex items-center ml-auto">
        <li>
          <Link to="/login">Sign in</Link>
        </li>
        <li className="signup_wrap">
          <Link to="/signup" className="block btn">Sign up</Link>
        </li>
      </ul>
    </div>
  )
}
