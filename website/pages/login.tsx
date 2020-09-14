import { MobileFormLayout } from "components/layouts/MobileFormLayout"
import LoginForm from "components/partials/LoginForm"
import Link from "next/link"

const Login = () => (
  <MobileFormLayout>
    <LoginForm />
    <p className="pt-4">
      Don't have an account?&nbsp;
      <Link href="/signup">
        <a className="button-link">
          <span className="text-gradient">Sign up now.</span>
        </a>
      </Link>
    </p>
  </MobileFormLayout>
)

export default Login
