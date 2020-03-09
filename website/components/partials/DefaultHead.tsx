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
    <meta property="og:image" content="http://altruisto.com/img/fb-cover6.png" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@altruistocom" />
    <meta name="twitter:creator" content="@altruistocom" />
    <meta name="twitter:title" content="Fight poverty, illness, deaths, while shopping online" />
    <meta
      name="twitter:description"
      content="Install an extension and when you buy something online, people in extreme poverty will get medicines, bed nets, or financial aid."
    />
    <meta name="twitter:image" content="http://altruisto.com/img/fb-cover6.png" />

    <link rel="preconnect" href="https://fonts.googleapis.com/" />
    <link
      href="https://fonts.googleapis.com/css?family=PT+Sans:300,400,700&display=swap&subset=latin-ext"
      rel="stylesheet"
    />
  </Head>
)
