import { MobileFormLayout } from "components/layouts/MobileFormLayout"
import LoginForm from "components/partials/LoginForm"
import Link from "next/link"
import { useIntl } from "translations/useIntl"

const Login = () => {
  const { formatMessage } = useIntl()

  return (
    <MobileFormLayout>
      <LoginForm />
      <p className="pt-4">
        {formatMessage({ id: "dontHaveAnAccount" })}&nbsp;
        <Link href="/signup">
          <a className="button-link">
            <span className="text-gradient">{formatMessage({ id: "signUpNow" })}</span>
          </a>
        </Link>
      </p>
    </MobileFormLayout>
  )
}

export default Login
