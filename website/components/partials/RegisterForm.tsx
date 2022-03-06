import { Formik, Field, Form, ErrorMessage } from "formik"
import * as Yup from "yup"
import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import { Loader } from "components/ui/Loader"
import { getCookie } from "utils/get-cookie"
import { REFERRED_BY_COOKIE_NAME } from "../.././shared/globals"
import { api } from "utils/api-url"
import { useState, useEffect } from "react"
import { Alert } from "components/ui/Alert"
import { useAuth } from "hooks/use-auth"
import { useRouter } from "next/router"
import { useIntl } from "translations/useIntl"

const referredBy = getCookie(REFERRED_BY_COOKIE_NAME)

const RegisterForm = () => {
  const [failureMessage, setFailureMessage] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const auth = useAuth()
  const router = useRouter()
  const { formatMessage } = useIntl()

  return (
    <>
      {failureMessage && <Alert message={failureMessage} />}
      <Formik
        initialValues={{
          email: "",
          confirmEmail: "",
          password: "",
          acceptTerms: false
        }}
        onSubmit={async (values, actions) => {
          setSubmitting(true)

          const registrationData = {
            username: values.email,
            accept_terms: values.acceptTerms,
            currency: "USD",
            password: values.password,
            referred_by: referredBy
          }
          api
            .post("/register", registrationData)
            .then((response) => {
              if (Number(response.status) === 201) {
                return auth.login(values.email, values.password)
              } else {
                throw new Error(
                  "Registration: the server did not responded with expected status code (201)"
                )
              }
            })
            .then((loggedUser) => {
              if (loggedUser) {
                router.push("/app")
              }
            })
            .catch((error) => {
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
                setFailureMessage(formatMessage({ id: "registrationProblem" }))
              }
              setSubmitting(false)
            })
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email(formatMessage({ id: "emailInvalid" }))
            .required(formatMessage({ id: "fieldRequired" })),
          confirmEmail: Yup.string()
            .email(formatMessage({ id: "emailInvalid" }))
            .oneOf([Yup.ref("email")], formatMessage({ id: "emailsDontMatch" }))
            .required("This field is required"),
          password: Yup.string()
            .min(8, formatMessage({ id: "passwordHasToBeAtLeast8Characters" }))
            .required("This field is required"),
          acceptTerms: Yup.boolean().oneOf([true], formatMessage({ id: "fieldRequired" }))
        })}
      >
        {({ values, setFieldTouched, setFieldValue }) => (
          <Form>
            <div className="field">
              <label className="field__label" htmlFor="email">
                {formatMessage({ id: "email" })}
              </label>
              <Field
                className="field__input"
                type="text"
                id="email"
                name="email"
                placeholder={formatMessage({ id: "yourMainEmail" })}
              />
              <div className="field__error-message">
                <ErrorMessage name="email" component="span" />
              </div>
            </div>

            <div className="field">
              <label className="field__label" htmlFor="email">
                {formatMessage({ id: "confirmEmail" })}
              </label>
              <Field
                className="field__input"
                type="text"
                id="confirmEmail"
                name="confirmEmail"
                placeholder={formatMessage({ id: "confirmYourEmail" })}
              />
              <div className="field__error-message">
                <ErrorMessage name="confirmEmail" component="span" />
              </div>
            </div>

            <div className="field">
              <label className="field__label" htmlFor="password">
                {formatMessage({ id: "password" })}
              </label>
              <Field
                className="field__input"
                type="password"
                id="password"
                name="password"
                placeholder={formatMessage({ id: "yourPassword" })}
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
                  onChange={(event) => {
                    setFieldTouched("acceptTerms", true)
                    setFieldValue("acceptTerms", Boolean(event.target.checked))
                  }}
                />
              }
              label={
                <label htmlFor="acceptTerms" className="field__label" style={{ marginBottom: 0 }}>
                  {formatMessage({ id: "iAccept" })}{" "}
                  <a
                    href="https://altruisto.com/terms-of-service.html"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {formatMessage({ id: "termsOfService" })}
                  </a>{" "}
                  {formatMessage({ id: "andThe" })}{" "}
                  <a
                    href="https://altruisto.com/privacy-policy.html"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {formatMessage({ id: "privacyPolicy" })}
                  </a>
                </label>
              }
            />
            <div className="field__error-message">
              <ErrorMessage name="acceptTerms" component="span" />
            </div>

            <button type="submit" className="button" style={{ marginTop: 16 }}>
              {submitting ? <Loader /> : formatMessage({ id: "register" })}
            </button>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default RegisterForm
