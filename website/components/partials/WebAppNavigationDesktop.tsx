import React from "react"
import cx from "classnames"

import ShareV2 from "components/ui/icons/ShareV2"
import DonateV2 from "components/ui/icons/DonateV2"
import YourHelpV2 from "components/ui/icons/YourHelpV2"
import SettingsV2 from "components/ui/icons/SettingsV2"

type Props = {
  active: number
  onChange: (index: number) => void
}

export const WebAppNavigationDesktop: React.FC<Props> = ({ active, onChange }) => {
  const inactiveColor = "#A3A3A3"
  const getColorForActive = (index: number) => (active === index ? "red" : inactiveColor)
  return (
    <div className="web-app__desktop-navigation">
      <div className="web-app__desktop-navigation-item" onClick={() => onChange(0)}>
        <ShareV2 color={getColorForActive(0)} />

        <span
          className={cx("web-app__desktop-navigation-label", { "text-gradient": active === 0 })}
        >
          Share
        </span>
      </div>
      <div className="web-app__desktop-navigation-item" onClick={() => onChange(1)}>
        <DonateV2 color={getColorForActive(1)} />
        <span
          className={cx("web-app__desktop-navigation-label", {
            "text-gradient": active === 1
          })}
        >
          Shop
        </span>
      </div>
      <div className="web-app__desktop-navigation-item" onClick={() => onChange(2)}>
        <YourHelpV2 color={getColorForActive(2)} />
        <span
          className={cx("web-app__desktop-navigation-label", { "text-gradient": active === 2 })}
        >
          Your Help
        </span>
      </div>
      <div className="web-app__desktop-navigation-item" onClick={() => onChange(3)}>
        <SettingsV2 color={getColorForActive(3)} />{" "}
        <span
          className={cx("web-app__desktop-navigation-label", { "text-gradient": active === 3 })}
        >
          Settings
        </span>
      </div>
    </div>
  )
}

export default WebAppNavigationDesktop
