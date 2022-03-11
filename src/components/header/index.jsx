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
} from "../../styles/modules/header.module.css"
import ShopNav from "./shop-nav"

const Header = ({ showShopNav }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <SearchEngineOptimization title="Home" />
      <header className={header}>
        <Link to="/" title="Home" className={navHomeLink}>
          Greg Hannan
        </Link>
        <button className={navToggle} onClick={() => setOpen(true)}>
          Menu
        </button>
        <nav className={`${navWrap} ${open ? navIsOpen : ""}`}>
          <div className={mainNav}>
            <Link to="/" onClick={() => setOpen(false)}>Work</Link>
            <Link to="/about" onClick={() => setOpen(false)}>About</Link>
            <Link to="/commissions" onClick={() => setOpen(false)}>Commissions</Link>
            <Link to="/shop" onClick={() => setOpen(false)}>Shop</Link>
          </div>
          {showShopNav && <ShopNav className={shopNav} setOpen={setOpen} />}
          <button className={navClose} onClick={() => setOpen(false)}>
            Close
          </button>
        </nav>
      </header>
    </>
  )
}

export default Header
