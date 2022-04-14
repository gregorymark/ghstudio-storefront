import { Link } from "gatsby"
import React from "react"
import AuthLayout from "../../../components/auth/auth-layout"
import Input from "../../../components/forms/input"
import ErrorMessage from "../../../components/forms/error-message"
import SearchEngineOptimization from "../../../components/seo"
import { useAuth } from "../../../hooks/use-auth"
import { authSubmitButton } from "../../../styles/modules/account.module.css"

const SignUp = () => {
  const {
    forms: { registerForm },
  } = useAuth()

  return (
    <>
      <SearchEngineOptimization title="Sign Up" />
      <AuthLayout>
        <div>
          <h1>Create account</h1>
          <p>
            Already have an account?{" "}
            <Link to="/shop/account/sign-in">Sign in</Link>
          </p>
        </div>
        <form
          onSubmit={e => {
            e.preventDefault()
            registerForm.handleSubmit()
          }}
        >
          {registerForm.status?.authError && (
            <ErrorMessage error={registerForm.status.authError} />
          )}
          <Input
            label="First name"
            autocomplete="given-name"
            name={"first_name"}
            formik={registerForm}
            value={registerForm.values.first_name}
          />
          <Input
            label="Last name"
            autocomplete="family-name"
            name={"last_name"}
            formik={registerForm}
            value={registerForm.values.last_name}
          />
          <Input
            label="Email"
            autocomplete="email"
            name={"email"}
            formik={registerForm}
            value={registerForm.values.email}
          />
          <Input
            label="Phone (optional)"
            autocomplete="tel"
            name={"phone"}
            formik={registerForm}
            value={registerForm.values.phone}
          />
          <Input
            label="Password"
            type="password"
            autocomplete="new-password"
            name={"password"}
            formik={registerForm}
            value={registerForm.values.password}
          />
          <button type="submit" className={authSubmitButton}>
            Sign up
          </button>
        </form>
      </AuthLayout>
    </>
  )
}

export default SignUp
