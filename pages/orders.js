import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { MdDelete } from "react-icons/md"
import { getCMSContent } from "../utils/api"
import { useCartContext } from "../context/cart"
import OrdersList from "../components/OrdersList"
import CMSContent from "../components/CMSContent"

const OrdersPage = ({ order, theme, notifications, notify }) => {
  const { orders, clearOrders } = useCartContext()
  const { purchaseCompleted } = notifications
  const [thanks, setThanks] = useState(false)
  const [cleared, setCleared] = useState(false)
  const router = useRouter()
  useEffect(() => {
    if (router.asPath.endsWith("?complete")) {
      setThanks(true)
      router.push("/orders", null, { shallow: true })
    }
    if (router.asPath.endsWith("?cleared")) {
      setCleared(true)
      router.push("/orders", null, { shallow: true })
    }
  }, [])
  const sorted = orders.sort(
    (prev, next) => new Date(next.completed) - new Date(prev.completed)
  )
  return (
    <div className="mx-auto w-full max-w-screen-lg">
      <CMSContent
        className="p-8"
        title={order.title}
        text={orders.length > 0 ? order.description : order.noOrdersFound}
      />
      {orders.length > 0 && (
        <>
          {thanks && (
            <CMSContent
              className="success m-8 mt-0 p-8"
              title={purchaseCompleted.title}
              text={purchaseCompleted.message}
            />
          )}
          <OrdersList orders={sorted} />
          <a
            onClick={() => clearOrders(notify)}
            className="flex items-center justify-end gap-2 p-8 pt-16 italic"
          >
            Click here to clear all orders from this device <MdDelete />
          </a>
        </>
      )}
    </div>
  )
}

export async function getStaticProps() {
  const order = await getCMSContent("order")
  return {
    props: { order },
    revalidate: 300,
  }
}

export default OrdersPage
