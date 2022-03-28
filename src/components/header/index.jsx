import { Link } from "gatsby"
import React, { useState } from "react"
import SearchEngineOptimization from "../utility/seo"
import {
  header,
  navWrap,
  navToggle,
  navClose,
  navIsOpen,
  navHomeLink,
  mainNav,
  shopNav,
  cartIconMobile,
} from "../../styles/modules/header.module.css"
import CartIcon from "../cart/cart-icon"
import CartTray from "../cart-tray"

const Header = ({ showShopNav }) => {
  const [navOpen, setNavOpen] = useState(false)

  return (
    <>
      <SearchEngineOptimization title="Home" />
      <header className={header}>
        <Link to="/" title="Home" className={navHomeLink}>
          Greg Hannan
        </Link>
        <button className={navToggle} onClick={() => setNavOpen(true)}>
          Menu
        </button>
        {showShopNav && <CartIcon className={cartIconMobile} />}
        <nav className={`${navWrap} ${navOpen ? navIsOpen : ""}`}>
          <div className={mainNav}>
            <Link to="/" onClick={() => setNavOpen(false)}>
              Work
            </Link>
            <Link to="/about" onClick={() => setNavOpen(false)}>
              About
            </Link>
            <Link to="/commissions" onClick={() => setNavOpen(false)}>
              Commissions
            </Link>
            <Link to="/shop" onClick={() => setNavOpen(false)}>
              Shop
            </Link>
            <button className={navClose} onClick={() => setNavOpen(false)}>
              Close
            </button>
          </div>
          {showShopNav && (
            <div className={shopNav}>
              <Link
                to="/shop/account/sign-in"
                onClick={() => setNavOpen(false)}
              >
                Account
              </Link>
              <CartIcon />
            </div>
          )}
        </nav>
      </header>
      <CartTray />
    </>
  )
}

export default Header
