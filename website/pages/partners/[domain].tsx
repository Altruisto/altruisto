import { NextPage } from "next"
import Select from "react-select"
import { api, apiUrl } from "../../utils/api-url"
import { WithSmallCoverLayout } from "../../components/layouts/WithSmallCoverLayout"
import { useState } from "react"
import Link from "next/link"

type Props = {
  name: string
  domain: string
  logoUrl?: string
  donation?: string
  error?: boolean
}

const Partner: NextPage<Props> = ({ name, domain, logoUrl, donation, error }) => {
  const causeAreaOptions = [
    { value: "extreme_poverty", label: "People in extreme poverty" },
    { value: "animals", label: "Reduce animal suffering" }
  ]
  const [selectedCauseArea, setSelectedCauseArea] = useState(causeAreaOptions[0])

  return (
    <WithSmallCoverLayout title="Partner details" noCta>
      <>
        <div className="partners__details-box">
          <img
            src={logoUrl || "/images/placeholder.png"}
            className="partners__logo"
            alt={`${name} logo`}
            title={`${name} logo`}
          />
          <div className="partners__info">
            {!logoUrl ? <h2>{domain}</h2> : null}
            {donation && (
              <h4>
                <span className="text-gradient">{Number(donation) * 100}%</span> donated to
                charities from every purchase
              </h4>
            )}
          </div>
          <div>
            <a
              href={`${apiUrl}/redirect?url=https://${domain}&tracker=-${selectedCauseArea.value}-detailsPage`}
              className="button partners__button"
            >
              Click here to activate donation
            </a>
          </div>
        </div>
        <div className="partners__content">
          <div className="partners__content-title">
            <h2>You can collect money for charities</h2>
            <h2>
              by shopping in <span className="text-gradient">{name}</span>
            </h2>
            <div className="column-center mt-5 pt-3">
              <h4>I want to help:</h4>
              <div className="partners__causeArea">
                <Select
                  value={selectedCauseArea}
                  onChange={v => setSelectedCauseArea(v)}
                  options={causeAreaOptions}
                />
              </div>
              <a
                href={`${apiUrl}/redirect?url=https://${domain}&tracker=-${selectedCauseArea.value}-detailsPage`}
                className="button partners__button mt-3"
              >
                Go to {domain} and start helping
              </a>
            </div>
            <div className="mt-5 pt-3">
              <div className="col-12 col-md-6 offset-md-3">
                <h4>How it works</h4>
                <p>
                  When you go to selected store through our website, portion of the money you spend
                  will be donated to carefully selected charities.{" "}
                  <strong>There are no extra costs for you</strong>, the donation is fully covered
                  by to shop. The donation is usually between 2-6% of the final product's price.
                </p>
                <p>
                  <Link href="/">
                    <a className="text-gradient">Find out more</a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    </WithSmallCoverLayout>
  )
}

Partner.getInitialProps = ({ query }) => {
  return api
    .get(`/partners/${query.domain}`)
    .then(response => {
      return {
        ...response.data,
        logoUrl: response.data.logo_url
      }
    })
    .catch(() => ({ error: true }))
}

export default Partner
