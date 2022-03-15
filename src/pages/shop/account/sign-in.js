import React from "react"
import { useAuth } from "../../../hooks/use-auth"
import { Link } from "gatsby"
import AuthLayout from "../../../components/auth/auth-layout"
import Input from "../../../components/forms/input"
import ErrorMessage from "../../../components/utility/error-message"
import SearchEngineOptimization from "../../../components/utility/seo"
import SplitFieldset from "../../../components/forms/split-fieldset"

const SignIn = () => {
  const {
    forms: { loginForm },
  } = useAuth()

  return (
    <AuthLayout>
      <SearchEngineOptimization title="Sign In" />
      <div>
        <div>
          <h1>Welcome back</h1>
          <p>
            Don't have an account?{" "}
            <Link to="/shop/account/sign-up">Sign up</Link>
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
          <SplitFieldset>
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
          </SplitFieldset>
          <button type="submit">Sign in</button>
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignIn
