import { graphql, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Footer from "./footer"
import Header from "./header"
import { useCart } from "../hooks/use-cart"
import { main } from "../styles/modules/layout.module.css"

const Layout = ({ path, children }) => {
  const { cart } = useCart()
  const cartHasItems = cart.items.length > 0
  const showShopNav = path.startsWith("/shop") || cartHasItems
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

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
