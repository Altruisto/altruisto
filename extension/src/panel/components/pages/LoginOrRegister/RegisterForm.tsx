import { browser } from "webextension-polyfill-ts"
import React, { useState, useRef, useEffect } from "react"
import { Formik, Field, Form, ErrorMessage } from "formik"
import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import { Alert } from "../../ui/Alert"
import axios from "../../../../helpers/api"
import { useAuthContext } from "../../../common/auth"
import { Loader } from "../../ui/Loader"
import { storage } from "../../../../helpers/storage"
import { Currency } from "../../../../../../shared/types/user"

type Props = {
  onSuccess?: () => void
}

type FormData = {
  email?: string
  confirmEmail?: string
  password?: string
  acceptTerms?: boolean
}

type ValidationErrors = {
  email?: string
  confirmEmail?: string
  password?: string
  acceptTerms?: string
}

type InstallationData = {
  installationId: string
  referredBy: string
}

type RegistrationData = {
  username: string
  accept_terms: boolean
  currency: Currency
  password: string
  referred_by?: string
  installation_id?: string
}

const validate = (values: FormData) => {
  let errors: ValidationErrors = {}
  if (!values.email) {
    errors.email = browser.i18n.getMessage("fieldIsRequired")
  }

  const regexp = /\S+@\S+\.\S+/
  if (values.email && !regexp.test(String(values.email).toLowerCase())) {
    errors.email = browser.i18n.getMessage("errorEmailIsNotValid")
  }

  if (!values.password) {
    errors.password = browser.i18n.getMessage("fieldIsRequired")
  }

  if (values.password && values.password.length < 8) {
    errors.password = browser.i18n.getMessage("passwordMustHave8Char")
  }

  if (values.confirmEmail !== values.email && values.confirmEmail !== "" && values.email !== "") {
    errors.confirmEmail = browser.i18n.getMessage("emailsNotMatch")
  }

  if (!values.acceptTerms) {
    errors.acceptTerms = browser.i18n.getMessage("fieldIsRequired")
  }

  return errors
}

const RegisterForm: React.FC<Props> = (props: Props) => {
  const [failureMessage, setFailureMessage] = useState("")
  const installationData = useRef<InstallationData | null>(null)
  const auth = useAuthContext()

  return (
    <>
      {failureMessage && <Alert message={failureMessage} className="m-b-20 m-t-20" />}
      <Formik
        initialValues={{
          email: "",
          confirmEmail: "",
          password: "",
          acceptTerms: false
        }}
        onSubmit={async (values, actions) => {
          if (!installationData.current) {
            const fromLocal = await storage.get("local", "installationId")
            const fromSync = await storage.get("sync", "referredBy")

            installationData.current = {
              installationId: fromLocal.installationId,
              referredBy: fromSync.referredBy
            }
          }

          let registrationData: RegistrationData = {
            username: values.email,
            accept_terms: values.acceptTerms,
            currency: "USD",
            password: values.password
          }

          if (installationData && installationData.current) {
            installationData.current.referredBy &&
              (registrationData.referred_by = installationData.current.referredBy)
            installationData.current.installationId &&
              (registrationData.installation_id = installationData.current.installationId)
          }

          axios
            .post("/register", registrationData)
            .then(response => {
              if (Number(response.status) === 201) {
                return auth.login(values.email, values.password)
              } else {
                throw new Error(
                  `${browser.i18n.getMessage("serverDidNotResponded")}`
                )
              }
            })
            .then(loggedUser => {
              if (loggedUser) {
                props.onSuccess && props.onSuccess()
              }
            })
            .catch(error => {
              if (
                error.response &&
                error.response.status &&
                Number(error.response.status) === 400
              ) {
                Object.entries(error.response.data).forEach(([key, value]) => {
                  key === "username"
                    ? actions.setFieldError("email", String(value))
                    : actions.setFieldError(String(key), String(value))
                })
              } else {
                setFailureMessage(
                  `${browser.i18n.getMessage("problemWithRegistration")}`
                )
              }
              actions.setSubmitting(false)
              console.warn(error)
            })
        }}
        validateOnChange={false}
        validate={values => validate(values)}
        render={({ values, setFieldTouched, setFieldValue, isSubmitting }) => (
          <Form noValidate>
            <div className="field">
              <label className="field__label" htmlFor="email">
                {browser.i18n.getMessage("email")}
              </label>
              <Field
                className="field__input"
                type="text"
                id="email"
                name="email"
                placeholder={browser.i18n.getMessage("yourMainEmail")}
              />
              <div className="field__error-message">
                <ErrorMessage name="email" component="span" />
              </div>
            </div>
            <div className="field">
              <label className="field__label" htmlFor="email">
                {browser.i18n.getMessage("confirmEmail")}
              </label>
              <Field
                className="field__input"
                type="text"
                id="confirmEmail"
                name="confirmEmail"
                placeholder={browser.i18n.getMessage("confirmYourEmailAdress")}
              />
              <div className="field__error-message">
                <ErrorMessage name="confirmEmail" component="span" />
              </div>
            </div>
            <div className="field">
              <label className="field__label" htmlFor="password">
                {browser.i18n.getMessage("password")}
              </label>
              <Field
                className="field__input"
                type="password"
                id="password"
                name="password"
                placeholder={browser.i18n.getMessage("yourPassword")}
              />
              <div className="field__error-message">
                <ErrorMessage name="password" component="span" />
              </div>
            </div>
            <FormControlLabel
              classes={{
                root: "login-form__checkbox"
              }}
              control={
                <Checkbox
                  value={values.acceptTerms}
                  onChange={event => {
                    setFieldTouched("acceptTerms", true)
                    setFieldValue("acceptTerms", Boolean(event.target.checked))
                  }}
                />
              }
              label={
                <label htmlFor="acceptTerms" className="field__label login-form__checkbox-label">
                  {browser.i18n.getMessage("iAcceptThe")}
                  <a
                    href="https://altruisto.com/terms-of-service.html"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {browser.i18n.getMessage("termsOfService")}
                  </a>
                  {browser.i18n.getMessage("andThe")}
                  <a
                    href="https://altruisto.com/privacy-policy.html"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {browser.i18n.getMessage("privacyPolicy")}
                  </a>
                </label>
              }
            />
            <div className="field__error-message">
              <ErrorMessage name="acceptTerms" component="span" />
            </div>
            <button type="submit" className="button login-form__button">
              {isSubmitting ? <Loader /> : browser.i18n.getMessage("register")}
            </button>
          </Form>
        )}
      />
    </>
  )
}

export default RegisterForm
