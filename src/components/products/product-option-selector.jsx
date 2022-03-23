import React from "react"
import { onlyUnique } from "../../utils/only-unique"
import {
  selectorWrap,
  selectorOptions,
  selectorOption,
} from "../../styles/modules/product-option-selector.module.css"

const ProductOptionSelector = ({ option, current, updateOption }) => {
  const filteredOptions = option.values.map(v => v.value).filter(onlyUnique)

  return (
    <div className={selectorWrap}>
      <h4>Select {option.title}</h4>
      <div className={selectorOptions}>
        {filteredOptions.map((v, index) => {
          return (
            <button
              key={index}
              onClick={() => updateOption({ [option.id]: v })}
              className={selectorOption}
              data-active={v === current}
            >
              {v}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default ProductOptionSelector
