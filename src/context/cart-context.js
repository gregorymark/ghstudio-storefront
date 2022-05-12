import { graphql, useStaticQuery } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import React, { createContext, useEffect, useState, useCallback } from "react"
import { useMedusa } from "../hooks/use-medusa"
import { useRegion } from "../hooks/use-region"

const defaultCartContext = {
  inventory: [],
  cart: {
    items: [],
  },
  loading: false,
  actions: {
    updateCart: () => {},
    resetCart: () => {},
    addItem: async () => {},
    removeItem: async () => {},
    updateQuantity: async () => {},
    addDiscount: async () => {},
    createPaymentSession: async () => {},
    setPaymentSession: async () => {},
    completeCart: async () => {},
    getCartShippingOptions: async () => {},
    addShippingMethod: async () => {},
  },
}

const CartContext = createContext(defaultCartContext)
export default CartContext

const CART_ID = "cart_id"
const isBrowser = typeof window !== "undefined"

export const CartProvider = props => {
  const [open, setOpen] = useState(false)
  const [cart, setCart] = useState(defaultCartContext.cart)
  const [loading, setLoading] = useState(defaultCartContext.loading)
  const [creatingPaymentSession, setCreatingPaymentSession] = useState(false)
  const [products, setProducts] = useState([])
  const [inventory, setInventory] = useState(defaultCartContext.inventory)
  const client = useMedusa()
  const { region } = useRegion()

  const thumbData = useStaticQuery(graphql`
    {
      allMedusaProducts {
        edges {
          node {
            id
            thumbnail {
              childImageSharp {
                gatsbyImageData(width: 300)
              }
            }
          }
        }
      }
    }
  `)

  const prodThumbImages = thumbData.allMedusaProducts.edges.map(edge => {
    return {
      product_id: edge.node.id,
      image_data: getImage(edge.node.thumbnail),
    }
  })

  useEffect(() => {
    const initializeCart = async () => {
      const existingCartId = isBrowser ? localStorage.getItem(CART_ID) : null

      if (existingCartId && existingCartId !== null) {
        try {
          const existingCart = await client.carts
            .retrieve(existingCartId)
            .then(({ cart }) => cart)
            .catch(err => console.log(err.message))

          if (!existingCart.completed_at) {
            setCartItem(existingCart)
            return
          }
        } catch (e) {
          localStorage.setItem(CART_ID, null)
        }
      }

      const newCart = await client.carts
        .create({})
        .then(({ cart }) => cart)
        .catch(err => console.log(err.message))

      setCartItem(newCart)
      setLoading(false)
    }

    initializeCart()
  }, [client.carts])

  useEffect(() => {
    const updateCartRegion = async () => {
      setLoading(true)

      const cartId = cart.id

      if (cart.region) {
        const isEqual = cart.region.id === region.id
        if (isEqual) {
          setLoading(false)
          return
        }
      }

      const cartRes = await client.carts
        .update(cartId, { region_id: region.id })
        .then(({ cart }) => cart)
        .catch(err => console.log(err.message))

      if (cartRes) {
        setCart(cartRes)
      }

      setLoading(false)
    }

    if (cart.id && region?.id) {
      updateCartRegion()
    }
  }, [cart.id, cart.region, region?.id, client.carts])

  useEffect(() => {
    cart.items.sort((a, b) => (a.created_at > b.created_at ? 1 : -1))
  }, [cart.items])

  const addItem = async item => {
    setLoading(true)

    let cartId = cart.id

    if (!cartId) {
      const newCart = await client.carts
        .create({})
        .then(({ cart }) => cart)
        .catch(err => console.log(err.message))

      cartId = newCart.id
      setCartItem(newCart)
    }

    return client.carts.lineItems
      .create(cartId, item)
      .then(({ cart }) => {
        setCart(cart)

        return true
      })
      .catch(err => {
        console.log(
          "ERROR: Could not add to cart. Someone might have bought the product elsewhere.",
          err.message
        )
        updateInventory()

        return false
      })
      .finally(() => setLoading(false))
  }

  const setCartOpen = value => {
    setOpen(value)
  }

  const removeItem = async id => {
    setLoading(true)

    const cartId = cart.id

    return client.carts.lineItems
      .delete(cartId, id)
      .then(({ cart }) => {
        setCart(cart)
      })
      .catch(err => console.log(err.message))
      .finally(() => setLoading(false))
  }

  const updateQuantity = async item => {
    setLoading(true)

    const cartId = cart.id

    if (item.quantity > item.max) {
      return false
    }

    return client.carts.lineItems
      .update(cartId, item.id, { quantity: item.quantity })
      .then(({ cart }) => {
        setCart(cart)

        return true
      })
      .catch(err => {
        console.log(
          "ERROR: Couldn't change quantity. If you were trying to add another item, someone else might have bought the last of the product.",
          err.message
        )
        updateInventory()

        return false
      })
      .finally(() => setLoading(false))
  }

  const addDiscount = async discount => {
    setLoading(true)

    const cartId = cart.id

    return client.carts
      .update(cartId, { discounts: [{ code: discount }] })
      .then(({ cart }) => {
        setCart(cart)
      })
      .catch(err => console.log(err.message))
      .finally(() => setLoading(false))
  }

  const getCartShippingOptions = async (providedCartId = null) => {
    setLoading(true)

    const cartId = providedCartId || cart.id

    return client.shippingOptions
      .listCartOptions(cartId)
      .then(({ shipping_options }) => {
        return shipping_options
      })
      .catch(err => console.log(err.message))
      .finally(() => setLoading(false))
  }

  const addShippingMethod = async payload => {
    setLoading(true)

    const cartId = cart.id

    return client.carts
      .addShippingMethod(cartId, payload)
      .then(({ cart }) => {
        setCart(cart)
        setLoading(false)
      })
      .catch(err => console.log(err.message))
  }

  const updateCart = async payload => {
    setLoading(true)

    const cartId = cart.id

    return client.carts
      .update(cartId, payload)
      .then(({ cart }) => {
        setCart(cart)
      })
      .catch(err => console.log(err.message))
      .finally(() => setLoading(false))
  }

  const createPaymentSession = async (providedCartId = null) => {
    if (!creatingPaymentSession) {
      setLoading(true)
      setCreatingPaymentSession(true)

      const cartId = providedCartId ?? cart.id

      return client.carts
        .createPaymentSessions(cartId)
        .then(({ cart }) => {
          setCart(cart)
          setLoading(false)
        })
        .catch(err => console.log(err.message))
        .finally(() => {
          setCreatingPaymentSession(false)
        })
    }
  }

  const setPaymentSession = async (providerId, providedCartId = null) => {
    setLoading(true)

    const cartId = providedCartId ?? cart.id

    return client.carts
      .setPaymentSession(cartId, { provider_id: providerId })
      .then(({ cart }) => {
        setCart(cart)

        return cart
      })
      .catch(err => {
        console.log(err.message)

        return false
      })
      .finally(() => setLoading(false))
  }

  const completeCart = async (providedCartId = null) => {
    setLoading(true)

    const cartId = providedCartId ?? cart.id

    return client.carts
      .complete(cartId)
      .then(({ data: order }) => {
        setCart(defaultCartContext.cart)

        return order
      })
      .catch(err => {
        console.log(err.message)

        return false
      })
      .finally(() => setLoading(false))
  }

  const setCartItem = cart => {
    if (isBrowser) {
      localStorage.setItem(CART_ID, cart.id)
    }

    setCart(cart)
  }

  /*
   * Inventory. This context should possibly just be called ShopContext.
   * We're only using getProducts for inventory as otherwise we lose all of
   * the gatsby goodness to do with images etc. (Not 100% Gatsby is the best
   * for a shop that has to manage inventory). It also doesn't seem that
   * Medusa includes inventory info for products that may be in other people's
   * carts. So we have to check inventory if a cart purchase fails because
   * of insufficient inventory.
   */
  const getProducts = useCallback(async () => {
    const products = await client.products
      .list()
      .then(({ products }) => products)
      .catch(_ => undefined)

    setProducts(products)
  }, [client.products])

  useEffect(() => {
    getProducts().catch(console.error)
  }, [getProducts])

  useEffect(() => {
    const inventoryMap = {}

    for (const product of products) {
      const tmp = {}

      for (const variant of product.variants) {
        tmp[variant.id] = {
          all: variant.inventory_quantity,
          not_in_cart: variant.inventory_quantity,
        }

        // Remove any in cart from available quantity
        for (const item of cart.items) {
          if (item.variant_id === variant.id) {
            tmp[variant.id].not_in_cart -= item.quantity
          }
        }
      }

      inventoryMap[product.id] = tmp
    }

    setInventory(inventoryMap)
  }, [products, cart.items])

  const updateInventory = () => {
    getProducts().catch(console.error)
  }

  return (
    <CartContext.Provider
      {...props}
      value={{
        ...defaultCartContext,
        inventory,
        loading,
        cart,
        open,
        prodThumbImages,
        actions: {
          addItem,
          removeItem,
          updateQuantity,
          addDiscount,
          createPaymentSession,
          setPaymentSession,
          completeCart,
          getCartShippingOptions,
          addShippingMethod,
          updateCart,
          setCartOpen,
        },
      }}
    />
  )
}
