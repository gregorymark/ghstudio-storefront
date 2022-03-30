import React, { useState } from "react"
import { Link } from "gatsby"
import SearchEngineOptimization from "../utility/seo"
import {
  header,
  navWrap,
  navToggle,
  navClose,
  navIsOpen,
  navHomeLink,
  mainNav,
  cartIconMobile,
} from "../../styles/modules/header.module.css"
import CartIcon from "../cart/cart-icon"
import CartTray from "../cart-tray"
import ShopNav from "./shop-nav"

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
            <Link to="/contact" onClick={() => setNavOpen(false)}>
              Contact
            </Link>
            <Link to="/shop" onClick={() => setNavOpen(false)}>
              Shop
            </Link>
            <button className={navClose} onClick={() => setNavOpen(false)}>
              Close
            </button>
          </div>
          {showShopNav && <ShopNav setNavOpen={setNavOpen} />}
        </nav>
      </header>
      <CartTray />
    </>
  )
}

export default Header
