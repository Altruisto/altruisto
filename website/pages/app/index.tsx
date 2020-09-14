import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useAuth } from "hooks/use-auth"
import { SnackbarProvider } from "notistack"
import { MobileAppLayout } from "components/layouts/MobileAppLayout"
import SwipeableViews from "react-swipeable-views"
import { MobileAppNavigation } from "components/partials/MobileAppNavigation"
import { Share } from "components/partials/app/Share"

const Index = () => {
  const router = useRouter()
  const auth = useAuth()
  const [activeTab, setActiveTab] = useState(0)
  useEffect(() => {
    if (router && auth) {
      if (!auth.user) {
        // router.push("/login")
      }
      // console.log(auth.user)
    }
  }, [router, auth])

  if (auth && auth.user) {
    return (
      <SnackbarProvider
        maxSnack={1}
        autoHideDuration={1500}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        <MobileAppLayout>
          <SwipeableViews index={activeTab}>
            <Share isActive={activeTab === 0} />
            <>2</>
          </SwipeableViews>
          {/* <MobileAppNavigation /> */}
        </MobileAppLayout>
      </SnackbarProvider>
    )
  }

  return null
}

export default Index
