import { Formik, Field, Form, ErrorMessage } from "formik"
import * as Yup from "yup"
import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import { Loader } from "components/ui/Loader"
import { getCookie } from "utils/get-cookie"
import { REFERRED_BY_COOKIE_NAME } from "../../../shared/globals"
import { api } from "utils/api-url"
import { useState, useEffect } from "react"
import { Alert } from "components/ui/Alert"
import { useAuth } from "hooks/use-auth"
import { useRouter } from "next/router";

const referredBy = getCookie(REFERRED_BY_COOKIE_NAME)

const RegisterForm = () => {
  const [failureMessage, setFailureMessage] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const auth = useAuth()
  const router = useRouter()

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
                router.push('/app')
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
              setSubmitting(false)
            })
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Provided email address is not valid")
            .required("This field is required"),
          confirmEmail: Yup.string()
            .email("Provided email address is not valid")
            .oneOf([Yup.ref("email")], "Emails do not match")
            .required("This field is required"),
          password: Yup.string()
            .min(8, "Password must have at least 8 characters")
            .required("This field is required"),
          acceptTerms: Yup.boolean().oneOf([true], "This field is required")
        })}
      >
        {({ values, setFieldTouched, setFieldValue, isSubmitting }) => (
          <Form>
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
                <label htmlFor="acceptTerms" className="field__label" style={{ marginBottom: 0 }}>
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

            <button type="submit" className="button" style={{ marginTop: 16 }}>
              {submitting ? <Loader /> : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default RegisterForm
