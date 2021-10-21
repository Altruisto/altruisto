import React, { FunctionComponent, useEffect, useState } from "react"
import { IntlProvider } from "react-intl"
import { en } from "./strings/en"
import { pl } from "./strings/pl"

const getMessages = (language: string) => {
  // because Safari uses notation pl-pl, I used regex test instead of checking hardcoded string
  if (/^en\b/.test(language)) {
    return en
  } else if (/^pl\b/.test(language)) {
    return pl
  }
  return en
}

const TranslationsProvider: FunctionComponent<any> = ({ children }) => {
  // logic for storing language preference in localStorage or recognizing browser's language ()
  let language = localStorage.getItem("lang")
  if (!language) {
    language = navigator.language
    localStorage.setItem("lang", language)
  }

  return (
    <IntlProvider locale={language} messages={getMessages(language)}>
      {children}
    </IntlProvider>
  )
}

export default TranslationsProvider
