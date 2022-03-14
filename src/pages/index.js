import React from "react"
import { graphql } from "gatsby"
import SearchEngineOptimization from "../components/utility/seo"
import ImageFlow from "../components/image-flow"

const IndexPage = ({ data }) => {
  return (
    <>
      <SearchEngineOptimization title="Home" />
      <ImageFlow images={data.flowImages.edges} />
    </>
  )
}

export const query = graphql`
  {
    flowImages: allFile(
      filter: {
        sourceInstanceName: { eq: "images" }
        relativeDirectory: { eq: "home" }
      }
    ) {
      edges {
        node {
          id
          name
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`

export default IndexPage
