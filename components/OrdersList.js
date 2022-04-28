import { useState } from "react"
import Order from "./Order"

const OrdersList = ({ theme, orders }) => {
  const [view, setView] = useState(0)

  const handleView = (idx) => {
    setView(idx)
  }

  return (
    <div className="mx-auto flex w-full max-w-screen-md flex-col">
      {orders.map((_order, idx) => (
        <Order
          key={`order_${idx}`}
          order={_order}
          idx={idx}
          view={view}
          handleView={handleView}
        />
      ))}
    </div>
  )
}

export default OrdersList
