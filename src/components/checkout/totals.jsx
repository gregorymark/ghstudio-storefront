import React from "react"
import { useEstimatedShipping } from "../../hooks/use-estimated-shipping"
import { formatPrice } from "../../utils/format-price"
import {
  totalsWrap,
  subtotalStep,
  finalTotal,
} from "../../styles/modules/totals.module.css"

const Totals = ({
  subtotal = 0,
  shipping = null,
  discounts = null,
  discountTotal = 0,
  total = 0,
  currencyCode = "eur",
  cartId = null,
}) => {
  const { estimatedShipping } = useEstimatedShipping(cartId)

  const appliedDiscount = discounts?.length ? discounts[0] : 0

  const totalPrice =
    total ?? shipping
      ? subtotal + shipping - discountTotal
      : subtotal + estimatedShipping - discountTotal

  return (
    <div className={totalsWrap}>
      <div className={subtotalStep}>
        <h4>Subtotal (incl. taxes)</h4>
        <div>{formatPrice(subtotal, currencyCode)}</div>
      </div>
      {shipping != null && (
        <div className={subtotalStep}>
          <h4>Shipping</h4>
          <div>{formatPrice(shipping, currencyCode)}</div>
        </div>
      )}
      {!shipping && shipping !== 0 && estimatedShipping != null && (
        <div className={subtotalStep}>
          <h4>Estimated shipping</h4>
          <div>{formatPrice(estimatedShipping, currencyCode)}</div>
        </div>
      )}
      {appliedDiscount ? (
        <div className={subtotalStep}>
          <h4>Discount</h4>
          <div>{formatPrice(discountTotal, currencyCode)}</div>
        </div>
      ) : null}
      <div className={finalTotal}>
        <h4>Total</h4>
        <div>{formatPrice(totalPrice, currencyCode)}</div>
      </div>
    </div>
  )
}

export default Totals
