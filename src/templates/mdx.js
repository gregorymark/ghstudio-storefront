import React from "react"
import { graphql, Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Expandable from "../components/mdx/expandable"
import Spacing from "../components/mdx/spacing"
import SearchEngineOptimization from "../components/utility/seo"
import Article from "../components/article"

const shortcodes = { Link, Expandable, Spacing }

const Mdx = ({ data: { mdx } }) => {
  return (
    <>
      <SearchEngineOptimization title={mdx.frontmatter.title} />
      <Article
        image={mdx.frontmatter.image}
        imageAlt={mdx.frontmatter.imageAlt}
      >
        <MDXProvider components={shortcodes}>
          <MDXRenderer frontmatter={mdx.frontmatter}>{mdx.body}</MDXRenderer>
        </MDXProvider>
      </Article>
    </>
  )
}

export const pageQuery = graphql`
  query MdxQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
        image {
          childImageSharp {
            gatsbyImageData(width: 665)
          }
        }
        imageAlt
      }
    }
  }
`

export default Mdx
