import _ from "lodash"
import { useState, useMemo, useEffect } from "react"
import { useCart } from "./use-cart"

export const useProduct = (product = { options: [], variants: [] }) => {
  const [noMoreOfVariant, setNoMoreOfVariant] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState({})
  const [quantity, setQuantity] = useState(1)
  const [currVariantInventory, setCurrVariantInventory] = useState()
  const { inventory } = useCart()

  useEffect(() => {
    const optionObj = {}
    for (const option of product.options) {
      Object.assign(optionObj, { [option.id]: option.values[0].value })
    }
    setSelectedOptions(optionObj)
  }, [product])

  /*
   * A variant is a combination of different options. So if you have size and colour,
   * one variant would be "large, blue" and another would be "large, red". Therefore
   * variants have options associated with them, options don't have associated variants.
   */
  const variantOptions = useMemo(() => {
    const map = {}

    for (const variant of product.variants) {
      const tmp = {}

      for (const option of variant.options) {
        tmp[option.option_id] = option.value
      }

      map[variant.id] = tmp
    }

    return map
  }, [product.variants])

  const currentVariant = useMemo(() => {
    let variantId = undefined

    for (const key of Object.keys(variantOptions)) {
      if (_.isEqual(variantOptions[key], selectedOptions)) {
        variantId = key
      }
    }

    return product.variants.find(v => v.id === variantId)
  }, [selectedOptions, variantOptions, product.variants])

  useEffect(() => {
    if (inventory[product.id] && currentVariant) {
      setCurrVariantInventory(
        inventory[product.id][currentVariant.id].not_in_cart
      )
      setNoMoreOfVariant(
        inventory[product.id][currentVariant.id].not_in_cart === 0
      )
    }
  }, [currentVariant, inventory, product])

  useEffect(() => {
    if (quantity > currVariantInventory) {
      setQuantity(currVariantInventory)
    }
    // In case the quantity was zero but we switch to a variant with some available
    if (quantity === 0 && currVariantInventory > 0) {
      setQuantity(1)
    }
  }, [quantity, currVariantInventory])

  const updateSelectedOptions = update => {
    setSelectedOptions({ ...selectedOptions, ...update })
  }

  const increaseQuantity = () => {
    if (!(quantity + 1 > currVariantInventory)) {
      setQuantity(quantity + 1)
    }
  }

  const decreaseQuantity = () => {
    if (quantity - 1 > 0) {
      setQuantity(quantity - 1)
    }
  }

  const resetOptions = () => {
    const optionObj = {}
    for (const option of product.options) {
      Object.assign(optionObj, { [option.id]: option.values[0].value })
    }
    setSelectedOptions(optionObj)
    setQuantity(1)
  }

  return {
    currentVariant,
    noMoreOfVariant,
    selectedOptions,
    quantity,
    actions: {
      updateSelectedOptions,
      increaseQuantity,
      decreaseQuantity,
      resetOptions,
    },
  }
}
