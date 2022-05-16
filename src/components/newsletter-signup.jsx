import React, { useRef, useState } from "react"
import Input from "./forms/input"
import SplitFieldset from "./forms/split-fieldset"
import { useFormik } from "formik"
import Validator from "../utils/validator"
import ReCAPTCHA from "./recaptcha"
import {
  newsletterSignup,
  info,
  successMessageEl,
  errorMessageEl,
  submit,
  reCaptcha,
} from "../styles/modules/newsletter-signup.module.css"

const NewsletterSignup = () => {
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const recaptcha = useRef()

  const displayError = message => {
    setSuccessMessage("")
    setErrorMessage(message)
  }

  const displaySuccess = message => {
    setErrorMessage("")
    setSuccessMessage(message)
  }

  const newsletterForm = useFormik({
    initialValues: {
      email_address: "",
      first_name: "",
      last_name: "",
    },
    validationSchema: Validator.newsletterSignupSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true)

      recaptcha.current
        .verify()
        .then(() =>
          fetch(`/api/add-contact`, {
            method: `POST`,
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(values),
          })
        )
        .then(addContactRes => {
          if (addContactRes.status === 202) {
            displaySuccess(
              "Thanks! You have been added to the newsletter list."
            )
            resetForm()
          } else {
            throw new Error(
              "There was a problem adding you to the newsletter list."
            )
          }
        })
        .catch(err => {
          displayError(err.message)
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
      <ReCAPTCHA className={reCaptcha} ref={recaptcha} />
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
