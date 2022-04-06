import React, { useEffect, useState } from "react"
import Totals from "../../components/checkout/totals"
import OrderProductsList from "../../components/orders/order-products-list"
import SearchEngineOptimization from "../../components/utility/seo"
import { introText } from "../../styles/modules/order-confirmed.module.css"

const OrderConfirmed = ({ location }) => {
  const [order, setOrder] = useState(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getOrder = async () => {
      const state = location.state
      const stateOrder = state?.order

      if (stateOrder) {
        setOrder(stateOrder)
      }
      setLoading(false)
    }

    getOrder()
  }, [location.state])

  return !loading && order ? (
    <>
      <SearchEngineOptimization title="Order Confirmed" />
      <div>
        <span>THANK YOU</span>
        <h1>Order Confirmed</h1>
        <p className={introText}>
          Your order #{order.display_id} was successfully processed. You will
          receive an email with the tracking number of your parcel once it’s
          avaliable.
        </p>
        <OrderProductsList
          products={order.items}
          currencyCode={order.currencyCode}
        />
        <Totals
          currencyCode={order.currency_code}
          subtotal={order.subtotal}
          shipping={order.shipping_total}
          total={order.total}
          discount={order.discounts}
        />
      </div>
    </>
  ) : (
    <>
      <p>loading...</p>
    </>
  )
}

export default OrderConfirmed
