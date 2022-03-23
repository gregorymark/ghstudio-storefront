import React from "react"
import {
  selectorWrap,
  selector,
  button,
  quantityText,
} from "../../styles/modules/quantity-selector.module.css"

const QuantitySelector = ({ quantity, increment, decrement, title }) => {
  return (
    <div className={selectorWrap}>
      {title && <h4>{title}</h4>}
      <div className={selector}>
        <button className={button} onClick={() => decrement()}>
          –
        </button>
        <span className={quantityText}>{quantity}</span>
        <button className={button} onClick={() => increment()}>
          +
        </button>
      </div>
    </div>
  )
}

export default QuantitySelector
