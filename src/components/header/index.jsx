import React, { useState } from "react"
import { Link } from "gatsby"
import SearchEngineOptimization from "../seo"
import {
  header,
  navWrap,
  navToggle,
  navToggleOpen,
  navIsOpen,
  navHomeLink,
  navLinkActive,
  mainNav,
  cartIconMobile,
} from "../../styles/modules/header.module.css"
import CartIcon from "../cart/cart-icon"

const Header = ({ showShopNav, isCheckout }) => {
  const [navOpen, setNavOpen] = useState(false)

  const handleNavOpen = reqNavOpenState => {
    setNavOpen(reqNavOpenState)

    if (reqNavOpenState) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
      document.body.classList.add("modal-open")
    } else {
      document.body.classList.remove("modal-open")
    }
  }

  return (
    <>
      <SearchEngineOptimization title="Home" />
      <header className={header}>
        <Link to="/" title="Home" className={navHomeLink}>
          Greg Hannan
        </Link>
        <button
          className={`${navToggle} ${navOpen ? navToggleOpen : ""}`}
          onClick={() => handleNavOpen(!navOpen)}
        >
          <span>Menu</span>
        </button>
        {showShopNav && <CartIcon className={cartIconMobile} />}
        <nav className={`${navWrap} ${navOpen ? navIsOpen : ""}`}>
          <div className={mainNav}>
            <Link
              to="/"
              onClick={() => handleNavOpen(false)}
              activeClassName={navLinkActive}
            >
              Work
            </Link>
            <Link
              to="/contact/"
              onClick={() => handleNavOpen(false)}
              activeClassName={navLinkActive}
            >
              Contact
            </Link>
            <Link
              to="/commissions/"
              onClick={() => handleNavOpen(false)}
              activeClassName={navLinkActive}
            >
              Commissions
            </Link>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header
