import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useAuth } from "hooks/use-auth"
import { SnackbarProvider } from "notistack"
import { MobileAppLayout } from "components/layouts/MobileAppLayout"
import SwipeableViews from "react-swipeable-views"
import { ShareTab } from "components/partials/app/ShareTab"
import { ShopTab } from "components/partials/app/ShopTab"
import Partner from "pages/partners/[domain]"
import { api } from "utils/api-url"
import { GetPartnersResponse } from "../../../shared/types/api"

const Index = () => {
  const router = useRouter()
  const auth = useAuth()
  const [activeTab, setActiveTab] = useState(0)
  const [partners, setPartners] = useState<Partner[]>([])

  useEffect(() => {
    if (router && auth) {
      if (!auth.user) {
        // router.push("/login")
      }
      // console.log(auth.user)
    }
  }, [router, auth])

  useEffect(() => {
    if (auth && auth.user) {
      api
        .get<GetPartnersResponse>("/partners")
        .then(response => {
          return response.data.map(p => ({ name: p.name, domain: p.domain }))
        })
        .then(partners => setPartners(partners))
    }
  }, [auth])

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
        <MobileAppLayout
          active={activeTab}
          onMenuClick={index => {
            setActiveTab(index)
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
        >
          <SwipeableViews index={activeTab}>
            <ShareTab isActive={activeTab === 0} />
            <ShopTab partners={partners} />
          </SwipeableViews>
        </MobileAppLayout>
      </SnackbarProvider>
    )
  }

  return null
}

export default Index
