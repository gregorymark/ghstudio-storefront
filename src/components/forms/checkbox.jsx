import React, { useEffect, useState } from "react"
import {
  checkboxWrap,
  checkboxUi,
  checkboxUiDark,
  inputError,
} from "../../styles/modules/forms.module.css"
import ErrorMessage from "../forms/error-message"

const Checkbox = ({
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
    <div className={`${checkboxWrap} ${className} ${error ? inputError : ""}`}>
      <label>
        <input
          type="checkbox"
          name={name}
          value={value}
          checked={checked}
          onChange={handleChange}
          autoComplete={autocomplete}
        />
        {label}
        <span className={`${checkboxUi} ${dark ? checkboxUiDark : ""}`}></span>
      </label>
      {error && <ErrorMessage error={error} />}
    </div>
  )
}

export default Checkbox
