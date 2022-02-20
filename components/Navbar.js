import Link from "next/link"
import NextImage from "./Image"

const Navbar = () => {
  return (
    <div className="flex justify-between ml-6 mr-6 mt-4">
      <nav className="w-1/3 flex flex-col">
        <a href="/">HOME</a>
        <a href="/#about">ABOUT US</a>
        <a href="/#collection">COLLECTION</a>
        <a href="/#contact">CONTACT</a>
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
      <button className="w-1/3 snipcart-checkout flex justify-end items-center">
        <NextImage height="150" width="150" src="/cart.svg" alt="Cart" />
        <span className="snipcart-total-price ml-3 font-semibold text-sm text-stone-500"></span>
      </button>
    </div>
  )
}

export default Navbar
