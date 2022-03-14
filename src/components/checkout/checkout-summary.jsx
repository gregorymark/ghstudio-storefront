import React from "react"
import { classNames } from "../../utils/class-names"
import Totals from "../checkout/totals"
import CartItem from "../cart/cart-item"
import DiscountField from "./discount-field"

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
      <div>
        <DiscountField cartId={cart.id} />
        <Totals
          subtotal={cart.subtotal}
          total={cart.total}
          cartId={cart.id}
          shipping={shippingOption?.amount}
          currencyCode={cart.region?.currency_code}
          discount={cart.discount}
        />
      </div>
    </div>
  )
}

export default CheckoutSummary
