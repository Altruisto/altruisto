import { DefaultHead } from "../components/partials/DefaultHead"

const Waiting = () => (
  <>
    <DefaultHead />
    <div className="container pt-4">
      <div className="row">
        <div
          className="col-12 col-md-6 order-2 order-md-1"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh"
          }}
        >
          <img
            src="images/new-altruisto-screenshot.png"
            alt="new Altruisto"
            className="img-responsive"
            style={{ maxWidth: "300px", boxShadow: "0 10px 50px 0 rgba(0, 0, 0, 0.15);" }}
          />
        </div>
        <div
          className="col-12 col-md-6 order-1 order-md-2"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            minHeight: "100vh"
          }}
        >
          <h1 style={{ marginBottom: "30px" }}>We are building new Altruisto</h1>
          <h2 style={{ marginBottom: "10px" }}>It's going to be available in the next few weeks</h2>
          <h3 style={{ marginBottom: "10px", textAlign: "left", width: "100%;" }}>
            Sign up to be notified when we're ready!
          </h3>
          <form
            role="form"
            action="//imprific.us11.list-manage.com/subscribe/post?u=f12e591f7f693dc0afcd3f188&amp;id=0c047e44bf"
            method="post"
            style={{ marginTop: "20px", width: "100%;" }}
          >
            <input
              type="email"
              name="EMAIL"
              className="form-control"
              placeholder="Enter your main e-mail address..."
              required={true}
              style={{ maxWidth: "300px", padding: "20px 10px", marginBottom: "10px;" }}
            />
            <button
              className="button"
              type="submit"
              style={{ width: "300px", maxWidth: "100%", marginTop: "10px" }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  </>
)

export default Waiting
