import React from "react"
import ShippingOptions from "../shipping/shipping-options"

const CheckoutDelivery = ({ controller, options, currencyCode = "eur" }) => {
  const { setSelectedShippingMethod, selectedShippingMethod } = controller
  return (
    <ShippingOptions
      defaultValue={selectedShippingMethod}
      onSelect={setSelectedShippingMethod}
      options={options}
      currencyCode={currencyCode}
      controller={controller}
    />
  )
}

export default CheckoutDelivery
