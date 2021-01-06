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
    errors.email = "This field is required"
  }

  const regexp = /\S+@\S+\.\S+/
  if (!regexp.test(String(values.email).toLowerCase())) {
    errors.email = "Provided email address is not valid"
  }

  if (!values.password) {
    errors.password = "This field is required"
  }

  if (values.password !== undefined && values.password.length < 8) {
    errors.password = "Password must have at least 8 characters"
  }

  if (values.confirmEmail !== values.email && values.confirmEmail !== "" && values.email !== "") {
    errors.confirmEmail = "Emails do not match"
  }

  if (!values.acceptTerms) {
    errors.acceptTerms = "This field is required"
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
                  "Registration: the server did not responded with expected status code (201)"
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
                  `There was a problem with your registration.
                  We were notified about it and will do our best
                  to solve it as quickly as possible.
                  Please do try again later.`
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
                Email
              </label>
              <Field
                className="field__input"
                type="text"
                id="email"
                name="email"
                placeholder="Your main email address"
              />
              <div className="field__error-message">
                <ErrorMessage name="email" component="span" />
              </div>
            </div>
            <div className="field">
              <label className="field__label" htmlFor="email">
                Confirm email
              </label>
              <Field
                className="field__input"
                type="text"
                id="confirmEmail"
                name="confirmEmail"
                placeholder="Confirm your email address"
              />
              <div className="field__error-message">
                <ErrorMessage name="confirmEmail" component="span" />
              </div>
            </div>
            <div className="field">
              <label className="field__label" htmlFor="password">
                Password
              </label>
              <Field
                className="field__input"
                type="password"
                id="password"
                name="password"
                placeholder="Your password"
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
                  I accept the{" "}
                  <a
                    href="https://altruisto.com/terms-of-service.html"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Terms of Service
                  </a>{" "}
                  and the{" "}
                  <a
                    href="https://altruisto.com/privacy-policy.html"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Privacy Policy
                  </a>
                </label>
              }
            />
            <div className="field__error-message">
              <ErrorMessage name="acceptTerms" component="span" />
            </div>
            <button type="submit" className="button login-form__button">
              {isSubmitting ? <Loader /> : "Register"}
            </button>
          </Form>
        )}
      />
    </>
  )
}

export default RegisterForm
