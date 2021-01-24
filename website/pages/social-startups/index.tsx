import { WithSmallCoverLayout } from "../../components/layouts/WithSmallCoverLayout"
import { apiUrl } from "../../utils/api-url"
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
    > <div className="partners__search-wrapper input-group">
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

export default SocialStartups
