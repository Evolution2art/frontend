import { useEffect, useState } from "react"
import Link from "next/link"
import {
  MdClose,
  MdDelete,
  MdOutlineArrowBack,
  MdLocationOff,
  MdLocationOn,
  MdShoppingBasket,
  MdOutlineArrowForward,
} from "react-icons/md"
import { usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { useRouter } from "next/router"
import { fetchAPI } from "../utils/api"
import { useCartContext } from "../context/cart"
import NextImage from "./Image"
import PayPalCheckoutButton from "./PayPalCheckoutButton"

const Cart = ({
  theme,
  locale = "nl-BE",
  countries,
  shippingRates,
  open,
  notify,
}) => {
  const {
    cart,
    storeCart,
    orders,
    removeFromCart,
    setCartCurrency,
    setCartCountry,
    setShippingRates,
    calculateShipping,
    calculateTotal,
    convertCurrency,
  } = useCartContext()
  const [visible, setVisible] = useState(open)
  const toggleCart = () => setVisible((_current) => !_current)
  const [currency, setCurrency] = useState(cart.currency || "EUR")
  const [country, setCountry] = useState(cart.country)
  const [checkout, setCheckout] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [{ options }, dispatch] = usePayPalScriptReducer()
  const router = useRouter()

  const currencySymbol = {
    EUR: "€",
    USD: "$",
  }

  const numberFormat = Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
  })

  const handleAgreed = () => {
    setAgreed((_current) => !_current)
  }

  const handleClickLink = (path) => {
    if (router.asPath === path) {
      toggleCart()
    } else {
      setTimeout(() => toggleCart(), 500)
    }
  }

  const handleCountry = (event) => {
    const iso = event.target.value
    setCartCountry(iso)
    setCountry(iso)
  }
  const handleCurrency = (event) => {
    const iso = event.target.value
    setCartCurrency(iso)
    setCurrency(iso)
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: iso,
      },
    })
  }

  useEffect(() => {
    if (cart.total === 0) {
      setVisible(false)
    }
  }, [cart.total])

  useEffect(() => {
    setCurrency(cart.currency)
  }, [cart.currency])

  useEffect(() => {
    setCountry(cart.country)
  }, [cart.country])

  useEffect(() => {
    setShippingRates(shippingRates)
  }, [shippingRates, setShippingRates])

  const total = calculateTotal("sub", currency, country)
  const totalShipping = calculateTotal("shipping", currency, country)
  const grandTotal = calculateTotal("grand", currency, country)

  const handlePaymentSuccess = async (result) => {
    // console.log("Cart handlePaymentSuccess called, mark items as sold", result)
    // notify("purchaseCompleted", { autoClose: false })
    // await cart.items.map(async (_item) => {
    const sellResult = await fetchAPI(
      `/sell/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result),
      },
      true
    )
    // console.log("Result of calling auth sell endpoint", sellResult)
    // convert cart to order
    // storing any calculated values
    const { country, currency } = cart

    const order = {
      country: countries.find((_country) => _country.iso === country)?.name,
      currency,
      completed: new Date().getTime(),
      exchange: {
        rates: cart.exchange.rates,
      },
      items: cart.items.map((_item) => {
        const price = numberFormat.format(_item.promotionPrice || _item.price)
        const rate = calculateShipping(_item, country, shippingRates)
        const shipping = rate ? numberFormat.format(rate, currency) : null
        return {
          id: _item.id,
          title: _item.title,
          description: _item.description,
          image: _item.image,
          price,
          shipping,
        }
      }),
      total: numberFormat.format(total, currency),
      totalShipping: numberFormat.format(totalShipping),
      grandTotal: numberFormat.format(grandTotal),
    }
    storeCart(order)
    // eslint-disable-next-line no-floating-promises
    await router.push("/orders?completed")
    // })
  }

  const handlePaymentFail = (data) => {
    notify("purchaseCancelled")
    // console.log("Cart handlePaymentFail called", data)
  }

  return (
    <div>
      <div
        className="flex cursor-pointer text-stone-700 dark:text-stone-300"
        onClick={toggleCart}
      >
        <span className="mx-1 mt-1">
          <MdShoppingBasket className="h-4 w-4" theme={theme} />
        </span>
        <strong className="sr-only">Cart</strong>
        {cart?.total > 0 ? (
          <span className="mx-1">{numberFormat.format(grandTotal)}</span>
        ) : (
          <span className="mx-1 font-medium">{currencySymbol[currency]}</span>
        )}
        <span className="mx-1 whitespace-nowrap">
          {country ? (
            <MdLocationOn className="-mt-1 inline h-4 w-4" />
          ) : (
            <MdLocationOff className="-mt-1 inline h-4 w-4" />
          )}
          {country === "_" ? "Other" : country}
        </span>
      </div>

      {visible && (
        <div className="cart min-w-screen fixed top-0 right-0 bottom-0 left-0 z-20 flex h-full min-h-screen w-full flex-col bg-stone-100 dark:bg-stone-900">
          <div className="mx-auto w-full max-w-screen-lg">
            <a onClick={toggleCart} className="flex h-8 w-full justify-end">
              <MdClose className="h-6 w-6" />
            </a>
          </div>
          <div className="mx-auto mb-8 flex w-full max-w-screen-md flex-row justify-between">
            <div>
              Currency:{" "}
              <select
                className="form-select bg-stone-200 dark:bg-stone-800"
                name="currency"
                value={currency || "EUR"}
                onChange={handleCurrency}
              >
                <option key="USD" value="USD">
                  $ - US Dollar
                </option>
                <option key="EUR" value="EUR">
                  &euro; - Euro
                </option>
              </select>
            </div>
            <div>
              {country ? (
                <MdLocationOn className="inline h-6 w-6" />
              ) : (
                <MdLocationOff className="inline h-6 w-6" />
              )}
              Shipping destination:{" "}
              <select
                className="form-select bg-stone-200 dark:bg-stone-800"
                name="country"
                value={country || ""}
                onChange={handleCountry}
              >
                <option value="">Please select</option>
                {countries.map((_country) => (
                  <option key={`country_${_country.iso}`} value={_country.iso}>
                    &nbsp; {_country.name}
                  </option>
                ))}
                <option value="_">Other</option>
              </select>
            </div>
          </div>
          <ul className="mx-auto mb-0 flex w-full max-w-screen-md flex-col gap-4">
            {cart.items.map((_item, _idx) => {
              const price = numberFormat.format(
                convertCurrency(_item.promotionPrice || _item.price, currency)
              )
              const rate = calculateShipping(_item, country, shippingRates)
              const shipping = rate ? numberFormat.format(rate) : null

              return (
                <li
                  className="relative grid grid-cols-4 gap-2 bg-stone-200 dark:bg-stone-800"
                  key={`cart_item_${_idx}`}
                >
                  <div className="relative h-32 bg-stone-200 dark:bg-stone-800">
                    <NextImage media={_item.image} layout="fill" />
                  </div>
                  <div className="prose prose-sm prose-stone col-span-2 max-w-none p-2 pt-4 dark:prose-invert">
                    <Link href={`/fossils/${_item.slug}`}>
                      <a
                        onClick={() =>
                          handleClickLink(`/fossils/${_item.slug}`)
                        }
                      >
                        <h4>{_item.title}</h4>
                      </a>
                    </Link>
                    <p className="line-clamp-3">{_item.description}</p>
                  </div>
                  <div className="flex h-full flex-col items-end justify-between p-4">
                    <a onClick={() => removeFromCart(_item, notify)}>
                      <MdDelete className="h-6 w-6" />
                    </a>
                    <span className="cart-item-total font-bold">{price}</span>
                    {shipping && country && (
                      <div className="cart-item-shipping text-sm">
                        Shipping:{" "}
                        <span className="cart-item-shipping-total">
                          {shipping}
                        </span>
                      </div>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
          <div className="h-4"></div>
          {cart.items?.length > 1 ? (
            <div className="mx-auto mt-2 flex w-full max-w-screen-md justify-end">
              <div className="text-right">
                <h4 className="block">Subtotal</h4>
                <p className="grand-total text-md">
                  {numberFormat.format(total)}
                </p>
              </div>
            </div>
          ) : null}
          <div className="mx-auto mt-2 flex w-full max-w-screen-md justify-end">
            <div className="text-right">
              {totalShipping > 0 ? (
                <>
                  <h4 className="block">
                    Shipping &amp; Handling to{" "}
                    <span className="font-bold">
                      {
                        countries.find(
                          (_country) => _country.iso === cart.country
                        )?.name
                      }
                    </span>
                  </h4>
                  <p className="grand-total text-md">
                    {numberFormat.format(totalShipping)}
                  </p>
                </>
              ) : country?.length < 1 ? (
                <p className="italic">
                  Shipping fees will be calculated upon selecting a delivery
                  location
                </p>
              ) : null}
            </div>
          </div>
          {grandTotal > 0 ? (
            <div className="mx-auto mt-2 flex w-full max-w-screen-md justify-end">
              <div className="text-right">
                <h4 className="block font-bold">Total</h4>
                <p className="grand-total text-xl">
                  {numberFormat.format(grandTotal)}
                </p>
                <p className="italic">All prices are VAT inclusive</p>
              </div>
            </div>
          ) : null}
          <div className="mx-auto flex w-full max-w-screen-md flex-col justify-end">
            <div className="my-4 flex items-center justify-end gap-2">
              <label htmlFor="agree">By checking the box I agree to the</label>
              <Link href="/legal" shallow>
                <a
                  className="underline"
                  onClick={() => handleClickLink("/legal")}
                >
                  Terms and Conditions
                </a>
              </Link>
              <input
                id="agree"
                type="checkbox"
                checked={agreed}
                onChange={handleAgreed}
              />
            </div>
            <div className="m-auto mt-0 w-full max-w-screen-md text-right">
              {country === "_" && (
                <span className="cart-unshippable italic">
                  If your destination is not listed above, or the item you're
                  interested in has specialized shipping needs, please get in
                  touch with us via email.
                </span>
              )}
            </div>
            <div className="ml-auto w-64">
              <PayPalCheckoutButton
                amount={grandTotal}
                total={total}
                shipping={totalShipping}
                cart={cart}
                country={country}
                currency={currency}
                disabled={!(total * totalShipping > 0) || !agreed}
                handleOK={handlePaymentSuccess}
                handleNO={handlePaymentFail}
                handleConversion={convertCurrency}
              />
            </div>
          </div>
          <div className="mx-auto flex w-full max-w-screen-md flex-row justify-between">
            <a onClick={toggleCart} className="mt-8 flex">
              <MdOutlineArrowBack className="h-6 w-6" /> Back to Collection
            </a>
            {orders.length > 0 && (
              <Link href="/orders">
                <a className="mt-8 flex" onClick={() => setVisible(false)}>
                  Order history <MdOutlineArrowForward className="h-6 w-6" />
                </a>
              </Link>
            )}
            {/* {!total || !totalShipping ? (
              <span className="whitespace-no-wrap my-6 px-4 py-2 font-semibold text-stone-800 opacity-50 dark:text-stone-200">
                Proceed to Checkout
              </span>
            ) : null} */}
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
