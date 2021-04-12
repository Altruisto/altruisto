import { WithSmallCoverLayout } from "../../components/layouts/WithSmallCoverLayout"
import { useState, useEffect } from "react"
import startupsList from "./startupsList"

const SocialStartups = () => {
  const [searchPhrase, setSearchPhrase] = useState("")
  const [searchedStartupsList, setSearchedStartupList] = useState(startupsList)

  useEffect(() => {
    if (searchPhrase === "") {
      setSearchedStartupList(startupsList)
    } else {
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
      <div className="partners__search-wrapper input-group">
        <input
          value={searchPhrase}
          className="partners__search-input"
          placeholder="Search..."
          onChange={(event) => {
            setSearchPhrase(event.currentTarget.value)
          }}
        />
      </div>
      <div className="container">
        {searchedStartupsList.map((startup) => {
          return (
            <div className="row justify-content-between mt-5 pb-5" key={startup.name}>
              <div className=" col-12 col-md-3 row align-items-center mt-3 mb-3">
                <img src={startup.logo} className="img-fluid" />
              </div>
              <div className="col-12 col-md-7 row align-items-center mt-2 mb-2">
                <h2>{startup.name}</h2>
                <p>{startup.description}</p>
                {startup.founders && startup.founders.length > 0 ? (
                  <div className="d-flex flex-row">
                    {startup.founders.map((founder) => (
                      <div key={founder.name} className="d-flex flex-row flex-nowrap">
                        <img
                          src={founder.img}
                          className="mr-2"
                          style={{
                            maxWidth: 40,
                            width: 40,
                            maxHeight: 40,
                            height: 40,
                            objectFit: "cover",
                            objectPosition: "35% 15%",
                            borderRadius: "50%"
                          }}
                        />
                        <span className="mr-2">{founder.name}</span>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="col-12 col-md-2 mt-2 row justify-content-md-center justify-content-start">
                <a
                  href={startup.link}
                  target="_blank"
                  className="col-12 text-md-center text-start mt-3 mb-3 mt-md-0 mb-md-0 px-0 .link"
                >
                  VISIT WEBSITE
                </a>
                <div className="col-12 row justify-content-md-center justify-content-start flex-nowrap mt-3 mb-2 mt-md-0 mb-md-0 px-0">
                  {startup.social && startup.social.facebook ? (
                    <a href={startup.social.facebook} target="_blank" className="mx-3">
                      <img src="/images/facebook-gray.svg" className="footer__icon" />
                    </a>
                  ) : null}
                  {startup.social && startup.social.twitter ? (
                    <a href={startup.social.twitter} target="_blank" className="mx-3">
                      <img src="/images/twitter-gray.svg" className="footer__icon" />
                    </a>
                  ) : null}
                  {startup.social && startup.social.instagram ? (
                    <a href={startup.social.instagram} target="_blank" className="mx-3">
                      <img src="/images/instagram-gray.svg" className="footer__icon" />
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
