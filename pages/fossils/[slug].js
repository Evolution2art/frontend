import Head from "next/head"
import { useRouter } from "next/router"

import NextImage from "../../components/Image"
import Slideshow from "../../components/Slideshow"
import Link from "next/link"
import { getFossils, getFossil } from "../../utils/api"
import { getStrapiMedia } from "../../utils/medias"
import { MdClose, MdExpandMore, MdOutlineArrowBack } from "react-icons/md"
import { useState } from "react"
import { useCartContext } from "../../context/cart"

const FossilPage = ({ fossil, email = "info@evolution2art.com" }) => {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading fossil...</div>
  }
  const { addToCart, removeFromCart, inCart } = useCartContext()
  const orientation =
    fossil.image.height > fossil.image.width ? "portrait" : "landscape"
  const hrefBack =
    (fossil.category?.slug && "/categories/" + fossil.category.slug) || "/"
  const [hideContent, setHideContent] = useState(false)
  const classNames =
    "frame w-full p-4 text-stone-600 dark:text-stone-400 " +
    (orientation === "portrait" ? "md:w-1/2" : "md:w-1/3") +
    (hideContent ? " hidden" : "")
  const buttonClassNames =
    "my-6 rounded border px-4 py-2 font-semibold shadow hover:shadow-lg whitespace-no-wrap " +
    "border-stone-800 text-stone-800 dark:text-stone-200 dark:border-stone-200"

  function renderImages(item, idx, current) {
    const classNames =
      "slide w-full relative md:absolute" + (idx === current ? " active" : "")
    return (
      <div key={`fossil_image_${idx}`} className={classNames}>
        <NextImage media={item} />
      </div>
    )
  }

  return (
    <main className="mx-auto w-full">
      <Head>
        <title>{fossil.title}</title>
      </Head>
      <div className="relative -top-8 ml-3 flex w-full justify-between md:w-1/3">
        <Link href={hrefBack}>
          <a>
            <MdOutlineArrowBack className="h-6 w-6" />
            {/* <h4 className="mt-1 text-lg font-semibold text-stone-700 dark:text-stone-300">
                {fossil.category?.name || ""}
              </h4> */}
          </a>
        </Link>
        {/* <a
          onClick={() => setHideContent(false)}
          className={hideContent ? "" : " hidden"}
        >
          <MdExpandMore className="mr-7 h-6 w-6" />
        </a> */}
      </div>
      <article className="mx-auto flex w-full max-w-screen-lg flex-wrap justify-start sm:flex-nowrap">
        <div
          className={`relative w-full overflow-hidden ${
            orientation === "portrait" ? "md:w-1/2" : "md:w-2/3"
          }`}
        >
          {/* <div className="absolute top-24 left-0 -z-10 w-full"> */}
          <Slideshow
            items={[fossil.image, ...fossil.gallery]}
            render={renderImages}
            className="md:pb-24"
            navClassName="w-full"
          />
          {fossil.sold ? (
            <div className="ribbon h-5 w-24 bg-gray-500 text-sm">sold</div>
          ) : (
            ""
          )}
          {/* <NextImage
            media={fossil.image}
            // width={fossil.image.formats.large.width}
            // width={fossil.image.formats.large.height}
            // layout="fill"
            // objectFit="cover"
            // objectPosition="center"
          /> */}
        </div>
        <section className={classNames}>
          <div className="flex justify-between">
            <h4 className="mt-1 text-lg font-semibold text-stone-700 dark:text-stone-300">
              {fossil.title}
            </h4>
            {/* <a onClick={() => setHideContent(true)}>
              <MdClose className="h-6 w-6" />
            </a> */}
          </div>
          {fossil.sold ? null : (
            <div className="fossil-price">
              {fossil.priceOnRequest
                ? "Price on Request"
                : fossil?.price
                ? fossil.price + " €"
                : ""}
            </div>
          )}
          {fossil.promotion ? (
            <div className="mt-1">{fossil.promotion}</div>
          ) : (
            ""
          )}
          {!fossil.sold && fossil.status === "published" ? (
            fossil.priceOnRequest ? (
              <a
                href={`mailto:${email}`}
                target="_blank"
                rel="noreferrer"
                className={`inline-block ${buttonClassNames}`}
              >
                Contact us for a quote
              </a>
            ) : inCart(fossil) ? (
              <button
                onClick={() => removeFromCart(fossil)}
                className={`${buttonClassNames}`}
                data-item-id={fossil.id}
                data-item-price={fossil.price}
                data-item-url={router.asPath}
                data-item-max-quantity={1}
                data-item-description={fossil.description}
                data-item-image={getStrapiMedia(
                  fossil.image.formats.thumbnail.url
                )}
                data-item-name={fossil.title}
              >
                Remove from cart
              </button>
            ) : (
              <button
                onClick={() => addToCart(fossil)}
                className={`${buttonClassNames}`}
                data-item-id={fossil.id}
                data-item-price={fossil.price}
                data-item-url={router.asPath}
                data-item-max-quantity={1}
                data-item-description={fossil.description}
                data-item-image={getStrapiMedia(
                  fossil.image.formats.thumbnail.url
                )}
                data-item-name={fossil.title}
              >
                Add to cart
              </button>
            )
          ) : null}
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
          <div className="my-2">
            <label className="font-bold italic">Description</label>
            <div>{fossil.description}</div>
          </div>
        </section>
      </article>
    </main>
  )
}

export default FossilPage

export async function getStaticProps({ params }) {
  const fossil = await getFossil(params.slug)
  return { props: { fossil }, revalidate: 300 }
}

export async function getStaticPaths() {
  const fossils = await getFossils()
  return {
    paths: fossils.map((_fossil) => {
      return {
        params: { slug: _fossil.slug },
      }
    }),
    fallback: true,
  }
}
