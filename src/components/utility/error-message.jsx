import React from "react"
import { errorMessage } from "../../styles/modules/forms.module.css"

const ErrorMessage = ({ error }) => {
  return (
    <div role="alert" className={errorMessage}>
      {error}
    </div>
  )
}

export default ErrorMessage
