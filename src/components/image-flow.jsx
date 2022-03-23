import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import {
  imageFlow,
  imageFlowImage,
  imageFlowColumn,
} from "../styles/modules/image-flow.module.css"

const ImageFlow = ({ images }) => {
  const imagesInFirstColumn = Math.floor(images.length / 2)
  const columns = [
    images.slice(0, imagesInFirstColumn),
    images.slice(imagesInFirstColumn),
  ]
  const columnsJsx = columns.map((column, index) => {
    return (
      <div key={`column${index}`} className={imageFlowColumn}>
        {column.map(image => {
          if (!image) return null
          const imageData = getImage(image)

          return (
            <GatsbyImage
              key={image.id}
              image={imageData}
              alt={image.name}
              className={imageFlowImage}
            />
          )
        })}
      </div>
    )
  })

  return <div className={imageFlow}>{columnsJsx}</div>
}

export default ImageFlow
