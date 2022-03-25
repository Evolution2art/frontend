import { createContext, useContext, useEffect, useState } from "react"

const CartContext = createContext()

export function CartContextProvider({ children }) {
  const [cart, setCart] = useState({
    total: 0,
    items: [],
    currency: "USD",
  })

  useEffect(() => {
    const curCart = retrieveCart()
    if (typeof curCart?.total === "number") {
      setCart(curCart)
    } else {
      localStorage.setItem("cart", JSON.stringify(cart))
    }
  }, [])

  const persistCart = (newCart) => {
    setCart(newCart)
    localStorage.setItem("cart", JSON.stringify(newCart))
  }

  const retrieveCart = () => {
    return JSON.parse(localStorage.getItem("cart"))
  }

  const addToCart = (item) => {
    const newItems = [...cart.items, item]
    const newTotal = 1 * cart.total + 1 * item.price
    const newCart = { ...cart, total: newTotal, items: newItems }
    persistCart(newCart)
  }

  const removeFromCart = (item) => {
    const newItems = cart.items.filter((_item) => _item.id !== item.id)
    const newTotal = cart.items.reduce(
      (total, _item) => (total += _item.id !== item.id ? _item.price : 0),
      0
    )
    const newCart = { ...cart, total: newTotal, items: newItems }
    persistCart(newCart)
  }

  const setCurrency = (symbol) => {
    const newCart = { ...cart, currency: symbol }
    persistCart(newCart)
  }

  const inCart = (item) =>
    cart?.items.filter((_item) => _item.id === item.id).length > 0

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, inCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCartContext() {
  return useContext(CartContext)
}
