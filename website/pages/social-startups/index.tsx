import { WithSmallCoverLayout } from "../../components/layouts/WithSmallCoverLayout"
import { apiUrl } from "../../utils/api-url"
import { useState, useEffect } from "react"
import { cpus } from "os";

const startupsList = [
  {
    name: "Altruisto",
    logo: "https://altruisto.com/images/logo.svg",
    description:
      "Altruisto.com is a browser extension that allows users to collect money for extremely effective charities while shopping online. It works with 1000+ shops including Aliexpress, Barnes & Noble, Booking.com, eBay, Etsy and Microsoft. For every $4.59 raised for Against Malaria Foundation two people are protected from malaria (via bed nets) and for every $0.99 raised for Schistosomiasis Control Initiative one child gets a year supply of antiparasitic medicine.",
    link: "https://altruisto.com",
    social: {
      facebook: "https://facebook.com/altruistocom",
      twitter: "https://twitter.com/altruistocom",
      instagram: "https://instagram.com/altruistocom"
    },
    founders: [
      {
        name: "Daniel Wyrzykowski",
        img:
          "https://images.prismic.io/altruisto/6f7d02e0-f45c-48af-b899-fb0a0e2fd836_121617059_4656915421017775_8055769448875628569_n.jpg?auto=compress,format"
      }
    ]
  },
  {
    name: "Andela",
    logo:
      "https://3xyh3sqxv063a8xzo5uk2zn1-wpengine.netdna-ssl.com/wp-content/uploads/2016/01/Andela-logo-landscape-blue-400px.png",
    description:
      "Recruits and manages African tech talent (developers) and integrates them into world leading tech companies. Backed by Chan Zuckerberg Iniative.",
    link: "https://andela.com",
    social: {
      facebook: "https://www.facebook.com/thisisandela"
    },
    founders: [
      {
        name: "Christina Saas",
        img:
          "https://3xyh3sqxv063a8xzo5uk2zn1-wpengine.netdna-ssl.com/wp-content/uploads/2017/06/Christina-Sass.jpg"
      },
      {
        name: "Jeremy Johnson",
        img:
          "https://3xyh3sqxv063a8xzo5uk2zn1-wpengine.netdna-ssl.com/wp-content/uploads/2017/06/Jeremy@600x600.jpg"
      }
    ]
  }
]

const SocialStartups = () => {
  const [searchPhrase, setSearchPhrase] = useState("")
  const [searchedStartupsList, setSearchedStartupList] = useState(startupsList)

  useEffect(() => {
    if (searchPhrase !== "") {
      setSearchedStartupList(() => 
          startupsList.filter((v) => v.name.toLowerCase().includes(searchPhrase.toLowerCase()))
      )
    }
  }, [searchPhrase])

  return (
    <WithSmallCoverLayout
      title="50+ Inspiring Social Start-ups That Are Making The World Better"
      noCta
    >
      <input
        value={searchPhrase}
        onChange={(event) => {
          setSearchPhrase(event.currentTarget.value)
        }}
      />
      <div className="d-flex flex-column">
        {searchedStartupsList.map((startup) => {
          return (
            <div className="d-flex flex-row">
              <img src={startup.logo} style={{ maxWidth: 200 }} />
              <div style={{ maxWidth: 400 }}>
                <h2>{startup.name}</h2>
                <p>{startup.description}</p>
                {startup.founders && startup.founders.length > 0 ? (
                  <div className="d-flex flex-row">
                    {startup.founders.map((founder) => (
                      <div key={founder.name}>
                        <img
                          src={founder.img}
                          style={{
                            maxWidth: 40,
                            width: 40,
                            maxHeight: 40,
                            height: 40,
                            borderRadius: "50%"
                          }}
                        />
                        &nbsp;
                        {founder.name}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>

              <div>
                <a href={startup.link} target="_blank">
                  VISIT WEBSITE
                </a>
                <div className="d-flex flex-row">
                  {startup.social && startup.social.facebook ? (
                    <a href={startup.social.facebook} target="_blank">
                      Facebook
                    </a>
                  ) : null}
                  {startup.social && startup.social.twitter ? (
                    <a href={startup.social.twitter} target="_blank">
                      Twitter
                    </a>
                  ) : null}
                  {startup.social && startup.social.instagram ? (
                    <a href={startup.social.instagram} target="_blank">
                      <img
                        src="https://prismic-io.s3.amazonaws.com/altruisto/edcfcc0d-ea0e-4f9b-8214-bcd02650467f_instagram.svg"
                        alt="Instagram icon"
                        title="Instagram icon"
                        style={{ width: 18, height: 18 }}
                      />
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <hr />
    </WithSmallCoverLayout>
  )
}

export default SocialStartups
