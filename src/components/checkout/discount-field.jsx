import { useFormik } from "formik"
import React from "react"
import * as Yup from "yup"
import { useCart } from "../../hooks/use-cart"
import Input from "../forms/input"
import {
  discountFieldset,
  discountInput,
  currentCode,
  applyButton,
} from "../../styles/modules/discount-field.module.css"

const DiscountField = ({ className }) => {
  const {
    discountCode,
    actions: { addDiscount, removeDiscount },
  } = useCart()

  const discountForm = useFormik({
    initialValues: {
      discount_code: "",
    },
    validationSchema: Yup.object({
      discount_code: Yup.string().required("Discount code can't be empty"),
    }),
    onSubmit: async (values, { setErrors }) => {
      await addDiscount(values.discount_code).catch(_ => {
        setErrors({ discount_code: "Invalid code" })
      })
    },
  })

  const handleRemoveDiscount = () => {
    removeDiscount()
      .then(() => {
        discountForm.resetForm()
      })
      .catch(_ => {
        discountForm.setErrors({
          discount_code: "There was a problem removing the discount code",
        })
      })
  }

  const handleSubmit = e => {
    e.preventDefault()
    discountForm.handleSubmit()
  }

  return (
    <div className={`${className}`}>
      <h4>Discount code</h4>
      <fieldset className={discountFieldset}>
        {!discountCode ? (
          <>
            <Input
              name={"discount_code"}
              value={discountForm.values.discount_code}
              formik={discountForm}
              solidBg={true}
              className={discountInput}
            />
            <button
              className={applyButton}
              onClick={handleSubmit}
              type="submit"
            >
              Apply
            </button>
          </>
        ) : (
          <>
            <div className={currentCode}>{discountCode}</div>
            <button
              className={applyButton}
              onClick={() => handleRemoveDiscount()}
              type="submit"
            >
              Remove
            </button>
          </>
        )}
      </fieldset>
    </div>
  )
}

export default DiscountField
