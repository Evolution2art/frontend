import Head from "next/head"
import { useRouter } from "next/router"

import NextImage from "../../components/Image"
import Link from "next/link"
import { getFossils, getFossil } from "../../utils/api"
import { getStrapiMedia } from "../../utils/medias"
import { MdOutlineArrowBack } from "react-icons/md"

const FossilPage = ({ fossil, email = "info@evolution2art.com" }) => {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading fossil...</div>
  }
  const hrefBack =
    (fossil.category?.slug && "/categories/" + fossil.category.slug) || "/"

  return (
    <div className="mx-auto my-8 grid w-full max-w-screen-md grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-3">
      <Head>
        <title>{fossil.title}</title>
      </Head>
      <div className="flex w-full flex-col justify-start p-5">
        <Link href={hrefBack}>
          <a>
            <MdOutlineArrowBack className="h-6 w-6" />
            {/* <h4 className="mt-1 text-lg font-semibold text-stone-700 dark:text-stone-300">
                {fossil.category?.name || ""}
              </h4> */}
          </a>
        </Link>
        <div className="text-stone-600 dark:text-stone-400">
          <h4 className="mt-1 text-lg font-semibold text-stone-700 dark:text-stone-300">
            {fossil.title}
          </h4>
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
                className="mt-4 inline-block rounded border border-stone-200 bg-white py-2 px-4 font-semibold text-stone-700 shadow hover:shadow-lg"
              >
                Contact us for a quote
              </a>
            ) : (
              <button
                className="snipcart-add-item mt-4 rounded border border-stone-200 bg-white py-2 px-4 font-semibold text-stone-700 shadow hover:shadow-lg"
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
        </div>
      </div>
      <div className="col-span-2 m-auto h-full w-full pt-2 pb-2">
        {/* <Magnifier
          imageSrc={"http://localhost:1337" + fossil.image.formats.medium.url}
          largeImageSrc={
            "http://localhost:1337" + fossil.image.formats.large.url
          }
        /> */}
        <NextImage media={fossil.image} />
      </div>
    </div>
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
