import { browser } from "webextension-polyfill-ts"
import React, { useState } from "react"
import Zoom from "@material-ui/core/Zoom"

import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"
import { ForgotPasswordForm } from "./ForgotPasswordForm"
import { AnimatedCheckmark } from "../../ui/AnimatedCheckmark"
import close from "../../../assets/close.png"
import logo from "../../../assets/logo.svg"
import "./LoginOrRegister.scss"

interface Props {
  onClose: () => void
}

enum Views {
  Login,
  Register,
  RegistrationSuccess,
  ForgotPassword,
  ForgotPasswordSuccess
}

export const LoginOrRegister: React.FC<Props> = (props: Props) => {
  const [isShowing, setIsShowing] = useState(true)
  const [activePage, setActivePage] = useState(Views.Register)

  const closePage = () => {
    setIsShowing(false)
    props.onClose()
  }

  const getForm = (subpage: Views): JSX.Element => {
    switch (subpage) {
      case Views.Login:
        return (
          <LoginForm
            onForgot={() => setActivePage(Views.ForgotPassword)}
            onSuccesfulLogin={() => closePage()}
          />
        )

      case Views.Register:
        return (
          <RegisterForm
            onSuccess={() => {
              setActivePage(Views.RegistrationSuccess)
              setTimeout(() => {
                closePage()
              }, 3000)
            }}
          />
        )

      case Views.RegistrationSuccess:
        return (
          <>
            <AnimatedCheckmark />
            <p className="text-success text-center m-t-20">
              <strong>{browser.i18n.getMessage("successfullyRegisteredAndLoggedIn")}</strong>
            </p>
          </>
        )

      case Views.ForgotPassword:
        return (
          <ForgotPasswordForm
            onSuccessfulPasswordReset={() => setActivePage(Views.ForgotPasswordSuccess)}
          />
        )

      case Views.ForgotPasswordSuccess:
        return (
          <>
            <AnimatedCheckmark />
            <p className="text-success text-center m-t-20">
              <strong>{browser.i18n.getMessage("sentLinkToResetPassword")}</strong>
            </p>
          </>
        )
    }
  }

  const getFooter = (subpage: Views): JSX.Element => {
    switch (subpage) {
      case Views.Login:
        return (
          <>
            {browser.i18n.getMessage("dontHaveAccount")}&nbsp;
            <button
              className="login-or-register__link button-link"
              onClick={() => setActivePage(Views.Register)}
            >
              <span className="text-gradient">{browser.i18n.getMessage("singUp")}</span>
            </button>
          </>
        )

      case Views.Register:
        return (
          <>
            {browser.i18n.getMessage("alreadyHaveAccount")}&nbsp;
            <button
              className="login-or-register__link button-link"
              onClick={() => setActivePage(Views.Login)}
            >
              <span className="text-gradient">{browser.i18n.getMessage("loginNow")}</span>
            </button>
          </>
        )

      case Views.RegistrationSuccess:
        return <div />

      case Views.ForgotPassword:
        return (
          <>
            <button
              className="login-or-register__link button-link"
              onClick={() => setActivePage(Views.Login)}
            >
              <span className="text-gradient">{browser.i18n.getMessage("goBackToLogin")}</span>
            </button>
          </>
        )

      case Views.ForgotPasswordSuccess:
        return <div />
    }
  }

  return (
    <Zoom in={isShowing}>
      <div className="login-or-register">
        <button className="login-or-register__close" onClick={closePage}>
          <img src={close} alt="close" title={browser.i18n.getMessage("close")}/>
        </button>
        <div className="login-or-register__content container">
          <img className="login-or-register__logo" 
            src={logo} 
            alt={browser.i18n.getMessage("logo")} 
            title={browser.i18n.getMessage("logo")} 
          />
          <div className="login-or-register__form">{getForm(activePage)}</div>
          <div className="login-or-register__footer">{getFooter(activePage)}</div>
        </div>
      </div>
    </Zoom>
  )
}
