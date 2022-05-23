import React from "react"
import OrderBulletin from "./order-bulletin"
import {
  orderHistoryEntry,
  orderHeader,
  orderQueryLink,
} from "../../styles/modules/order-history.module.css"
import OrderProductsList from "./order-products-list"

const OrderHistoryEntry = ({ order }) => {
  const date = new Date(order.created_at).toLocaleDateString()

  const contactEmailHref = `mailto:greg@greghannan.studio?Subject=Order%20Query%20#GHSO_${order.display_id}`

  return (
    <div className={orderHistoryEntry}>
      <div className={orderHeader}>
        <h2>
          Order <span className="defFont">#</span>
          {`GHSO_${order.display_id}`} - {date}
        </h2>
        <a href={contactEmailHref} className={orderQueryLink}>
          Have a query?
        </a>
      </div>
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
