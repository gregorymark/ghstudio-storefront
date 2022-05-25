import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import {
  article,
  articleHasImage,
  articleContent,
  articleImageWrap,
  articleImage,
} from "../styles/modules/article.module.css"

const Article = ({ image, imageAlt, children }) => {
  const imageData = image ? getImage(image) : null

  return (
    <article className={`${article} ${imageData ? articleHasImage : ""}`}>
      <div className={articleContent}>{children}</div>
      {imageData && (
        <div className={articleImageWrap}>
          <GatsbyImage
            image={imageData}
            alt={imageAlt}
            className={articleImage}
          />
        </div>
      )}
    </article>
  )
}

export default Article
