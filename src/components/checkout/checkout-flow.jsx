import React, { useEffect, useState } from "react"
import _ from "lodash"
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

  const contactForm = useContactForm(setState)
  const shippingAddressForm = useShippingAddressForm(setState)
  const shippingOptionController = useShippingOptionForm(setState)

  if (cart.items.length < 1) {
    return null // Change this to null rather than cart empty as we see it briefly when an order is completed
  }

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
      {steps.map(step => {
        return (
          <CheckoutStepContainer
            key={step.key}
            step={step}
            setState={setState}
            isOpen={step.key === state}
            stepCount={steps.length}
          >
            {step.children}
          </CheckoutStepContainer>
        )
      })}
      <CheckoutSummary
        cart={cart}
        shippingOption={shippingOptionController.selectedShippingMethod}
      />
    </CheckoutLayout>
  )
}

export default CheckoutFlow
