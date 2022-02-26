import { StandardLayout } from "../../components/layouts"
import React from "react"

const ThankYou = () => {
  return (
    <StandardLayout withMenu={true} withoutMenuBorder={true}>
      <div
        style={{
          height: "546px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          marginTop: "124px",
          maxWidth: "1189px",
          margin: "0 auto",
          borderRadius: "8px",
          padding: "0 20px"
        }}
      >
        <div
          style={{
            flex: 1,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            color: "white",
            backgroundColor: "#005BBB",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px"
          }}
        >
          <p
            style={{
              marginLeft: "100px",
              fontWeight: 700,
              fontSize: "16px",
              marginBottom: 0,
              lineHeight: "36px"
            }}
          >
            #StandWithUkraine
          </p>
          <p style={{ marginLeft: "100px", fontSize: "48px", fontWeight: 400, lineHeight: "50px" }}>
            Thank you for your support!
          </p>
        </div>
        <div
          style={{
            flex: 1,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: "#FFD500",
            borderBottomLeftRadius: "8px",
            borderBottomRightRadius: "8px"
          }}
        >
          <button
            className="button button--gray"
            style={{ maxWidth: "270px", marginLeft: "100px" }}
          >
            Back to homepage
          </button>
        </div>
      </div>
    </StandardLayout>
  )
}

export default ThankYou
