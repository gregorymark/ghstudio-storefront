import React, { useState, useEffect } from "react"
import { trayItem } from "../../styles/modules/cart-tray.module.css"
import {
  thumbWrap,
  itemInfo,
  itemQuantitySelector,
  removeItemButton,
} from "../../styles/modules/cart-item.module.css"
import { useCart } from "../../hooks/use-cart"
import QuantitySelector from "../products/quantity-selector"
import { formatPrice } from "../../utils/format-price"
import { GatsbyImage } from "gatsby-plugin-image"

const CartItem = ({ item, currencyCode, isInteractive = true }) => {
  const {
    inventory,
    prodThumbImages,
    actions: { removeItem, updateQuantity },
  } = useCart()
  const [maxQuantity, setMaxQuantity] = useState(item.quantity)

  useEffect(() => {
    if (inventory[item.variant?.product_id]) {
      setMaxQuantity(inventory[item.variant.product_id][item.variant.id].all)
    }
  }, [inventory, item.variant?.product_id, item.variant?.id])

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
                updateQuantity({
                  id: item.id,
                  quantity: item.quantity + 1,
                  max: maxQuantity,
                })
              }
              decrement={() =>
                updateQuantity({
                  id: item.id,
                  quantity: item.quantity - 1,
                  max: maxQuantity,
                })
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
          <div>Quantity {item.quantity}</div>
        )}
      </div>
    </div>
  )
}

export default CartItem
