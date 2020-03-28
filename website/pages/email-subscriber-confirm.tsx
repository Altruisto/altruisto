import { MinimalLayout } from "../components/layouts/MinimalLayout"

const EmailSubscriberConfirm = () => (
  <MinimalLayout>
    <h1 style={{ marginBottom: "30px" }}>Thank you! </h1>
    <h4 style={{ marginBottom: "10px", textAlign: "left", width: "100%;" }}>
      Now please check your inbox and confirm your email address
      <br />
      by clicking the link we've just sent you.
    </h4>
  </MinimalLayout>
)

export default EmailSubscriberConfirm
