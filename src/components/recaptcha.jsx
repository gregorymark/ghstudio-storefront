import React, { useEffect, useState } from "react"

const ReCAPTCHA = ({ siteKey, className, onCaptchaLoaded }) => {
  const scriptId = "recaptchaScript"
  let script

  const handleScriptLoaded = () => {
    if (typeof onCaptchaLoaded === "function") {
      onCaptchaLoaded()
    }
  }

  useEffect(() => {
    if (siteKey) {
      if (!document.getElementById(scriptId)) {
        script = document.createElement("script")
        script.id = scriptId
        script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
        script.addEventListener("load", handleScriptLoaded())
        document.body.appendChild(script)
      }
    }
  }, [])

  return (
    <div className={className}>
      <div
        className={`g-recaptcha`}
        data-size="invisible"
        data-sitekey={siteKey}
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
