import { graphql } from "gatsby"
import React from "react"
import ProductList from "../components/products/product-list"
import SearchEngineOptimization from "../components/utility/seo"

const ShopPage = ({ data }) => {
  const products = data.allMedusaProducts.edges.map(edge => edge.node)

  return (
    <>
      <SearchEngineOptimization title="Home" />
      <ProductList products={products} />
    </>
  )
}
export const query = graphql`
  query {
    allMedusaProducts {
      edges {
        node {
          handle
          title
          collection_id
          thumbnail {
            childImageSharp {
              gatsbyImageData
            }
          }
          variants {
            prices {
              amount
              currency_code
            }
          }
        }
      }
    }
  }
`

export default ShopPage
