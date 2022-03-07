import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import NextImage from "./Image"
import Cart from "./Svg/Cart"

const Navbar = ({ theme, path }) => {
  // const totalRef = useRef()
  const [total, setTotal] = useState(0)
  const logo = theme === "dark" ? "logo-white" : "logo-dark"
  useEffect(() => {
    if (window.Snipcart) {
      setTotal(Snipcart.store.getState().cart.total)
    }
  }, [path])

  return (
    <div className="ml-6 mr-6 mt-4 flex justify-between pt-1 text-stone-700 dark:text-stone-300">
      <nav className="flex h-2 w-1/3 flex-col text-sm">
        {/* <Link href="/">HOME</Link>
        <Link href="/#about">ABOUT US</Link>
        <Link href="/#collection">COLLECTION</Link>
        <Link href="/#contact">CONTACT</Link> */}
      </nav>
      <Link href="/">
        <a className="w-1/3 text-center">
          <NextImage
            src={`/${logo}.png`}
            alt="home"
            className="logo mx-auto"
            height={!path || path === "/" ? 148 : 96}
            width={!path || path === "/" ? 148 : 96}
          />
        </a>
      </Link>
      <div className="w-1/3 pr-6">
        <button
          className={
            (total === 0 ? "w-5" : "w-auto") +
            " snipcart-checkout snipcart-summary relative float-right flex overflow-hidden pr-4"
          }
        >
          <div>
            <Cart
              theme={theme}
              className="snipcart-cart-header__icon snipcart__icon text-stone-700 dark:text-stone-300"
            />
            <strong className="sr-only">Cart</strong>
          </div>
          <span className="snipcart-total-price ml-1 text-sm font-semibold text-stone-700 dark:text-stone-300">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(total)}
          </span>
        </button>
      </div>
    </div>
  )
}

export default Navbar
