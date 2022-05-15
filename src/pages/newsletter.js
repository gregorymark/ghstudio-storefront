import React from "react"
import {
  signupWrap,
  info,
  iframe,
} from "../styles/modules/newsletter.module.css"

const NewsletterPage = () => {
  return (
    <div className={signupWrap}>
      <h1>Newsletter</h1>
      <p className={info}>
        Enter your name and email address for occasional information from me
        about my art practice, upcoming shows and news from the shop.
      </p>
      <iframe
        className={iframe}
        title="Newsletter Signup"
        src="https://cdn.forms-content.sg-form.com/8f1e605b-d43a-11ec-b3e8-0aa53ceb7d26"
      />
    </div>
  )
}

export default NewsletterPage
