import * as React from "react"

export type OgMetaTags = {
  url?: string
  title?: string
  description?: string
  image?: string
}

const OgMetaTags: React.FC<OgMetaTags> = ({
  url = "https://altruisto.com",
  title = "Do good just by shopping online",
  description = "Install an extension and when you buy something online, people in extreme poverty will get medicines, bed nets, or financial aid.",
  image = "https://altruisto.com/images/social-media-cover.png"
}) => (
  <>
    {url && <meta property="og:url" content={url} />}
    {title && <meta property="og:title" content={title} />}
    {description && <meta property="og:description" content={description} />}
    {image && <meta property="og:image" content={image} />}
  </>
)

export default OgMetaTags
