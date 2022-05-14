import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { MdDelete } from "react-icons/md"
import { getCMSContent } from "../utils/api"
import { useCartContext } from "../context/cart"
import OrdersList from "../components/OrdersList"
import CMSContent from "../components/CMSContent"

const OrdersPage = ({ order, theme, notifications, notify }) => {
  const { orders, clearOrders } = useCartContext()
  const { purchaseCompleted, ordersCleared } = notifications
  const [thanks, setThanks] = useState(false)
  const [cleared, setCleared] = useState(false)
  const router = useRouter()
  const { asPath } = router
  useEffect(() => {
    if (router.asPath.endsWith("?completed")) {
      setThanks(true)
      router.push("/orders", null, { shallow: true })
    }
    if (router.asPath.endsWith("?cleared")) {
      setCleared(true)
      router.push("/orders", null, { shallow: true })
    }
  }, [asPath])
  const sorted = orders.sort((prev, next) => next.completed - prev.completed)

  const handleClear = async () => {
    clearOrders(notify)
    // eslint-disable-next-line no-floating-promises
    await router.push("/orders?cleared")
  }

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
          )}{" "}
          {cleared ? (
            <CMSContent
              className="success m-8 mt-0 p-8"
              title={ordersCleared.title}
              text={ordersCleared.message}
            />
          ) : (
            <>
              <OrdersList orders={sorted} />
              <a
                onClick={handleClear}
                className="flex items-center justify-end gap-2 p-8 pt-16 italic"
              >
                Click here to clear all orders from this device <MdDelete />
              </a>
            </>
          )}
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
