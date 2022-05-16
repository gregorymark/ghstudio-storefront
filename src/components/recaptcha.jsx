import React, { useEffect, forwardRef, useImperativeHandle } from "react"

const RECAPTCHA_SITEKEY = process.env.GATSBY_RECAPTCHA_SITEKEY || ""

const ReCAPTCHA = forwardRef(({ siteKey, className, onCaptchaLoaded }, ref) => {
  const scriptId = "recaptchaScript"

  useImperativeHandle(ref, () => ({
    verify() {
      return new Promise((res, rej) => {
        try {
          window.grecaptcha.ready(_ => {
            window.grecaptcha
              .execute(RECAPTCHA_SITEKEY, {
                action: "newsletter",
              })
              .then(token =>
                fetch(`/api/verify-recaptcha`, {
                  method: `POST`,
                  headers: {
                    "content-type": "application/json",
                  },
                  body: JSON.stringify({ token }),
                })
              )
              .then(res => res.json())
              .then(result => {
                if (result.success) {
                  res()
                } else {
                  throw new Error()
                }
              })
          })
        } catch (err) {
          rej("Unfortunately there was a problem verifying you're human.")
        }
      })
    },
  }))

  useEffect(() => {
    if (RECAPTCHA_SITEKEY) {
      if (!document.getElementById(scriptId)) {
        const script = document.createElement("script")
        script.id = scriptId
        script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITEKEY}`
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
        data-sitekey={RECAPTCHA_SITEKEY}
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
})

export default ReCAPTCHA
