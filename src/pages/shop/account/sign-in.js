import React from "react"
import { useAuth } from "../../../hooks/use-auth"
import { Link } from "gatsby"
import AuthLayout from "../../../components/auth/auth-layout"
import Input from "../../../components/forms/input"
import ErrorMessage from "../../../components/forms/error-message"
import SearchEngineOptimization from "../../../components/seo"
import { authSubmitButton } from "../../../styles/modules/account.module.css"

const SignIn = () => {
  const {
    forms: { loginForm },
  } = useAuth()

  return (
    <>
      <SearchEngineOptimization title="Sign In" />
      <AuthLayout>
        <div>
          <h1>Welcome back</h1>
          <p>
            If you've made an order but haven't yet set up an account,{" "}
            <Link to="/shop/account/sign-up/">sign up</Link> with the same email
            address to see your orders.
          </p>
        </div>
        <form
          onSubmit={e => {
            e.preventDefault()
            loginForm.handleSubmit()
          }}
        >
          {loginForm.status?.authError && (
            <ErrorMessage error={loginForm.status.authError} />
          )}
          <Input
            label="Email"
            type="email"
            autocomplete="email"
            name={"email"}
            formik={loginForm}
            defaultValue={loginForm.values.email}
          />
          <Input
            label="Password"
            type="password"
            autocomplete="old-password"
            name={"password"}
            formik={loginForm}
            defaultValue={loginForm.values.password}
          />
          <button type="submit" className={authSubmitButton}>
            Sign in
          </button>
        </form>
      </AuthLayout>
    </>
  )
}

export default SignIn
