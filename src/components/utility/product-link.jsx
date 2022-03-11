import { Link } from "gatsby"
import React from "react"

const ProductLink = ({ to, children, ...props }) => {
  return <Link to={`/shop/${to}`} {...props}>{children}</Link>
}

export default ProductLink
