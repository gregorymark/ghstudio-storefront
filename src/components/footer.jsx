import { Link } from "gatsby"
import React from "react"
import { footer } from "../styles/modules/footer.module.css"

const Footer = () => {
  const internals = [
    {
      name: "Create return",
      to: "/shop/create-return",
    },
    {
      name: "FAQ",
      to: "/info/faq",
    },
    {
      name: "Terms & Conditions",
      to: "/info/terms-and-conditions",
    },
  ]

  return (
    <footer className={footer}>
      <div>
        {internals.map((internal, index) => {
          return (
            <React.Fragment key={internal.name}>
              {index !== 0 && " / "}
              <Link to={internal.to}>
                {internal.name}
              </Link>
            </React.Fragment>
          )
        })}
      </div>
    </footer>
  )
}

export default Footer
