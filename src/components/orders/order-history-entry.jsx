import React from "react"
import OrderBulletin from "./order-bulletin"
import OrderProduct from "./order-product"
import {
  orderHistoryEntry,
  orderHistoryProducts,
  orderHistoryProductWrap,
} from "../../styles/modules/order-history.module.css"

const OrderHistoryEntry = ({ order }) => {
  const date = new Date(order.created_at).toLocaleDateString()

  return (
    <div className={orderHistoryEntry}>
      <h2>
        Order <span className="defFont">#</span>
        {`${order.display_id}`} - {date}
      </h2>
      <OrderBulletin order={order} />
      <h3>Order items</h3>
      <div className={orderHistoryProducts}>
        {order.items.map((item, i) => {
          return (
            <div key={i} className={orderHistoryProductWrap}>
              <OrderProduct item={item} currencyCode={order.currency_code} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default OrderHistoryEntry
