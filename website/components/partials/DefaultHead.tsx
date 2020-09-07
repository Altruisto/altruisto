import * as React from "react"
import Head from "next/head"
import OgMetaTags, { OgMetaTags as OgMetaTagsProps } from "components/meta-tags/OgMetaTags"
import SeoMetaTags, { SeoMetaTags as SeoMetaTagsProps } from "components/meta-tags/SeoMetaTags"
import TwitterMetaTags, {
  TwitterMetaTags as TwitterMetaTagsProps
} from "../meta-tags/TwitterMetaTags"

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

    <SeoMetaTags {...seoMetaTags} />
    <OgMetaTags {...ogMetaTags} />
    <TwitterMetaTags {...twitterMetaTags} />
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
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: `
      {
        "@context": "https://schema.org/", 
        "@type": "Product", 
        "name": "Altruisto.com",
        "image": "https://lh3.googleusercontent.com/o8AWrVR9SntwZBKGYYTw90gI7Ddw-AYB3GmdpwLj_KNvMyfsj6dfwIoNkmBUtjWceMUQoBwb9A=w128-h128-e365",
        "description": "Raise money for the world's most effective charities through your everyday online shoppings with no extra costs. You can start helping people in extreme poverty with no extra effort or costs. Just install an extension, and when you buy something online, people living in severe poverty will get medicines, bed nets, or financial aid. There are no extra costs for you (the charity donation is covered by our partner stores). We’ve partnered with online stores (including Ebay, Aliexpress, Etsy, Microsoft) to create a unique loyalty program. For every purchase you make in one of our partners’ stores, portion of the money goes to extremely effective, research-backed charities. That way, users can support great causes with no costs, and shops gain clients strongly incentivized to buy from them and not their competition. It works with 1000+ shops including Ebay, Barnes & Noble, Aliexpress, and Etsy. For every $4.85 raised for Against Malaria Foundation two people are protected from malaria (via bed nets) and for every $1.19 raised for Schistosomiasis Control Initiative, one child gets a year supply of medicine. Everyone wins!",
        "brand": "Altruisto",
        "offers": {
          "@type": "Offer",
          "url": "",
          "priceCurrency": "",
          "price": ""
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5",
          "bestRating": "5",
          "worstRating": "1",
          "ratingCount": "7"
        }
      }
    `
      }}
    ></script>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: `
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Altruisto.com",
        "image": "https://altruisto.com/images/logo.svg",
        "@id": "",
        "url": "https://altruisto.com/",
        "telephone": "",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Unit 4e Enterprise Court, Farfield Park",
          "addressLocality": "Rotherham",
          "postalCode": "S63 5DB",
          "addressCountry": "GB"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 53.504505,
          "longitude": -1.325666
        } 
      }
    `
      }}
    ></script>
  </Head>
)
