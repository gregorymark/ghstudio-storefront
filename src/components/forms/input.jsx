import React, { useEffect, useState } from "react"
import { inputWrap, inputError } from "../../styles/modules/forms.module.css"
import ErrorMessage from "../utility/error-message"

const Input = ({
  label,
  name,
  type = "text",
  placeholder = "",
  autocomplete = "on",
  formik,
  defaultValue,
  className,
}) => {
  const [error, setError] = useState(null)

  useEffect(() => {
    if (formik.touched?.[name]) {
      setError(formik.errors[name])
    }
  }, [formik, name])

  return (
    <div className={`${inputWrap} ${className} ${error ? inputError : ""}`}>
      {label && <label>{label}</label>}
      <input
        type={type}
        name={name}
        autoComplete={autocomplete}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {error && <ErrorMessage error={error} />}
    </div>
  )
}

export default Input