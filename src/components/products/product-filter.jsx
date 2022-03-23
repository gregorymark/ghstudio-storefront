import React from "react"
import { productFilter } from "../../styles/modules/product-filter.module.css"
import Checkbox from "../forms/checkbox"

const ProductFilter = ({ filterables, activeFilters, setActiveFilters }) => {
  const handleChange = e => {
    const { key, value } = JSON.parse(e.target.value)
    const tmp = { ...activeFilters }

    if (e.target.checked) {
      if (!tmp[key]) {
        tmp[key] = []
      }

      tmp[key].push(value)
    } else {
      tmp[key] = tmp[key].filter(item => item !== value)

      if (tmp[key].length === 0) {
        delete tmp[key]
      }
    }

    setActiveFilters(tmp)
  }

  return (
    <div className={productFilter}>
      {Object.keys(filterables).map((key, index) => {
        const filterable = filterables[key]

        return (
          <div key={index}>
            <h3>{filterable.title}</h3>
            <div>
              {filterable.values.map((value, index) => {
                return (
                  <Checkbox
                    key={index}
                    value={JSON.stringify({ key, value })}
                    onChange={handleChange}
                    label={value}
                  />
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ProductFilter
