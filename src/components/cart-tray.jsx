import React from "react"
import { useCart } from "../hooks/use-cart"
import CartItem from "./cart/cart-item"
import {
  tray,
  trayIsOpen,
  trayClose,
  cartItems,
  cartEmptyMessage,
} from "../styles/modules/cart-tray.module.css"
import CartReview from "./cart/cart-review"

const CartTray = () => {
  const {
    cart,
    open,
    actions: { setCartOpen },
  } = useCart()

  return (
    <div className={`${tray} ${open ? trayIsOpen : ""}`}>
      <button className={trayClose} onClick={() => setCartOpen(false)}>
        Close
      </button>
      {cart.items < 1 ? (
        <div className={cartEmptyMessage}>
          <p>Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className={cartItems}>
            <div>
              {cart.items.map((item, i) => {
                return (
                  <CartItem
                    key={i}
                    item={item}
                    currencyCode={cart.region.currency_code}
                  />
                )
              })}
            </div>
          </div>
          <CartReview cart={cart} setOpen={setCartOpen} />
        </>
      )}
    </div>
  )
}

export default CartTray
