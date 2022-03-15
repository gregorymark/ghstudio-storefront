import React, { useEffect, useState } from "react"
import { useRegion } from "../../hooks/use-region"
import Input from "../forms/input"
import Select from "../forms/select"

const CheckoutAddress = ({ controller }) => {
  const [countries, setCountries] = useState([])
  const { region } = useRegion()

  useEffect(() => {
    if (region) {
      setCountries(region.countries)
    }
  }, [region])

  return (
    <>
      <Input
        label="First name"
        autocomplete="given_name"
        name="first_name"
        formik={controller}
        defaultValue={controller.values.first_name}
      />
      <Input
        label="Last name"
        autocomplete="family-name"
        name="last_name"
        formik={controller}
        defaultValue={controller.values.last_name}
      />
      <Input
        label="Company"
        autocomplete="organization"
        name="company"
        formik={controller}
        defaultValue={controller.values.company}
      />
      <Input
        label="Address"
        autocomplete="address-line1"
        name="address_1"
        formik={controller}
        defaultValue={controller.values.address_1}
      />
      <Input
        label="Apartment, suite, etc."
        autocomplete="address-line2"
        name="address_2"
        formik={controller}
        defaultValue={controller.values.address_2}
      />
      <Select
        label="Country"
        autocomplete="country-code"
        name="country_code"
        formik={controller}
        defaultValue={controller.values.country_code}
        options={countries.map(country => ({
          label: country.display_name,
          value: country.iso_2,
        }))}
        placeholder="Select a country"
      />
      <Input
        label="City"
        autocomplete="city-code"
        name="city"
        formik={controller}
        defaultValue={controller.values.city}
      />
      <Input
        label="State / Province"
        autocomplete="address-level1"
        name="province"
        formik={controller}
        defaultValue={controller.values.province}
      />
      <Input
        label="ZIP / Post Code"
        autocomplete="postal-code"
        name="postal_code"
        formik={controller}
        defaultValue={controller.values.postal_code}
      />
      <Input
        label="Phone"
        autocomplete="tel"
        name="phone"
        formik={controller}
        defaultValue={controller.values.phone}
      />
    </>
  )
}

export default CheckoutAddress
