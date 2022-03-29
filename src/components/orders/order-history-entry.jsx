import React from "react"
import OrderBulletin from "./order-bulletin"
import OrderItem from "./order-item"
import { orderHistoryEntry } from "../../styles/modules/order-history.module.css"

const OrderHistoryEntry = ({ order }) => {
  const date = new Date(order.created_at).toLocaleDateString()
  
  return (
    <div className={orderHistoryEntry}>
      <h2>Order <span className="defFont">#</span>{`${order.display_id}`} - {date}</h2>
      <OrderBulletin order={order} />
      <h3>Order items</h3>
      {order.items.map((item, i) => {
        return (
          <OrderItem key={i} item={item} currencyCode={order.currency_code} />
        )
      })}
    </div>
  )
}

export default OrderHistoryEntry
