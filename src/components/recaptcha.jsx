import React, { useEffect } from "react"

const ReCAPTCHA = ({ siteKey, className, onCaptchaLoaded }) => {
  const scriptId = "recaptchaScript"

  useEffect(() => {
    if (siteKey) {
      if (!document.getElementById(scriptId)) {
        const script = document.createElement("script")
        script.id = scriptId
        script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
        script.addEventListener("load", () => {
          if (typeof onCaptchaLoaded === "function") {
            onCaptchaLoaded()
          }
        })
        document.body.appendChild(script)
      }
    }
  }, [siteKey, onCaptchaLoaded])

  return (
    <div className={className}>
      <div
        className={`g-recaptcha`}
        data-size="invisible"
        data-sitekey={siteKey}
      ></div>
      <small>
        This site is protected by reCAPTCHA and the Google{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noreferrer"
        >
          Privacy Policy
        </a>{" "}
        and{" "}
        <a
          href="https://policies.google.com/terms"
          target="_blank"
          rel="noreferrer"
        >
          Terms of Service
        </a>{" "}
        apply.
      </small>
    </div>
  )
}

export default ReCAPTCHA
