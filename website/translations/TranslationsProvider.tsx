import React, { FunctionComponent, useEffect, useState } from "react"
import { IntlProvider } from "react-intl"
import { en } from "./strings/en"
import { pl } from "./strings/pl"
import navigatorLanguages from "navigator-languages"

const getMessages = (language: string) => {
  // because Safari uses notation pl-pl, I used regex test instead of checking hardcoded string
  if (/^en\b/.test(language)) {
    return en
  } else if (/^pl\b/.test(language)) {
    return pl
  }
  return en
}

const getLanguage = () => {
  // server side rendering should use "en" as default
  if (typeof window === "undefined") {
    return "en"
  }
  let language = localStorage.getItem("lang")
  if (!language) {
    language = navigator.language
    localStorage.setItem("lang", language)
  }
  return language
}

const TranslationsProvider: FunctionComponent<any> = ({ children }) => {
  const language = getLanguage()
  const locale = navigatorLanguages() ? navigatorLanguages()[0] : "en"

  return (
    <IntlProvider locale={locale} messages={getMessages(language)}>
      {children}
    </IntlProvider>
  )
}

export default TranslationsProvider
