require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Medusa Gatsby Starter`,
    description: `Kick off your next, great e-commerce project with this default starter with Medusa, Gatsby and common dev tools.`,
    author: `@medusajs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    "gatsby-plugin-mdx",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "info",
        path: `${__dirname}/src/content/`,
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-source-medusa`,
      options: {
        storeUrl:
          process.env.GATSBY_MEDUSA_BACKEND_URL || `http://localhost:9000`,
      },
    },
  ],
}
