import { createContext, useContext, useEffect, useState } from "react"
import rates from "../public/rates.json"

const CartContext = createContext()

export function CartContextProvider({ children }) {
  const [cart, setCart] = useState({
    total: 0,
    items: [],
    currency: "EUR",
    country: null,
    exchange: rates,
  })

  const [shippingRates, setShippingRates] = useState([])

  useEffect(() => {
    const curCart = retrieveCart()
    // force update rates
    curCart.exchange = rates
    if (typeof curCart?.total === "number") {
      setCart(curCart)
    } else {
      localStorage.setItem("cart", JSON.stringify(cart))
    }
  }, [])

  const calculateTotal = (kind, currency, country, items) => {
    if (!items) {
      items = cart.items
    }
    if (!country) {
      country = cart.country
    }
    if (!currency) {
      currency = cart.currency
    }
    if (!kind) {
      kind = "grand"
    }

    return (
      items?.reduce(
        (total, _item) =>
          (total +=
            (kind !== "shipping" ? convertCurrency(_item.price, currency) : 0) +
            (kind === "grand" || kind === "shipping"
              ? convertCurrency(calculateShipping(_item, country), currency)
              : 0)),
        0
      ) || null
    )
  }

  const convertCurrency = (value, to) => {
    if (value === null) {
      return null
    }
    if (!to) {
      to = "USD"
    }
    if (to === "EUR") {
      return value
    }
    return Math.ceil(value / (cart.exchange?.rates.EUR || 0.8398) / 5) * 5
  }

  const convertToUSD = (value) => convertCurrency(value, "USD")

  const calculateShipping = (item, country) => {
    return convertCurrency(
      shippingRates.find(
        (_rate) =>
          _rate.package?.id === item.package?.id &&
          _rate.countries?.find((_country) => _country === country)
      )?.price || null
    )
  }

  const persistCart = (newCart) => {
    setCart(newCart)
    localStorage.setItem("cart", JSON.stringify(newCart))
  }

  const retrieveCart = () => {
    return JSON.parse(localStorage.getItem("cart"))
  }

  const addToCart = (item) => {
    const newItems = [...cart.items, item]
    const newTotal = calculateTotal(
      "grand",
      cart.currency,
      cart.country,
      newItems
    )
    const newCart = { ...cart, total: newTotal, items: newItems }
    persistCart(newCart)
  }

  const removeFromCart = (item) => {
    const newItems = cart.items.filter((_item) => _item.id !== item.id)
    const newTotal = calculateTotal(
      "grand",
      cart.currency,
      cart.country,
      newItems
    )
    const newCart = { ...cart, total: newTotal, items: newItems }
    persistCart(newCart)
  }

  const setCartCurrency = (symbol) => {
    const newCart = { ...cart, currency: symbol }
    persistCart(newCart)
  }

  const setCartCountry = (iso) => {
    // update shipping of items
    persistCart({ ...cart, country: iso })
  }

  const inCart = (item) =>
    cart?.items.filter((_item) => _item.id === item.id).length > 0

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        inCart,
        calculateShipping,
        calculateTotal,
        convertCurrency,
        setCartCurrency,
        setCartCountry,
        setShippingRates,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCartContext() {
  return useContext(CartContext)
}