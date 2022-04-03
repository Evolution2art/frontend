import React from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import Footer from "./Footer"
import Navbar from "./Navbar"

const Layout = ({ children, countries, rates, theme, toggleTheme, locale }) => {
  const router = useRouter()

  return (
    <div className={`mb-20 ${theme}`}>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#1c1917" />
        <meta name="msapplication-TileColor" content="#f5f5f4" />
        <meta name="theme-color" content="#f5f5f4" />
      </Head>
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
        {React.cloneElement(children, { theme, toggleTheme, locale })}
        <Footer />
      </div>
    </div>
  )
}

export default Layout
