import React from "react"
import Input from "../forms/input"

const CheckoutContact = ({ controller }) => {
  return (
    <Input
      formik={controller}
      name={"email"}
      value={controller.values.email}
      label={"Email"}
      autocomplete="email"
    />
  )
}

export default CheckoutContact
