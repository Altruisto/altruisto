import Head from "next/head"

export const DefaultHead = props => (
  <Head>
    <title key="title">altruisto.com - Do good while shopping online</title>

    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
    <meta
      name="keywords"
      content="browser extension, chrome, firefox, charity, charities, extreme poverty, malaria, schistosomiasis"
    />
    <meta
      name="description"
      content="Install an extension and when you buy something online, people in extreme poverty will get medicines, bed nets, or financial aid."
    />
    <meta property="og:url" content="https://altruisto.com" />
    <meta property="og:title" content="Do good just by shopping online" />
    <meta
      property="og:description"
      content="Install an extension and when you buy something online,
people in extreme poverty will get medicines, bed nets, or financial aid."
    />
    <meta property="og:image" content="https://altruisto.com/images/social-media-cover.png" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@altruistocom" />
    <meta name="twitter:creator" content="@altruistocom" />
    <meta name="twitter:title" content="Fight poverty, illness, deaths, while shopping online" />
    <meta
      name="twitter:description"
      content="Install an extension and when you buy something online, people in extreme poverty will get medicines, bed nets, or financial aid."
    />
    <meta name="twitter:image" content="https://altruisto.com/images/social-media-cover.png" />

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
