import { useFormik } from "formik"
import Validator from "../utils/validator"
import { useCart } from "./use-cart"
import { useCustomer } from "./use-customer"

export const useShippingAddressForm = setState => {
  const {
    cart,
    actions: { updateCart },
  } = useCart()

  const { customer } = useCustomer()

  const shippingAddressForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      shipping_address: {
        first_name:
          cart?.shipping_address?.first_name || customer?.first_name || "",
        last_name:
          cart?.shipping_address?.last_name || customer?.last_name || "",
        address_1: cart?.shipping_address?.address_1 || "",
        address_2: cart?.shipping_address?.address_2 || "",
        country_code: cart?.shipping_address?.country_code || "",
        city: cart?.shipping_address?.city || "",
        province: cart?.shipping_address?.province || "",
        postal_code: cart?.shipping_address?.postal_code || "",
        phone: cart?.shipping_address?.phone || customer?.phone || "",
      },
      billing_address: {
        is_different: false,
        first_name:
          cart?.shipping_address?.first_name || customer?.first_name || "",
        last_name:
          cart?.shipping_address?.last_name || customer?.last_name || "",
        address_1: cart?.shipping_address?.address_1 || "",
        address_2: cart?.shipping_address?.address_2 || "",
        country_code: cart?.shipping_address?.country_code || "",
        city: cart?.shipping_address?.city || "",
        province: cart?.shipping_address?.province || "",
        postal_code: cart?.shipping_address?.postal_code || "",
        phone: cart?.shipping_address?.phone || customer?.phone || "",
      },
    },
    validationSchema: Validator.checkout.addressSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      setSubmitting(true)

      let billingAddress
      if (values.billing_address.is_different) {
        billingAddress = values.billing_address
      } else {
        billingAddress = values.shipping_address
      }

      try {
        const payload = {
          shipping_address: values.shipping_address,
          billing_address: billingAddress,
        }

        updateCart(payload)
      } catch (error) {
        setStatus({ error: "An error has occurred, please try again." })
      }

      setStatus({ success: "Address info updated." })
      setSubmitting(false)
      setState(2)
    },
  })

  return shippingAddressForm
}
