import _ from "lodash"
import React, { useEffect, useState } from "react"
import { useCart } from "../../hooks/use-cart"
import { useCheckoutFlow } from "../../hooks/use-checkout-flow"
import { useContactForm } from "../../hooks/use-contact-form"
import { useShippingAddressForm } from "../../hooks/use-shipping-address-form"
import { useShippingOptionForm } from "../../hooks/use-shipping-option-form"
import Payment from "../payment"
import CheckoutAddress from "./checkout-address"
import CheckoutContact from "./checkout-contact"
import CheckoutDelivery from "./checkout-delivery"
import CheckoutLayout from "./checkout-layout"
import CheckoutStepContainer from "./checkout-step-container"
import CheckoutSummary from "./checkout-summary"
import { checkoutStepFooter } from "../../styles/modules/checkout.module.css"

const CheckoutFlow = () => {
  const {
    cart,
    actions: { getCartShippingOptions },
  } = useCart()
  const { state, setState } = useCheckoutFlow()
  const [shippingOptions, setShippingOptions] = useState([])

  useEffect(() => {
    const fetchShippingOptions = async () => {
      getCartShippingOptions(cart.id)
        .then(options => {
          if (_.isEmpty(options)) {
            return
          }

          setShippingOptions(options)
        })
        .catch(_err => {
          setShippingOptions([])
        })
    }

    if (cart.id) {
      fetchShippingOptions()
    }

    return () => {
      setShippingOptions([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart.id])

  const update = step => {
    setState(step)
  }

  const contactForm = useContactForm(setState)
  const shippingAddressForm = useShippingAddressForm(setState)
  const shippingOptionController = useShippingOptionForm(setState)

  let steps = [
    {
      title: "Contact",
      key: 0,
      completed: cart?.email !== null,
      controller: contactForm,
      children: <CheckoutContact controller={contactForm} />,
      handleSubmit: contactForm.handleSubmit,
    },
    {
      title: "Address",
      key: 1,
      completed: !_.isEmpty(cart?.shipping_address?.address_1),
      controller: shippingAddressForm,
      children: <CheckoutAddress controller={shippingAddressForm} />,
      handleSubmit: shippingAddressForm.handleSubmit,
    },
    {
      title: "Delivery Method",
      key: 2,
      completed: !_.isEmpty(cart?.shipping_methods),
      controller: shippingOptionController,
      children: (
        <CheckoutDelivery
          controller={shippingOptionController}
          options={shippingOptions}
          setState={setState}
        />
      ),
      handleSubmit: shippingOptionController.handleSubmit,
    },
    {
      title: "Payment",
      key: 3,
      completed: false,
      children: <Payment />,
      handleSubmit: () => {},
    },
  ]

  return (
    <CheckoutLayout>
      <div>
        {steps.map(step => {
          return (
            <CheckoutStepContainer
              key={step.key}
              step={step.key}
              setState={setState}
              title={step.title}
              isOpen={step.key === state}
              isCompleted={step.completed}
            >
              {step.children}
              <div className={checkoutStepFooter}>
                {step.key !== 0 && (
                  <button onClick={() => update(step.key - 1)}>Go back</button>
                )}
                <div />
                {step.key !== steps.length - 1 && (
                  <button
                    type="submit"
                    onClick={step.handleSubmit}
                    disabled={step.controller.isSubmitting}
                  >
                    Next
                  </button>
                )}
              </div>
            </CheckoutStepContainer>
          )
        })}
      </div>
      <CheckoutSummary
        cart={cart}
        shippingOption={shippingOptionController.selectedShippingMethod}
      />
    </CheckoutLayout>
  )
}

export default CheckoutFlow
