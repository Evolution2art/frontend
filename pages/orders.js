import { MdDelete } from "react-icons/md"
import { getCMSContent } from "../utils/api"
import { useCartContext } from "../context/cart"
import OrdersList from "../components/OrdersList"
import CMSContent from "../components/CMSContent"

const OrdersPage = ({ order, theme }) => {
  const { orders, clearOrders } = useCartContext()

  return (
    <div className="mx-auto w-full max-w-screen-lg">
      <CMSContent
        className="pb-0"
        title={order.title}
        text={orders.length > 0 ? order.description : order.noOrdersFound}
      />
      {orders.length > 0 && (
        <>
          <a
            onClick={clearOrders}
            className="flex items-center gap-2 p-8 pt-0 italic"
          >
            Click here to clear all orders from this device - this cannot be
            undone. <MdDelete />
          </a>
          <OrdersList orders={orders} />
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
