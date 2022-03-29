import React from "react"
import { capitalize } from "../../utils/capitalize"
import { formatPrice } from "../../utils/format-price"
import OrderBulletinInfo from "./order-bulletin-info"
import { orderBulletin } from "../../styles/modules/order-history.module.css"

const OrderBulletin = ({ order }) => {
  return (
    <div className={orderBulletin}>
      <OrderBulletinInfo
        label="Subtotal"
        info={formatPrice(order.subtotal, order.currency_code)}
      />
      <OrderBulletinInfo
        label="Shipping"
        info={formatPrice(order.shipping_total, order.currency_code)}
      />
      <OrderBulletinInfo
        label="Total"
        info={formatPrice(order.total, order.currency_code)}
      />
      <OrderBulletinInfo
        label="Shipment"
        info={capitalize(order.fulfillment_status.replace(/_/g, " "))}
      />
      <OrderBulletinInfo
        label="Payment"
        info={capitalize(order.payment_status.replace(/_/g, " "))}
      />
    </div>
  )
}

export default OrderBulletin
