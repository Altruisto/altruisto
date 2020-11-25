import { FC } from "react"
import Share from "components/ui/icons/Share"
import Donate from "components/ui/icons/Donate"
import YourHelp from "components/ui/icons/YourHelp"
import Settings from "components/ui/icons/Settings"
import Paper from "@material-ui/core/Paper"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"

type Props = {
  active: number
  onChange: (index: number) => void
}

export const MobileAppNavigation: FC<Props> = ({ active, onChange }) => {
  const getColorForActive = (index: number) => (active === index ? "red" : "")

  return (
    <div className="mobile-app__navigation">
      <Paper square elevation={0} className="mobile-app__nav-items">
        <Tabs
          value={active}
          onChange={(_, value) => onChange(value)}
          indicatorColor="secondary"
          variant="fullWidth"
          textColor="secondary"
        >
          <Tab
            className="mobile-app__nav-item"
            icon={<Share color={getColorForActive(0)} />}
            label="Share"
            disableRipple
          />
          <Tab
            className="mobile-app__nav-item"
            icon={<Donate color={getColorForActive(1)} />}
            label="Shop"
            disableRipple
          />
          <Tab
            className="mobile-app__nav-item"
            icon={<YourHelp color={getColorForActive(2)} />}
            label="Your help"
            disableRipple
          />
          <Tab
            className="mobile-app__nav-item"
            icon={<Settings color={getColorForActive(3)} />}
            label="Settings"
            disableRipple
          />
        </Tabs>
      </Paper>
      {/* <div className="mobile-app__nav-item">
        <div>
          <Share />
        </div>
        Share
      </div>
      <div className="mobile-app__nav-item">
        <div>
          <img src="/images/donate.svg" />
        </div>
        Shop
      </div>
      <div className="mobile-app__nav-item">
        <div>
          <img src="/images/your-help.svg" />
        </div>
        Your Help
      </div>
      <div className="mobile-app__nav-item">
        <div>
          <img src="/images/settings.svg" />
        </div>
        Settings
      </div> */}
    </div>
  )
}

export default MobileAppNavigation
