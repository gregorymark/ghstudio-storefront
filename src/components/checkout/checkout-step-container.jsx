import React from "react"
import Checkmark from "../../icons/checkmark.svg"
import {
  checkoutStep,
  checkoutStepIsOpen,
  checkoutStepTitle,
  checkoutStepTick,
} from "../../styles/modules/checkout.module.css"

const CheckoutStepContainer = ({
  title,
  isCompleted,
  isOpen,
  setState,
  step,
  children,
}) => {
  const isClickable = isCompleted && !isOpen
  const handleClick = e => {
    // If we click on the section and it's completed and not open,
    // we want to open it. This is so that customers go back to see
    // completed data.
    e.preventDefault()
    if (isClickable) {
      setState(step)
    }
  }

  return (
    <div
      className={`${checkoutStep} ${isOpen ? checkoutStepIsOpen : ""}`}
      onClick={handleClick}
    >
      <div className={checkoutStepTitle}>
        <h3>{title}</h3>
        {isCompleted && (
          <img
            src={Checkmark}
            alt=""
            aria-hidden={!isClickable}
            className={checkoutStepTick}
          />
        )}
      </div>
      {isOpen && children}
    </div>
  )
}

export default CheckoutStepContainer
