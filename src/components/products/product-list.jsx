import React, { useEffect, useState, useRef } from "react"
import ProductListItem from "./product-list-item"
import { productList } from "../../styles/modules/product-list.module.css"

const ProductList = ({ products }) => {
  const listEl = useRef()
  const [screenWidth, setScreenWidth] = useState()
  const [rowHeight, setRowHeight] = useState()

  useEffect(() => {
    const tmpRowHeight = parseInt(
      window.getComputedStyle(listEl.current).getPropertyValue("grid-auto-rows")
    )
    setRowHeight(tmpRowHeight)
    setScreenWidth(window.innerWidth)
    window.addEventListener("resize", () => setScreenWidth(window.innerWidth))
  }, [])

  const productListJsx = products.map(product => {
    return (
      <ProductListItem
        key={product.handle}
        product={product}
        rowHeight={rowHeight}
        screenWidth={screenWidth}
      />
    )
  })

  return (
    <div className={productList} ref={listEl}>
      {productListJsx}
    </div>
  )
}

export default ProductList
