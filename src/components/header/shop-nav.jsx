import React from "react"
import { Link } from "gatsby"
import { useCustomer } from "../../hooks/use-customer"
import {
  shopNav,
  cartIcon,
} from "../../styles/modules/header.module.css"
import CartIcon from "../cart/cart-icon"

const ShopNav = ({ setNavOpen }) => {
  const { loading, customer } = useCustomer()

  return (
    <div className={shopNav}>
      {/* Region toggle is here on original starter */}
      {loading || !customer ? (
        <Link to="/shop/account/sign-in/" onClick={() => setNavOpen(false)}>
          Log in
        </Link>
      ) : (
        <>
          <Link to="/shop/account/" onClick={() => setNavOpen(false)}>
            Account
          </Link>
        </>
      )}
      <CartIcon className={cartIcon} />
    </div>
  )
}

export default ShopNav
