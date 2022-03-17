const Medusa = require("@medusajs/medusa-js").default
const { createFilePath } = require(`gatsby-source-filesystem`)

const getFilterables = products => {
  const filterables = {}
  products.forEach(product => {
    product.options.forEach(option => {
      const { title, values } = option
      if (!filterables[title]) {
        filterables[title] = {
          title: title,
          values: [],
        }
      }
      values.forEach(value => {
        if (!filterables[title].values.find(v => v === value.value)) {
          filterables[title].values.push(value.value)
        }
      })
    })
  })

  return filterables
}

exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allMedusaRegions {
        edges {
          node {
            name
            currency_code
            id
            tax_rate
          }
        }
      }
      allMedusaProducts {
        edges {
          node {
            id
            title
            thumbnail {
              childImageSharp {
                gatsbyImageData
              }
            }
            handle
            collection_id
            options {
              values {
                value
              }
              title
            }
            variants {
              prices {
                amount
                currency_code
              }
            }
          }
        }
      }
      allMedusaCollections {
        edges {
          node {
            handle
            id
            title
          }
        }
      }
      allMdx {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `)

  data.allMdx.edges.forEach(({ node }) => {
    actions.createPage({
      path: `/${node.slug}`,
      component: require.resolve(`./src/templates/mdx.js`),
      context: { id: node.id },
    })
  })

  // TODO: Figure out what to do here. This was so that the product could
  // be switched if we were on the wrong URL for the region. I THINK we only
  // need one region as region isn't the same as shipping method, which is the
  // only region switching kind of behaviour we need. Therefore we probably don't
  // need multiple prices for each product per region?
  data.allMedusaRegions.edges.forEach(({ node }) => {
    const { id, name, currency_code, tax_rate } = node

    data.allMedusaProducts.edges.forEach(({ node }) => {
      const handle = node.handle
      actions.createPage({
        path: `/shop/${handle}`,
        component: require.resolve(`./src/templates/product.js`),
        context: {
          handle: handle,
          regionId: id,
          currencyCode: currency_code,
          taxRate: tax_rate,
        },
      })
    })
  })

  const products = data.allMedusaProducts.edges.map(({ node }) => node)

  // TODO: Do we need this page?
  actions.createPage({
    path: "/products",
    component: require.resolve(`./src/templates/collection.js`),
    context: {
      title: "All Products",
      products: products,
      filterables: getFilterables(products),
    },
  })

  // TODO: Do we need collections yet?
  data.allMedusaCollections.edges.forEach(({ node }) => {
    const { id, handle, title } = node

    const productsInCollection = products.filter(
      product => product.collection_id === id
    )

    actions.createPage({
      path: `collections/${handle}`,
      component: require.resolve(`./src/templates/collection.js`),
      context: {
        title: title,
        products: productsInCollection,
        filterables: getFilterables(productsInCollection),
      },
    })
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === "Mdx") {
    const relativePath = createFilePath({
      node,
      getNode,
      basePath: "src/content",
    })
    createNodeField({
      node,
      name: "slug",
      value: `/${relativePath}`,
    })
  }
}
