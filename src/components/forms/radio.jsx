import React, { useEffect, useState } from "react"
import {
  radioWrap,
  radioUi,
  radioUiDark,
  inputError,
} from "../../styles/modules/forms.module.css"
import ErrorMessage from "../forms/error-message"

const Radio = ({
  label,
  name,
  autocomplete = "on",
  formik,
  value,
  checked,
  className,
  onChange = null,
  dark = false,
}) => {
  const [error, setError] = useState(null)

  const handleChange = e => {
    if (typeof onChange === "function") {
      onChange()
    }
    if (formik && typeof formik.handleChange === "function") {
      formik.handleChange(e)
    }
  }

  useEffect(() => {
    if (formik && formik.touched?.[name]) {
      setError(formik.errors[name])
    }
  }, [formik, name])

  return (
    <div className={`${radioWrap} ${className} ${error ? inputError : ""}`}>
      <label>
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={handleChange}
          autoComplete={autocomplete}
        />
        {label}
        <span className={`${radioUi} ${dark ? radioUiDark : ""}`}></span>
      </label>
      {error && <ErrorMessage error={error} />}
    </div>
  )
}

export default Radio
