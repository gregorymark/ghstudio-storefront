import React from "react"
import { checkoutWrap } from "../../styles/modules/checkout.module.css"

const CheckoutLayout = ({ children }) => {
  return (
    <div className={checkoutWrap}>
      <div>{children[0]}</div>
      <div>{children[1]}</div>
    </div>
  )
}

export default CheckoutLayout
