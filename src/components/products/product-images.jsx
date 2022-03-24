import React, { useState } from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import useEmblaCarousel from "embla-carousel-react"
import {
  prodMainImage,
  thumbImages,
  thumbImage,
  imagesModal,
  modalClose,
  carousel,
  carouselInner,
  carouselSlide,
  carouselImage,
  carouselPrev,
  carouselNext,
} from "../../styles/modules/product-images.module.css"

const ProductImages = ({ mainImageUrl, images, mainAlt = "", className }) => {
  useEmblaCarousel.globalOptions = { loop: true }
  const [emblaRef, emblaApi] = useEmblaCarousel()
  const [modalOpen, setModalOpen] = useState(false)

  const needsCarousel = images.length > 1

  images.sort((a, b) => {
    return a.url === mainImageUrl ? -1 : b.url === mainImageUrl ? 1 : 0
  })

  let mainImageData
  let thumbImagesJsx = []
  let carouselImagesJsx = []
  images.map((image, index) => {
    const imageData = getImage(image.image)

    if (image.url === mainImageUrl) {
      mainImageData = imageData
    }

    thumbImagesJsx.push(
      <GatsbyImage
        key={image.url}
        className={thumbImage}
        image={imageData}
        alt=""
        objectFit="cover"
        onClick={() => {
          emblaApi.scrollTo(index, true)
          setModalOpen(true)
        }}
      />
    )
    carouselImagesJsx.push(
      <div className={carouselSlide} key={image.url}>
        <GatsbyImage
          image={imageData}
          className={carouselImage}
          alt=""
          objectFit="contain"
          objectPosition="center top"
        />
      </div>
    )
  })

  return (
    <>
      <GatsbyImage
        image={mainImageData}
        alt={mainAlt}
        className={prodMainImage}
        onClick={() => {
          emblaApi.scrollTo(0, true)
          setModalOpen(true)
        }}
      />
      {needsCarousel && <div className={thumbImages}>{thumbImagesJsx}</div>}
      <div className={`${imagesModal} ${className}`} data-active={modalOpen}>
        <button className={modalClose} onClick={() => setModalOpen(false)}>
          Close
        </button>
        <div className={carousel} ref={emblaRef}>
          <div className={carouselInner}>{carouselImagesJsx}</div>
        </div>
        {needsCarousel && (
          <>
            <button
              onClick={() => emblaApi.scrollPrev()}
              className={carouselPrev}
            >
              Prev
            </button>
            <button
              onClick={() => emblaApi.scrollNext()}
              className={carouselNext}
            >
              Next
            </button>
          </>
        )}
      </div>
    </>
  )
}

export default ProductImages
