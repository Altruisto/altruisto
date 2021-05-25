import React from "react"
import "./Header.scss"
import logo from "../assets/logo.svg"
import { browser } from "webextension-polyfill-ts"

interface User {
  email: string
}

interface Props {
  user: User | null
  onLoginOrRegisterClick: () => void
}

export const Header: React.FC<Props> = (props: Props) => {
  return (
    <div className="header container">
      <img src={logo} alt="Logo" title="Logo" height="30" width="30" />
      <div className="header__login">
        {props.user ? (
          <div>
            <span className="text-emphasized">{browser.i18n.getMessage('headerLoggedInAs')}</span>
            <br />
            <span className="text-muted">{props.user.email}</span>
          </div>
        ) : (
          <div>
            <button className="button-link uppercase-link" onClick={props.onLoginOrRegisterClick}>
              {browser.i18n.getMessage('headerButtonLoginOrRegister')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
