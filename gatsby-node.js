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
            collection {
              handle
            }
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

  const products = data.allMedusaProducts.edges.map(({ node }) => node)

  actions.createPage({
    path: "/shop",
    component: require.resolve(`./src/templates/collection.js`),
    context: {
      title: "Shop",
      products: products,
      filterables: getFilterables(products),
    },
  })

  data.allMedusaCollections.edges.forEach(({ node }) => {
    const { id, handle: collectionHandle } = node

    const productsInCollection = products.filter(
      product => product.collection_id === id
    )

    productsInCollection.forEach((node, index) => {
      const productHandle = node.handle

      // Getting previous and next products from the same collection
      const prevIndex =
        index - 1 < 0 ? productsInCollection.length - 1 : index - 1
      const nextIndex = index + 1 >= productsInCollection.length ? 0 : index + 1
      const prevProductHandle = productsInCollection[prevIndex].handle
      const nextProductHandle = productsInCollection[nextIndex].handle

      actions.createPage({
        path: `/shop/${collectionHandle}/${productHandle}`,
        component: require.resolve(`./src/templates/product.js`),
        context: {
          handle: productHandle,
          prevPath: `/shop/${collectionHandle}/${prevProductHandle}`,
          nextPath: `/shop/${collectionHandle}/${nextProductHandle}`,
        },
      })
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

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        fs: false,
        path: false,
      },
    },
  })
}
