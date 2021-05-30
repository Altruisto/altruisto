import { FC } from "react"
import Share from "components/ui/icons/Share"
import Donate from "components/ui/icons/Donate"
import YourHelp from "components/ui/icons/YourHelp"
import Settings from "components/ui/icons/Settings"
import Paper from "@material-ui/core/Paper"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import { useIntl } from "translations/useIntl"

type Props = {
  active: number
  onChange: (index: number) => void
}

export const WebAppNavigation: FC<Props> = ({ active, onChange }) => {
  const getColorForActive = (index: number) => (active === index ? "red" : "")
  const { formatMessage } = useIntl()

  return (
    <div className="web-app__navigation">
      <Paper square elevation={0} className="web-app__nav-items">
        <Tabs
          value={active}
          onChange={(_, value) => onChange(value)}
          indicatorColor="secondary"
          variant="fullWidth"
          textColor="secondary"
        >
          <Tab
            className="web-app__nav-item"
            icon={<Share color={getColorForActive(0)} />}
            label={formatMessage({ id: "share" })}
            disableRipple
          />
          <Tab
            className="web-app__nav-item"
            icon={<Donate color={getColorForActive(1)} />}
            label={formatMessage({ id: "shop" })}
            disableRipple
          />
          <Tab
            className="web-app__nav-item"
            icon={<YourHelp color={getColorForActive(2)} />}
            label={formatMessage({ id: "yourHelp" })}
            disableRipple
          />
          <Tab
            className="web-app__nav-item"
            icon={<Settings color={getColorForActive(3)} />}
            label={formatMessage({ id: "settings" })}
            disableRipple
          />
        </Tabs>
      </Paper>
    </div>
  )
}

export default WebAppNavigation
