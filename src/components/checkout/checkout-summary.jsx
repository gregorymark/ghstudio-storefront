import React from "react"
import Totals from "../checkout/totals"
import CartItem from "../cart/cart-item"
import DiscountField from "./discount-field"
import {
  cSummary,
  cSummaryItems,
  cSummaryDiscount,
  cSummaryTotals,
} from "../../styles/modules/checkout.module.css"

const CheckoutSummary = ({ cart, shippingOption }) => {
  return (
    <div className={cSummary}>
      <div className={cSummaryItems}>
        {cart.items.map(item => {
          return (
            <CartItem
              key={item.id}
              item={item}
              currencyCode={cart.region.currency_code}
              isInteractive={false}
            />
          )
        })}
      </div>
      <DiscountField cartId={cart.id} className={cSummaryDiscount} />
      <Totals
        subtotal={cart.subtotal}
        total={cart.total}
        cartId={cart.id}
        shipping={shippingOption?.amount}
        currencyCode={cart.region?.currency_code}
        discount={cart.discount}
        className={cSummaryTotals}
      />
    </div>
  )
}

export default CheckoutSummary
