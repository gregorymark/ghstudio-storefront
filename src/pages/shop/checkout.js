import React from "react"
import CheckoutFlow from "../../components/checkout/checkout-flow"
import SearchEngineOptimization from "../../components/seo"

const Checkout = () => {
  return (
    <div>
      <SearchEngineOptimization title="Checkout" />
      <CheckoutFlow />
    </div>
  )
}

export default Checkout
