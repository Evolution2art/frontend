import { useRouter } from "next/router"
import Footer from "./Footer"
import Navbar from "./Navbar"

const Layout = ({ children, theme }) => {
  const router = useRouter()
  return (
    <div className={`${theme}`}>
      <div className="flex min-h-full flex-col items-center text-stone-800 dark:text-stone-200">
        <Navbar
          theme={theme}
          path={router.asPath}
          className="mx-auto w-full max-w-screen-lg"
        />
        {children}
        <Footer />
      </div>
      <div
        hidden
        id="snipcart"
        data-api-key="OTA3NTUzNGMtN2ZiMS00NmY1LWJkZTAtOGVkNDFhZGRlOGVmNjM3ODE2NDI3MTUxODQxMDYz"
      />
    </div>
  )
}

export default Layout
