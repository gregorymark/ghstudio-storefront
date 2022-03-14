import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React, { useMemo } from "react"
import { usePrice } from "../../hooks/use-price"
import { useRegion } from "../../hooks/use-region"
import ProductLink from "../utility/product-link"
import { productListItem } from "../../styles/modules/product-list.module.css"
import {
  price,
  productInfo,
  productLink,
} from "../../styles/modules/product-list-item.module.css"

const ProductListItem = ({ product }) => {
  const {
    actions: { getFromPrice },
  } = usePrice()

  const { region } = useRegion()

  const imageData = getImage(product.thumbnail)

  const fromPrice = useMemo(() => {
    return getFromPrice(product, region?.currency_code)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, region?.currency_code])

  return (
    <div className={productListItem}>
      <ProductLink to={product.handle}>
        <GatsbyImage
          image={imageData}
          alt={product.title}
        />
      </ProductLink>
      <div className={productInfo}>
        <h3>
          <ProductLink to={product.handle}>{product.title}</ProductLink>
        </h3>
        <div className={price}>from {fromPrice}</div>
        <ProductLink to={product.handle} className={productLink}>
          See more
        </ProductLink>
      </div>
    </div>
  )
}

export default ProductListItem
