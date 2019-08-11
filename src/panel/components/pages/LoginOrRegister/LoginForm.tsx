import React, { useState } from "react"
import { Formik, Field, Form, ErrorMessage } from "formik"
import { Alert } from "../../ui/Alert"
import { Loader } from "../../ui/Loader"
import { useAuthContext } from "../../../common/auth"
import "./LoginForm.scss"

type Props = {
  onForgot?: () => void
  onSuccesfulLogin?: () => void
}

type ValidationErors = {
  email?: string
  password?: string
}

const LoginForm: React.FC<Props> = (props: Props) => {
  const [failureMessage, setFailureMessage] = useState("")
  const auth = useAuthContext()

  return (
    <>
      {failureMessage && <Alert message={failureMessage} className="m-b-20" />}
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, actions) => {
          auth
            .login(values.email, values.password)
            .then(() => {
              props.onSuccesfulLogin && props.onSuccesfulLogin()
            })
            .catch(error => {
              if (
                error.response &&
                error.response.data &&
                error.response.data.message
              ) {
                setFailureMessage(String(error.response.data.message))
              } else {
                setFailureMessage("Something went wrong, please try again.")
              }
              console.warn(error)
              actions.setSubmitting(false)
            })
        }}
        validate={values => {
          let errors: ValidationErors = {}
          if (!values.email) {
            errors.email = "This field is required"
          }

          const regexp = /\S+@\S+\.\S+/
          if (!regexp.test(String(values.email).toLowerCase())) {
            errors.email = "Provided email address is not valid"
          }

          if (!values.password) {
            errors.password = "This field is required"
          }

          return errors
        }}
        render={({ isSubmitting }) => (
          <Form className="login-form" noValidate>
            <div className="field">
              <label className="field__label" htmlFor="email">
                Email
              </label>
              <Field
                className="field__input"
                type="email"
                name="email"
                id="email"
                placeholder="Your email"
              />
              <div className="field__error-message">
                <ErrorMessage name="email" component="span" />
              </div>
            </div>
            <div className="field">
              <label className="field__label" htmlFor="password">
                Password
              </label>
              <span className="field__appendix">
                <button
                  className="button-link login-form__forgot-password"
                  type="button"
                  onClick={() => {
                    props.onForgot && props.onForgot()
                  }}
                >
                  Forgot
                </button>
              </span>
              <Field
                className="field__input"
                type="password"
                name="password"
                id="password"
                placeholder="Your password"
              />
              <div className="field__error-message">
                <ErrorMessage name="password" component="span" />
              </div>
            </div>
            <button type="submit" className="button login-form__button">
              {isSubmitting ? <Loader /> : "Login"}
            </button>
          </Form>
        )}
      />
    </>
  )
}

export default LoginForm
