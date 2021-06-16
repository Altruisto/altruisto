import React from "react"
import cx from "classnames"

import ShareV2 from "components/ui/icons/ShareV2"
import DonateV2 from "components/ui/icons/DonateV2"
import YourHelpV2 from "components/ui/icons/YourHelpV2"
import SettingsV2 from "components/ui/icons/SettingsV2"
import { useIntl } from "translations/useIntl"

type Props = {
  active: number
  onChange: (index: number) => void
}

export const WebAppNavigationDesktop: React.FC<Props> = ({ active, onChange }) => {
  const inactiveColor = "#A3A3A3"
  const getColorForActive = (index: number) => (active === index ? "red" : inactiveColor)
  const { formatMessage } = useIntl()

  return (
    <div className="web-app__desktop-navigation">
      <div className="web-app__desktop-navigation-item" onClick={() => onChange(0)}>
        <ShareV2 color={getColorForActive(0)} />

        <span
          className={cx("web-app__desktop-navigation-label", { "text-gradient": active === 0 })}
        >
          {formatMessage({ id: "share" })}
        </span>
      </div>
      <div className="web-app__desktop-navigation-item" onClick={() => onChange(1)}>
        <DonateV2 color={getColorForActive(1)} />
        <span
          className={cx("web-app__desktop-navigation-label", {
            "text-gradient": active === 1
          })}
        > 
          {formatMessage({ id: "shop" })}
        </span>
      </div>
      <div className="web-app__desktop-navigation-item" onClick={() => onChange(2)}>
        <YourHelpV2 color={getColorForActive(2)} />
        <span
          className={cx("web-app__desktop-navigation-label", { "text-gradient": active === 2 })}
        >
          {formatMessage({ id: "yourHelp" })}
        </span>
      </div>
      <div className="web-app__desktop-navigation-item" onClick={() => onChange(3)}>
        <SettingsV2 color={getColorForActive(3)} />{" "}
        <span
          className={cx("web-app__desktop-navigation-label", { "text-gradient": active === 3 })}
        >
          {formatMessage({ id: "settings" })}
        </span>
      </div>
    </div>
  )
}

export default WebAppNavigationDesktop
