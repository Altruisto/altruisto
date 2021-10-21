import { browser } from "webextension-polyfill-ts"
import React from "react"
import MenuItem from "@material-ui/core/MenuItem"
import Select, { SelectProps } from "@material-ui/core/Select"
import { SelectInput } from "../../ui/SelectInput"
import { withStyles } from "@material-ui/core/styles"

const CurrencyInput = withStyles(() => ({
  root: {
    width: "auto"
  },
  input: {
    width: "auto",
    fontSize: 14
  }
}))(SelectInput)

export const Currency = (props: SelectProps) => {
  return (
    <div className="settings__option">
      <span className="settings__label">{browser.i18n.getMessage("currency")}</span>
      <Select {...props} input={<CurrencyInput />}>
        <MenuItem value="USD">USD</MenuItem>
        <MenuItem value="EUR">EUR</MenuItem>
        <MenuItem value="GBP">GBP</MenuItem>
        <MenuItem value="NOK">NOK</MenuItem>
        <MenuItem value="PLN">PLN</MenuItem>
      </Select>
    </div>
  )
}
