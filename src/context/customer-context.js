import React, {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react"
import { useMedusa } from "../hooks/use-medusa"

const defaultCustomerContext = {
  customer: undefined,
}

const CustomerContext = createContext(defaultCustomerContext)
export default CustomerContext

const ACTIONS = {
  UPDATE_CUSTOMER: "UPDATE_CUSTOMER",
  CLEAR_CUSTOMER: "CLEAR_CUSTOMER",
  UPDATE_ORDERS: "UPDATE_ORDERS",
}

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_CUSTOMER:
      return {
        ...state,
        customer: action.payload,
      }
    case ACTIONS.CLEAR_CUSTOMER:
      return {
        ...state,
        customer: undefined,
      }
    default:
      break
  }
}

export const CustomerProvider = props => {
  const [state, dispatch] = useReducer(reducer, defaultCustomerContext)
  const [loading, setLoading] = useState(true)
  const client = useMedusa()

  const updateCustomer = customer => {
    dispatch({ type: ACTIONS.UPDATE_CUSTOMER, payload: customer })
  }

  const clearCustomer = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_CUSTOMER })
  }, [])

  const createCustomer = async payload => {
    const response = { customer: undefined, error: undefined }

    // So far I don't want to allow account creation unless that customer has made an order
    // which we can check based on whether their email address is in the system. A better
    // option might be to have an email verification.
    const accountExists = await verifyAccountExists(payload.email)

    if (!accountExists) {
      response.error = `You can only create an account if you've made an order. No customer with the email address ${payload.email} exists. If that doesn't make sense, please get in touch using the contact page.`
    }

    if (accountExists.error) {
      response.error = accountExists.error
    }

    if (response.error) {
      return response
    }

    response.customer = await client.customers
      .create(payload)
      .then(({ customer }) => customer)
      .catch(err => {
        response.error = err.response.data
      })

    if (!response.error) {
      updateCustomer(response.customer)
    }

    return response
  }

  const loginCustomer = async payload => {
    const response = { customer: undefined, error: undefined }

    response.customer = await client.auth
      .authenticate(payload)
      .then(({ customer }) => customer)
      .catch(err => {
        response.error = err.response.data
      })

    if (!response.error) {
      updateCustomer(response.customer)
    }

    return response
  }

  const updateCustomerDetails = async payload => {
    const response = { customer: undefined, error: undefined }

    response.customer = await client.customers
      .update(payload)
      .then(({ customer }) => customer)
      .catch(err => {
        response.error = err.response.data
      })

    if (!response.error) {
      updateCustomer(response.customer)
    }

    return response
  }

  const me = useCallback(async () => {
    const customer = await client.customers
      .retrieve()
      .then(({ customer }) => customer)
      .catch(_ => undefined)

    if (customer) {
      updateCustomer(customer)
      setLoading(false)
      return true
    }

    clearCustomer()
    setLoading(false)
    return false
  }, [client.customers, clearCustomer])

  const retrieveOrders = async () => {
    const orders = await client.customers
      .listOrders()
      .then(({ orders }) => orders)
      .catch(_ => [])

    return orders
  }

  const verifyAccountExists = async payload => {
    const response = await client.auth.exists(payload).catch(err => {
      response.error = err.response.data
    })

    if (!response.error) {
      return response.exists
    }

    return response
  }

  useEffect(() => {
    me()
  }, [me])

  return (
    <CustomerContext.Provider
      {...props}
      value={{
        ...state,
        loading,
        actions: {
          createCustomer,
          loginCustomer,
          updateCustomerDetails,
          retrieveOrders,
        },
      }}
    />
  )
}
