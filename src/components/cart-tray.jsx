import { Link } from "gatsby"
import React, { useState } from "react"
import { useCart } from "../hooks/use-cart"
import CartItem from "./cart/cart-item"
import {
  trayOpen,
  tray,
  trayIsOpen,
  trayFooter,
  trayClose,
} from "../styles/modules/cart-tray.module.css"

const CartTray = () => {
  const { cart } = useCart()
  const [open, setOpen] = useState(false)
  const cartCount = cart.items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <>
      <button className={trayOpen} onClick={() => setOpen(true)}>
        Cart {cartCount > 0 && <sup>{cartCount}</sup>}
      </button>
      <div className={`${tray} ${open ? trayIsOpen : ""}`}>
        <button className={trayClose} onClick={() => setOpen(false)}>
          Close
        </button>
        {cart.items < 1 ? (
          <div>
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            {cart.items.map((item, i) => {
              return (
                <div key={i}>
                  <CartItem
                    item={item}
                    currencyCode={cart.region.currency_code}
                  />
                </div>
              )
            })}
            <div className={trayFooter}>
              <Link to="/shop/checkout">
                <button onClick={() => setOpen(false)}>Checkout</button>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default CartTray
