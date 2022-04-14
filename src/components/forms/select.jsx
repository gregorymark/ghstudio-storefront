import React, { useEffect, useState } from "react"
import { selectWrap, inputError } from "../../styles/modules/forms.module.css"
import ErrorMessage from "../forms/error-message"

const Select = ({
  label,
  name,
  autocomplete = "on",
  formik,
  value,
  options,
  placeholder = "",
  className,
}) => {
  const [error, setError] = useState(null)

  useEffect(() => {
    if (formik.touched?.[name]) {
      setError(formik.errors[name])
    }
  }, [formik, name])

  return (
    <div className={`${selectWrap} ${className} ${error ? inputError : ""}`}>
      {label && <label>{label}</label>}
      <select
        name={name}
        autoComplete={autocomplete}
        value={value}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      >
        <option value="">{placeholder}</option>
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
