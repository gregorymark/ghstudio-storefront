import React from "react"
import { Link } from "gatsby"
import { accountNav } from "../../styles/modules/account.module.css"
import { useCustomer } from "../../hooks/use-customer"

const AccountNav = () => {
  const {
    actions: { clearCustomer },
  } = useCustomer()

  return (
    <div className={accountNav}>
      <Link to="/shop/account">Account details</Link>
      <Link to="/shop/account/order-history">Order history</Link>
      <button onClick={() => clearCustomer()}>Log out</button>
    </div>
  )
}

export default AccountNav
