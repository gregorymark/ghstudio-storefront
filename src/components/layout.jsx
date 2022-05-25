import React from "react"
import PropTypes from "prop-types"
import Header from "./header"
import Footer from "./footer"
import { main } from "../styles/modules/layout.module.css"

const Layout = ({ path, children }) => {
  const showShopNav = path?.startsWith("/shop")
  const isCheckout = path?.startsWith("/shop/checkout")

  return (
    <>
      <Header showShopNav={showShopNav} isCheckout={isCheckout} />
      <div className={main}>{children}</div>
      {showShopNav && <Footer />}
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
