import React from "react"
import { Link } from "gatsby"
import {
  cartReview,
  cartTotal,
  checkoutButton,
} from "../../styles/modules/cart-tray.module.css"
import { formatPrice } from "../../utils/format-price"

const CartReview = ({ cart, setOpen }) => {
  return (
    <div className={cartReview}>
      <div className={cartTotal}>
        <h4>Total</h4>
        <div>{formatPrice(cart.total, cart.region?.currency_code)}</div>
      </div>
      <Link
        to="/shop/checkout/"
        className={checkoutButton}
        onClick={() => setOpen(false)}
      >
        Checkout
      </Link>
      <small>Shipping calculated at checkout</small>
    </div>
  )
}

export default CartReview
