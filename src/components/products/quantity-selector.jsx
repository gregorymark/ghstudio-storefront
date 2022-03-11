import React from "react"
import {
  selector,
  button,
  quantityText,
} from "../../styles/modules/quantity-selector.module.css"

const QuantitySelector = ({ quantity, increment, decrement }) => {
  return (
    <div className={selector}>
      <button className={button} onClick={() => decrement()}>
        –
      </button>
      <span className={quantityText}>{quantity}</span>
      <button className={button} onClick={() => increment()}>
        +
      </button>
    </div>
  )
}

export default QuantitySelector
