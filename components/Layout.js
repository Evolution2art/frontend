import { useRouter } from "next/router"
import Footer from "./Footer"
import Navbar from "./Navbar"

const Layout = ({ children, theme }) => {
  const router = useRouter()
  // const colors = theme === "dark" ? "bg-stone-900" : "bg-stone-100"
  return (
    <div className={`flex justify-center ${theme}`}>
      <div className="flex min-h-screen w-full max-w-screen-lg flex-col text-stone-800 dark:text-stone-200">
        <Navbar theme={theme} path={router.asPath} />
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
