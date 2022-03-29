import React from "react"
import { trayItem } from "../../styles/modules/cart-tray.module.css"
import {
  thumbWrap,
  itemInfo,
  itemQuantitySelector,
  itemQuantity,
  removeItemButton,
} from "../../styles/modules/cart-item.module.css"
import { useCart } from "../../hooks/use-cart"
import QuantitySelector from "../products/quantity-selector"
import { formatPrice } from "../../utils/format-price"
import { GatsbyImage } from "gatsby-plugin-image"

const CartItem = ({ item, currencyCode, isInteractive = true }) => {
  const {
    prodThumbImages,
    actions: { removeItem, updateQuantity },
  } = useCart()

  const prodThumbData = prodThumbImages.find(
    thumbData => thumbData.product_id === item.variant.product_id
  )

  return (
    <div className={trayItem}>
      <div className={thumbWrap}>
        {prodThumbData && (
          <GatsbyImage image={prodThumbData.image_data} alt={item.title} />
        )}
      </div>
      <div className={itemInfo}>
        <h3>{item.title}</h3>
        <div>{item.description}</div>
        <div>{formatPrice(item.unit_price, currencyCode, item.quantity)}</div>
        {isInteractive ? (
          <>
            <QuantitySelector
              className={itemQuantitySelector}
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
          <div className={itemQuantity}>
            <strong>Quantity</strong> {item.quantity}
          </div>
        )}
      </div>
    </div>
  )
}

export default CartItem
