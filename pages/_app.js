import { useEffect, useLayoutEffect, useState } from "react"
import App from "next/app"
import Head from "next/head"
import { MdDarkMode } from "react-icons/md"
import Layout from "../components/Layout"
import { getCategories } from "../utils/api"
import "../styles/index.css"

const MyApp = ({ Component, pageProps }) => {
  const [theme, setTheme] = useState("light")
  useEffect(() => {
    const _theme = localStorage.getItem("theme") || "light"
    setTheme(_theme)
    localStorage.setItem("theme", _theme)
    if (window && _theme === "dark") {
      document.querySelector("body").classList.add("dark")
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
    <Layout categories={pageProps.categories} theme={theme}>
      <Head>
        <link rel="preconnect" href="https://app.snipcart.com" />
        <link rel="preconnect" href="https://cdn.snipcart.com" />
        <link
          rel="stylesheet"
          href="https://cdn.snipcart.com/themes/v3.0.16/default/snipcart.css"
        />
        <script
          async
          src="https://cdn.snipcart.com/themes/v3.0.16/default/snipcart.js"
        />
      </Head>
      <div
        className={`toggle-theme pt-1 ${theme} mx-auto w-full max-w-screen-xl`}
      >
        <MdDarkMode
          size="1.5em"
          onClick={toggleTheme}
          title="Toggle dark mode"
          className="float-right inline-block cursor-pointer text-stone-700 dark:text-stone-300"
        />
      </div>
      <Component {...pageProps} theme={theme} />
    </Layout>
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
  // Pass the data to our page via props
  return {
    ...appProps,
    pageProps: { categories, path: ctx.pathname },
  }
}

export default MyApp
