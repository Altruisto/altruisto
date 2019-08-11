import React from "react"
import { Formik, Field, ErrorMessage, Form } from "formik"
import colors from "../../../assets/scss/colors.scss"
import { Loader } from "../../ui/Loader"
import { useSnackbar } from "notistack"

export const ChangePassword = () => {
  const { enqueueSnackbar } = useSnackbar()

  return (
    <div className="settings__option settings__option--vertical m-t-0">
      <span className="settings__label">Change password</span>
      <Formik
        enableReinitialize={true}
        initialValues={{
          password: "",
          confirmPassword: ""
        }}
        onSubmit={(values, actions) => {
          enqueueSnackbar("Your settings have been updated", {
            variant: "success"
          })
          actions.setSubmitting(false)
        }}
        validate={values => {
          let errors: {
            password?: string
            confirmPassword?: string
          } = {}
          if (!values.password) {
            errors.password = "This field is required"
          }
          if (values.password !== undefined && values.password.length < 8) {
            errors.password = "Password must have at least 8 characters"
          }
          if (
            values.confirmPassword !== values.password &&
            values.confirmPassword !== "" &&
            values.password !== ""
          ) {
            errors.confirmPassword = "Passwords do not match"
          }
          return errors
        }}
        render={({ errors, isSubmitting }) => (
          <Form noValidate>
            <div className="field">
              <Field type="password" name="password" className="field__input" />
              <div className="field__error-message">
                <ErrorMessage name="password" component="span" />
              </div>
            </div>

            <div className="field">
              <div className="field__appendix">
                <button
                  className="button-link field__inside-button"
                  disabled={Boolean(errors.password || errors.confirmPassword)}
                  type="submit"
                >
                  {isSubmitting ? (
                    <Loader
                      color={colors.primary}
                      size={12}
                      style={{
                        marginTop: "-1px"
                      }}
                    />
                  ) : (
                    "SAVE"
                  )}
                </button>
              </div>
              <Field
                type="password"
                name="confirmPassword"
                className="field__input"
              />
              <div className="field__error-message">
                <ErrorMessage name="confirmPassword" component="span" />
              </div>
            </div>
          </Form>
        )}
      />
    </div>
  )
}
