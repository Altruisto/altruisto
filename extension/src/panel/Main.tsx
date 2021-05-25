import React, { useState } from "react"
import { withStyles } from "@material-ui/core/styles"
import { useAuthContext } from "./common/auth"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import SwipeableViews from "react-swipeable-views"
import { Header } from "./components/Header"
import Paper from "@material-ui/core/Paper"
import { SettingsIcon } from "./components/icons/SettingsIcon"
import { ShareIcon } from "./components/icons/ShareIcon"
import { WalletIcon } from "./components/icons/WalletIcon"
import { ProfileIcon } from "./components/icons/ProfileIcon"
import { LoginOrRegister } from "./components/pages/LoginOrRegister/LoginOrRegister"
import { Share } from "./components/pages/Share/Share"
import { Donate } from "./components/pages/Donate/Donate"
import { Settings } from "./components/pages/Settings/Settings"
import { YourHelp } from "./components/pages/YourHelp/YourHelp"
import { browser } from "webextension-polyfill-ts"

type Props = {
  classes: {
    tab: string
  }
}

const styles = () => ({
  tab: {
    minWidth: "unset",
    "text-transform": "none",
    "font-size": "12px"
  }
})

const Main: React.FC<Props> = (props: Props) => {
  const auth = useAuthContext()
  const [showLoginPopup, setShowLoginPopup] = useState(false)
  const [activeTab, setActiveTab] = useState(1)

  const { classes } = props

  return (
    <>
      {showLoginPopup ? <LoginOrRegister onClose={() => setShowLoginPopup(false)} /> : null}

      <Header user={auth.user} onLoginOrRegisterClick={() => setShowLoginPopup(true)} />
      <div className="app__content-wrapper">
        <SwipeableViews
          // axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeTab}
          className="fill-height"
          containerStyle={{
            height: "100%",
            display: "flex"
          }}
          slideStyle={{
            display: "flex"
          }}
        >
          <Share isActive={activeTab === 0} />
          <Donate />
          <YourHelp onRequestLogin={() => setShowLoginPopup(true)} isActive={activeTab === 2} />
          <Settings onRequestLogin={() => setShowLoginPopup(true)} />
        </SwipeableViews>
      </div>
      <Paper square elevation={0}>
        <Tabs
          value={activeTab}
          onChange={(event: React.ChangeEvent<{}>, value: number) => setActiveTab(value)}
          indicatorColor="none"
          variant="fullWidth"
          textColor="secondary"
        >
          <Tab className={classes.tab} icon={<ShareIcon />} label={browser.i18n.getMessage('share')} disableRipple />
          <Tab className={classes.tab} icon={<WalletIcon />} label={browser.i18n.getMessage('donate')} disableRipple />
          <Tab className={classes.tab} icon={<ProfileIcon />} label={browser.i18n.getMessage('yourHelp')} disableRipple />
          <Tab className={classes.tab} icon={<SettingsIcon />} label={browser.i18n.getMessage('settings')} disableRipple />
        </Tabs>
      </Paper>
    </>
  )
}

export default withStyles(styles)(Main)
