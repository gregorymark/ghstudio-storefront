import React, { useEffect } from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import useEmblaCarousel from "embla-carousel-react"
import {
  productImages,
  carousel,
  carouselInner,
  carouselSlide,
} from "../../styles/modules/product-images.module.css"

const ProductImages = ({ images, className }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel()

  const needsCarousel = images.length > 1

  const imagesList = images.map((productImage, index) => {
    const imageData = getImage(productImage.image)
    return (
      <GatsbyImage
        key={productImage.url}
        className={carouselSlide}
        image={imageData}
        alt=""
      />
    )
  })

  return (
    <div className={`${productImages} ${className}`}>
      <div className={carousel} ref={emblaRef}>
        <div className={carouselInner}>{imagesList}</div>
      </div>
      {needsCarousel && (
        <div>
          <button onClick={() => emblaApi.scrollPrev()}>Prev</button>
          <button onClick={() => emblaApi.scrollNext()}>Next</button>
        </div>
      )}
    </div>
  )
}

export default ProductImages
