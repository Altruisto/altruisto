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
                The voucher must be activated through a web page and will give access to the ABA
                English web campus. Afterward, you can download the app and log in with the same
                credentials of the web platform. The course experience can be fully enjoyed both via
                the app and the desktop campus.
              </p>
              <p>
                <strong>Step 1</strong>
                <br />
                Go to{" "}
                <a href="https://www.abaenglish.com/landing/abafan-12-en" target="_blank">
                  www.abaenglish.com/landing/abafan-12-en
                </a>
                . Through this URL, you will activate an account in the English language. To
                activate an account in a different language, you must pass through a different
                landing:
                <ul>
                  <li>
                    <a href="https://www.abaenglish.com/landing/abafan-12-en" target="_blank">
                      English
                    </a>
                  </li>
                  <li>
                    <a href="https://www.abaenglish.com/landing/abafan-12-es" target="_blank">
                      Spanish
                    </a>
                  </li>
                  <li>
                    <a href="https://www.abaenglish.com/landing/abafan-12-fr" target="_blank">
                      French
                    </a>
                  </li>
                  <li>
                    <a href="https://www.abaenglish.com/landing/abafan-12-it" target="_blank">
                      Italian
                    </a>
                  </li>
                  <li>
                    <a href="https://www.abaenglish.com/landing/abafan-12-pr" target="_blank">
                      Portuguese
                    </a>
                  </li>
                </ul>
              </p>
              <p>
                <strong>Step 2</strong>
                <br />
                Click on <u>12 months</u>.
                <img
                  src="/images/fundraiser/aba-sc-1.png"
                  alt="Step 2"
                  style={{ maxWidth: "100%" }}
                />
              </p>
              <p>
                <strong>Step 3</strong>
                <br />
                Fill the form with the user information and the coupon code in the last line.
                <img
                  src="/images/fundraiser/aba-sc-2.png"
                  alt="Step 3"
                  style={{ maxWidth: "100%" }}
                />
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
