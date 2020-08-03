import { FC } from "react"

const Menu: FC = () => (
  <>
    <div className="menu__top">
      <a className="menu__brand navbar-brand js-scroll-trigger" href="/#page-top">
        <img src="/images/logo.svg" alt="Altruisto logo" title="Altruisto" className="menu__logo" />
      </a>
      <button
        className="menu__toggler navbar-toggler navbar-toggler-right"
        type="button"
        aria-controls="navbarResponsive"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16">
          <path
            className="button-nav-action__figure"
            fill="#4A4A4A"
            fillRule="nonzero"
            d="M6.75 13.714H18V16H6.75v-2.286zM0 4.571h18v2.286H0V4.571zm18 6.858H0V9.143h18v2.286zM18 0v2.286H0V0h18z"
          />
        </svg>
      </button>
    </div>
    <div className="menu__collapse collapse navbar-collapse" id="navbarResponsive">
      <ul className="menu__items-wrapper navbar-nav">
        <li className="menu__item mx-0 mx-lg-1">
          <a className="menu__link js-scroll-trigger" href="/#make-a-difference">
            Make a difference
          </a>
        </li>
        <li className="menu__item mx-0 mx-lg-1">
          <a className="menu__link js-scroll-trigger" href="/#how-it-works">
            How it works
          </a>
        </li>
        <li className="menu__item mx-0 mx-lg-1">
          <a className="menu__link js-scroll-trigger" href="/#our-partners">
            Partners
          </a>
        </li>
        <li className="menu__item mx-0 mx-lg-1">
          <a className="menu__link js-scroll-trigger" href="/#talking-about-us">
            Talking about us
          </a>
        </li>
        <li className="menu__item mx-0 mx-lg-1">
          <a className="menu__link js-scroll-trigger" href="/#about">
            About us
          </a>
        </li>
        <li className="menu__item mx-0 mx-lg-1">
          <a className="menu__link js-scroll-trigger" href="/blog">
            Blog
          </a>
        </li>
        <li className="menu__item mx-0 mx-lg-1">
          <a className="menu__link js-scroll-trigger" href="/#faq">
            FAQ
          </a>
        </li>
      </ul>
    </div>
  </>
)

export default Menu