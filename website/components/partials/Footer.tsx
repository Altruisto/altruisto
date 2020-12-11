type Props = {
  noLogo?: boolean
  noLinks?: boolean
}

const FooterLogo = () => (
  <div className="col-md-6 d-flex align-items-center">
    <img src="/images/logo.svg" alt="Altruisto logo" title="Altruisto" className="footer__logo" />
  </div>
)
const FooterLinks = () => (
  <div className="col-md-6 d-flex align-items-center">
    <div className="footer__links">
      <a href="/partners" target="_blank" className="footer__link">
        List of partners shops
      </a>
      <a href="/privacy-policy" target="_blank" className="footer__link">
        Privacy policy
      </a>
      <a href="/terms-of-service" target="_blank" className="footer__link">
        Terms of service
      </a>
      <a
        href="https://github.com/Altruisto/altruisto"
        target="_blank"
        className="footer__link"
        rel="noreferrer noopener"
      >
        Github
      </a>
      <a href="/contact" target="_blank" className="footer__link">
        Contact us
      </a>
    </div>
  </div>
)

export const Footer: React.FC<Props> = ({ noLogo = false, noLinks = false }) => (
  <footer className="footer">
    <div className="container">
      <div className="row">
        {noLogo ? null : <FooterLogo />}
        {noLinks ? null : <FooterLinks />}
      </div>

      <hr className="footer__separator" />

      <div className="row d-flex align-items-center">
        <div className="footer__copyrights col-12 col-md-6">Copyright © Altruisto.com</div>
        <div className="footer__social-media col-12 col-md-6">
          <a
            href="https://facebook.com/AltruistoCom"
            target="_blank"
            rel="noreferrer noopener"
            className="pr-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="footer__icon"
            >
              <path
                fill="#9BAAB8"
                fillRule="evenodd"
                d="M12.82 24H1.324A1.325 1.325 0 0 1 0 22.675V1.325C0 .593.593 0 1.325 0h21.35C23.407 0 24 .593 24 1.325v21.35c0 .732-.593 1.325-1.325 1.325H16.56v-9.294h3.12l.466-3.622H16.56V8.77c0-1.048.29-1.763 1.795-1.763h1.918v-3.24c-.332-.045-1.47-.143-2.795-.143-2.766 0-4.659 1.688-4.659 4.788v2.67H9.692v3.623h3.127V24z"
              />
            </svg>
          </a>

          <a href="https://twitter.com/AltruistoCom" target="_blank" rel="noreferrer noopener">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="20"
              viewBox="0 0 24 20"
              className="footer__icon"
            >
              <path
                fill="#9BAAB8"
                fillRule="evenodd"
                d="M24 2.368a9.617 9.617 0 0 1-2.827.794A5.038 5.038 0 0 0 23.338.37a9.698 9.698 0 0 1-3.129 1.223A4.856 4.856 0 0 0 16.616 0c-2.718 0-4.922 2.26-4.922 5.049 0 .396.042.78.126 1.15C7.728 5.988 4.1 3.979 1.67.922a5.14 5.14 0 0 0-.666 2.54c0 1.751.87 3.297 2.19 4.203a4.834 4.834 0 0 1-2.23-.63v.062c0 2.447 1.697 4.488 3.95 4.95a4.695 4.695 0 0 1-1.296.178c-.317 0-.627-.03-.927-.09.626 2.006 2.444 3.466 4.599 3.505A9.722 9.722 0 0 1 0 17.733 13.71 13.71 0 0 0 7.548 20c9.058 0 14.01-7.692 14.01-14.365 0-.22-.005-.439-.013-.654.962-.712 1.797-1.6 2.455-2.613"
              />
            </svg>
          </a>
        </div>
        <div className="footer__info col-12">
          Altruisto is a not-for-profit initiative. We donate our profits to Against Malaria
          Foundation, Schisotomasis Control Initiative, and GiveDirectly. The website is managed by
          Well-Managed World C.I.C. a community interest company based in Rotherham, United Kingdom.
        </div>
      </div>
    </div>
  </footer>
)
