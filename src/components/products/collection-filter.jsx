import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import NoScrollLink from "../no-scroll-link"
import {
  collectionFilter,
  collectionLinks,
  activeFilter,
} from "../../styles/modules/collection-filter.module.css"

const CollectionFilter = ({ className }) => {
  const collections = useStaticQuery(graphql`
    {
      allMedusaCollections {
        nodes {
          title
          handle
        }
      }
    }
  `)

  if (collections.allMedusaCollections.nodes.length <= 1) {
    return null
  }

  return (
    <div className={`${collectionFilter} ${className}`}>
      <span>Show me</span>
      <div className={collectionLinks}>
        <NoScrollLink path="/shop/" activeClassName={activeFilter}>
          everything,
        </NoScrollLink>
        {collections.allMedusaCollections.nodes.map((collection, index) => {
          const punct =
            index === collections.allMedusaCollections.nodes.length - 1
              ? "."
              : ","
          return (
            <NoScrollLink
              key={collection.handle}
              path={`/shop/${collection.handle}/`}
              activeClassName={activeFilter}
            >
              {collection.title.toLowerCase() + punct}
            </NoScrollLink>
          )
        })}
      </div>
    </div>
  )
}

export default CollectionFilter
