import React, { useState } from "react"
import Zoom from "@material-ui/core/Zoom"
// import classnames from "classnames";

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
              <strong>
                You have been successfully registered and logged in. Thank you!
              </strong>
            </p>
          </>
        )

      case Views.ForgotPassword:
        return (
          <ForgotPasswordForm
            onSuccessfulPasswordReset={() =>
              setActivePage(Views.ForgotPasswordSuccess)
            }
          />
        )

      case Views.ForgotPasswordSuccess:
        return (
          <>
            <AnimatedCheckmark />
            <p className="text-success text-center m-t-20">
              <strong>
                We've sent you an email with a link to reset your password.
              </strong>
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
            Don't have an account?&nbsp;
            <button
              className="button-link"
              onClick={() => setActivePage(Views.Register)}
            >
              <span className="text-gradient">Sign up now.</span>
            </button>
          </>
        )

      case Views.Register:
        return (
          <>
            Already have an account?&nbsp;
            <button
              className="button-link"
              onClick={() => setActivePage(Views.Login)}
            >
              <span className="text-gradient">Login now.</span>
            </button>
          </>
        )

      case Views.RegistrationSuccess:
        return <div />

      case Views.ForgotPassword:
        return (
          <>
            <button
              className="button-link"
              onClick={() => setActivePage(Views.Login)}
            >
              <span className="text-gradient">Go back to login form.</span>
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
          <img src={close} alt="close" title="close" />
        </button>
        <div className="login-or-register__content container">
          <img
            className="login-or-register__logo"
            src={logo}
            alt="Logo"
            title="Logo"
          />
          {/* <div className="login-or-register__title">
            <h1>Help others</h1>
            <h1 className="text-gradient">with just one click!</h1>
          </div> */}
          <div className="login-or-register__form">{getForm(activePage)}</div>
          <div className="login-or-register__footer">
            {getFooter(activePage)}
          </div>
        </div>
      </div>
    </Zoom>
  )
}
