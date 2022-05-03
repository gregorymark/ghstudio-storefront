import React, { useEffect, useState } from "react"
import { useRegion } from "../../hooks/use-region"
import Input from "../forms/input"
import Select from "../forms/select"

const CheckoutAddress = ({
  controller,
  addressKey,
  title = "",
  className = "",
}) => {
  const [countries, setCountries] = useState([])
  const { region } = useRegion()

  useEffect(() => {
    if (region) {
      setCountries(region.countries)
    }
  }, [region])

  return (
    <div className={className}>
      {title && <h4>{title}</h4>}
      <Input
        label="First name"
        autocomplete="given_name"
        name={`${addressKey ? `${addressKey}.` : ""}first_name`}
        formik={controller}
        value={controller.values[addressKey].first_name}
      />
      <Input
        label="Last name"
        autocomplete="family-name"
        name={`${addressKey ? `${addressKey}.` : ""}last_name`}
        formik={controller}
        value={controller.values[addressKey].last_name}
      />
      <Input
        label="Address line 1"
        autocomplete="address-line1"
        name={`${addressKey ? `${addressKey}.` : ""}address_1`}
        formik={controller}
        value={controller.values[addressKey].address_1}
      />
      <Input
        label="Address line 2 (optional)"
        autocomplete="address-line2"
        name={`${addressKey ? `${addressKey}.` : ""}address_2`}
        formik={controller}
        value={controller.values[addressKey].address_2}
      />
      <Input
        label="City"
        autocomplete="city-code"
        name={`${addressKey ? `${addressKey}.` : ""}city`}
        formik={controller}
        value={controller.values[addressKey].city}
      />
      <Input
        label="State / County / Province"
        autocomplete="address-level1"
        name={`${addressKey ? `${addressKey}.` : ""}province`}
        formik={controller}
        value={controller.values[addressKey].province}
      />
      <Input
        label="ZIP / Post Code"
        autocomplete="postal-code"
        name={`${addressKey ? `${addressKey}.` : ""}postal_code`}
        formik={controller}
        value={controller.values[addressKey].postal_code}
      />
      <Select
        label="Country"
        autocomplete="country-code"
        name={`${addressKey ? `${addressKey}.` : ""}country_code`}
        formik={controller}
        value={controller.values[addressKey].country_code}
        options={countries.map(country => ({
          label: country.display_name,
          value: country.iso_2,
        }))}
        placeholder="Select a country"
      />
      <Input
        label="Phone (optional)"
        autocomplete="tel"
        name={`${addressKey ? `${addressKey}.` : ""}phone`}
        formik={controller}
        value={controller.values[addressKey].phone}
      />
    </div>
  )
}

export default CheckoutAddress
