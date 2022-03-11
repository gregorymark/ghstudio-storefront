import { graphql, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import "../styles/main.css"
import Footer from "./footer"
import Header from "./header"
import { useCart } from "../hooks/use-cart"

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
      <main>{children}</main>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
