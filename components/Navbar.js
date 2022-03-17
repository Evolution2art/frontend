import Link from "next/link"
import { useEffect, useState } from "react"
import { Twirl as Hamburger } from "hamburger-react"
import { MdClose, MdMenu } from "react-icons/md"
import NextImage from "./Image"
import Cart from "./Svg/Cart"

const Navbar = ({ theme, path, className }) => {
  // const totalRef = useRef()
  const classNames =
    "relative pt-1 text-stone-700 dark:text-stone-300 h-24" +
    (className ? ` ${className}` : "")
  const [total, setTotal] = useState(0)
  // const [isOpen, setIsOpen] = useState(true)
  useEffect(() => {
    if (window.Snipcart) {
      setTotal(Snipcart.store.getState().cart.total)
    }
  }, [path])

  // const toggleMenu = () => setIsOpen(!isOpen)
  // const hideMenu = () => setIsOpen(false)
  // const showMenu = () => setIsOpen(true)

  return (
    <div className={classNames}>
      <div className="absolute right-0 pr-6">
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
      <nav className="top flex w-full justify-between whitespace-nowrap pt-8 pb-4 text-sm">
        {/* <a className="menu h-6 w-6" onClick={toggleMenu}>
          <Hamburger toggled={isOpen} size={20} />
        </a> */}
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/fossils">
          <a>Collection</a>
        </Link>
        <Link href="/#about">
          <a>Our Story</a>
        </Link>
        <Link href="/history">
          <a>Our Work</a>
        </Link>
        <Link href="/history#press">
          <a>Press</a>
        </Link>
        <Link href="/#contact">
          <a>Contact</a>
        </Link>
      </nav>
    </div>
  )
}

export default Navbar
