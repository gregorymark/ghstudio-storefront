import React from "react"
import { Link } from "gatsby"
import { accountNav, activeTab } from "../../styles/modules/account.module.css"

const AccountNav = () => {
  return (
    <div className={accountNav}>
      <Link to="/shop/account/" activeClassName={activeTab}>
        Account details
      </Link>
      <Link to="/shop/account/order-history/" activeClassName={activeTab}>
        Order history
      </Link>
    </div>
  )
}

export default AccountNav
