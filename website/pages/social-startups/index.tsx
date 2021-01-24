import { WithSmallCoverLayout } from "../../components/layouts/WithSmallCoverLayout"
import { apiUrl } from "../../utils/api-url"
import { useState, useEffect } from "react"
import { cpus } from "os";
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
                            borderRadius: "50%"
                          }}
                        />
                        <span className="mr-2">
                          {founder.name}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="col-12 col-md-2 row justify-content-md-center justify-content-start">
                <a href={startup.link} target="_blank" className="col-12 text-md-center text-start mt-3 mb-3 mt-md-0 mb-md-0 px-0 .link">
                  VISIT WEBSITE
                </a>
                <div className="col-12 row justify-content-md-center justify-content-start flex-nowrap mt-3 mb-2 mt-md-0 mb-md-0 px-0">
                  {startup.social && startup.social.facebook ? (
                    <a href={startup.social.facebook} target="_blank" className="mx-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="20"
                        viewBox="0 0 24 20"
                        className="footer__icon"
                      >
                        <path
                          fill="#9BAAB8"
                          fillRule="evenodd"
                          d="M24 2.368a9.617 9.617 0 0 1-2.827.794A5.038 5.038 0 0 0 23.338.37a9.698 9.698 0 0 1-3.129 1.223A4.856 4.856 0 0 0 16.616 0c-2.718 0-4.922 2.26-4.922 5.049 0 .396.042.78.126 1.15C7.728 5.988 4.1 3.979 1.67.922a5.14 5.14 0 0 0-.666 2.54c0 1.751.87 3.297 2.19 4.203a4.834 4.834 0 0 1-2.23-.63v.062c0 2.447 1.697 4.488 3.95 4.95a4.695 4.695 0 0 1-1.296.178c-.317 0-.627-.03-.927-.09.626 2.006 2.444 3.466 4.599 3.505A9.722 9.722 0 0 1 0 17.733 13.71 13.71 0 0 0 7.548 20c9.058 0 14.01-7.692 14.01-14.365 0-.22-.005-.439-.013-.654.962-.712 1.797-1.6 2.455-2.613"
                        />
                      </svg>
                    </a>
                  ) : null}
                  {startup.social && startup.social.twitter ? (
                    <a href={startup.social.twitter} target="_blank" className="mx-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="footer__icon"
                      >
                        <path
                          fill="#9BAAB8"
                          fillRule="evenodd"
                          d="M12.82 24H1.324A1.325 1.325 0 0 1 0 22.675V1.325C0 .593.593 0 1.325 0h21.35C23.407 0 24 .593 24 1.325v21.35c0 .732-.593 1.325-1.325 1.325H16.56v-9.294h3.12l.466-3.622H16.56V8.77c0-1.048.29-1.763 1.795-1.763h1.918v-3.24c-.332-.045-1.47-.143-2.795-.143-2.766 0-4.659 1.688-4.659 4.788v2.67H9.692v3.623h3.127V24z"
                        />
                      </svg>
                    </a>
                  ) : null}
                  {startup.social && startup.social.instagram ? (
                    <a href={startup.social.instagram} target="_blank"  className="mx-3">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg"
                        height="24" 
                        width="24" 
                        viewBox="0 0 512 512" 
                        className="footer__icon"
                      >                         
                        <path
                          fill="#9BAAB8"
                          fillRule="evenodd"
                          d="m437 0h-362c-41.351562 0-75 33.648438-75 75v362c0 41.351562 33.648438 75 75 75h362c41.351562 0 75-33.648438 75-75v-362c0-41.351562-33.648438-75-75-75zm-180 390c-74.441406 0-135-60.558594-135-135s60.558594-135 135-135 135 60.558594 135 135-60.558594 135-135 135zm150-240c-24.8125 0-45-20.1875-45-45s20.1875-45 45-45 45 20.1875 45 45-20.1875 45-45 45zm0 0"/>
                        <path 
                          fill="#9BAAB8"
                          fillRule="evenodd"
                          d="m407 90c-8.277344 0-15 6.722656-15 15s6.722656 15 15 15 15-6.722656 15-15-6.722656-15-15-15zm0 0"/>
                        <path 
                          fill="#9BAAB8"
                          fillRule="evenodd"
                          d="m257 150c-57.890625 0-105 47.109375-105 105s47.109375 105 105 105 105-47.109375 105-105-47.109375-105-105-105zm0 0"/>
                      </svg>
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
