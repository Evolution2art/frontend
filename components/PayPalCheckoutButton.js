import { useEffect } from "react"
import { usePayPalScriptReducer, PayPalButtons } from "@paypal/react-paypal-js"

const PayPalCheckoutButton = (props) => {
  // return early for SSR
  if (typeof window === "undefined") {
    return null
  }
  const [{ isResolved }, dispatch] = usePayPalScriptReducer()

  useEffect(() => {
    if (typeof window !== "undefined") {
      dispatch({
        type: "setLoadingStatus",
        value: "pending",
      })
    }
  }, [])

  const { cart, amount, currency } = props

  return isResolved ? (
    <PayPalButtons
      style={{
        layout: "horizontal",
      }}
      forceReRender={[amount, currency]}
      createOrder={(data, actions) => {
        return actions.order
          .create({
            purchase_units: cart.items.map((_item) => ({
              reference: `${_item.title}`,
              amount: {
                currency_code: currency,
                value: _item.price,
              },
            })),
          })
          .then((orderId) => {
            // Your code here after create the order
            return orderId
          })
      }}
      onApprove={function (data, actions) {
        return actions.order.capture().then(function () {
          // Your code here after capture the order
        })
      }}
    />
  ) : (
    <span>loading..</span>
  )
}

export default PayPalCheckoutButton
