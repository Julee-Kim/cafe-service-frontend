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
          <Link to="/menus">메뉴</Link>
        </li>
        <li>
          <Link to="/stores">매장</Link>
        </li>
      </ul>
      <ul className="flex items-center ml-auto">
        {isLoggedInVar()
          ? (
            <>
              <li>
                <Link to="/profile" className="ico_wrap">
                  <Person className="ico ico_user" />
                </Link>
              </li>
            </>
          ) : (
            <li className="btn_login_wrap">
              <Link to="/login" className="btn_login">로그인</Link>
            </li>
          )
        }
        <li>
          <Link to="/cart" className="ico_wrap">
            <LocalMall className="ico ico_cart"  />
          </Link>
        </li>
      </ul>
    </div>
  )
}
