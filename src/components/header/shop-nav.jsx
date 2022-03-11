import React, { useState } from "react"
import { Link } from "gatsby"
import CartTray from "../cart-tray"
import { shopNav } from "../../styles/modules/header.module.css"

const ShopNav = ({ setOpen }) => {
  const onShopRoute = true
  if (!onShopRoute) return null
  return (
    <div className={shopNav}>
      {/* Region toggle is here on original starter */}
      <Link to="/sign-in" onClick={() => setOpen(false)}>
        Account
      </Link>
      <CartTray />
    </div>
  )
}

export default ShopNav
