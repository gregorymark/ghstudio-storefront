import React from "react"
import { trayItem } from "../../styles/modules/cart-tray.module.css"
import {
  thumbWrap,
  itemInfo,
  itemQuantity,
  removeItemButton,
} from "../../styles/modules/cart-item.module.css"
import { useCart } from "../../hooks/use-cart"
import QuantitySelector from "../products/quantity-selector"
import { formatPrice } from "../../utils/format-price"

const CartItem = ({ item, currencyCode, isInteractive = true }) => {
  const {
    actions: { removeItem, updateQuantity },
  } = useCart()

  return (
    <div className={trayItem}>
      <div className={thumbWrap}>
        <img src={item.thumbnail} alt={item.title} />
      </div>
      <div className={itemInfo}>
        <h3>{item.title}</h3>
        <div>{item.description}</div>
        <div>
          {formatPrice(item.unit_price, currencyCode, item.quantity)}
        </div>
        {isInteractive ? (
          <>
            <QuantitySelector
              className={itemQuantity}
              quantity={item.quantity}
              increment={() =>
                updateQuantity({ id: item.id, quantity: item.quantity + 1 })
              }
              decrement={() =>
                updateQuantity({ id: item.id, quantity: item.quantity - 1 })
              }
            />
            <button
              className={removeItemButton}
              onClick={() => removeItem(item.id)}
            >
              Remove
            </button>
          </>
        ) : (
          <div>
            <strong>Quantity</strong> {item.quantity}
          </div>
        )}
      </div>
    </div>
  )
}

export default CartItem
