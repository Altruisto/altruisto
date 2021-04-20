import * as React from "react"
import Head from "next/head"
import { OgMetaTags as OgMetaTagsProps } from "components/meta-tags/OgMetaTags"
import { SeoMetaTags as SeoMetaTagsProps } from "components/meta-tags/SeoMetaTags"
import { TwitterMetaTags as TwitterMetaTagsProps } from "../meta-tags/TwitterMetaTags"

export type MetaTags = {
  seoMetaTags?: SeoMetaTagsProps
  ogMetaTags?: OgMetaTagsProps
  twitterMetaTags?: TwitterMetaTagsProps
}

export const DefaultHead: React.FC<MetaTags> = ({
  seoMetaTags = {},
  ogMetaTags = {},
  twitterMetaTags = {}
}) => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
    <title key="title">
      {seoMetaTags.title || "altruisto.com - Do good while shopping online"}
    </title>
    {seoMetaTags.description && <meta name="description" content={seoMetaTags.description} />}
    {seoMetaTags.keywords && <meta name="keywords" content={seoMetaTags.keywords} />}

    {ogMetaTags.url && <meta property="og:url" content={ogMetaTags.url} />}
    {ogMetaTags.title && <meta property="og:title" content={ogMetaTags.title} />}
    {ogMetaTags.description && <meta property="og:description" content={ogMetaTags.description} />}
    {ogMetaTags.image && <meta property="og:image" content={ogMetaTags.image} />}

    {twitterMetaTags.card && <meta name="twitter:card" content={twitterMetaTags.card} />}
    {twitterMetaTags.site && <meta name="twitter:site" content={twitterMetaTags.site} />}
    {twitterMetaTags.creator && <meta name="twitter:creator" content={twitterMetaTags.creator} />}
    {twitterMetaTags.title && <meta name="twitter:title" content={twitterMetaTags.title} />}
    {twitterMetaTags.description && (
      <meta name="twitter:description" content={twitterMetaTags.description} />
    )}
    {twitterMetaTags.image && <meta name="twitter:image" content={twitterMetaTags.image} />}
    {twitterMetaTags.alt && <meta name="twitter:image:alt" content={twitterMetaTags.alt} />}
    <meta name="apple-mobile-web-app-title" content="Altruisto" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="theme-color" content="#e70f74" />
    <link rel="apple-touch-icon" sizes="1024x1024" href="/assets/pwa/ios/icon_1024x1024.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/assets/pwa/ios/icon_180x180.png" />
    <link rel="apple-touch-icon" sizes="167x167" href="/assets/pwa/ios/icon_167x167.png" />
    <link rel="apple-touch-icon" sizes="152x152" href="/assets/pwa/ios/icon_152x152.png" />
    <link rel="apple-touch-icon" sizes="120x120" href="/assets/pwa/ios/icon_120x120.png" />

    {/* generated with https://github.com/arthurbergmz/webpack-pwa-manifest  */}
    <link rel="manifest" href="/assets/manifest.json" />

    {/* generated with https://appsco.pe/developer/splash-screens */}
    <link
      href="/assets/pwa/ios/splashscreens/iphone5_splash.png"
      media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
      rel="apple-touch-startup-image"
    />
    <link
      href="/assets/pwa/ios/splashscreens/iphone6_splash.png"
      media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
      rel="apple-touch-startup-image"
    />
    <link
      href="/assets/pwa/ios/splashscreens/iphoneplus_splash.png"
      media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)"
      rel="apple-touch-startup-image"
    />
    <link
      href="/assets/pwa/ios/splashscreens/iphonex_splash.png"
      media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
      rel="apple-touch-startup-image"
    />
    <link
      href="/assets/pwa/ios/splashscreens/iphonexr_splash.png"
      media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
      rel="apple-touch-startup-image"
    />
    <link
      href="/assets/pwa/ios/splashscreens/iphonexsmax_splash.png"
      media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"
      rel="apple-touch-startup-image"
    />
    <link
      href="/assets/pwa/ios/splashscreens/ipad_splash.png"
      media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
      rel="apple-touch-startup-image"
    />
    <link
      href="/assets/pwa/ios/splashscreens/ipadpro1_splash.png"
      media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)"
      rel="apple-touch-startup-image"
    />
    <link
      href="/assets/pwa/ios/splashscreens/ipadpro3_splash.png"
      media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)"
      rel="apple-touch-startup-image"
    />
    <link
      href="/assets/pwa/ios/splashscreens/ipadpro2_splash.png"
      media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
      rel="apple-touch-startup-image"
    />

    <link rel="preconnect" href="https://fonts.googleapis.com/" />
    <link
      href="https://fonts.googleapis.com/css?family=PT+Sans:300,400,700&display=swap&subset=latin-ext"
      rel="stylesheet"
    />

    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: `
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Altruisto",
        "alternateName": "Altruisto.com",
        "url": "Altruisto.com",
        "logo": "https://altruisto.com/images/logo.svg",
        "sameAs": [
          "https://facebook.com/AltruistoCom",
          "https://twitter.com/AltruistoCom"
        ]
      }
    `
      }}
    ></script>
  </Head>
)
