import React from "react"
import { Formik, Field, ErrorMessage, Form } from "formik"
import colors from "../../../assets/scss/colors.scss"
import { Loader } from "../../ui/Loader"
import { useSnackbar } from "notistack"
import axios from "../../../../helpers/api"
import { useAuthContext } from "../../../common/auth"

export const ChangePassword = () => {
  const { enqueueSnackbar } = useSnackbar()
  const auth = useAuthContext()

  return (
    <div className="settings__option settings__option--vertical m-t-0">
      <span className="settings__label">Change password</span>
      <Formik
        enableReinitialize={true}
        initialValues={{
          newPassword: "",
          currentPassword: ""
        }}
        onSubmit={(values, actions) => {
          axios
            .put(
              "/user/password",
              {
                ...values
              },
              {
                headers: {
                  "X-AUTH-TOKEN": auth.user && auth.user.apiKey
                }
              }
            )
            .then(() => {
              enqueueSnackbar("Your settings have been updated", {
                variant: "success"
              })
              actions.setSubmitting(false)
            })
            .catch(() => {
              enqueueSnackbar(
                "Something went wrong, we have been notified about it. Please try again in a moment.",
                {
                  variant: "error"
                }
              )
            })
        }}
        validate={values => {
          let errors: {
            currentPassword?: string
            newPassword?: string
          } = {}
          if (!values.currentPassword) {
            errors.currentPassword = "This field is required"
          }
          if (values.currentPassword !== undefined && values.currentPassword.length < 8) {
            errors.currentPassword = "Password must have at least 8 characters"
          }
          if (!values.newPassword) {
            errors.newPassword = "This field is required"
          }
          if (values.newPassword !== undefined && values.newPassword.length < 8) {
            errors.newPassword = "Password must have at least 8 characters"
          }

          return errors
        }}
        render={({ errors, isSubmitting }) => (
          <Form noValidate>
            <div className="field">
              <Field
                type="password"
                name="currentPassword"
                className="field__input"
                placeholder="Current password"
              />
              <div className="field__error-message">
                <ErrorMessage name="password" component="span" />
              </div>
            </div>

            <div className="field">
              <div className="field__appendix">
                <button
                  className="button-link field__inside-button"
                  disabled={Boolean(errors.currentPassword || errors.newPassword)}
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
                name="newPassword"
                className="field__input"
                placeholder="New password"
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
