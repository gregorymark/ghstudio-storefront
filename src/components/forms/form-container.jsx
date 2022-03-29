import React from "react"
import { generalForm, submitButton } from "../../styles/modules/forms.module.css"

const FormContainer = ({
  title,
  description,
  handleSubmit,
  className,
  children,
}) => {
  return (
    <form
      onSubmit={e => {
        handleSubmit(e)
      }}
      className={`${generalForm} ${className}`}
    >
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
        <div>{children}</div>
      </div>
      <div>
        <button type="submit" className={submitButton}>
          Save
        </button>
      </div>
    </form>
  )
}

export default FormContainer
