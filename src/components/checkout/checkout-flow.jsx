import React, { useEffect, useState } from "react"
import _ from "lodash"
import { useCart } from "../../hooks/use-cart"
import { useCheckoutFlow } from "../../hooks/use-checkout-flow"
import { useContactForm } from "../../hooks/use-contact-form"
import { useShippingAddressForm } from "../../hooks/use-shipping-address-form"
import { useShippingOptionForm } from "../../hooks/use-shipping-option-form"
import Payment from "../payment"
import CheckoutAddressLayout from "./checkout-address-layout"
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
  const [allShippingOptions, setAllShippingOptions] = useState([])
  const [availableShippingOptions, setAvailableShippingOptions] = useState([])
  const [lisbonPickupExists, setLisbonPickupExists] = useState(false)
  const [lisbonPickup, setLisbonPickup] = useState(false)

  const contactForm = useContactForm(setState)
  const shippingAddressForm = useShippingAddressForm(setState)
  const shippingOptionController = useShippingOptionForm(setState)

  useEffect(() => {
    const fetchShippingOptions = async () => {
      getCartShippingOptions(cart.id)
        .then(options => {
          if (_.isEmpty(options)) {
            return
          }

          setAllShippingOptions(options)
        })
        .catch(_err => {
          setAllShippingOptions([])
        })
    }

    if (cart.id) {
      fetchShippingOptions()
    }

    return () => {
      setAllShippingOptions([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart.id])

  useEffect(() => {
    const lisbonOptions = allShippingOptions.filter(
      option => option.name === "Pick up in Lisbon"
    )
    setLisbonPickupExists(lisbonOptions.length > 0)
  }, [allShippingOptions, lisbonPickupExists])

  useEffect(() => {
    if (
      lisbonPickupExists &&
      shippingAddressForm.values.shipping_address.country_code === "pt" &&
      (shippingAddressForm.values.shipping_address.city === "Lisbon" ||
        shippingAddressForm.values.shipping_address.city === "Lisboa")
    ) {
      setLisbonPickup(true)
      setAvailableShippingOptions(allShippingOptions)
    } else {
      const optionsNoPickup = allShippingOptions.filter(
        option => option.name !== "Pick up in Lisbon"
      )
      setLisbonPickup(false)
      setAvailableShippingOptions(optionsNoPickup)
    }
  }, [
    allShippingOptions,
    shippingAddressForm.values.shipping_address.city,
    shippingAddressForm.values.shipping_address.country_code,
    lisbonPickupExists,
  ])

  if (cart.items.length < 1) {
    return null // This should be null rather than "Your cart is empty" as we see it briefly when an order is completed
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
      children: <CheckoutAddressLayout controller={shippingAddressForm} />,
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
          options={availableShippingOptions}
          setState={setState}
          lisbonPickup={lisbonPickup}
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
