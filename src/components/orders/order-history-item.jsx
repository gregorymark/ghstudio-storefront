import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { useCart } from "../../hooks/use-cart"
import ProductLink from "../utility/product-link"
import {
  orderHistoryItem,
  imageWrap,
  info,
} from "../../styles/modules/order-history.module.css"

const OrderHistoryItem = ({ item, currencyCode }) => {
  const { prodThumbImages } = useCart()

  const prodThumbData = prodThumbImages.find(
    thumbData => thumbData.product_id === item.variant?.product_id
  )

  return (
    <div className={orderHistoryItem}>
      <div className={imageWrap}>
        {prodThumbData && (
          <GatsbyImage image={prodThumbData.image_data} alt={item.title} />
        )}
      </div>
      <div className={info}>
        <h3>{item.title}</h3>
        <div>
          <span>Variant: </span>
          <span>{item.description}</span>
        </div>
        <div>
          <span>Quantity: </span>
          <span>{item.quantity}</span>
        </div>
        <div>
          {((item.unit_price * item.quantity) / 100).toFixed(2)}{" "}
          {currencyCode.toUpperCase()}
        </div>
        <ProductLink to={item.variant.product.handle}>View Product</ProductLink>
      </div>
    </div>
  )
}

export default OrderHistoryItem
