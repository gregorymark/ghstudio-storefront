import { useFormik } from "formik"
import React, { useEffect, useState } from "react"
import * as Yup from "yup"
import { useCart } from "../../hooks/use-cart"
import Input from "../forms/input"
import {
  discountField,
  discountFieldset,
  discountInput,
  applyButton,
} from "../../styles/modules/discount-field.module.css"

const DiscountField = ({ className }) => {
  const [code, setCode] = useState()

  const {
    cart,
    actions: { addDiscount },
  } = useCart()

  const discountForm = useFormik({
    initialValues: {
      discount_code: "",
    },
    validationSchema: Yup.object({
      discount_code: Yup.string().required("Discount code can't be empty"),
    }),
    onSubmit: async (values, { setErrors }) => {
      await addDiscount(values.discount_code)
        .then(() => {
          setCode(values.discount_code)
        })
        .catch(_ => {
          setErrors({ discount_code: "Invalid code" })
        })
    },
  })

  useEffect(() => {
    if (cart && cart.discounts?.length) {
      const code = cart.discounts[0].code

      if (code) {
        setCode(code)
      }
    }
  }, [cart])

  const handleSubmit = e => {
    e.preventDefault()
    discountForm.handleSubmit()
  }

  return (
    <div className={`${className} ${discountField}`}>
      <h4>Discount code</h4>
      <fieldset className={discountFieldset}>
        {!code ? (
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
            <Input
              name={"discount_code"}
              value={code}
              formik={discountForm}
              solidBg={true}
              className={discountInput}
            />
            <button className={applyButton} onClick={handleSubmit}>
              Remove
            </button>
          </>
        )}
      </fieldset>
    </div>
  )
}

export default DiscountField
