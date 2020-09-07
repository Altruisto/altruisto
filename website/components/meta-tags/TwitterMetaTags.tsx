import * as React from "react"

export type TwitterMetaTags = {
  card?: string
  site?: string
  creator?: string
  title?: string
  description?: string
  image?: string
  alt?: string
}

const TwitterMetaTags: React.FC<TwitterMetaTags> = ({
  card = "summary_large_image",
  site = "@altruistocom",
  creator = "@altruistocom",
  title = "Fight poverty, illness, deaths, while shopping online",
  description = "Install an extension and when you buy something online, people in extreme poverty will get medicines, bed nets, or financial aid.",
  image = "https://altruisto.com/images/social-media-cover.png",
  alt
}) => (
  <>
    {card && <meta name="twitter:card" content={card} />}
    {site && <meta name="twitter:site" content={site} />}
    {creator && <meta name="twitter:creator" content={creator} />}
    {title && <meta name="twitter:title" content={title} />}
    {description && <meta name="twitter:description" content={description} />}
    {image && <meta name="twitter:image" content={image} />}
    {alt && <meta name="twitter:image:alt" content={alt} />}
  </>
)

export default TwitterMetaTags
