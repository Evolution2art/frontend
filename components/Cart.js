import react, { useEffect, useState } from "react"
import Link from "next/link"
import { MdClose, MdDelete, MdOutlineArrowBack } from "react-icons/md"
import { useCartContext } from "../context/cart"
import NextImage from "./Image"
import CartIcon from "./Svg/Cart"

const Cart = ({ theme, open }) => {
  const { cart, addToCart, removeFromCart } = useCartContext()
  const { items, currency } = cart
  const [visible, setVisible] = useState(open)
  const toggleCart = () => setVisible(!visible)
  const total = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(cart.total)

  useEffect(() => {
    if (cart.total === 0) {
      setVisible(false)
    }
  }, [cart.total])

  return (
    <div className="flex">
      <CartIcon
        theme={theme}
        className="cursor-pointer text-stone-700 dark:text-stone-300"
        onClick={toggleCart}
      />
      <strong className="sr-only">Cart</strong>
      {cart?.total > 0 && (
        <span
          className="ml-1 cursor-pointer text-sm font-semibold text-stone-700 dark:text-stone-300"
          onClick={toggleCart}
        >
          {total}
        </span>
      )}
      {visible && (
        <div className="cart min-w-screen fixed top-0 right-0 bottom-0 left-0 z-20 flex h-full min-h-screen w-full flex-col bg-stone-100 dark:bg-stone-900">
          <a onClick={toggleCart} className="absolute right-0 h-8 w-8">
            <MdClose className="h-6 w-6" />
          </a>
          <ul className="m-auto mb-0 flex max-w-screen-md flex-col gap-4">
            {items.map((_item, _idx) => {
              const price = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: currency,
              }).format(_item.price)

              return (
                <li
                  className="relative grid grid-cols-4 gap-2 bg-stone-200"
                  key={`cart_item_${_idx}`}
                >
                  <div className="relative h-32 bg-stone-200">
                    <NextImage media={_item.image} layout="fill" />
                  </div>
                  <div className="prose prose-sm prose-stone col-span-2 max-w-none p-2 pt-4">
                    <Link href={`/fossils/${_item.slug}`}>
                      <a onClick={toggleCart}>
                        <h4>{_item.title}</h4>
                      </a>
                    </Link>
                    <p className="line-clamp-3">{_item.description}</p>
                  </div>
                  <div className="flex h-full flex-col items-end justify-between p-4 font-bold">
                    <a onClick={() => removeFromCart(_item)}>
                      <MdDelete className="h-6 w-6" />
                    </a>
                    <span className="cart-item-total">{price}</span>
                  </div>
                </li>
              )
            })}
          </ul>
          <div className="m-auto mt-0 flex w-full max-w-screen-md flex-row justify-between">
            <a onClick={toggleCart} className="mt-8 flex">
              <MdOutlineArrowBack className="h-6 w-6" /> Back to Collection
            </a>
            <button className="whitespace-no-wrap my-6 rounded border border-stone-800 px-4 py-2 font-semibold text-stone-800 shadow hover:shadow-lg dark:border-stone-200 dark:text-stone-200">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
