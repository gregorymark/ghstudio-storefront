import React from "react"
import ProductListItem from "./product-list-item"
import { productList } from "../../styles/modules/product-list.module.css"

const ProductList = ({ products }) => {
  const productListJsx = products.map(product => {
    return <ProductListItem product={product} key={product.handle} />
  })

  return <div className={productList}>{productListJsx}</div>
}

export default ProductList
