import React from "react"
import OrderBulletin from "./order-bulletin"
import { orderHistoryEntry } from "../../styles/modules/order-history.module.css"
import OrderProductsList from "./order-products-list"

const OrderHistoryEntry = ({ order }) => {
  const date = new Date(order.created_at).toLocaleDateString()

  return (
    <div className={orderHistoryEntry}>
      <h2>
        Order <span className="defFont">#</span>
        {`GHSO_${order.display_id}`} - {date}
      </h2>
      <OrderBulletin order={order} />
      <h3>Order items</h3>
      <OrderProductsList
        products={order.items}
        currencyCode={order.currency_code}
      />
    </div>
  )
}

export default OrderHistoryEntry
