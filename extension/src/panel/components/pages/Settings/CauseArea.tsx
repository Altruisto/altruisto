import { browser } from "webextension-polyfill-ts"
import React from "react"
import MenuItem from "@material-ui/core/MenuItem"
import Select, { SelectProps } from "@material-ui/core/Select"
import { SelectInput } from "../../ui/SelectInput"

export const CauseArea = (props: SelectProps) => {
  return (
    <div className="settings__option settings__option--vertical">
      <span className="settings__label">{browser.i18n.getMessage("causeArea")}</span>
      <Select {...props} input={<SelectInput />}>
        <MenuItem value="covid">{browser.i18n.getMessage("covid")}</MenuItem>
        <MenuItem value="extreme_poverty">{browser.i18n.getMessage("povertyAndHealth")}</MenuItem>
        <MenuItem value="animals">{browser.i18n.getMessage("reductionAnimalSuffering")}</MenuItem>
      </Select>
    </div>
  )
}
