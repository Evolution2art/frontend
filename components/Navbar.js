import Link from "next/link"
import Cart from "./Cart"
import { useCartContext } from "../context/cart"
import DarkModeToggle from "./Svg/DarkModeToggle"

const Navbar = ({
  theme,
  toggleTheme,
  locale,
  path,
  countries,
  rates,
  className,
  notify,
}) => {
  const classNames =
    "navbar relative pt-1 text-stone-700 dark:text-stone-300 h-24" +
    (className ? ` ${className}` : "")

  // const { cart } = useCartContext()

  return (
    <div className={classNames}>
      <div className="absolute right-0 mr-3 flex">
        <Cart
          theme={theme}
          countries={countries}
          locale={locale}
          shippingRates={rates}
          notify={notify}
        />
        <div className={`toggle-theme ${theme} mx-auto w-full max-w-screen-xl`}>
          <a
            onClick={toggleTheme}
            className="inline-block h-6 w-6"
            title="Toggle dark mode"
          >
            <DarkModeToggle className="h-6 w-6" />
          </a>
        </div>
      </div>
      <nav className="top text flex w-full flex-wrap justify-between pt-5 pb-4 text-sm">
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
          <Link href="/press">
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
