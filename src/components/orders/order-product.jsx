import React from "react"
import { formatPrice } from "../../utils/format-price"
import { GatsbyImage } from "gatsby-plugin-image"
import { useCart } from "../../hooks/use-cart"
import {
  orderProduct,
  imageWrap,
  productInfo,
  infoItem,
} from "../../styles/modules/order-product.module.css"

const OrderProduct = ({ item, currencyCode, taxRate, className }) => {
  const { prodThumbImages } = useCart()

  const prodThumbData = prodThumbImages.find(
    thumbData => thumbData.product_id === item.variant?.product_id
  )

  return (
    <div className={`${orderProduct} ${className}`}>
      <div className={imageWrap}>
        {prodThumbData && (
          <GatsbyImage image={prodThumbData.image_data} alt={item.title} />
        )}
      </div>
      <div className={productInfo}>
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

export default OrderProduct
