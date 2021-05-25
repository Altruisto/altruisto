import { browser } from "webextension-polyfill-ts"
import React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { Loader } from "../../ui/Loader"
import axios from "../../../../helpers/api"
import { useSnackbar } from "notistack"

type Props = {
  onSuccessfulPasswordReset?: () => void
}

export const ForgotPasswordForm: React.FC<Props> = props => {
  const { enqueueSnackbar } = useSnackbar()
  return (
    <div>
      <p>
        {browser.i18n.getMessage("enterYourEmail")}        
      </p>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={(values, actions) => {
          axios
            .post("/password-recovery-request", {
              username: values.email
            })
            .then(() => {
              props.onSuccessfulPasswordReset &&
                props.onSuccessfulPasswordReset()
            })
            .catch(error => {
              enqueueSnackbar(
                `${browser.i18n.getMessage("errorProvideCorrectEmail")}`,
                {
                  variant: "error"
                }
              )
              actions.setSubmitting(false)
              console.warn(error)
            })
        }}
        validate={values => {
          let errors: {
            email?: string
          } = {}
          if (!values.email) {
            errors.email = `${browser.i18n.getMessage("fieldIsRequired")}`
          }
          const regexp = /\S+@\S+\.\S+/
          if (values.email && !regexp.test(String(values.email).toLowerCase())) {
            errors.email = `${browser.i18n.getMessage("errorEmailIsNotValid")}`
          }
          return errors
        }}
        render={({ errors, values, isSubmitting }) => (
          <Form noValidate>
            <div className="field">
              <Field
                type="email"
                name="email"
                placeholder={browser.i18n.getMessage("emailPlaceholder")}
                className="field__input"
              />
              <div className="field__error-message">
                <ErrorMessage name="email" component="span" />
              </div>
            </div>
            <button type="submit" className="button login-form__button">
              {isSubmitting ? <Loader /> : `${browser.i18n.getMessage("resetPassword")}`}
            </button>
          </Form>
        )}
      />
    </div>
  )
}
