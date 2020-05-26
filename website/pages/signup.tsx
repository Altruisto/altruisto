import { MobileFormLayout } from "components/layouts/MobileFormLayout"

import dynamic from "next/dynamic"

const RegisterForm = dynamic(() => import("../components/partials/RegisterForm"), {
  ssr: false
})

const Signup = () => (
  <MobileFormLayout>
    <RegisterForm />
  </MobileFormLayout>
)

export default Signup
