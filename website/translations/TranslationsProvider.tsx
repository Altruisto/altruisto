import React, { FunctionComponent } from "react"
import { IntlProvider } from "react-intl"
import { en } from "./strings/en"

const TranslationsProvider: FunctionComponent<any> = ({ children }) => {
  // logic for storing language preference in localStorage or recognizing browser's language ()

  return (
    <IntlProvider locale={"en"} messages={en}>
      {children}
    </IntlProvider>
  )
}

export default TranslationsProvider
