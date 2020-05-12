import { WithSmallCoverLayout } from "../../components/layouts/WithSmallCoverLayout"
import { apiUrl } from "../../utils/api-url"

const KerrysPage = () => (
  <WithSmallCoverLayout title="Kerry's page" noCta>
    <div className="d-flex flex-row justify-content-between align-items-center">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/4/48/EBay_logo.png"
        className="partners__logo"
        alt={`ebay's logo`}
        title={`ebay's logo`}
      />
      <div>
        <a
          href={`${apiUrl}/redirect?url=https://ebay.com&tracker=1837542q-early_research-fam`}
          className="button partners__button"
        >
          Click here to activate donation
        </a>
      </div>
    </div>
    <hr />
  </WithSmallCoverLayout>
)

export default KerrysPage
