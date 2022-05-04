import React from "react"
import ShippingOptions from "../shipping/shipping-options"

const CheckoutDelivery = ({ controller, options, currencyCode = "eur", lisbonPickup = false }) => {
  const { setSelectedShippingMethod, selectedShippingMethod } = controller
  
  return (
    <ShippingOptions
      value={selectedShippingMethod}
      onSelect={setSelectedShippingMethod}
      options={options}
      currencyCode={currencyCode}
      controller={controller}
      lisbonPickup={lisbonPickup}
    />
  )
}

export default CheckoutDelivery
