import { Link } from "gatsby"
import React from "react"
import { footer } from "../styles/modules/footer.module.css"

const Footer = () => {
  const internals = [
    {
      name: "Create return",
      to: "/create-return",
    },
    {
      name: "FAQ",
      to: "/faq",
    },
    {
      name: "Terms & Conditions",
      to: "/terms-and-conditions",
    },
  ]

  return (
    <footer className={footer}>
      <div>
        {internals.map((internal, index) => {
          return (
            <>
              {index !== 0 && " / "}
              <Link to={internal.to} key={internal.name}>
                {internal.name}
              </Link>
            </>
          )
        })}
      </div>
    </footer>
  )
}

export default Footer
