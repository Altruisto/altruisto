import { useEffect } from "react"
import { useRouter } from "next/router"
import { useAuth } from "hooks/use-auth"
import { MobileAppLayout } from "components/layouts/MobileAppLayout"
import LoginForm from "components/partials/LoginForm"
import SwipeableViews from "react-swipeable-views"

const Index = () => {
  const router = useRouter()
  const auth = useAuth()
  useEffect(() => {
    if (router && auth && !auth.user) {
      router.push("/login")
    }
  }, [router, auth])

  if (auth && auth.user) {
    return (
      <MobileAppLayout>
        <LoginForm />
      </MobileAppLayout>
    )
  }

  return null
}

export default Index
