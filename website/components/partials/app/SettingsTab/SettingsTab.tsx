import React from "react"
import dynamic from "next/dynamic"
import { UserDetails } from "pages/app"
import { useSnackbar } from "notistack"
import { withStyles } from "@material-ui/core/styles"
import MenuItem from "@material-ui/core/MenuItem"
import { Loader } from "components/ui/Loader"
import { useAuth } from "hooks/use-auth"
import { CauseArea } from "../../../../../shared/types/user"
import { api } from "utils/api-url"
import { useRouter } from "next/router"

const Select = dynamic(() => import("@material-ui/core/Select"), {
  ssr: false
})

const InputBase = dynamic(() => import("@material-ui/core/InputBase"), {
  ssr: false
})

const SelectInput = withStyles(theme => ({
  root: {
    width: "100%"
  },
  input: {
    borderRadius: "6px !important",
    position: "relative",
    color: "#3a4c5a!important",
    backgroundColor: "#fff!important",
    border: "2px solid #f6f7fb!important",
    fontSize: 12,
    padding: "9px 31px 8px 12px!important",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderRadius: 6,
      borderColor: "#f6f7fb!important",
      backgroundColor: "#fff!important"
    }
  }
}))(InputBase)

type Props = {
  userDetails: UserDetails
  refreshUserDetails?: () => void
}

const SettingsTab: React.FC<Props> = ({ userDetails, refreshUserDetails }) => {
  const { enqueueSnackbar } = useSnackbar()
  const auth = useAuth()
  const router = useRouter()

  // @TODO: get this function from auth
  const handleLogout = () => {
    localStorage.setItem("user", null)
    enqueueSnackbar("You have been logged out.", { variant: "success" })
    setTimeout(() => {
      router.push("/login")
    }, 400)
  }

  const handleChangeCauseArea = async (newValue: CauseArea) => {
    if (auth) {
      const currentSettings = {
        email: auth.user.email,
        currency: userDetails.currency
      }
      const payload = { ...currentSettings, causeArea: newValue }
      try {
        await api.patch("/user", payload, {
          headers: {
            "X-AUTH-TOKEN": auth.user.apiKey
          }
        })
        refreshUserDetails()
      } catch (e) {
        enqueueSnackbar("Something went wrong. Please try again in a moment.", {
          variant: "error"
        })
      }
    }
  }

  if (userDetails === null) {
    return (
      <div className="mobile-app__content text-center">
        <Loader color="red" />
      </div>
    )
  }

  return (
    <div className="mobile-app__content">
      <h3>Settings</h3>
      <span className="settings__label pt-4">Cause area</span>
      <Select
        value={userDetails.causeArea}
        input={<SelectInput />}
        onChange={event => handleChangeCauseArea(event.target.value as CauseArea)}
      >
        <MenuItem value="covid">COVID-19</MenuItem>
        <MenuItem value="extreme_poverty">Extreme Poverty &amp; Global Health</MenuItem>
        <MenuItem value="animals">Reduction of Animal Suffering</MenuItem>
      </Select>
      <button className="button-link uppercase-link mt-4" onClick={handleLogout}>
        LOG OUT
      </button>
    </div>
  )
}

export default SettingsTab
