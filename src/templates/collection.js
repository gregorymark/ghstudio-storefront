import React from "react"
import SearchEngineOptimization from "../components/seo"
import ProductList from "../components/products/product-list"
import {
  collectionIntro,
  collectionFilter,
} from "../styles/modules/collection.module.css"
import { graphql, Link } from "gatsby"
import CollectionFilter from "../components/products/collection-filter"

const Collection = ({ data, pageContext }) => {
  const { products } = pageContext

  const collection = data ? data.collection : null
  const collectionTitle = collection ? `${collection.title} shop` : "shop"

  return (
    <>
      <SearchEngineOptimization title={collectionTitle} />
      <div className={collectionIntro}>
        <h1>
          Welcome to the <em>{collectionTitle.toLowerCase()}</em>.
        </h1>
        <p>
          {collection?.metadata?.description ? (
            collection.metadata?.description
          ) : (
            <>
              I currently offer prints and original works on paper through the
              site. Please <Link to="/contact/">get in touch</Link> if you want
              to purchase an original painting or if you would like to{" "}
              <Link to="/commissions/">commission</Link> an original work.
            </>
          )}
        </p>
      </div>
      <CollectionFilter className={collectionFilter} />
      <ProductList products={products} />
    </>
  )
}

export const query = graphql`
  query ($handle: String) {
    collection: medusaCollections(handle: { eq: $handle }) {
      title
      metadata {
        description
      }
    }
  }
`

export default Collection
