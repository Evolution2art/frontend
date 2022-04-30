import Link from "next/link"
import NextImage from "./Image"
import { MdVisibility } from "react-icons/md"

const Order = ({
  order = {},
  idx,
  view,
  handleView,
  className = "",
  theme = "light",
}) => {
  const classNames = "flex flex-col mb-4" + (className ? ` ${className}` : "")

  if (idx !== view)
    return (
      <div
        className={
          "mb-4 flex justify-between gap-2" + (className ? ` ${className}` : "")
        }
      >
        Ordered on {order.completed}
        <a className="flex items-center gap-2" onClick={() => handleView(idx)}>
          <MdVisibility /> View order
        </a>
      </div>
    )

  const { country, total, grandTotal, totalShipping } = order
  return (
    <div className={classNames}>
      Ordered on {order.completed}
      <ul className="mx-auto mb-0 flex w-full flex-col gap-4">
        {order?.items.map((_item, _idx) => {
          const price = _item.price
          const shipping = _item.shipping
          return (
            <li
              className="grid grid-cols-4 bg-stone-200"
              key={`cart_item_${_idx}`}
            >
              <div className="relative h-32 bg-stone-200">
                <NextImage media={_item.image} layout="fill" />
              </div>
              <div className="prose prose-sm prose-stone col-span-2 max-w-none p-2 pt-4">
                <h4>{_item.title}</h4>
                <p className="line-clamp-3">{_item.description}</p>
              </div>
              <div className="flex h-full flex-col items-end justify-between p-4">
                <span className="cart-item-total font-bold">{price}</span>
                {shipping && country && (
                  <div className="cart-item-shipping text-sm">
                    Shipping:{" "}
                    <span className="cart-item-shipping-total">{shipping}</span>
                  </div>
                )}
              </div>
            </li>
          )
        })}
      </ul>
      <div className="h-4"></div>
      {order.items.length > 1 ? (
        <div className="mx-auto mt-2 flex w-full max-w-screen-md justify-end">
          <div className="text-right">
            <h4 className="block">Subtotal</h4>
            <p className="grand-total text-md">{total}</p>
          </div>
        </div>
      ) : null}
      <div className="mx-auto mt-2 flex w-full max-w-screen-md justify-end">
        <div className="text-right">
          <h4 className="block">
            Shipping &amp; Handling to{" "}
            <span className="font-bold">{country}</span>
          </h4>
          <p className="grand-total text-md">{totalShipping}</p>
        </div>
      </div>
      <div className="mx-auto mt-2 flex w-full max-w-screen-md justify-end">
        <div className="text-right">
          <h4 className="block font-bold">Total</h4>
          <p className="grand-total text-xl">{grandTotal}</p>
          <p className="italic">All prices are VAT inclusive</p>
        </div>
      </div>
    </div>
  )
}

export default Order
