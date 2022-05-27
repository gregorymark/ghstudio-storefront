import React from "react"
import Totals from "../checkout/totals"
import CartItem from "../cart/cart-item"
import DiscountField from "./discount-field"
import { cSummaryDiscount } from "../../styles/modules/checkout.module.css"

const CheckoutSummary = ({ cart, shippingOption }) => {
  return (
    <div>
      <div>
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
        cartId={cart.id}
        shipping={shippingOption?.amount}
        currencyCode={cart.region?.currency_code}
        discounts={cart.discounts}
        discountTotal={cart.discount_total}
      />
    </div>
  )
}

export default CheckoutSummary
