import React from "react"
import SearchEngineOptimization from "../components/utility/seo"
import ProductList from "../components/products/product-list"
import { collectionIntro } from "../styles/modules/collection.module.css"
import { Link } from "gatsby"

const Collection = ({ pageContext }) => {
  const { title, products } = pageContext

  return (
    <>
      <SearchEngineOptimization title={title} />
      <div className={collectionIntro}>
        <h1>
          Welcome to the <em>print shop</em>.
        </h1>
        <p>
          Prints are available in <em>A4</em>, <em>A3</em> and <em>A2</em>{" "}
          sizes. Please <Link to="/contact">get in touch</Link> if you want to
          order a larger print, an original painting or if you would like to{" "}
          <Link to="/commissions">commission</Link> an original work.
        </p>
      </div>
      <ProductList products={products} />
    </>
  )
}

export default Collection
