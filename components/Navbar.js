import Link from "next/link"
import { useEffect, useState } from "react"
import { MdClose, MdMenu } from "react-icons/md"
import NextImage from "./Image"
import Cart from "./Cart"
import { useCartContext } from "../context/cart"

const Navbar = ({ theme, path, className }) => {
  // const totalRef = useRef()
  const classNames =
    "navbar relative pt-1 text-stone-700 dark:text-stone-300 h-24" +
    (className ? ` ${className}` : "")
  // const [isOpen, setIsOpen] = useState(true)
  // useEffect(() => {
  //   if (window.Snipcart) {
  //     setTotal(Snipcart.store.getState().cart.total)
  //   }
  // }, [path])

  const { cart, addToCart, removeFromCart } = useCartContext()

  // const toggleMenu = () => setIsOpen(!isOpen)
  // const hideMenu = () => setIsOpen(false)
  // const showMenu = () => setIsOpen(true)

  return (
    <div className={classNames}>
      <div className="absolute right-0 z-10 mr-10">
        <Cart theme={theme} />
      </div>
      <nav className="top flex w-full flex-wrap justify-between pt-4 pb-4 text-sm">
        <div className="whitespace-nowrap">
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/fossils">
            <a>Collection</a>
          </Link>
          <Link href="/#about">
            <a>Our Story</a>
          </Link>
        </div>
        <div className="whitespace-nowrap">
          <Link href="/history">
            <a>Our Work</a>
          </Link>
          <Link href="/history#press">
            <a>Press</a>
          </Link>
          <Link href="/#contact">
            <a>Contact</a>
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
