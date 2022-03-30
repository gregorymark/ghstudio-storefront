import React from "react"
import PropTypes from "prop-types"
import Header from "./header"
import { main } from "../styles/modules/layout.module.css"

const Layout = ({ path, children }) => {
  const showShopNav = path?.startsWith("/shop")

  return (
    <>
      <Header showShopNav={showShopNav} />
      <main className={main}>{children}</main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
