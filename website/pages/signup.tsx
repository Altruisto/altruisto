import { MobileFormLayout } from "components/layouts/MobileFormLayout"

import dynamic from "next/dynamic"
import Link from "next/link"

const RegisterForm = dynamic(() => import("../components/partials/RegisterForm"), {
  ssr: false
})

const Signup = () => (
  <MobileFormLayout>
    <RegisterForm />
    <p className="pt-4">
      Already have an account?&nbsp;
      <Link href="/login">
        <a className="button-link">
          <span className="text-gradient">Sign in now.</span>
        </a>
      </Link>
    </p>
  </MobileFormLayout>
)

export default Signup
