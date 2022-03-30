import { useEffect, useState } from "react"
import App from "next/app"
import Layout from "../components/Layout"
import { getCategories, getCountries, getRates, getMails } from "../utils/api"
import "../styles/index.css"
import { CartContextProvider } from "../context/cart"

const MyApp = ({ Component, pageProps }) => {
  const [theme, setTheme] = useState("light")
  const [locale, setLocale] = useState("nl-BE")
  useEffect(() => {
    const _theme = localStorage.getItem("theme") || "light"
    setTheme(_theme)
    localStorage.setItem("theme", _theme)
    if (window) {
      if (_theme === "dark") {
        document.querySelector("body").classList.add("dark")
        document.querySelector("body").classList.add("overflow-x-hidden")
      }
      setLocale(
        Array.isArray(window.navigator.languages)
          ? window.navigator.languages[0]
          : window.navigator.language
      )
    }
  }, [])

  const toggleTheme = () => {
    const _theme = theme === "dark" ? "light" : "dark"
    setTheme(_theme)
    localStorage.setItem("theme", _theme)
    if (window) {
      if (_theme === "light") {
        document.querySelector("body").classList.remove("dark")
      } else {
        document.querySelector("body").classList.add("dark")
      }
    }
  }

  return (
    <CartContextProvider>
      <Layout
        categories={pageProps.categories}
        countries={pageProps.countries}
        rates={pageProps.rates}
        mails={pageProps.mails}
        theme={theme}
        toggleTheme={toggleTheme}
        locale={locale}
      >
        <Component {...pageProps} theme={theme} locale={locale} />
      </Layout>
    </CartContextProvider>
  )
}

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So [[...slug]] pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx)
  // Fetch global site settings from Strapi
  const categories = await getCategories()
  const countries = await getCountries()
  const rates = await getRates()
  const mails = await getMails()
  // Pass the data to our page via props
  return {
    ...appProps,
    pageProps: { categories, countries, rates, mails, path: ctx.pathname },
  }
}

export default MyApp
