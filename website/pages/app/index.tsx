import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useAuth } from "hooks/use-auth"
import { SnackbarProvider, useSnackbar } from "notistack"
import { MobileAppLayout } from "components/layouts/MobileAppLayout"
import SwipeableViews from "react-swipeable-views"
import { ShareTab } from "components/partials/app/ShareTab"
import { ShopTab } from "components/partials/app/ShopTab"
import Partner from "pages/partners/[domain]"
import { api } from "utils/api-url"
import { GetPartnersResponse, GetUserResponse } from "../../../shared/types/api"
import { CauseArea, Currency } from "../../../shared/types/user"

export type UserDetails = {
  causeArea: CauseArea
  moneyRaised: number
  currency: Currency
  ref: string
  referredBy: string
  referralsCount: number
}

const Index = () => {
  const router = useRouter()
  const auth = useAuth()
  const [activeTab, setActiveTab] = useState(1)
  const [partners, setPartners] = useState<Partner[]>([])
  const [partnersLoading, setPartnersLoading] = useState(true)
  const [userDetails, setUserDetails] = useState<UserDetails>(null)

  useEffect(() => {
    if (router && auth) {
      if (!auth.user) {
        router.push("/login")
      }
      // console.log(auth.user)
    }
  }, [router, auth])

  useEffect(() => {
    if (auth && auth.user) {
      api
        .get<GetUserResponse>("/user", { headers: { "X-AUTH-TOKEN": auth.user.apiKey } })
        .then(response => {
          setUserDetails({
            causeArea: response.data.cause_area,
            currency: response.data.currency,
            moneyRaised: response.data.money_raised,
            ref: response.data.ref,
            referralsCount: response.data.referrals_count,
            referredBy: response.data.referred_by
          })
        })
        .catch(() => {
          // @TODO: handle error
        })

      api
        .get<GetPartnersResponse>("/partners")
        .then(response => {
          return response.data.map(p => ({ name: p.name, domain: p.domain }))
        })
        .then(partners => setPartners(partners))
        .then(() => setPartnersLoading(false))
        .catch(() => {
          setPartnersLoading(false)
          // @TODO: handle error
        })
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
            <ShareTab userDetails={userDetails} />
            <ShopTab
              partners={partners}
              partnersLoading={partnersLoading}
              userDetails={userDetails}
            />
          </SwipeableViews>
        </MobileAppLayout>
      </SnackbarProvider>
    )
  }

  return null
}

export default Index
