import Medusa from "@medusajs/medusa-js"
import React from "react"
import Layout from "./src/components/layout"
import { MedusaProvider } from "./src/context/medusa-context"

const BASE_URL =
  process.env.GATSBY_MEDUSA_BACKEND_URL || "http://localhost:9000"

const medusaClient = new Medusa({ baseUrl: BASE_URL })

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}

export const wrapRootElement = ({ element }) => {
  return <MedusaProvider client={medusaClient}>{element}</MedusaProvider>
}

export const shouldUpdateScroll = ({ routerProps }) => {
  const { disableScrollUpdate } = routerProps.location.state
  return !disableScrollUpdate
}
