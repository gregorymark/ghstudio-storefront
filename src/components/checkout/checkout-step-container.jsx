import React from "react"
import Checkmark from "../../icons/checkmark.svg"
import {
  checkoutStep,
  checkoutStepIsOpen,
  checkoutStepIsClickable,
  checkoutStepTitle,
  checkoutStepTick,
  checkoutStepFooter,
  checkoutStepButton,
  checkoutStepContent,
} from "../../styles/modules/checkout.module.css"

const CheckoutStepContainer = ({
  step,
  setState,
  isOpen,
  children,
  stepCount,
}) => {
  const title = step.title
  const isClickable = step.completed && !isOpen
  const handleClick = e => {
    // If we click on the section and it's completed and not open,
    // we want to open it. This is so that customers go back to see
    // completed data.
    if (isClickable) {
      e.preventDefault()

      setState(step.key)
    }
  }

  return (
    <>
      { /* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */ }
      <div
        className={`${checkoutStep} ${isOpen ? checkoutStepIsOpen : ""} ${
          isClickable ? checkoutStepIsClickable : ""
        }`}
        onClick={handleClick} // ES Lint was picking up no onKeyDown and no role here. Suppressing for now.
      >
        <div className={checkoutStepTitle}>
          <h3>{title}</h3>
          {step.completed && (
            <img
              src={Checkmark}
              alt=""
              aria-hidden={!isClickable}
              className={checkoutStepTick}
            />
          )}
        </div>
        {isOpen && (
          <div className={checkoutStepContent}>
            {children}
            <div className={checkoutStepFooter}>
              {step.key !== 0 && (
                <button
                  className={checkoutStepButton}
                  onClick={() => setState(step.key - 1)}
                >
                  {`<`} Back
                </button>
              )}
              <div />
              {step.key !== stepCount - 1 && (
                <button
                  className={checkoutStepButton}
                  type="submit"
                  onClick={step.handleSubmit}
                  disabled={step.controller?.isSubmitting}
                >
                  Next {`>`}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default CheckoutStepContainer
