import React from 'react'
import { Link } from 'react-router-dom'
import { isLoggedInVar } from '../apollo'
import { LocalMall, Person } from '@material-ui/icons';

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
        {isLoggedInVar()
          ? (
            <>
              <li>
                <Link to="/cart" className="ico_wrap">
                  <LocalMall className="ico ico_cart"  />
                </Link>
              </li>
              <li>
                <Link to="/profile" className="ico_wrap">
                  <Person className="ico ico_user" />
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Sign in</Link>
              </li>
              <li className="signup_wrap">
                <Link to="/signup" className="block btn">Sign up</Link>
              </li>
            </>
          )
        }
      </ul>
    </div>
  )
}
