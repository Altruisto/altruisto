import { useState } from "react"
import * as Yup from "yup"
import { useAuth } from "hooks/use-auth"
import { Formik, Form, ErrorMessage, Field } from "formik"
import { Loader } from "components/ui/Loader"
import { Alert } from "components/ui/Alert"
import { useRouter } from "next/router"
import { useIntl } from "translations/useIntl"

const LoginForm = () => {
  const [failureMessage, setFailureMessage] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const auth = useAuth()
  const router = useRouter()
  const { formatMessage } = useIntl()

  return (
    <>
      {failureMessage && <Alert message={failureMessage} />}
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          setSubmitting(true)
          auth
            .login(values.email, values.password)
            .then(() => {
              router.push("/app")
            })
            .catch((error) => {
              if (error.response && error.response.data && error.response.data.message) {
                setFailureMessage(String(error.response.data.message))
              } else {
                setFailureMessage(formatMessage({ id: "somethingWentWrongTryAgain" }))
              }
              setSubmitting(false)
            })
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email(formatMessage({ id: "emailInvalid" }))
            .required(formatMessage({ id: "fieldRequired" })),
          password: Yup.string().required(formatMessage({ id: "fieldRequired" }))
        })}
      >
        {() => (
          <Form>
            <div className="field">
              <label className="field__label" htmlFor="email">
                {formatMessage({ id: "email" })}
              </label>
              <Field
                className="field__input"
                type="email"
                name="email"
                id="email"
                placeholder={formatMessage({ id: "yourEmail" })}
              />
              <div className="field__error-message">
                <ErrorMessage name="email" component="span" />
              </div>
            </div>
            <div className="field">
              <label className="field__label" htmlFor="password">
                {formatMessage({ id: "password" })}
              </label>

              <Field
                className="field__input"
                type="password"
                name="password"
                id="password"
                placeholder={formatMessage({ id: "yourPassword" })}
              />
              <div className="field__error-message">
                <ErrorMessage name="password" component="span" />
              </div>
            </div>
            <button type="submit" className="button login-form__button">
              {submitting ? <Loader /> : formatMessage({ id: "login" })}
            </button>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default LoginForm
