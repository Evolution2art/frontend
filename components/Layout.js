import React from "react"
import { useRouter } from "next/router"
import Footer from "./Footer"
import Navbar from "./Navbar"

const Layout = ({ children, countries, rates, theme, toggleTheme, locale }) => {
  const router = useRouter()

  return (
    <div className={`mb-20 ${theme}`}>
      <div className="flex min-h-full flex-col items-center text-stone-800 dark:text-stone-200">
        <Navbar
          countries={countries}
          rates={rates}
          theme={theme}
          toggleTheme={toggleTheme}
          locale={locale}
          path={router.asPath}
          className={`mx-auto w-full max-w-screen-xl`}
        />
        {React.cloneElement(children, { theme, locale })}
        <Footer />
      </div>
    </div>
  )
}

export default Layout
