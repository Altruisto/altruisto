import { WithFullCoverLayout } from "../components/layouts/WithFullCoverLayout"

const Welcome = () => (
  <WithFullCoverLayout
    noCta={true}
    coverContent={
      <>
        <h1 className="hero-poster__title">Your voice matters.</h1>
        <h4>
          Help us reach more people who will spread the word.
          <br />
          Let's alleviate suffering together.
        </h4>
        <div className="d-flex flex-row mt-4">
          <a
            className="button mr-3"
            id="share-button-facebook"
            target="_blank"
            href="https://www.facebook.com/sharer/sharer.php?u=https%3A//altruisto.com?ref=welcome_facebook_share"
            style={{ background: "#4267b2!important", borderColor: "#4267b2", minWidth: "200px" }}
          >
            Share on Facebook
          </a>
          <a
            className="button"
            id="share-button-twitter"
            target="_blank"
            href="https://twitter.com/intent/tweet?url=https%3A%2F%2Faltruisto.com%2F%3Fref%3Dwelcome_twitter_share&text=Install%20an%20extension%20and%20when%20you%20buy%20stuff%20online%2C%20people%20in%20extreme%20poverty%20will%20get%20medicines%2C%20bed%20nets%2C%20or%20money%20"
            style={{ background: "#1da1f2!important", borderColor: "#1da1f2", minWidth: "200px" }}
          >
            Share on Twitter
          </a>
        </div>
      </>
    }
  ></WithFullCoverLayout>
)

export default Welcome
