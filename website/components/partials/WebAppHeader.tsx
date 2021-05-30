import { useAuth } from "hooks/use-auth"
import { useIntl } from "translations/useIntl"

export const WebAppHeader = () => {
  const auth = useAuth()
  const { formatMessage } = useIntl()

  return (
    <div className="web-app__header">
      <img src="/images/sygnet.svg" alt="Altruisto logotype" height="32" width="32" />
      <div className="web-app__user-info">
        <span className="text-emphasized">{formatMessage({ id: "loggedInAs" })}</span>
        <br />
        <span className="text-muted">{auth && auth.user && auth.user.email}</span>
      </div>
    </div>
  )
}
