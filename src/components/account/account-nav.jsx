import React from "react"
import { Link } from "gatsby"
import { accountNav } from "../../styles/modules/account.module.css"

const AccountNav = () => {

  return (
    <div className={accountNav}>
      <Link to="/shop/account">Account details</Link>
      <Link to="/shop/account/order-history">Order history</Link>
    </div>
  )
}

export default AccountNav
