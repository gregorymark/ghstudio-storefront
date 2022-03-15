import React from "react"
import ShippingOptions from "../shipping/shipping-options"

const CheckoutDelivery = ({ controller, options, currencyCode = "eur" }) => {
  const { setSelectedShippingMethod, selectedShippingMethod } = controller
  return (
    <div>
      <ShippingOptions
        defaultValue={selectedShippingMethod}
        onSelect={setSelectedShippingMethod}
        options={options}
        currencyCode={currencyCode}
        controller={controller}
      />
    </div>
  )
}

export default CheckoutDelivery
