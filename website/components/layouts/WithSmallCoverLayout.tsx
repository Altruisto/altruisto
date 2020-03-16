import { StandardLayout } from "./StandardLayout"

type Props = {
  title?: string
  noCta?: boolean
}

export const WithSmallCoverLayout: React.FC<Props> = ({ title = "", children, noCta = false }) => (
  <StandardLayout noCta={noCta}>
    <div
      className="cover cover--small with-overlay"
      style={{ backgroundImage: "url(/images/default-small-cover.jpg)" }}
    >
      <h1>{title}</h1>
    </div>
    <div className="container pt-4 fill-height">{children}</div>
  </StandardLayout>
)
