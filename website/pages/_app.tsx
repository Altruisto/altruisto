import TranslationsProvider from "translations/TranslationsProvider"
import "../assets/scss/index.scss"

export default function MyApp({ Component, pageProps }) {
  return (
    <TranslationsProvider>
      <Component {...pageProps} />
    </TranslationsProvider>
  )
}
