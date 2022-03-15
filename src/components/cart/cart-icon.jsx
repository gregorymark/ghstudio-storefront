import React from "react"
import { useCart } from "../../hooks/use-cart"
import { cartIcon } from "../../styles/modules/cart-tray.module.css"
import ShoppingBagIcon from "../../icons/shopping-bag"

const CartIcon = ({ setOpen, className }) => {
  const { cart } = useCart()
  const cartCount = cart.items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <button
      className={`${cartIcon} ${className}`}
      onClick={() => setOpen(true)}
    >
      <ShoppingBagIcon /> {cartCount > 0 && <sup>{cartCount}</sup>}
    </button>
  )
}

export default CartIcon
