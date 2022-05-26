import React from "react"
import { graphql, Link } from "gatsby"
import SearchEngineOptimization from "../components/seo"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import {
  text01,
  text02,
  text03,
  homeImages,
  homeImage,
  homeImage0Wrap,
  homeImage1Wrap,
  homeImage2Wrap,
  homeImage3Wrap,
  homeImage4Wrap,
  homeImage5Wrap,
  homeImage6Wrap,
} from "../styles/modules/home.module.css"

const IndexPage = ({ data }) => {
  const images = [
    { name: data.image0.name, imageData: getImage(data.image0) },
    { name: data.image1.name, imageData: getImage(data.image1) },
    { name: data.image2.name, imageData: getImage(data.image2) },
    { name: data.image3.name, imageData: getImage(data.image3) },
    { name: data.image4.name, imageData: getImage(data.image4) },
    { name: data.image5.name, imageData: getImage(data.image5) },
    { name: data.image6.name, imageData: getImage(data.image6) },
  ]

  return (
    <>
      <SearchEngineOptimization title="Home" />
      <blockquote className={text01}>
        I'm an artist, <em>primarily a painter</em>, with a strong draw towards{" "}
        <em>portraiture and the human figure</em>.
      </blockquote>
      <div className={homeImages}>
        <div className={homeImage0Wrap}>
          <GatsbyImage
            image={images[0].imageData}
            alt={images[0].name}
            className={homeImage}
          />
        </div>
        <div className={homeImage1Wrap}>
          <GatsbyImage
            image={images[1].imageData}
            alt={images[1].name}
            className={homeImage}
          />
        </div>
        <blockquote className={text02}>
          I also love taking <em>commissions</em>, you can find out more{" "}
          <Link to="/commissions/">here</Link>.
        </blockquote>
        <div className={homeImage2Wrap}>
          <GatsbyImage
            image={images[2].imageData}
            alt={images[2].name}
            className={homeImage}
          />
        </div>
        <div className={homeImage3Wrap}>
          <GatsbyImage
            image={images[3].imageData}
            alt={images[3].name}
            className={homeImage}
          />
        </div>
        <div className={homeImage4Wrap}>
          <GatsbyImage
            image={images[4].imageData}
            alt={images[4].name}
            className={homeImage}
          />
        </div>
        <blockquote className={text03}>
          If you want to hear about my projects and the prints and originals I
          have for sale, I send an occasional newsletter that you can sign up to{" "}
          <Link to="/newsletter">here</Link>.
        </blockquote>
        <div className={homeImage5Wrap}>
          <GatsbyImage
            image={images[5].imageData}
            alt={images[5].name}
            className={homeImage}
          />
        </div>
        <div className={homeImage6Wrap}>
          <GatsbyImage
            image={images[6].imageData}
            alt={images[6].name}
            className={homeImage}
          />
        </div>
      </div>
    </>
  )
}

export const query = graphql`
  {
    image0: file(relativePath: { eq: "home/Olivia.png" }) {
      id
      name
      childImageSharp {
        gatsbyImageData
      }
    }
    image1: file(relativePath: { eq: "home/Rudi and Maria Detail.jpg" }) {
      id
      name
      childImageSharp {
        gatsbyImageData
      }
    }
    image2: file(relativePath: { eq: "home/Dinner Party at Roos.jpg" }) {
      id
      name
      childImageSharp {
        gatsbyImageData
      }
    }
    image3: file(relativePath: { eq: "home/Jacket on the Striped Bed.jpg" }) {
      id
      name
      childImageSharp {
        gatsbyImageData
      }
    }
    image4: file(relativePath: { eq: "home/Rudi and Maria.jpg" }) {
      id
      name
      childImageSharp {
        gatsbyImageData
      }
    }
    image5: file(
      relativePath: {
        eq: "home/Still life with moka, pepper, squash and aubergine.jpg"
      }
    ) {
      id
      name
      childImageSharp {
        gatsbyImageData
      }
    }
    image6: file(relativePath: { eq: "home/Dymchurch.jpg" }) {
      id
      name
      childImageSharp {
        gatsbyImageData
      }
    }
  }
`

export default IndexPage
