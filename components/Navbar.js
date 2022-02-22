import Link from "next/link"
import NextImage from "./Image"
import Cart from "./Svg/Cart"

const Navbar = () => {
  return (
    <div className="ml-6 mr-6 mt-4 flex justify-between text-stone-700 dark:text-stone-300">
      <nav className="flex w-1/3 flex-col">
        <Link href="/">HOME</Link>
        <Link href="/#about">ABOUT US</Link>
        <Link href="/#collection">COLLECTION</Link>
        <Link href="/#contact">CONTACT</Link>
      </nav>
      <Link href="/">
        <a>
          <NextImage
            src="/logo-white.png"
            alt="home"
            className="logo"
            height="150"
            width="150"
          />
        </a>
      </Link>
      <button className="snipcart-checkout flex w-1/3 items-center justify-end">
        <Cart />
        <span className="snipcart-total-price ml-3 text-sm font-semibold text-stone-700 dark:text-stone-300"></span>
      </button>
    </div>
  )
}

export default Navbar
