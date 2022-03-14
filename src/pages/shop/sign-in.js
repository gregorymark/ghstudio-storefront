import { Link } from "gatsby"
import React from "react"
import AuthLayout from "../../components/auth/auth-layout"
import Input from "../../components/forms/input"
import ErrorMessage from "../../components/utility/error-message"
import SearchEngineOptimization from "../../components/utility/seo"
import { useAuth } from "../../hooks/use-auth"

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
            <Link to="/shop/sign-up">
              Sign up
            </Link>
          </p>
        </div>
        <form
          onSubmit={e => {
            e.preventDefault()
            loginForm.handleSubmit()
          }}
        >
          {loginForm.status?.authError && (
            <div>
              <ErrorMessage error={loginForm.status.authError} />
            </div>
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
          <button type="submit">
            Sign in
          </button>
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignIn
