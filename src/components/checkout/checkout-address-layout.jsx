import React from "react"
import CheckoutAddress from "./checkout-address"
import Checkbox from "../forms/checkbox"
import { checkoutAddress, checkoutAddressToggle } from "../../styles/modules/checkout.module.css"

const CheckoutAddressLayout = ({ controller }) => {
  return (
    <>
      <CheckoutAddress
        controller={controller}
        addressKey="shipping_address"
        title="Shipping Address"
        className={checkoutAddress}
      />
      <Checkbox
        label="My billing address is different from my shipping address"
        name="billing_address_is_different"
        value={true}
        checked={controller.values.billing_address_is_different}
        formik={controller}
        dark={true}
        className={checkoutAddressToggle}
      />
      {controller.values.billing_address_is_different && (
        <CheckoutAddress
          controller={controller}
          addressKey="billing_address"
          title="Billing address"
          className={checkoutAddress}
        />
      )}
    </>
  )
}

export default CheckoutAddressLayout
