import React, { useEffect, useState } from "react"
import { selectWrap, inputError } from "../../styles/modules/forms.module.css"
import ErrorMessage from "../forms/error-message"
import _ from "lodash"

const Select = ({
  label,
  name,
  autocomplete = "on",
  formik,
  value,
  defaultValue,
  options,
  placeholder = "",
  className,
  onChange,
  canBeNull = true,
}) => {
  const [error, setError] = useState(null)

  const handleChange = e => {
    if (typeof onChange === "function") {
      onChange(e)
    }
    if (formik && typeof formik.handleChange === "function") {
      formik.handleChange(e)
    }
  }

  useEffect(() => {
    if (_.get(formik?.touched, name)) {
      setError(_.get(formik.errors, name))
    }
  }, [formik, name])

  return (
    <div className={`${selectWrap} ${className} ${error ? inputError : ""}`}>
      {label && <label>{label}</label>}
      <select
        name={name}
        autoComplete={autocomplete}
        value={value}
        onChange={handleChange}
        onBlur={formik?.handleBlur}
        defaultValue={defaultValue}
      >
        {canBeNull && <option value="">{placeholder}</option>}
        {options.map((option, i) => {
          return (
            <option key={i} value={option.value}>
              {option.label}
            </option>
          )
        })}
      </select>
      {error && <ErrorMessage error={error} />}
    </div>
  )
}

export default Select
