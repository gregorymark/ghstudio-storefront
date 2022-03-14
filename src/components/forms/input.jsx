import React, { useEffect, useState } from "react"
import { inputWrap, inputError, errorMessage } from "../../styles/modules/forms.module.css"

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
    if (formik.errors?.[name] && formik.touched?.[name]) {
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
      {error && (
        <div role="alert" className={errorMessage}>
          {error}
        </div>
      )}
    </div>
  )
}

export default Input
