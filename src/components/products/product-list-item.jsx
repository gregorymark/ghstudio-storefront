import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React, { useState, useMemo, useEffect, useRef } from "react"
import { usePrice } from "../../hooks/use-price"
import { useRegion } from "../../hooks/use-region"
import ProductLink from "../utility/product-link"
import {
  productListItem,
  productListItemContent,
  productInfo,
  productLink,
  productPrice,
} from "../../styles/modules/product-list.module.css"

const ProductListItem = ({ product, rowHeight = null, screenWidth = null }) => {
  const {
    actions: { getFromPrice },
  } = usePrice()

  const [gridRowEnd, setGridRowEnd] = useState()

  const itemContentEl = useRef()

  const { region } = useRegion()

  const imageData = getImage(product.thumbnail)

  useEffect(() => {
    if (rowHeight && screenWidth) {
      const rowSpan = Math.ceil(
        (itemContentEl.current.getBoundingClientRect().height + 40) / rowHeight
      )
      setGridRowEnd("span " + rowSpan)
    }
  }, [rowHeight, screenWidth])

  const fromPrice = useMemo(() => {
    return getFromPrice(product, region?.currency_code)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, region?.currency_code])

  return (
    <div className={productListItem} style={{ gridRowEnd }}>
      <div>
        <div className={productListItemContent} ref={itemContentEl}>
          <GatsbyImage
            image={imageData}
            alt={product.title}
          />
          <div className={productInfo}>
            <h3>
              <ProductLink to={product.handle} className={productLink}>
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
