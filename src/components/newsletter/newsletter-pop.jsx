import React from "react"
import { Link } from "gatsby"
import { newsletterPop } from "../../styles/modules/newsletter-pop.module.css"

const NewsletterPop = () => {
  return (
    <div className={newsletterPop}>
      <Link to="/newsletter">Newsletter</Link>
    </div>
  )
}

export default NewsletterPop
