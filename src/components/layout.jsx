import React from "react"
import PropTypes from "prop-types"
import Header from "./header"
import Footer from "./footer"
import { main } from "../styles/modules/layout.module.css"
import NewsletterPop from "./newsletter/newsletter-pop"

const Layout = ({ path, children }) => {
  const isShopPage = path?.startsWith("/shop")
  const isCheckout = path?.startsWith("/shop/checkout")
  const isNewsletterPage = path?.startsWith("/newsletter")

  return (
    <>
      <Header showShopNav={isShopPage} isCheckout={isCheckout} />
      <div className={main}>{children}</div>
      {!isNewsletterPage && !isShopPage && <NewsletterPop />}
      {isShopPage && <Footer />}
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
