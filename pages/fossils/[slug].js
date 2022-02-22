import Head from "next/head"
import { useRouter } from "next/router"

import NextImage from "../../components/Image"
import { getFossils, getFossil } from "../../utils/api"
import { getStrapiMedia } from "../../utils/medias"

const FossilPage = ({ fossil }) => {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading fossil...</div>
  }

  return (
    <div className="m-6 mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
      <Head>
        <title>{fossil.title}</title>
      </Head>
      <div className="col-span-2 m-auto h-full w-full rounded-t-lg pt-2 pb-2">
        <NextImage media={fossil.image} />
      </div>
      <div className="flex w-full flex-col justify-between p-5">
        <div className="text-stone-600">
          <h4 className="mt-1 text-lg font-semibold text-stone-700">
            {fossil.title}
          </h4>
          <div className="fossil-price">
            {fossil.priceOnRequest ? "Price on Request" : fossil.price + " €"}
          </div>
          {fossil.promotion && <div className="mt-1">{fossil.promotion}</div>}
          <div className="mt-1">{fossil.description}</div>
          {fossil.origin && (
            <div className="mt-1">
              <label className="italic">Origin</label>
              <div>{fossil.origin}</div>
            </div>
          )}
          {fossil.species && (
            <div className="mt-1">
              <label className="italic">Species</label>
              <div>{fossil.species}</div>
            </div>
          )}
          {fossil.age && (
            <div className="mt-1">
              <label className="italic">Age</label>
              <div>{fossil.age}</div>
            </div>
          )}
        </div>

        {fossil.status === "published" ? (
          fossil.priceOnRequest ? (
            <button className=" d mt-4 rounded border border-stone-200 bg-white py-2 px-4 font-semibold text-stone-700 shadow hover:shadow-lg">
              Contact us for a quote
            </button>
          ) : (
            <button
              className="snipcart-add-item d mt-4 rounded border border-stone-200 bg-white py-2 px-4 font-semibold text-stone-700 shadow hover:shadow-lg"
              data-item-id={fossil.id}
              data-item-price={fossil.price}
              data-item-url={router.asPath}
              data-item-description={fossil.description}
              data-item-image={getStrapiMedia(
                fossil.image.formats.thumbnail.url
              )}
              data-item-name={fossil.title}
            >
              Add to cart
            </button>
          )
        ) : (
          <div className="mr-10 mb-1 text-center" v-else>
            <div
              className="flex items-center bg-stone-800 p-2 leading-none text-stone-100 lg:inline-flex lg:rounded-full"
              role="alert"
            >
              <span className="mr-3 flex rounded-full bg-stone-500 px-2 py-1 text-xs font-bold uppercase">
                Coming soon...
              </span>
              <span className="mr-2 flex-auto text-left font-semibold">
                This article is not available yet.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FossilPage

export async function getStaticProps({ params }) {
  const fossil = await getFossil(params.slug)
  return { props: { fossil } }
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
