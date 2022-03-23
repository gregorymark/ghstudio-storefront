import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import {
  article,
  articleContent,
  articleImageWrap,
} from "../styles/modules/article.module.css"

const Article = ({ image, imageAlt, children }) => {
  const imageData = getImage(image)

  return (
    <article className={article}>
      <div className={articleContent}>{children}</div>
      <div className={articleImageWrap}>
        <GatsbyImage image={imageData} alt={imageAlt} />
      </div>
    </article>
  )
}

export default Article