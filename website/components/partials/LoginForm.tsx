import { useState } from "react"
import * as Yup from "yup"
import { useAuth } from "hooks/use-auth"
import { Formik, Form, ErrorMessage, Field } from "formik"
import { Loader } from "components/ui/Loader"
import { Alert } from "components/ui/Alert"
import { useRouter } from "next/router"

const LoginForm = () => {
  const [failureMessage, setFailureMessage] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const auth = useAuth()
  const router = useRouter()

  return (
    <>
      {failureMessage && <Alert message={failureMessage} />}
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, actions) => {
          setSubmitting(true)
          auth
            .login(values.email, values.password)
            .then(() => {
              router.push("/app")
            })
            .catch(error => {
              if (error.response && error.response.data && error.response.data.message) {
                setFailureMessage(String(error.response.data.message))
              } else {
                setFailureMessage("Something went wrong, please try again.")
              }
              setSubmitting(false)
            })
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Provided email address is not valid")
            .required("This field is required"),
          password: Yup.string().required("This field is required")
        })}
      >
        {() => (
          <Form>
            <div className="field">
              <label className="field__label" htmlFor="email">
                Email
              </label>
              <Field
                className="field__input"
                type="email"
                name="email"
                id="email"
                placeholder="Your email"
              />
              <div className="field__error-message">
                <ErrorMessage name="email" component="span" />
              </div>
            </div>
            <div className="field">
              <label className="field__label" htmlFor="password">
                Password
              </label>

              <Field
                className="field__input"
                type="password"
                name="password"
                id="password"
                placeholder="Your password"
              />
              <div className="field__error-message">
                <ErrorMessage name="password" component="span" />
              </div>
            </div>
            <button type="submit" className="button login-form__button">
              {submitting ? <Loader /> : "Login"}
            </button>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default LoginForm
