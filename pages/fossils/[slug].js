import Head from "next/head"
import { useRouter } from "next/router"

import NextImage from "../../components/Image"
import Link from "next/link"
import { getFossils, getFossil } from "../../utils/api"
import { getStrapiMedia } from "../../utils/medias"
import { MdClose, MdExpandMore, MdOutlineArrowBack } from "react-icons/md"
import { useState } from "react"

const FossilPage = ({ fossil, email = "info@evolution2art.com" }) => {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading fossil...</div>
  }
  const hrefBack =
    (fossil.category?.slug && "/categories/" + fossil.category.slug) || "/"
  const [hideContent, setHideContent] = useState(false)
  const classNames =
    "frame w-full p-4 pt-6 text-stone-600 dark:text-stone-400 md:w-1/2 lg:w-1/3" +
    (hideContent ? " hidden" : "")
  const buttonClassNames =
    "my-6 rounded border px-4 py-2 font-semibold shadow hover:shadow-lg whitespace-no-wrap " +
    "border-stone-800 text-stone-800 dark:text-stone-200 dark:border-stone-200"

  return (
    <main className="mx-auto w-full">
      <Head>
        <title>{fossil.title}</title>
      </Head>
      <article className="mx-auto flex w-full max-w-screen-lg flex-col justify-start">
        <div className="z-10 -mt-8 ml-3 flex w-full justify-between md:w-1/2 lg:w-1/3">
          <Link href={hrefBack}>
            <a>
              <MdOutlineArrowBack className="h-6 w-6" />
              {/* <h4 className="mt-1 text-lg font-semibold text-stone-700 dark:text-stone-300">
                {fossil.category?.name || ""}
              </h4> */}
            </a>
          </Link>
          <a
            onClick={() => setHideContent(false)}
            className={hideContent ? "" : " hidden"}
          >
            <MdExpandMore className="mr-7 h-6 w-6" />
          </a>
        </div>
        <div className="absolute left-0 -z-10 min-w-full pb-16">
          <NextImage
            media={fossil.image}
            // width={fossil.image.formats.large.width}
            // width={fossil.image.formats.large.height}
            // layout="fill"
            // objectFit="cover"
            // objectPosition="center"
          />
        </div>
        <section className={classNames}>
          <div className="flex justify-between">
            <h4 className="mt-1 text-lg font-semibold text-stone-700 dark:text-stone-300">
              {fossil.title}
            </h4>
            <a onClick={() => setHideContent(true)}>
              <MdClose className="h-6 w-6" />
            </a>
          </div>
          {fossil.sold ? (
            <div className="fossil-price sold">SOLD</div>
          ) : (
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
                className={`block ${buttonClassNames}`}
              >
                Contact us for a quote
              </a>
            ) : (
              <button
                className={`snipcart-add-item ${buttonClassNames}`}
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
            <div className="mt-1">
              <label className="italic">Species</label>
              <div>{fossil.species}</div>
            </div>
          ) : (
            ""
          )}
          {fossil.age ? (
            <div className="mt-1">
              <label className="italic">Age</label>
              <div>{fossil.age}</div>
            </div>
          ) : (
            ""
          )}
          {fossil.origin ? (
            <div className="mt-1">
              <label className="italic">Origin</label>
              <div>{fossil.origin}</div>
            </div>
          ) : (
            ""
          )}
          {fossil.dimensions ? (
            <div className="mt-1">
              <label className="italic">Dimensions</label>
              <div>{fossil.dimensions}</div>
            </div>
          ) : (
            ""
          )}
          {fossil.quality?.state ? (
            <div className="mt-1">
              <label className="italic">Quality</label>
              <div>{fossil.quality.state}</div>
            </div>
          ) : (
            ""
          )}
          <div className="mt-1">{fossil.description}</div>
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
