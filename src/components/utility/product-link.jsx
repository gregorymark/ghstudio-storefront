import { Link } from "gatsby"
import React from "react"

const ProductLink = ({
  product,
  productHandle = null,
  collectionHandle = null,
  children,
  ...props
}) => {
  productHandle = product?.handle || productHandle
  collectionHandle = product?.collection.handle || collectionHandle

  const to = `/shop/${collectionHandle}/${productHandle}`

  return (
    <Link to={to} {...props}>
      {children}
    </Link>
  )
}

export default ProductLink
