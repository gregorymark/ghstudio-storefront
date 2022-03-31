import React from "react"
import { Link } from "gatsby"
import { useCustomer } from "../../hooks/use-customer"
import {
  shopNav,
  cartIcon,
  logoutButton,
  spacer,
} from "../../styles/modules/header.module.css"
import CartIcon from "../cart/cart-icon"

const ShopNav = ({ setNavOpen }) => {
  const {
    loading,
    customer,
    actions: { clearCustomer },
  } = useCustomer()

  return (
    <div className={shopNav}>
      {/* Region toggle is here on original starter */}
      {loading || !customer ? (
        <Link to="/shop/account/sign-in" onClick={() => setNavOpen(false)}>
          Log in
        </Link>
      ) : (
        <>
          <Link to="/shop/account" onClick={() => setNavOpen(false)}>
            Account
          </Link>
          <span className={spacer}>/</span>
          <button className={logoutButton} onClick={() => clearCustomer()}>
            Log out
          </button>
        </>
      )}
      <CartIcon className={cartIcon} />
    </div>
  )
}

export default ShopNav
