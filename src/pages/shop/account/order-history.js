import React, { useEffect, useState } from "react"
import AccountLayout from "../../../components/account/account-layout"
import OrderHistoryEntry from "../../../components/orders/order-history-entry"
import SearchEngineOptimization from "../../../components/utility/seo"
import { useCustomer } from "../../../hooks/use-customer"

const OrderHistory = () => {
  const [orders, setOrders] = useState([])

  const {
    customer,
    loading,
    actions: { retrieveOrders },
  } = useCustomer()

  useEffect(() => {
    const getOrders = async () => {
      if (!loading && customer) {
        const orderResponse = await retrieveOrders()

        if (orderResponse) {
          setOrders(orderResponse)
        }
      }
    }

    getOrders()
  }, [loading, customer, retrieveOrders])

  return (
    <AccountLayout>
      <SearchEngineOptimization title="Order History" />
      <div>
        <h1>Order History</h1>
      </div>
      <div>
        {orders.map(order => {
          return (
            <div key={order.display_id}>
              <OrderHistoryEntry order={order} />
            </div>
          )
        })}
      </div>
    </AccountLayout>
  )
}

export default OrderHistory
