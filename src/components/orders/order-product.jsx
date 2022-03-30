import React from "react"
import { formatPrice } from "../../utils/format-price"
import { GatsbyImage } from "gatsby-plugin-image"
import { useCart } from "../../hooks/use-cart"
import {
  orderProduct,
  imageWrap,
  productInfo,
  infoItem,
} from "../../styles/modules/order-product-list.module.css"

const OrderProduct = ({ product, currencyCode, taxRate, className }) => {
  const { prodThumbImages } = useCart()

  const prodThumbData = prodThumbImages.find(
    thumbData => thumbData.product_id === product.variant?.product_id
  )

  return (
    <div className={`${orderProduct} ${className}`}>
      <div className={imageWrap}>
        {prodThumbData && (
          <GatsbyImage image={prodThumbData.image_data} alt={product.title} />
        )}
      </div>
      <div className={productInfo}>
        <h3>{product.title}</h3>
        <div className={infoItem}>{product.description}</div>
        <div className={infoItem}>Quantity {product.quantity}</div>
        <div className={infoItem}>
          Price{" "}
          {formatPrice(
            product.unit_price,
            currencyCode,
            product.quantity,
            taxRate
          )}
        </div>
      </div>
    </div>
  )
}

export default OrderProduct
