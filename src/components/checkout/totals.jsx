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
  discount = null,
  total = 0,
  currencyCode = "eur",
  cartId = null,
}) => {
  const { estimatedShipping } = useEstimatedShipping(cartId)

  const appliedDiscount = discount?.length ? discount[0] : 0

  const totalPrice = shipping ? total + shipping : total + estimatedShipping

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
        <div>
          <div>
            <h4>Discount</h4>
            <span>{discount.code}</span>
          </div>
          <div>{formatPrice(discount.amount, currencyCode)}</div>
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
