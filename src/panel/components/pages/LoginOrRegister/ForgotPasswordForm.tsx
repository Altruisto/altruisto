import React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { Loader } from "../../ui/Loader"
import { useAuthContext } from "../../../common/auth"
import axios from "../../../../helpers/api"
import { useSnackbar } from "notistack"

type Props = {
  onSuccessfulPasswordReset?: () => void
}

export const ForgotPasswordForm: React.FC<Props> = props => {
  const auth = useAuthContext()
  const { enqueueSnackbar } = useSnackbar()
  return (
    <div>
      <p>
        Please enter your email address below, and we’ll send a link you can use
        to reset your password
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
                "Something went wrong. Please make sure you have provided a correct email address.",
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
            errors.email = "This field is required"
          }
          const regexp = /\S+@\S+\.\S+/
          if (!regexp.test(String(values.email).toLowerCase())) {
            errors.email = "Provided email address is not valid"
          }
          return errors
        }}
        render={({ errors, values, isSubmitting }) => (
          <Form noValidate>
            <div className="field">
              <Field
                type="email"
                name="email"
                placeholder="E-mail for you account"
                className="field__input"
              />
              <div className="field__error-message">
                <ErrorMessage name="email" component="span" />
              </div>
            </div>
            <button type="submit" className="button login-form__button">
              {isSubmitting ? <Loader /> : "Reset password"}
            </button>
          </Form>
        )}
      />
    </div>
  )
}
