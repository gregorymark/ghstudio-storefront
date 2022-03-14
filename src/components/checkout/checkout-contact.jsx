import React from "react"
import Input from "../forms/input"

const CheckoutContact = ({ controller }) => {
  return (
    <div className="mt-3 mb-6">
      <Input
        formik={controller}
        name={"email"}
        defaultValue={controller.values.email}
        label={"Email"}
        autocomplete="email"
      />
    </div>
  )
}

export default CheckoutContact
