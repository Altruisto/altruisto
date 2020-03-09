import { NextPage } from "next"
import { MinimalLayout } from "../../components/layouts/MinimalLayout"
import { api } from "../../utils/apiUrl"

type Props = {
  success: boolean
}

const ConfirmEmail: NextPage<Props> = ({ success }) => (
  <MinimalLayout>
    {success ? (
      <>
        <h1>Your email is confirmed!</h1>
        <p>Now your account is fully active :)</p>{" "}
      </>
    ) : (
      <>
        <h1>Something went wrong ;(</h1>
        <p>Please try again or contact us at hello@altruisto.com</p>
      </>
    )}
  </MinimalLayout>
)

ConfirmEmail.getInitialProps = ({ query }) => {
  return api
    .post("/email-verification", {
      email_verification_token: query.email_verification_token
    })
    .then(() => ({ success: true }))
    .catch(() => ({ success: false }))
}

export default ConfirmEmail
