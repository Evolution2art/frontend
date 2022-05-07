import Head from "next/head"
import { useRouter } from "next/router"
import NextImage from "../../components/Image"
import Slideshow from "../../components/Slideshow"
import Link from "next/link"
import {
  getFossils,
  getFossil,
  getRates,
  getMails,
  getCountries,
} from "../../utils/api"
import { MdClose, MdOutlineArrowBack } from "react-icons/md"
import { useEffect, useState } from "react"
import { useCartContext } from "../../context/cart"

const FossilPage = ({
  fossil,
  shippingRates,
  mails,
  email = "info@evolution2art.com",
  locale,
  countries,
  theme,
  notify,
}) => {
  // return early if fossil is undefined or has no image
  if (!fossil?.image) return null

  // console.log("ShippingRates", shippingRates)
  const router = useRouter()
  // if (router.isFallback) {
  //   return <div>Loading fossil...</div>
  // }
  const {
    cart,
    addToCart,
    removeFromCart,
    setShippingRates,
    inCart,
    calculateShipping,
    convertCurrency,
  } = useCartContext()
  const orientation =
    fossil.image.height >= fossil.image.width ? "portrait" : "landscape"
  const classNames =
    "frame w-full p-4 pt-0 text-stone-600 dark:text-stone-400 " +
    (orientation === "portrait" ? "md:w-1/2" : "md:w-1/3")
  const buttonClassNames =
    "m-6 rounded border px-4 py-2 font-semibold shadow hover:shadow-lg whitespace-no-wrap " +
    "border-stone-800 text-stone-800 dark:text-stone-200 dark:border-stone-200"
  const numberFormat = Intl.NumberFormat(locale, {
    style: "currency",
    currency: cart.currency,
    minimumFractionDigits: 0,
  })

  const images = [fossil.image || [], ...(fossil.gallery || [])]
  // get largest image to use as filler for the Slideshow component
  const filler = images.reduce((largest, _image) => {
    return _image.height / _image.width >
      (largest?.height || 0) / (largest?.width || 1)
      ? _image
      : largest
  }, null)

  useEffect(() => {
    setShippingRates(shippingRates)
  }, [shippingRates, setShippingRates])

  const rate = calculateShipping(fossil, cart.country)
  const shippingTotal = numberFormat.format(rate)
  const isSellable =
    rate &&
    !fossil.priceOnRequest &&
    !fossil.sold &&
    fossil.package?.id &&
    !!fossil.publishedAt
  const salesPrice =
    (fossil.price &&
      numberFormat.format(convertCurrency(fossil.price, cart.currency))) ||
    null

  const promotionPrice =
    (fossil.promotionPrice &&
      numberFormat.format(
        convertCurrency(fossil.promotionPrice, cart.currency)
      )) ||
    null

  const { quote, shipping } = mails

  function renderImages(item, idx, current, fullscreen) {
    const mediaProps = fullscreen
      ? {
          layout: "fill",
          objectFit: "cover",
          objectPosition: "center",
        }
      : {}

    return <NextImage media={item} {...mediaProps} />
  }

  return (
    <main className="mx-auto w-full">
      <Head>
        <title>{fossil.title}</title>
      </Head>
      <div className="relative -top-4 mx-auto flex w-full max-w-screen-lg justify-between">
        <Link href={`/categories/${encodeURIComponent(fossil.category?.slug)}`}>
          <a className="italic">
            <MdOutlineArrowBack className="mr-2 inline h-6 w-6" />
            {fossil.category?.title || fossil.category?.name || "Collection"}
          </a>
        </Link>
      </div>
      <article className="mx-auto flex w-full max-w-screen-lg flex-wrap justify-start sm:flex-nowrap">
        <div
          className={`relative w-full overflow-hidden ${
            orientation === "portrait" ? "md:w-1/2" : "md:w-2/3"
          }`}
        >
          <Slideshow
            items={images}
            renderer={renderImages}
            keyName="fossil-image"
            // className="md:pb-24"
            // navClassName="w-full"
            navClassName="w-full left-0 bottom-4 z-20"
            navStyle="numbers"
            filler={filler}
            fullscreen={false}
          />
          {fossil.sold ? (
            <div className="ribbon h-5 w-24 bg-gray-500 text-sm">sold</div>
          ) : (
            ""
          )}
        </div>
        <section className={classNames}>
          <div>
            <h4 className="-mt-2 text-lg font-semibold text-stone-700 dark:text-stone-300">
              {fossil.title}
            </h4>
          </div>
          {fossil.sold ? null : (
            <div className="font-medium">
              <div className="flex flex-row gap-2 ">
                {promotionPrice ? (
                  <del className="whitespace-nowrap">
                    {fossil.priceOnRequest
                      ? "Price on Request"
                      : fossil?.price
                      ? salesPrice
                      : ""}
                  </del>
                ) : (
                  <span className="whitespace-nowrap">
                    {fossil.priceOnRequest
                      ? "Price on Request"
                      : fossil?.price
                      ? salesPrice
                      : ""}
                  </span>
                )}
                <span className="promotionPrice">{promotionPrice}</span>
              </div>
              {cart.country ? (
                <div className="fossil-shipping italic">
                  {!rate ? "Specialized shipping" : `${shippingTotal} shipping`}
                  {cart.country &&
                    rate &&
                    " to " +
                      countries.find(
                        (_country) => _country.iso === cart.country
                      )?.name}
                </div>
              ) : null}
            </div>
          )}
          {fossil.promotion ? (
            <div className="mt-1">{fossil.promotion}</div>
          ) : (
            ""
          )}
          {/* {fossil.package ? (
            <div className="italic">Shipping: {fossil.package.name}</div>
          ) : null} */}
          {!fossil.sold && !!fossil.publishedAt ? (
            fossil.priceOnRequest ||
            !fossil.package ||
            (!isSellable && cart.country) ? (
              <a
                href={`mailto:${email}?subject=${encodeURIComponent(
                  quote.subject
                )}&body=${encodeURIComponent(quote.body)}`}
                target="_blank"
                rel="noreferrer"
                className={`inline-block ${buttonClassNames}`}
              >
                Contact us for a{" "}
                {fossil?.price && !rate && cart.country?.length > 1
                  ? "shipping "
                  : ""}
                quote
              </a>
            ) : inCart(fossil) ? (
              <button className={`${buttonClassNames} opacity-50`}>
                Added to cart{" "}
                <a
                  title="Remove from cart"
                  onClick={() => removeFromCart(fossil, notify)}
                >
                  <MdClose className="inline h-6 w-6 p-1" />
                </a>
              </button>
            ) : (
              <button
                onClick={() => addToCart(fossil, notify)}
                className={`${buttonClassNames}`}
              >
                Add to cart
              </button>
            )
          ) : null}
          <div className="my-2">
            <label className="font-bold italic">Description</label>
            <div>{fossil.description}</div>
          </div>
          {fossil.species ? (
            <div className="my-2">
              <label className="font-bold italic">Species</label>
              <div>{fossil.species}</div>
            </div>
          ) : (
            ""
          )}
          {fossil.age ? (
            <div className="my-2">
              <label className="font-bold italic">Age</label>
              <div>{fossil.age}</div>
            </div>
          ) : (
            ""
          )}
          {fossil.origin ? (
            <div className="my-2">
              <label className="font-bold italic">Origin</label>
              <div>{fossil.origin}</div>
            </div>
          ) : (
            ""
          )}
          {fossil.dimensions ? (
            <div className="my-2">
              <label className="font-bold italic">Dimensions</label>
              <div>{fossil.dimensions}</div>
            </div>
          ) : (
            ""
          )}
          {fossil.quality?.state ? (
            <div className="my-2">
              <label className="font-bold italic">Quality</label>
              <div>{fossil.quality.state}</div>
            </div>
          ) : (
            ""
          )}
        </section>
      </article>
    </main>
  )
}

export default FossilPage

export async function getStaticProps({ params }) {
  const fossil = await getFossil(params.slug)
  const shippingRates = await getRates()
  const countries = await getCountries()
  const mails = await getMails(fossil)
  return { props: { fossil, shippingRates, mails }, revalidate: 300 }
}

export async function getStaticPaths() {
  const fossils = await getFossils()
  return {
    paths: fossils?.map((_fossil) => {
      return {
        params: { slug: _fossil.slug },
      }
    }),
    fallback: true,
  }
}
