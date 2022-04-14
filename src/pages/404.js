import { Link } from "gatsby"
import React from "react"
import Article from "../components/article"
import SearchEngineOptimization from "../components/seo"

const NotFoundPage = () => (
  <>
    <SearchEngineOptimization title="404 | Page not found" />
    <Article>
      <h1>404</h1>
      <p>
        This page doesn't seem to exist. Do you want to go back{" "}
        <Link to="/">Home</Link>?
      </p>
    </Article>
  </>
)

export default NotFoundPage
