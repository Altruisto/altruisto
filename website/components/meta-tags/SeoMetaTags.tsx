import * as React from "react"

export type SeoMetaTags = {
  title?: string
  description?: string
  keywords?: string
}

const SeoMetaTags: React.FC<SeoMetaTags> = ({
  title = "altruisto.com - Do good while shopping online",
  description = "Install an extension and when you buy something online, people in extreme poverty will get medicines, bed nets, or financial aid.",
  keywords = "browser extension, chrome, firefox, charity, charities, extreme poverty, malaria, schistosomiasis"
}) => (
  <>
    {description && <meta name="description" content={description} />}
    {keywords && <meta name="keywords" content={keywords} />}
  </>
)

export default SeoMetaTags
