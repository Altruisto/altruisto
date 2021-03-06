import { useAuth } from "hooks/use-auth"

export const WebAppHeader = () => {
  const auth = useAuth()

  return (
    <div className="web-app__header">
      <img src="/images/sygnet.svg" alt="Altruisto logotype" height="32" width="32" />
      <div className="web-app__user-info">
        <span className="text-emphasized">Logged in as:</span>
        <br />
        <span className="text-muted">{auth && auth.user && auth.user.email}</span>
      </div>
    </div>
  )
}
