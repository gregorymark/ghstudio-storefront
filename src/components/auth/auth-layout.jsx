import React from "react"
import { authLayout } from "../../styles/modules/account.module.css"

const AuthLayout = ({ children }) => {
  return <div className={authLayout}>{children}</div>
}

export default AuthLayout
