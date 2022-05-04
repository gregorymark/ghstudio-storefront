import React, { useState } from "react"
import { formatPrice } from "../../utils/format-price"
import Radio from "../forms/radio"
import ErrorMessage from "../forms/error-message"
import { shippingOptionMessage } from "../../styles/modules/checkout.module.css"

const ShippingOptions = ({
  options = [],
  currencyCode = "eur",
  onSelect,
  value,
  controller,
  lisbonPickup = false,
}) => {
  const defaultSelectedOption = options.find(o => o.id === value?.id)
  const [selectedOption, setSelectedOption] = useState(defaultSelectedOption)

  const handleOptionChange = option => {
    setSelectedOption(option)
    onSelect(option)
  }

  return (
    <div>
      {options.map(option => {
        const price = formatPrice(option.amount, currencyCode)
        const labelText = price + " - " + option.name

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
            dark={true}
          />
        )
      })}
      <ErrorMessage error={controller.error} />
      {lisbonPickup && (
        <div className={shippingOptionMessage}>
          N.B. Please make sure that you are able to pick up the print from me in
          central Lisbon if you select "Pick up in Lisbon".
        </div>
      )}
    </div>
  )
}

export default ShippingOptions
