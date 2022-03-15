import React, { useEffect, useState } from "react"
import { formatPrice } from "../../utils/format-price"
import Radio from "../forms/radio"
import ErrorMessage from "../utility/error-message"

const ShippingOptions = ({
  options = [],
  title,
  currencyCode = "eur",
  onSelect,
  defaultValue,
  controller,
}) => {
  const defaultSelectedOption = options.find(o => o.id === defaultValue?.id)
  const [selectedOption, setSelectedOption] = useState(defaultSelectedOption)

  const handleOptionChange = option => {
    setSelectedOption(option)
    onSelect(option)
  }

  return (
    <div>
      {options.map(option => {
        const price = formatPrice(option.amount, currencyCode)
        const labelText = option.name + price

        return (
          <Radio
            key={option.id}
            type="radio"
            name="delivery"
            label={labelText}
            value={option.id}
            checked={selectedOption?.id === option.id}
            onChange={() => handleOptionChange(option)}
            formik={controller}
          />
        )
      })}
      <ErrorMessage error={controller.error} />
    </div>
  )
}

export default ShippingOptions
