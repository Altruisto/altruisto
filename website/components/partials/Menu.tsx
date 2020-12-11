import { FC, useState, useCallback, useRef, useEffect } from "react"
import { setTimeout } from "timers"

type Props = {
  text: string
  href: string
}

const MenuItem: FC<Props> = ({ text, href }) => (
  <li className="menu__item mx-0 mx-lg-1">
    <a className="menu__link js-scroll-trigger" href={href}>
      {text}
    </a>
  </li>
)

const Menu: FC = () => {
  const [collapsed, setCollapsed] = useState(true)
  const [inTransition, setInTransition] = useState(false)
  const [collapsingStyle, setCollapsingStyle] = useState({})
  const menuNavbarResponsiveRef = useRef(null)

  const menuItems = [
    { text: "Make a difference", href: "/#make-a-difference" },
    { text: "How it works", href: "/#how-it-works" },
    { text: "Partners", href: "/#our-partners" },
    { text: "Talking about us", href: "/#talking-about-us" },
    { text: "About us", href: "/#about" },
    { text: "Blog", href: "/blog" },
    { text: "FAQ", href: "/#faq" }
  ]
  const menuItemHeight = 50
  const menuNavbarPaddings = 2 * 20
  const menuHeight = menuItems.length * menuItemHeight + menuNavbarPaddings

  const handleNavbarToggler = useCallback(() => {
    if (!inTransition) {
      setCollapsed(!collapsed)
      setInTransition(true)

      if (collapsed) {
        setTimeout(() => setCollapsingStyle({ height: menuHeight }), 0)
      } else {
        setCollapsingStyle({ height: menuHeight })
        setTimeout(() => setCollapsingStyle({ height: 0 }), 0)
      }

      setTimeout(() => {
        setInTransition(false)
        setCollapsingStyle({})
      }, 500)
    }
  }, [collapsed, setCollapsed, inTransition, setInTransition])

  return (
    <>
      <div className="menu__top">
        <a className="menu__brand navbar-brand js-scroll-trigger" href="/#page-top">
          <img
            src="/images/logo.svg"
            alt="Altruisto logo"
            title="Altruisto"
            className="menu__logo"
          />
        </a>
        <button
          className={`menu__toggler navbar-toggler navbar-toggler-right${
            collapsed ? " collapsed" : ""
          }`}
          type="button"
          aria-controls="navbarResponsive"
          aria-expanded={collapsed}
          aria-label="Toggle navigation"
          onClick={handleNavbarToggler}
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
      <div
        className={`menu__collapse navbar-collapse${
          inTransition ? " collapsing" : collapsed ? " collapse" : " collapse show"
        }`}
        style={{ ...collapsingStyle }}
        ref={menuNavbarResponsiveRef}
        id="navbarResponsive"
      >
        <ul className="menu__items-wrapper navbar-nav">
          {menuItems.map((menuItem) => (
            <MenuItem key={menuItem.text} {...menuItem} />
          ))}
        </ul>
      </div>
    </>
  )
}

export default Menu
