import React from "react"
import { graphql, Link } from "gatsby"
import ProductImages from "../components/products/product-images"
import ProductOptionSelector from "../components/products/product-option-selector"
import QuantitySelector from "../components/products/quantity-selector"
import SearchEngineOptimization from "../components/utility/seo"
import { useCart } from "../hooks/use-cart"
import { useProduct } from "../hooks/use-product"
import { formatPrice } from "../utils/format-price"
import { useRegion } from "../hooks/use-region"
import {
  productWrap,
  productImagesWrap,
  productPrice,
  productDescription,
  productInfo,
  addToCartButton,
  productPrevNext,
} from "../styles/modules/product-single.module.css"

const Product = ({ data, pageContext }) => {
  const { product } = data
  const { regionId, taxRate, currencyCode, handle, prevPath, nextPath } =
    pageContext
  const { region } = useRegion()
  const {
    loading,
    actions: { addItem },
  } = useCart()

  const {
    variant,
    options,
    quantity,
    actions: {
      updateOptions,
      increaseQuantity,
      decreaseQuantity,
      resetOptions,
    },
  } = useProduct(product)

  const price = variant
    ? variant.prices.find(p => p.currency_code === region?.currency_code)
    : undefined

  const handleAddToCart = async () => {
    await addItem({ variant_id: variant.id, quantity })
    resetOptions()
  }

  return (
    <>
      <SearchEngineOptimization
        title={product.title}
        description={product.description}
      />
      <div className={productWrap}>
        <div className={productImagesWrap}>
          <ProductImages
            mainImageUrl={product.thumbnail.url}
            images={product.images}
            mainAlt={product.title}
          />
        </div>
        <div className={productInfo}>
          <h1>{product.title}</h1>
          <div className={productPrice}>
            {formatPrice(price?.amount, region?.currency_code, 1, taxRate)}
          </div>
          <div className={productDescription}>
            {product.collection.metadata?.prodinfo && (
              <p>{product.collection.metadata?.prodinfo}</p>
            )}
            <p>{product.description}</p>
          </div>
          {product.options.map((option, index) => {
            return (
              <div key={index}>
                <ProductOptionSelector
                  option={option}
                  current={options[option.id]}
                  updateOption={updateOptions}
                />
              </div>
            )
          })}
          <QuantitySelector
            quantity={quantity}
            increment={increaseQuantity}
            decrement={decreaseQuantity}
            title="Select quantity"
          />
          <button
            className={addToCartButton}
            onClick={() => handleAddToCart()}
            disabled={loading}
          >
            Add to bag
          </button>
        </div>
      </div>
      <div className={productPrevNext}>
        <Link to={prevPath}>Previous product</Link>
        <Link to={nextPath}>Next product</Link>
      </div>
    </>
  )
}

export const query = graphql`
  query ($handle: String!) {
    product: medusaProducts(handle: { eq: $handle }) {
      id
      title
      description
      options {
        id
        title
        values {
          id
          value
        }
      }
      collection {
        handle
        metadata {
          prodinfo
        }
      }
      variants {
        options {
          value
          option_id
          id
        }
        id
        title
        prices {
          amount
          currency_code
        }
      }
      thumbnail {
        url
      }
      images {
        url
        image {
          childImageSharp {
            gatsbyImageData(width: 1000)
          }
        }
      }
    }
  }
`

export default Product
