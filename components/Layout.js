import { useRouter } from "next/router"
import CategoryButtons from "./CategoryButtons"
import Footer from "./Footer"
import Navbar from "./Navbar"

const Layout = ({ children }) => {
  // const router = useRouter()

  return (
    <div className="flex justify-center">
      <div className="max-w-screen-xl flex flex-col min-h-screen w-full">
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
