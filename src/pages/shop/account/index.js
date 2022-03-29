import { useFormik } from "formik"
import React from "react"
import * as Yup from "yup"
import AccountLayout from "../../../components/account/account-layout"
import Input from "../../../components/forms/input"
import FormContainer from "../../../components/forms/form-container"
import SearchEngineOptimization from "../../../components/utility/seo"
import { useCustomer } from "../../../hooks/use-customer"
import {
  accountDetailsFormWrap,
  accountContactForm,
  accountPasswordForm,
} from "../../../styles/modules/account.module.css"

const Account = () => {
  const {
    customer,
    actions: { updateCustomerDetails },
  } = useCustomer()

  const contactForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      first_name: customer?.first_name || "",
      last_name: customer?.last_name || "",
      email: customer?.email || "",
      phone: customer?.phone || "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("Required"),
      last_name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      phone: Yup.string().optional(),
    }),
    onSubmit: async values => {
      const response = await updateCustomerDetails(values)
    },
  })

  const passwordForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Password is required"),
      passwordConfirmation: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
      ).required("Please confirm your new password"),
    }),
    onSubmit: async (values, { setStatus }) => {
      const response = await updateCustomerDetails({
        password: values.password,
      })

      if (response.error) {
        return
      }

      setStatus({ success: true })
    },
  })

  return (
    <AccountLayout>
      <SearchEngineOptimization title="Account" />
      <div className={accountDetailsFormWrap}>
        <FormContainer
          title="Contact details"
          description="We need this information in case we need to contact you."
          handleSubmit={contactForm.handleSubmit}
          className={accountContactForm}
        >
          <Input
            label="First name"
            autocomplete="given-name"
            name="first_name"
            formik={contactForm}
            defaultValue={contactForm.values.first_name}
          />
          <Input
            label="Last name"
            autocomplete="family-name"
            name="last_name"
            formik={contactForm}
            defaultValue={contactForm.values.last_name}
          />
          <Input
            label="Email"
            autocomplete="email"
            name="email"
            formik={contactForm}
            defaultValue={contactForm.values.email}
          />
          <Input
            label="Phone (optional)"
            autocomplete="tel"
            name="phone"
            formik={contactForm}
            defaultValue={contactForm.values.phone}
          />
        </FormContainer>
        <FormContainer
          title="Password"
          description="You can use this form to reset your password."
          handleSubmit={passwordForm.handleSubmit}
          className={accountPasswordForm}
        >
          <Input
            label="New Password"
            type="password"
            autocomplete="new-password"
            name="password"
            formik={passwordForm}
            defaultValue={passwordForm.values.password}
          />
          <Input
            label="Confirm Password"
            type="password"
            autocomplete="new-password"
            name="passwordConfirmation"
            formik={passwordForm}
            defaultValue={passwordForm.values.passwordConfirmation}
          />
        </FormContainer>
      </div>
    </AccountLayout>
  )
}

export default Account
