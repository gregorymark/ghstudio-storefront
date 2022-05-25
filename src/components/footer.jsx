import React from "react"
import { Link } from "gatsby"
import RegionSelect from "./header/region-select"
import { footer, regionSelect } from "../styles/modules/footer.module.css"

const Footer = () => {
  return (
    <footer className={footer}>
      <div>
        <RegionSelect className={regionSelect} />
        <Link to="/shop/faqs">FAQs</Link>
        <Link to="/shop/terms-and-conditions">Terms &amp; Conditions</Link>
        <Link to="/shop/privacy-policy">Privacy Policy</Link>
      </div>
    </footer>
  )
}

export default Footer
