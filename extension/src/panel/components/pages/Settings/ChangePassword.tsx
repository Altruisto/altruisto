import { browser } from "webextension-polyfill-ts"
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
      <span className="settings__label">{browser.i18n.getMessage("changePassword")}</span>
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
              enqueueSnackbar(
                browser.i18n.getMessage("settingsHaveBeenUpdated"), 
                {
                  variant: "success"
                }
              )
              actions.setSubmitting(false)
            })
            .catch(() => {
              enqueueSnackbar(
                browser.i18n.getMessage("somethingWentWrongTryAgain"),
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
            errors.currentPassword = browser.i18n.getMessage("fieldIsRequired")
          }
          if (values.currentPassword !== undefined && values.currentPassword.length < 8) {
            errors.currentPassword = browser.i18n.getMessage("passwordMustHave8Char")
          }
          if (!values.newPassword) {
            errors.newPassword = browser.i18n.getMessage("fieldIsRequired")
          }
          if (values.newPassword !== undefined && values.newPassword.length < 8) {
            errors.newPassword = browser.i18n.getMessage("passwordMustHave8Char")
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
                placeholder={browser.i18n.getMessage("currentPassword")}
              />
              <div className="field__error-message">
                <ErrorMessage name="currentPassword" component="span" />
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
                    browser.i18n.getMessage("save")
                  )}
                </button>
              </div>
              <Field
                type="password"
                name="newPassword"
                className="field__input"
                placeholder={browser.i18n.getMessage("newPassword")}
              />
              <div className="field__error-message">
                <ErrorMessage name="newPassword" component="span" />
              </div>
            </div>
          </Form>
        )}
      />
    </div>
  )
}
