import React from "react"
import { formatPrice } from "../../utils/format-price"
import ImageContainer from "../utility/image-container"
import {
  orderItem,
  imageWrap,
  orderInfo,
  infoItem,
} from "../../styles/modules/order-item.module.css"

const OrderItem = ({ item, currencyCode, taxRate }) => {
  return (
    <div className={orderItem}>
      <div className={imageWrap}>
        <ImageContainer src={item.thumbnail} alt={item.title} />
      </div>
      <div className={orderInfo}>
        <h3>{item.title}</h3>
        <div className={infoItem}>{item.description}</div>
        <div className={infoItem}>Quantity {item.quantity}</div>
        <div className={infoItem}>
          Price{" "}
          {formatPrice(item.unit_price, currencyCode, item.quantity, taxRate)}
        </div>
      </div>
    </div>
  )
}

export default OrderItem
