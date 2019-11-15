import React from "react"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import { SelectInput } from "../../ui/SelectInput"
export const CauseArea = props => {
  return (
    <div className="settings__option settings__option--vertical">
      <span className="settings__label">Cause area</span>
      <Select {...props} input={<SelectInput />}>
        <MenuItem value="extreme_poverty">
          Extreme Poverty &amp; Global Health
        </MenuItem>
        <MenuItem value="animals">Animals Suffering Reduction</MenuItem>
      </Select>
    </div>
  )
}
