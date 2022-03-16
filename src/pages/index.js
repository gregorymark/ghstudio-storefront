import React from "react"
import { graphql } from "gatsby"
import SearchEngineOptimization from "../components/utility/seo"
import ImageFlow from "../components/image-flow"
import { introText } from "../styles/modules/home.module.css"

const IndexPage = ({ data }) => {
  console.log(data)
  const images = [
    data.imageCol01Image01,
    data.imageCol01Image02,
    data.imageCol01Image03,
    data.imageCol02Image01,
    data.imageCol02Image02,
    data.imageCol02Image03,
  ]

  return (
    <>
      <SearchEngineOptimization title="Home" />
      <blockquote className={introText}>
        I'm an artist, primarily a painter, with a strong draw towards
        portraiture and the human figure.
      </blockquote>
      <ImageFlow images={images} />
    </>
  )
}

export const query = graphql`
  {
    imageCol01Image01: file(relativePath: { eq: "home/Olivia.png" }) {
      id
      name
      childImageSharp {
        gatsbyImageData
      }
    }
    imageCol01Image02: file(relativePath: { eq: "home/Large Interior.png" }) {
      id
      name
      childImageSharp {
        gatsbyImageData
      }
    }
    imageCol01Image03: file(relativePath: { eq: "home/Rudi Zygadlo.jpg" }) {
      id
      name
      childImageSharp {
        gatsbyImageData
      }
    }
    imageCol02Image01: file(relativePath: { eq: "home/Rudi and Maria Detail.jpg" }) {
      id
      name
      childImageSharp {
        gatsbyImageData
      }
    }
    imageCol02Image02: file(relativePath: { eq: "home/Corpos sketch pink.png" }) {
      id
      name
      childImageSharp {
        gatsbyImageData
      }
    }
    imageCol02Image03: file(relativePath: { eq: "home/Male Back with a Striped Duvet.jpg" }) {
      id
      name
      childImageSharp {
        gatsbyImageData
      }
    }
  }
`

export default IndexPage
