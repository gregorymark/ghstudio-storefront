import React, { useEffect, useState } from "react"
import {
  inputWrap,
  inputError,
  inputSolidBg,
} from "../../styles/modules/forms.module.css"
import ErrorMessage from "../utility/error-message"

const Input = ({
  label,
  name,
  type = "text",
  placeholder = "",
  autocomplete = "on",
  formik,
  value,
  className,
  solidBg = false,
}) => {
  const [error, setError] = useState(null)

  useEffect(() => {
    if (formik.touched?.[name]) {
      setError(formik.errors[name])
    }
  }, [formik, name])

  return (
    <div
      className={`${inputWrap} ${className} ${error ? inputError : ""} ${
        solidBg ? inputSolidBg : ""
      }`}
    >
      {label && <label>{label}</label>}
      <input
        type={type}
        name={name}
        autoComplete={autocomplete}
        placeholder={placeholder}
        value={value}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {error && <ErrorMessage error={error} />}
    </div>
  )
}

export default Input
