import React from "react"
import SearchEngineOptimization from "../components/utility/seo"
import ProductList from "../components/products/product-list"

const Collection = ({ pageContext }) => {
  const { title, products } = pageContext

  return (
    <>
      <SearchEngineOptimization title={title} />
      <ProductList products={products} />
    </>
  )
}

export default Collection
