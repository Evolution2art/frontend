import { useRouter } from "next/router"
import CategoryButtons from "./CategoryButtons"
import Footer from "./Footer"
import Navbar from "./Navbar"

const Layout = ({ children, theme }) => {
  // const router = useRouter()
  const colors = theme === "dark" ? "bg-stone-900" : "bg-stone-100"
  return (
    <div className={`flex justify-center ${theme} ${colors}`}>
      <div className="flex min-h-screen w-full max-w-screen-xl flex-col bg-stone-100 text-stone-800 dark:bg-stone-900 dark:text-stone-200">
        <Navbar />
        <div className="flex-grow">{children}</div>
        <Footer />
      </div>
      <div
        hidden
        id="snipcart"
        data-api-key="ODhhNWUxOGEtNTk0OC00OTQwLWJkOWMtM2M1ZmNjODU1ZDJhNjM3MzMyNzM0NjM1OTMyNjcz"
      />
    </div>
  )
}

export default Layout
