import React, { useEffect, useState } from "react"
import { radioWrap, inputError } from "../../styles/modules/forms.module.css"
import ErrorMessage from "../utility/error-message"

const Radio = ({
  label,
  name,
  autocomplete = "on",
  formik,
  value,
  checked,
  className,
  onChange = null,
}) => {
  const [error, setError] = useState(null)

  const handleChange = e => {
    if (typeof onChange === "function") {
      onChange()
    }
    if (typeof formik.handleChange === "function") {
      formik.handleChange(e)
    }
  }

  useEffect(() => {
    if (formik.touched?.[name]) {
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
      </label>
      {error && <ErrorMessage error={error} />}
    </div>
  )
}

export default Radio
