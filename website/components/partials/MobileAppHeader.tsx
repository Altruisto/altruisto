import { useAuth } from "hooks/use-auth"

export const MobileAppHeader = () => {
  const auth = useAuth()

  return (
    <div className="mobile-app__header">
      <img src="/images/sygnet.svg" alt="Altruisto logotype" height="32" width="32" />
      <div className="mobile-app__user-info">
        <span className="text-emphasized">Logged in as:</span>
        <br />
        <span className="text-muted">{auth && auth.user && auth.user.email}</span>
      </div>
    </div>
  )
}
