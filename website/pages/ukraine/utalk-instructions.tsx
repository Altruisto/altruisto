import { StandardLayout } from "../../components/layouts"
import React, { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import "../../lib/canvas-confetti/confetti"

const AbaInstrictions = () => {
  const router = useRouter()

  if (!router.query.code) {
    return (
      <StandardLayout withMenu={true} withoutMenuBorder={true}>
        <main className="ukraine">
          <div className="ukraine__centered-content ukraine__overlap-content">
            <div className="ukraine__info" style={{ maxWidth: 700 }}>
              Something went wrong, please go to the link you have received in the email message
              after your donation and claim your ABA English access again.
            </div>
          </div>
        </main>
      </StandardLayout>
    )
  }

  return (
    <StandardLayout withMenu={true} withoutMenuBorder={true}>
      <main className="ukraine">
        <div className="ukraine__centered-content ukraine__overlap-content">
          <div className="ukraine__info" style={{ maxWidth: 700 }}>
            <div style={{ marginBottom: 40 }}>
              <h2>How to access your ABA English:</h2>
            </div>
            <div>
              Your coupon code is: <input type="text" value={router.query.code} readOnly />
              <hr />
            </div>
            <div>
              <p>
                1. Visit{" "}
                <a href="https://utalk.com/start" target="_blank">
                  https://utalk.com/start
                </a>
                <br />
                2. Enter the code.
                <br />
                3. Enter the email address for your uTalk account.
                <br />
                4. Choose the language you would like to unlock.
                <br />
                5. Enter your name and password.
                <br />
                6. Press "Confirm Details"
                <br />
                7. Download the app and log in with your newly created uTalk Email and Password to
                access your chosen language.
                <br />
              </p>
            </div>
            <div className=""></div>
          </div>
        </div>
      </main>
    </StandardLayout>
  )
}

export default AbaInstrictions
