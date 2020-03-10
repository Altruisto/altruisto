import { useState, useEffect } from "react"
import { NextPage } from "next"
import Link from "next/link"
import { isMobile } from "react-device-detect"
import { WithSmallCoverLayout } from "../../components/layouts/WithSmallCoverLayout"
import { api } from "../../utils/api-url"
import { GetPartnersResponse } from "../../../shared/types/api"
import { groupAplabetically } from "../../utils/group-alphabetically"
import { splitToEqualChunks } from "../../utils/split-to-equal-chunks"

type Partner = { name: string; domain: string }

type Props = {
  partners: Partner[]
  error?: boolean
}

const PartnersIndex: NextPage<Props> = ({ partners }) => {
  const [searchPhrase, setSearchPhrase] = useState("")
  const [searchedPartners, setSearchedPartners] = useState(partners)
  useEffect(() => {
    if (searchPhrase) {
      setSearchedPartners(
        partners.filter(
          partner =>
            partner.name.toUpperCase().includes(searchPhrase.toUpperCase()) ||
            partner.domain.toUpperCase().includes(searchPhrase.toUpperCase())
        )
      )
    }
  }, [searchPhrase, partners])

  const groupedPartners = searchPhrase
    ? { "Search results": searchedPartners }
    : groupAplabetically(partners, "name")
  return (
    <WithSmallCoverLayout title="Partners List">
      <div className="partners__search-wrapper input-group">
        <input
          type="text"
          className="partners__search-input"
          placeholder="Search..."
          value={searchPhrase}
          onChange={e => setSearchPhrase(e.target.value)}
        />
        <div className="input-group-append">
          <button className="partners__search-button" type="button">
            <img src="/images/search.svg" title="search icon" alt="search icon" />
          </button>
        </div>
      </div>

      {Object.entries(groupedPartners).map(([group, partnersInGroup], index) => {
        const columns = isMobile
          ? splitToEqualChunks(partnersInGroup as any, 2)
          : splitToEqualChunks(partnersInGroup as any, 3)
        return (
          <>
            <h2 className="mt-3">{group}</h2>
            <div className="row">
              {columns.map(partnersInColumn => (
                <div className="col-6 col-md-4">
                  {partnersInColumn.map(partner => (
                    <>
                      <Link href={"/partners/" + partner.domain} key={partner.domain}>
                        <a>{partner.name}</a>
                      </Link>
                      <br />
                    </>
                  ))}
                </div>
              ))}
            </div>
          </>
        )
      })}
    </WithSmallCoverLayout>
  )
}

PartnersIndex.getInitialProps = () => {
  return api
    .get<GetPartnersResponse>("/partners")
    .then(response => {
      return { partners: response.data.map(p => ({ name: p.name, domain: p.domain })) }
    })
    .catch(() => ({ partners: [], error: true }))
}

export default PartnersIndex
