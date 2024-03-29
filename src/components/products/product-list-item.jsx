import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React, { useState, useMemo, useEffect, useRef, useCallback } from "react"
import { usePrice } from "../../hooks/use-price"
import { useRegion } from "../../hooks/use-region"
import ProductLink from "../product-link"
import {
  productListItem,
  productListItemContent,
  productImageWrap,
  productImage,
  productInfo,
  productLink,
  productPrice,
} from "../../styles/modules/product-list.module.css"

const ProductListItem = ({ product, rowHeight = null, screenWidth = null }) => {
  const {
    actions: { getFromPrice },
  } = usePrice()

  const [gridRowEnd, setGridRowEnd] = useState()
  const [imageWrapPadBottom, setImageWrapPadBottom] = useState(0)

  const itemContentEl = useRef()

  const { region } = useRegion()

  const imageData = getImage(product.thumbnail)

  const updateGridRowEnd = useCallback(() => {
    if (rowHeight && screenWidth) {
      const rowSpan = Math.ceil(
        (itemContentEl.current.getBoundingClientRect().height + 40) / rowHeight
      )
      setGridRowEnd("span " + rowSpan)
    }
  }, [rowHeight, screenWidth])

  useEffect(() => {
    if (imageData.width && imageData.height) {
      const imagePadBottom = (100 * imageData.height) / imageData.width

      setImageWrapPadBottom(imagePadBottom.toFixed(2))
      updateGridRowEnd()
    }
  }, [imageData.width, imageData.height, updateGridRowEnd])

  const fromPrice = useMemo(() => {
    return getFromPrice(product, region?.currency_code)
  }, [product, region?.currency_code, getFromPrice])

  return (
    <div className={productListItem} style={{ gridRowEnd }}>
      <div>
        <div className={productListItemContent} ref={itemContentEl}>
          <div
            className={productImageWrap}
            style={{
              paddingBottom: `${imageWrapPadBottom}%`,
            }}
          >
            <GatsbyImage
              image={imageData}
              className={productImage}
              alt={product.title}
              style={{
                position: "absolute",
              }}
            />
          </div>
          <div className={productInfo}>
            <h3>
              <ProductLink product={product} className={productLink}>
                {product.title}
              </ProductLink>
            </h3>
            <div className={productPrice}>
              <span>from</span> {fromPrice}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductListItem
