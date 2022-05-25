import React from "react"
import { Link } from "gatsby"
import { useCustomer } from "../../hooks/use-customer"
import { shopNav, cartIcon, regionSelect } from "../../styles/modules/header.module.css"
import CartIcon from "../cart/cart-icon"
import RegionSelect from "./region-select"

const ShopNav = ({ setNavOpen, isCheckout }) => {
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
      {!isCheckout && <CartIcon className={cartIcon} />}
    </div>
  )
}

export default ShopNav
