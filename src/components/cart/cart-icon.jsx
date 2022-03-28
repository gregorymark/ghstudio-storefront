import React from "react"
import { useCart } from "../../hooks/use-cart"
import { cartIcon } from "../../styles/modules/cart-tray.module.css"
import ShoppingBagIcon from "../../icons/shopping-bag"

const CartIcon = ({ className }) => {
  const {
    cart,
    actions: { setCartOpen },
  } = useCart()
  const cartCount = cart.items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <button
      className={`${cartIcon} ${className}`}
      onClick={() => setCartOpen(true)}
    >
      <ShoppingBagIcon /> {cartCount > 0 && <sup>{cartCount}</sup>}
    </button>
  )
}

export default CartIcon
