import { MinimalLayout } from "../components/layouts/MinimalLayout"

const PrivacyPolicy = () => (
  <MinimalLayout>
    <h1>Privacy Policy</h1>
    <p>
      <i>Last updated: 25.02.2020</i>
    </p>
    <p>
      The privacy of your data - and it is your data, not ours! - is a big deal to us. We’ll only
      ever access your account to help you with a problem or squash a software bug. We do not sell
      your personal information. Ever.
    </p>

    <h4 className="mt-5">Account and identity</h4>
    <p>
      You can use our services both as a registered and an unregistered user. If you are
      unregistered user, we do not attribute your purchases to your device, ip address, or other
      identifiable information and therefore we cannot estimate the amount of your contributions. We
      are also unable to attribute your contributions to specific cause area. All fees from
      purchases made by unregistered users are transferred to charities fighting extreme poverty:
      Against Malaria Foundation, Schistosomiasis Control Initiative, and Give Directly. However, if
      you have installed our software after visiting our website though a “ref-link” (a link to
      https://altruisto.com containing a “ref” query attribute) we will attribute your purchases as
      referred by this “ref-link”.{" "}
    </p>
    <p>
      If you use our services as a registered user, we attribute your purchases to your account
      through the information we receive from the partner shop you have made your purchase with.
      That way we can estimate contributions to charities from your purchases and attribute your
      contributions to cause areas you wish to support.
    </p>
    <p>
      When you install our browser extension it automatically collects information about your
      device, browser, and IP address to make sure that our products work correctly in different
      environments, to make your experience better, and to detect and prevent fraud.
    </p>

    <h4 className="mt-5">Your rights with respect to your information</h4>
    <p>
      Right of Access. This includes your right to access the personal information we gather about
      you, and your right to obtain information about the sharing, storage, security, and processing
      of that information.
    </p>
    <p>
      Right to Correction. This is your right to request correction of your personal information.
    </p>
    <p>
      Right to Erasure. This is your right to request, subject to certain limitations under
      applicable law, that your personal information be erased from our possession (also known as
      “Right to be forgotten”). However, if applicable law requires us to comply with your request
      to delete your information, fulfilment of your request may prevent you from using our services
      and may result in closing your account.
    </p>
    <p>
      Right to Complain. You have the right to make a complaint regarding handling of your personal
      information with the appropriate supervisory authority.
    </p>
    <p>
      Right to Restrict Processing. This is your right to request restriction of how and why your
      personal information is used or processed.
    </p>
    <p>
      Right to Object. This is your right , in certain situations, to object to how and why your
      personal information is processed.
    </p>
    <p>
      Right to Portability. This is your right to receive the personal information we have about you
      and the right to transmit it to another party.
    </p>
    <p>
      Right to not be a subject to Automated Decision-Making. This is your right to object and
      prevent any decision that could have a legal, or similarly significant, effect on you from
      being made solely based on automated processes. This right is limited, however, if the
      decision is necessary for performance of any contract between you and us, is allowed by
      applicable European law, or is based on your explicit consent.
    </p>
    <p>
      We reserve the right to charge a reasonable fee or refuse to comply if the request is
      unfounded, repetitive, or excessive.
    </p>
    <p>Your rights can be exercised by contacting us at privacy@altruisto.com.</p>

    <h4 className="mt-5">Links to other websites</h4>
    <p>
      Please note that we do not own, control, or operate the websites we link to on our website or
      within our browser extension. They have their own privacy policies that you should review.
    </p>

    <h4 className="mt-5">Processors we use</h4>
    <p>
      As part of the services we provide, and only to the extent necessary, we may use certain third
      party processors to process some or all of your personal information. Processors we use:
      <ul>
        <li>Heroku</li>
        <li>Google Analytics</li>
        <li>Facebook</li>
        <li>Sentry</li>
        <li>Sendgrid</li>
      </ul>
    </p>

    <h4 className="mt-5">Security and encryption</h4>
    <p>
      All data is encrypted form via SSL/TLS when transmitted from our servers to your browser, or
      from your browser to our servers. The data isn’t encrypted while it’s live in our database
      (since it needs to be ready to you when you need it), but we go to great lengths to secure
      your data at rest. Your password is always encrypted.
    </p>
    <p>
      Despite our efforts, we cannot guarantee that information you provide us will not be accessed,
      viewed, disclosed, or destroyed as a result of a breach of any our safeguards. You provide us
      with information at your own risk.
    </p>

    <h4 className="mt-5">Cookies</h4>
    <p>
      In order to improve our services and the website, and provide more convenient, relevant
      experiences to you, we and our vendors may use “cookies”, “pixel tags”, “web beacons”, and
      similar technologies to track some of your activities. We use cookies to:
      <ul>
        <li>recognise which user has referred you to us</li>
        <li>recognise from which marketing campaign you have been brought to our website</li>
        <li>
          monitor the traffic on our servers, coordinate marketing campaigns, and perform marketing
          experiments (for example showing different design to different visitors)
        </li>
        <li>analyse users’ behaviours on our website</li>
        <li>gather demographic information about our user base as a whole</li>
        <li>detect and prevent fraud</li>
      </ul>
    </p>

    <h4 className="mt-5">Changes, access, and questions</h4>
    <p>
      We may update this policy once in a blue moon—we’ll notify you about significant changes by
      emailing the account owner or by placing a prominent notice on our website. You can access,
      change, or delete your personal information at any time by contacting Daniel Wyrzykowski at
      privacy@altruisto.com, or by mail at Well Managed World C.I.C., Unit 4e Enterprise Court,
      Farfield Park, Rotherham, South Yorkshire, England, S63 5DB.
    </p>
    <p>
      Questions about this privacy policy? Please contact Daniel Wyrzykowski at
      privacy@altruisto.com, or by mail at Well Managed World C.I.C., Unit 4e Enterprise Court,
      Farfield Park, Rotherham, South Yorkshire, England, S63 5DB.
    </p>
  </MinimalLayout>
)

export default PrivacyPolicy
