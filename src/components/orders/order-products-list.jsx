import React from "react"
import OrderProduct from "./order-product"
import {
  orderProductsList,
  orderProductWrap,
} from "../../styles/modules/order-product-list.module.css"

const OrderProductsList = ({ products, currencyCode }) => {
  return (
    <div className={orderProductsList}>
      {products.map(product => {
        return (
          <div key={product.id} className={orderProductWrap}>
            <OrderProduct
              product={product}
              currencyCode={currencyCode}
            />
          </div>
        )
      })}
    </div>
  )
}

export default OrderProductsList
