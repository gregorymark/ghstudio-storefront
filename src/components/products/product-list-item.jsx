import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React, { useMemo } from "react"
import { usePrice } from "../../hooks/use-price"
import { useRegion } from "../../hooks/use-region"
import ProductLink from "../product-link"
import {
  productListItem,
  productListItemContent,
  productImage,
  productInfo,
  productLink,
  productPrice,
} from "../../styles/modules/product-list.module.css"

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
      <div>
        <div className={productListItemContent}>
          <GatsbyImage
            image={imageData}
            alt={product.title}
            objectFit="contain"
            className={productImage}
          />
          <div className={productInfo}>
            <h3>
              <ProductLink product={product} className={productLink}>
                {product.title}
              </ProductLink>
            </h3>
            <div className={productPrice}><span>from</span> {fromPrice}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductListItem
