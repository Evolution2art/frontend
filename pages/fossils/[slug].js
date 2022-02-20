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
    <div className="m-6 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-8">
      <Head>
        <title>{fossil.title}</title>
      </Head>
      <div className="rounded-t-lg pt-2 pb-2 m-auto h-full w-full col-span-2">
        <NextImage media={fossil.image} />
      </div>
      <div className="w-full p-5 flex flex-col justify-between">
        <div className="text-stone-600">
          <h4 className="mt-1 font-semibold text-lg text-stone-700">
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
            <button className=" mt-4 bg-white border border-stone-200 d hover:shadow-lg text-stone-700 font-semibold py-2 px-4 rounded shadow">
              Contact us for a quote
            </button>
          ) : (
            <button
              className="snipcart-add-item mt-4 bg-white border border-stone-200 d hover:shadow-lg text-stone-700 font-semibold py-2 px-4 rounded shadow"
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
          <div className="text-center mr-10 mb-1" v-else>
            <div
              className="p-2 bg-stone-800 items-center text-stone-100 leading-none lg:rounded-full flex lg:inline-flex"
              role="alert"
            >
              <span className="flex rounded-full bg-stone-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                Coming soon...
              </span>
              <span className="font-semibold mr-2 text-left flex-auto">
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
