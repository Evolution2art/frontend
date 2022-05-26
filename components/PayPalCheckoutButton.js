import { useEffect } from "react"
import { usePayPalScriptReducer, PayPalButtons } from "@paypal/react-paypal-js"
// import { useCartContext } from "../context/cart"

const PayPalCheckoutButton = (props) => {
  const {
    cart,
    amount,
    total,
    shipping,
    currency,
    country,
    disabled,
    handleOK,
    handleNO,
  } = props

  const [{ isResolved, options }, dispatch] = usePayPalScriptReducer()

  useEffect(() => {
    if (typeof window !== "undefined") {
      dispatch({
        type: "setLoadingStatus",
        value: "pending",
      })
    }
  }, [dispatch])

  // return early for SSR
  if (typeof window === "undefined") {
    return null
  }

  // const { cart, calculateShipping } = useCartContext()

  return isResolved ? (
    <PayPalButtons
      style={{
        layout: "horizontal",
        tagline: false,
      }}
      disabled={disabled}
      forceReRender={[amount, currency, country]}
      createOrder={(data, actions) => {
        const now = new Date()
        const purchaseUnits = {
          purchase_units: [
            {
              reference_id: `e2a-${amount}|${cart.items
                .map((_item) => _item.id)
                .join(":")}-${now.toISOString()}`,
              description: `${cart.items
                .map((_item) => _item.title)
                .join(" ")}`.substring(0, 127),
              amount: {
                currency_code: currency,
                value: amount,
                breakdown: {
                  item_total: { value: total, currency_code: currency },
                  shipping: { value: shipping, currency_code: currency },
                },
              },
              items: cart.items.map((_item) => ({
                name: `${_item.title}`.substring(0, 127),
                unit_amount: {
                  currency_code: currency,
                  value: _item.price,
                },
                // sku: _item.id,
                quantity: 1,
                category: "PHYSICAL_GOODS",
              })),
            },
          ],
        }
        console.log("Purchase units: ", purchaseUnits)
        return actions.order.create(purchaseUnits).then((orderId) => {
          // Your code here after create the order
          return orderId
        })
      }}
      onCancel={function (data) {
        // console.log("PayPal onCancel", data)
        if (typeof handleNO === "function") {
          handleNO(data)
        }
      }}
      onApprove={function (data, actions) {
        return (
          actions.order
            .capture()
            // .then(function (orderData) {
            //   // Successful capture! For dev/demo purposes:
            //   // console.log(
            //   //   "Capture result",
            //   //   orderData,
            //   //   JSON.stringify(orderData, null, 2)
            //   // )
            //   // const transaction = orderData.purchase_units[0].payments.captures[0]
            //   // console.log(
            //   //   `Transaction ${transaction.status}: ${transaction.id}\n\nSee console for all available details`
            //   // )
            //   return orderData
            // })
            .then(function (result) {
              if (typeof handleOK === "function") {
                handleOK(result)
              }
            })
        )
      }}
    />
  ) : (
    <span>loading..</span>
  )
}

export default PayPalCheckoutButton
