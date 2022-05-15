import React, { useState } from "react"
import SendGrid from "@sendgrid/client"
import Input from "./forms/input"
import SplitFieldset from "./forms/split-fieldset"
import { useFormik } from "formik"
import Validator from "../utils/validator"
import {
  newsletterSignup,
  info,
  successMessageEl,
  errorMessageEl,
  submit,
} from "../styles/modules/newsletter-signup.module.css"

const NewsletterSignup = () => {
  SendGrid.setApiKey(process.env.GATSBY_SENDGRID_API_KEY)

  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const newsletterForm = useFormik({
    initialValues: {
      email_address: "",
      first_name: "",
      last_name: "",
    },
    validationSchema: Validator.newsletterSignupSchema,
    onSubmit: async (values, { setSubmitting, setStatus, resetForm }) => {
      setSubmitting(true)

      fetch(`/api/add-contact`, {
        method: `POST`,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then(res => {
          if (res.status === 202) {
            setSuccessMessage(
              "Thanks! You have been added to the newsletter list."
            )
            setErrorMessage("")
            setStatus({ success: "Address info updated." })
            resetForm()
          } else {
            throw Error()
          }
        })
        .catch(err => {
          setErrorMessage("Something went wrong. Please try again.")
          setSuccessMessage("")
          setStatus({ error: "An error has occurred, please try again." })
        })
        .finally(() => {
          setSubmitting(false)
        })
    },
  })

  return (
    <div className={newsletterSignup}>
      <h2>Newsletter</h2>
      <p className={info}>
        Enter your name and email address for occasional information from me
        about my art practice, upcoming shows and news from the shop.
      </p>
      <SplitFieldset>
        <Input
          name="first_name"
          formik={newsletterForm}
          value={newsletterForm.values.first_name}
          placeholder="First name"
        />
        <Input
          name="last_name"
          formik={newsletterForm}
          value={newsletterForm.values.last_name}
          placeholder="Last name (optional)"
        />
      </SplitFieldset>
      <Input
        type="email"
        name="email_address"
        formik={newsletterForm}
        value={newsletterForm.values.email_address}
        placeholder="Email address"
      />
      <button
        type="submit"
        onClick={newsletterForm.handleSubmit}
        className={submit}
      >
        Sign up
      </button>
      {errorMessage && <div className={errorMessageEl}>{errorMessage}</div>}
      {successMessage && (
        <div className={successMessageEl}>{successMessage}</div>
      )}
    </div>
  )
}

export default NewsletterSignup
