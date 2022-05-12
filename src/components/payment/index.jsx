import React, { useEffect } from "react"
import { useCart } from "../../hooks/use-cart"
import ManualPayment from "./manual-payment"
import StripePayment from "./stripe-payment"
import { loadingSvg } from "../../styles/modules/checkout.module.css"

const Payment = ({ cartId = null }) => {
  const {
    cart,
    actions: { createPaymentSession },
  } = useCart()

  useEffect(() => {
    const cartIdentifier = cartId || cart.id

    if (cartIdentifier && !cart.payment_sessions?.length > 0) {
      return createPaymentSession(cartId)
    }
  }, [cart, cartId, createPaymentSession])

  return (
    <>
      {cart && cart.payment_sessions ? (
        cart.payment_sessions.map(ps => {
          switch (ps.provider_id) {
            case "stripe":
              return <StripePayment key="stripe" />
            case "manual":
              return <ManualPayment key="manual" />
            default:
              return null
          }
        })
      ) : (
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className={loadingSvg}
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}
    </>
  )
}

export default Payment
