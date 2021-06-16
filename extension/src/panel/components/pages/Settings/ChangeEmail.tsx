import { browser } from "webextension-polyfill-ts"
import React from "react"
import { Formik, Field, ErrorMessage, Form } from "formik"
import colors from "../../../assets/scss/colors.scss"
import { Loader } from "../../ui/Loader"
import { useAuthContext } from "../../../common/auth"
import { useSnackbar } from "notistack"

export const ChangeEmail = () => {
  const auth = useAuthContext()
  const { enqueueSnackbar } = useSnackbar()

  return (
    <div className="settings__option settings__option--vertical">
      <span className="settings__label">{browser.i18n.getMessage("changeEmail")}</span>
      <Formik
        enableReinitialize={true}
        initialValues={{
          email: auth.user && auth.user.email ? auth.user.email : ""
        }}
        onSubmit={(values, actions) => {
          enqueueSnackbar(browser.i18n.getMessage("settingsHaveBeenUpdated"), {
            variant: "success"
          })
          actions.setSubmitting(false)
        }}
        validate={values => {
          let errors: {
            email?: string
          } = {}
          if (!values.email) {
            errors.email = browser.i18n.getMessage("fieldIsRequired")
          }
          const regexp = /\S+@\S+\.\S+/
          if (values.email && !regexp.test(String(values.email).toLowerCase())) {
            errors.email = browser.i18n.getMessage("errorEmailIsNotValid")
          }
          return errors
        }}
        render={({ errors, values, isSubmitting }) => (
          <Form noValidate>
            <div className="field">
              <div className="field__appendix">
                <button
                  className="button-link field__inside-button"
                  disabled={Boolean(
                    (auth.user && auth.user.email === values.email) ||
                      errors.email
                  )}
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
              <Field type="email" name="email" className="field__input" />
              <div className="field__error-message">
                <ErrorMessage name="email" component="span" />
              </div>
            </div>
          </Form>
        )}
      />
    </div>
  )
}
