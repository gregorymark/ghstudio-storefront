import React, { useEffect, useState } from "react"

const RECAPTCHA_SITEKEY = process.env.GATSBY_RECAPTCHA_SITEKEY || ""

const ReCAPTCHA = ({ className }) => {
  const [loaded, setLoaded] = useState(false)

  const scriptId = "recaptchaScript"
  let script

  const verifyCaptcha = () => {
    console.log('verifying captcha')
    window.grecaptcha.ready(_ => {
      window.grecaptcha
        .execute(RECAPTCHA_SITEKEY, { action: "newsletter" })
        .then(token => {
          console.log(token)
        })
    })
  }

  useEffect(() => {
    if (RECAPTCHA_SITEKEY) {
      if (!document.getElementById(scriptId)) {
        console.log("Adding reCAPTCHA script")
        script = document.createElement("script")
        script.id = scriptId
        script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITEKEY}`
        script.addEventListener("load", () => {
          setLoaded(true)
        })
        document.body.appendChild(script)
      }
    }
  }, [])

  return (
    <div className={className}>
      <div
        className={`g-recaptcha`}
        data-size="invisible"
        data-sitekey={RECAPTCHA_SITEKEY}
      ></div>
      <small>
        This site is protected by reCAPTCHA and the Google{" "}
        <a href="https://policies.google.com/privacy" target="_blank">
          Privacy Policy
        </a>{" "}
        and{" "}
        <a href="https://policies.google.com/terms" target="_blank">
          Terms of Service
        </a>{" "}
        apply.
      </small>
    </div>
  )
}

export default ReCAPTCHA
