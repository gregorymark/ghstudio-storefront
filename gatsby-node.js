const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
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
