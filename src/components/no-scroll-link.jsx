import React from "react"
import { navigate } from "gatsby"
import { useLocation } from "@reach/router"

const NoScrollLink = ({
  path,
  className = "",
  activeClassName = "",
  children,
}) => {
  const location = useLocation()

  return (
    <a
      className={`${className} ${
        path === location.pathname ? activeClassName : ""
      }`}
      href={path}
      onClick={e => {
        e.preventDefault()

        navigate(path, {
          state: {
            disableScrollUpdate: true,
          },
        })
      }}
    >
      {children}
    </a>
  )
}

export default NoScrollLink
