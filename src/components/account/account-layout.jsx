import { navigate } from "gatsby"
import React, { useEffect } from "react"
import { useCustomer } from "../../hooks/use-customer"
import AccountNav from "./account-nav"

const AccountLayout = ({ children }) => {
  const { loading, customer } = useCustomer()

  useEffect(() => {
    if (!loading && !customer) {
      navigate("/shop/account/sign-in")
    }
  }, [loading, customer])

  return (
    <>
      {loading || !customer ? (
        <p>Loading...</p>
      ) : (
        <div>
          <AccountNav />
          {children}
        </div>
      )}
    </>
  )
}

export default AccountLayout
